import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import PatientService from "../../services/PatientService";
import avatar from "../../assets/images/pages/face-recognition.jpg";
import thumb from "../../assets/images/pages/thum-scan.jpg";
import CameraWithCropper from "../ui/CameraWithCropper";
import {useParams} from "react-router-dom";
import {FingerResponse} from "../../utils/Models";
import FingerDetect from "../ui/FingerDetect";

function PatientBiometricEditForm(props:any) {
    let {id} = useParams();
    const {patient, onUpdate,onCancel,...properties} = props;
    const [profileImage, setProfileImage] = useState(patient.photo?patient.photo:avatar);
    const [fingerImage, setFingerImage] = useState(patient.fingerPrint ? patient.fingerPrint:thumb);
    const [isInit, setIsInit] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [isImageNotSet, setIsImageNotSet] = useState(false);
    const [values, setValues] = useState({
        id: null,
        photo: "",
        fingerPrint: "",
        fingerId: 0,
        fileContentBase64:''
    });

    const openCamera = (e: any) => {
        e.preventDefault();
        setIsCameraOpen(true);
    };
    const closeCamera = (e: any) => {
        setIsCameraOpen(false);
    };

    const closeScanner = (e: any) => {
        setIsCameraOpen(false);
    };

    const openScanner = (e: any) => {
        e.preventDefault();
        setIsScannerOpen(true);
    };


    const imageCaptureHandler = (image: any) => {
        setProfileImage(image);
        setIsCameraOpen(false);
        PatientService.uploadProfileById(id?id:patient.id,image).then((response) => {
            values.photo = response.data;
            setIsImageNotSet(false);
            setIsSaved(true);
            setTimeout(args => {
                setIsSaved(false);
            }, 5000);
            var el: any = document.getElementById('profileImage');
            el.value = response.data;

        })
    };

    const imageSelectHandler = (e: any) => {
        FuncUtil.base64(e.target.files[0]).then((value: any) => {
            setFingerImage(value.base64);
            PatientService.uploadProfile(value.base64).then((response) => {
                values.fingerPrint = response.data;
                setIsSaved(true);
                setTimeout(args => {
                    setIsSaved(false);
                }, 5000);
            })
        })
    };

    const fingerCaptureHandler = (finger: any) => {
        setFingerImage(finger.imageEncoded);
        setIsScannerOpen(false);
        values.id = id?id:patient.id
        values.fingerId = finger.finger.id;
        values.fileContentBase64 = finger.imageEncoded;
        PatientService.uploadFinger(values).then((response) => {
            setFingerImage(response.data)
        })
    };

    const fingerImageSelectHandler = (e: any) => {
        FuncUtil.base64(e.target.files[0]).then((value: any) => {
            setFingerImage(value.base64);
            PatientService.uploadFingerById(id?id:patient.id,value.base64).then((response) => {
                values.fingerPrint = response.data;
                setIsImageNotSet(false);
            })
        })
    };

    useEffect(() => {
        setValues(patient);
    },[isInit])

    return (
        <>
            <div className="card">
                <div className="form-body">
                    {isSaved ? (
                        <div className="alert alert-success mb-1 alert-icon-left" role="alert">
                            <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
                            Profile Updated
                        </div>) : ''}
                    <div className="row mt-2">
                        <div className="col-3 text-center border-info p-1 mx-3">
                            <img src={profileImage} alt="" className={'w-75'}/>
                            <a className="btn btn-info btn-block white" onClick={openCamera}>Take Photo</a>
                            <input type="file" className={'btn btn-info btn-block'} onChange={imageSelectHandler} multiple={false}
                                   itemType={'jpg,png,webp,jpeg'}/>
                            {isImageNotSet ? (
                                <div className="alert alert-danger mb-1 alert-icon-left" role="alert">
                                    <span className="alert-icon"> </span>
                                    Please select a Image
                                </div>) : ''}
                        </div>
                        <div className="col-3 text-center border-info p-1 mx-1">
                            <img src={fingerImage} alt="" className={'w-75'}/>
                            <a className="btn btn-info btn-block white" onClick={openScanner}>Scan Finger</a>
                            <input type="file" id="file" className={'btn btn-info btn-block'}
                                   onChange={fingerImageSelectHandler} multiple={false} accept={'jpg,png,webp,jpeg'}/>
                        </div>
                    </div>
                </div>
            </div>

        {isCameraOpen ?
            <div className={`modal fade fadeIn ${isCameraOpen ? 'show' : ''}`} role="dialog"
                 style={{display: isCameraOpen ? 'block' : 'none'}} data-backdrop="false" tabIndex={-1}>
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content scroll-95">
                        <div className="modal-body">
                            <CameraWithCropper onSuccess={imageCaptureHandler} onClose={closeCamera}/>
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

export default PatientBiometricEditForm;
