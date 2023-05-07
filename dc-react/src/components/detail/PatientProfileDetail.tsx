import React, {useEffect, useState} from 'react';
import PatientBiometricEditForm from "../edit-forms/PatientBiometricEditForm";
import moment from "moment";
import BillForm from "../forms/BillForm";
import PatientBillsContent from "./PatientBillsContent";
import PatientReportContent from "./PatientReportContent";
import FuncUtil from "../../utils/FuncUtil";
import PatientBarcodes from "./PatientBarcodes";

function PatientProfileDetail(props: any) {
    const {patient,...properties} = props;
    const [action, setAction] = useState('none');
    const [record,setRecord] = useState(patient);
    const [loaded,setLoaded] = useState(false);
    const [refresh, doRefresh] = useState(0);
    const [onEditing, setOnEditing] = useState(false);

    const onUpdate = (e: any) => {
        doRefresh(e.id);
        setTimeout(()=>{
            setOnEditing(false);
        },1000);
    }
    const billAddHandler = (e: any) => {
        setAction('bill-Add');
    }

    const onCancel = (e: any) => {
        setAction('none');
    }
    useEffect(() => {
        setRecord(patient);
        setLoaded(false);
    },[])
    return (

        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                    </div>
                    <div className="content-body">
                        <div id="user-profile">
                            <div className="row">
                                <div className="col-sm-12 col-xl-12">
                                    <div className="media d-flex m-1 ">
                                        <div className="align-left p-1">
                                            <a href="#" className="profile-image">
                                                <img src={patient.photo}
                                                     className="rounded-circle img-border height-100 width-100" alt="Card image"/>
                                            </a>
                                        </div>
                                        <div className="media-body text-left  mt-1">
                                            <h3 className="font-large-1 white">{patient.fullName}</h3>
                                            <p className="white">
                                                <i className="ft-check-circle white"> </i> Passport No: {patient.passportNo}</p>
                                        </div>
                                        <div className="media-body text-right  mt-1">
                                            <button type="button" className="btn btn-outline-primary btn-min-width box-shadow-3 mr-1 mb-1"
                                                     onClick={billAddHandler} > Add Bill
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-3 col-lg-5 col-md-12">
                                    <div className="card">
                                        <div className="card-header pb-0">
                                            <div className="card-title-wrap bar-primary">
                                                <div className="card-title">Personal Info</div>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body p-0 pt-0 pb-1">
                                                <ul>
                                                    <li>
                                                        <strong>Full Name : </strong>
                                                        <span>{patient.fullName}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Gender : </strong>
                                                        <span>{patient.gender}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Date of Birth : </strong>
                                                        <span>{moment(patient.dateOfBirth).format('YYYY-MM-DD')}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Age : </strong>
                                                        <span>{FuncUtil.age(patient.dateOfBirth)}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Marital Status : </strong>
                                                        <span>{patient.maritalStatus}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Nationality : </strong>
                                                        <span>{patient.nationality}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Religion : </strong>
                                                        <span>{patient.religion}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Father's Name : </strong>
                                                        <span>{patient.fathersName}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Mother's Name : </strong>
                                                        <span>{patient.mothersName}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Profession : </strong>
                                                        <span>{patient.profession}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header pb-0">
                                            <div className="card-title-wrap bar-primary">
                                                <div className="card-title">Passport Info</div>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body p-0 pt-0 pb-1">
                                                <ul>
                                                    <li>
                                                        <strong>Passport No : </strong>
                                                        <span>{patient.passportNo}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Issue Date : </strong>
                                                        <span>{moment(patient.issueDate).format('YYYY-MM-DD')}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Expired Date : </strong>
                                                        <span>{moment(patient.expiredDate).format('YYYY-MM-DD')}</span>
                                                    </li>
                                                    <li>
                                                        <strong>NID Number : </strong>
                                                        <span>{patient.nidNumber}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Traveling To : </strong>
                                                        <span>{patient.travelingTo}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Visa No : </strong>
                                                        <span>{patient.visaNo}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Visa Date : </strong>
                                                        <span>{moment(patient.visaDate).format('YYYY-MM-DD')}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header pb-0">
                                            <div className="card-title-wrap bar-primary">
                                                <div className="card-title">Contact Info</div>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body p-0 pt-0 pb-1">
                                                <ul>
                                                    <li>
                                                        <strong>Mobile Number : </strong>
                                                        <span>{patient.mobile}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Email : </strong>
                                                        <span>{patient.email}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Present Address : </strong>
                                                        <span>{patient.presentAddress}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Permanent Address : </strong>
                                                        <span>{patient.permanentAddress}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header pb-0">
                                            <div className="card-title-wrap bar-primary">
                                                <div className="card-title">Service / Billing Inf</div>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body p-0 pt-0 pb-1">
                                                <ul>
                                                    <li>
                                                        <strong>Package/Test Name : </strong>
                                                        <span>{patient.testOrPackageId}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Agent/Agency Name : </strong>
                                                        <span>{patient.agentOrAgencyId}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Delivery Date : </strong>
                                                        <span>{moment(patient.deliveryDate).format('YYYY-MM-DD')}</span>
                                                    </li>
                                                    <li>
                                                        <strong>Special Note : </strong>
                                                        <span>{patient.specialNote}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-9 col-lg-7 col-md-12">
                                    <div id="timeline">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <ul className="nav nav-tabs">
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="base-tab1" data-toggle="tab" aria-controls="tab1" href="#tab1" aria-expanded="true">Medical Report</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="base-tab2" data-toggle="tab" aria-controls="tab2" href="#tab2" aria-expanded="false">Biometric Data</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link active" id="base-tab3" data-toggle="tab" aria-controls="tab3" href="#tab3" aria-expanded="false">Patient Bills</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="base-tab4" data-toggle="tab" aria-controls="tab4" href="#tab4" aria-expanded="false">Patient Barcodes</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content px-1 pt-1">
                                                        <div className="tab-pane box-shadow-2" id="tab1" aria-labelledby="base-tab1">
                                                            <PatientReportContent patient={patient}/>
                                                        </div>
                                                        <div className="tab-pane box-shadow-2 pb-1" id="tab2" aria-labelledby="base-tab2">
                                                            <PatientBiometricEditForm patient={patient} onUpdate={onUpdate} onCancel={onCancel}/>
                                                        </div>
                                                        <div className="tab-pane active box-shadow-2" id="tab3" aria-labelledby="base-tab3">
                                                            <PatientBillsContent patient={patient}/>
                                                        </div>
                                                        <div className="tab-pane box-shadow-2" id="tab4" aria-labelledby="base-tab4">
                                                            <PatientBarcodes patient={patient}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                action == 'bill-Add' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-80">
                                    <BillForm patient={patient} onCancel={onCancel}/>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
        </>
    );
}

export default PatientProfileDetail;
