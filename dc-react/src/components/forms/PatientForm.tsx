import React, {useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import {useNavigate} from "react-router-dom";
import FormField from "../ui/FormField";
import PatientService from "../../services/PatientService";
import AuthService from "../../services/AuthService";
import {FORM} from "../../utils/FormFields";
import CameraWithCropper from "../ui/CameraWithCropper";
import moment from "moment";
import FingerDetect from "../ui/FingerDetect";
import {FingerResponse} from "../../utils/Models";
import {toast} from "react-toastify";

function PatientForm() {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('/assets/images/pages/face-recognition.jpg');
    const [fingerImage, setFingerImage] = useState('/assets/images/pages/thum-scan.jpg');
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isImageNotSet, setIsImageNotSet] = useState(false);
    const [message, setMessage] = useState("");
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [payNow, setPayNow] = useState(true);
    const [values, setValues] = useState({
        id: null,
        photo: "",
        fingerPrint: null,
        passportNo: "",
        issueDate: "",
        expiredDate: "",
        visaNo: "",
        visaDate: "",
        travelingTo: "",
        presentAddress: "",
        permanentAddress: "",
        mobile: "",
        email: "",
        group: "",
        testOrPackageId: 0,
        agentOrAgencyId: 0,
        deliveryDate: "",
        gender: null,
        age: 0,
        maritalStatus: null,
        dateOfBirth: "",
        fathersName: "",
        mothersName: "",
        nationality: "",
        religion: "",
        profession: "",
        status: "ACTIVE",
        nidNumber: "",
        specialNote: "",
        fingerId: 0,
        payNow: true,
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (values.photo == '' && values.fingerPrint == '') {
            setIsImageNotSet(true);
        }else if(values.testOrPackageId == null || values.testOrPackageId == undefined){

        } else {
            setIsSaving(true);
            PatientService.save(values).then(response => {
                window.scrollTo(0,0);
                let id = response.data.id;
                setIsSaving(false);
                setIsSaved(true);
                setIsError(false);
                setMessage("Patient Successfully Saved!");
                e.target.reset();
                setTimeout(() => {
                    setIsSaved(false);
                    navigate(`/patients/${id}`);
                }, 2000);

            }).catch(reason => {
                setIsSaving(false);
                if (reason.response.status == 401) {
                    AuthService.logout();
                    navigate("/login");
                } else if (reason.response.status == 403) {
                    setMessage("Sorry! Tou don't have permission to save patients");
                } else {
                    setMessage(reason.response.data.message);
                }
                setIsError(true);
                setIsSaved(false);
                setTimeout(() => {
                    setIsError(false);
                }, 2000);
            })
        }

    };

    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
        if (e.target.name == 'dateOfBirth') {
            let date = e.target.value;
            let diff = moment(moment()).diff(date, 'milliseconds');
            let duration = moment.duration(diff);
            document.getElementsByName('age').forEach((element: any, key) => {
                element.value = '' + duration.get("years");
            })
        }
    };

    const withPaymentHandler = (e: any) => {
        setPayNow(e.target.checked);
        setValues({...values, [e.target.name]: e.target.checked});
        console.log(values.payNow);
    };

    const openCamera = (e: any) => {
        e.preventDefault();
        setIsCameraOpen(true);
    };
    const openScanner = (e: any) => {
        e.preventDefault();
        setIsScannerOpen(true);
    };
    const closeCamera = (e: any) => {
        e.preventDefault();
        setIsCameraOpen(false);
    };

    const closeScanner = (e: any) => {
        e.preventDefault();
        setIsScannerOpen(false);
    };

    const imageCaptureHandler = (image: any) => {
        setProfileImage(image);
        setIsCameraOpen(false);
        PatientService.uploadProfile(image).then((response) => {
            values.photo = response.data;
            setIsImageNotSet(false);
            toast.success('Profile Image Uploaded!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(reason => {
            console.log(reason);
            toast.error('Profile Upload Failed!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        })
    };


    const fingerCaptureHandler = (finger: any) => {
        setFingerImage(finger.imageEncoded);
        setIsScannerOpen(false);
        values.fingerId = finger.finger.id;
        PatientService.uploadFinger(finger.imageEncoded).then((response) => {
            values.fingerPrint = response.data;
            toast.success('Finger Image Uploaded!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(reason => {
            toast.error('Finger Upload Failed!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        })
    };

    const imageSelectHandler = (e: any) => {
        FuncUtil.base64(e.target.files[0]).then((value: any) => {
            setProfileImage(value.base64);
            PatientService.uploadProfile(value.base64).then((response) => {
                values.photo = response.data;
                setIsImageNotSet(false);
            })
        })
    };

    const fingerImageSelectHandler = (e: any) => {
        FuncUtil.base64(e.target.files[0]).then((value: any) => {
            setFingerImage(value.base64);
            PatientService.uploadProfile(value.base64).then((response) => {
                values.fingerPrint = response.data;
                setIsImageNotSet(false);
            })
        })
    };

    const onCancel = (e: any) => {
        navigate("/patients")
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                {isSaved ? (
                    <div className="alert alert-success mb-1 alert-icon-left" role="alert">
                        <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
                        {message}
                    </div>) : ''}
                {isError ? (
                    <div className="alert alert-danger mb-1 alert-icon-left" role="alert">
                        <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
                        {message}
                    </div>) : ''}
                <div className="form-body">
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <h3>Add Patient</h3>
                        <p className={'red ml-1'}>(*) Marked Fields are Required</p>

                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-lg-4 col-md-3 col-sm-12"></div>
                        <div className="col-lg-2 col-md-3 col-sm-6 text-center border-info p-1">
                            <img src={profileImage} alt="" className={'w-75'}/>
                            <a className="btn btn-info btn-block white" onClick={openCamera}>Take Photo</a>
                            <input type="file" className={'btn btn-info btn-block'} onChange={imageSelectHandler}
                                   multiple={false}
                                   accept={'.jpg,.png,.webp,.jpeg'}/>
                            {isImageNotSet ? (
                                <div className="alert alert-danger mb-1 alert-icon-left" role="alert">
                                    <span className="alert-icon"> </span>
                                    Please select a Image
                                </div>) : ''}
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6  text-center border-info p-1">
                            <img src={fingerImage} alt="" className={'w-75'}/>
                            <a className="btn btn-info btn-block white" onClick={openScanner}>Scan Finger</a>
                            <input type="file" id="file" className={'btn btn-info btn-block'}
                                   onChange={fingerImageSelectHandler} multiple={false} accept={'jpg,png,webp,jpeg'}/>
                        </div>
                    </div>
                    <h4 className="form-section bg-blue white px-2 font-weight-bolder">Personal Info</h4>
                    <div className="row">
                        {FORM.PERSONAL_INFO.map((input) => (
                            <FormField key={input.id} {...input} onChange={onChange}/>
                        ))}
                    </div>
                    <h4 className="form-section bg-blue white px-2 font-weight-bolder">Passport Info</h4>
                    <div className="row">
                        {FORM.PASSPORT_INFO.map((input) => (
                            <FormField key={input.id} {...input} onChange={onChange}/>
                        ))}
                    </div>
                    <h4 className="form-section bg-blue white px-2 font-weight-bolder">Contact Info</h4>
                    <div className="row">
                        {FORM.CONTACT_INFO.map((input) => (
                            <FormField key={input.id} {...input} onChange={onChange}/>
                        ))}
                    </div>
                    <h4 className="form-section bg-blue white px-2 font-weight-bolder">Service / Billing Info</h4>
                    <div className="row">
                        {FORM.SERVICE_BILLING_INFO.map((input) => (
                            <FormField key={input.id} {...input} onChange={onChange}/>
                        ))}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                        <i className="ft-x"></i> Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                        <i className="ft-save"></i> Save &nbsp;
                        {isSaving ? <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"></span> : ''}
                    </button>
                    <input type="checkbox" name={'payNow'} className={'ml-2'} checked={payNow} onClick={withPaymentHandler}/>
                    <label className={'ml-1 font-medium-1'} htmlFor="input-1">Save With Full Payment</label>
                </div>
            </form>
            {isCameraOpen ?
                <div className={`modal fade fadeIn ${isCameraOpen ? 'show' : ''}`} role="dialog"
                     style={{display: isCameraOpen ? 'block' : 'none'}} data-backdrop="false" tabIndex={-1}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content scroll-95">
                            <div className="modal-body">
                                <CameraWithCropper onSuccess={imageCaptureHandler} onClose={closeCamera}/>
                            </div>
                            <div className="modal-footer">
                                <div className="col-12 mt-1">
                                    <button className={'btn btn-light round btn-block'} onClick={closeCamera}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ""
            }
            {isScannerOpen ?
                <div className={`modal fade fadeIn ${isScannerOpen ? 'show' : ''}`} role="dialog"
                     style={{display: isScannerOpen ? 'block' : 'none'}} data-backdrop="false" tabIndex={-1}>
                    <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                        <div className="modal-content scroll-95">
                            <div className="modal-body text-center">
                                <FingerDetect onSuccess={fingerCaptureHandler} onCancel={closeScanner}/>
                            </div>
                        </div>
                    </div>
                </div> : ""
            }
        </>
    );
}

export default PatientForm;
