import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {API_ROUTES} from "../../../utils/constants";
import DataTable from "../../../components/ui/DataTable";
import PatientService from "../../../services/PatientService";
import PatientEditForm from "../../../components/edit-forms/PatientEditForm";
import ReportEditForm from "../../../components/edit-forms/ReportEditForm";
import PatientReport from "./PatientReport";
import UserProfileDetail from "../../../components/detail/UserProfileDetail";
import XRayUpload from "../../../components/ui/XRayUpload";
import PatientBillsContent from "../../../components/detail/PatientBillsContent";
import {MODEL} from "../../../utils/FormFields";

function PatientList(props: any) {
    const navigate = useNavigate();
    const permission = AuthService.getPermission('PATIENT');
    const rowActions = (row: any) => {
        return (
            <>
                {AuthService.permit('PATIENT_BILL','view')?
                    <button type="button" className="btn btn-xss btn-primary box-shadow-1"
                            data-record={JSON.stringify(row)} onClick={patientBillsHandler}> Billing
                    </button>:''}
                {permission.edit?<button type="button" className="btn btn-xss btn-success box-shadow-1"
                        data-record={JSON.stringify(row)} onClick={editMedicalHandler}> Test Entry
                </button>:''}
                {permission.view?<button type="button" className="btn btn-xss btn-secondary box-shadow-1"
                        data-record={JSON.stringify(row)} onClick={patientReportHandler}> Report
                </button>:''}
                {permission.edit?<button type="button" className="btn btn-xss btn-danger box-shadow-1"
                        data-record={JSON.stringify(row)} onClick={onXrayUpload}> Upload
                </button>:''}
                {permission.view?<button type="button" className="btn btn-xss btn-primary box-shadow-1"
                        data-record={JSON.stringify(row)} onClick={patientViewHandler}> View
                </button>:''}
                {permission.edit?<button type="button" className="btn btn-xss btn-warning box-shadow-1"
                        data-record={JSON.stringify(row)} onClick={patientEditHandler}> Edit
                </button>:''}
            </>);
    }

    const statusRender = (row: any) => {
        return (
            <>
                {row.progress === 'PAYMENT_DUE'? <span className="badge badge-pill badge-danger">{row.progress}</span>:''}
                {row.progress === 'XRAY_PENDING'? <span className="badge badge-pill badge-dark">{row.progress}</span>:''}
                {row.progress === 'REPORT_PENDING'? <span className="badge badge-pill badge-warning">{row.progress}</span>:''}
                {row.progress === 'COMPLETED'? <span className="badge badge-pill badge-success">{row.progress}</span>:''}
            </>
        );
    }

    const columns: {}[] = [
        {data: "index", name: "SL", sortable: true, class: "text-center  width-100"},
        {data: "fullName", name: "Full Name", class: "",sort:true},
        {data: "passportNo", name: "Passport Number", class: "text-center width-200",sort:true},
        {data: "mobile", name: "Contact Number", class: "text-center  width-200",sort:true},
        {data: "agentOrAgencyName", name: "Agent Or Agency", class: "text-center",sort: true},
        {name: "Status", render: statusRender, class: "text-center  width-200"},
        {data: 'healthStatus',name: "FINAL STATUS", class: "text-center"},
        {name: "Action", render: rowActions, class: "text-center py-0"}
    ];


    const [data, setDate] = useState([]);
    const [action, setAction] = useState('none');
    const [isLoaded, setIsLoaded] = useState(false);
    const [patient, setPatient] = useState(MODEL.PATIENT);
    const [report, setReport] = useState(MODEL.REPORT);
    const [refresh, doRefresh] = useState(0);

    const patientBillsHandler = (e: any) => {
        setPatient(JSON.parse(e.target.dataset.record));
        setAction('patient-bills');
    }

    const editMedicalHandler = (e: any) => {
        setReport(JSON.parse(e.target.dataset.record).report);
        setAction('report-edit');
    }
    const patientEditHandler = (e: any) => {
        setPatient(JSON.parse(e.target.dataset.record));
        setAction('patient-edit');
    }
    const patientViewHandler = (e: any) => {
        let record = JSON.parse(e.target.dataset.record);
        setPatient(record);
        setAction('patient-view');
    }
    const patientReportHandler = (e: any) => {
        let record = JSON.parse(e.target.dataset.record);
        setPatient(record);
        setReport(record.report);
        setAction('report-view');
    }
    const onUpdate = (e: any) => {
        doRefresh(e.id);
        setTimeout(() => {
            setAction('none');
        }, 1000);
    }
    const onCancel = (e: any) => {
        setAction('none');
    }
    const onUpdateMedical = (e: any) => {
        doRefresh(e.id);
        setTimeout(() => {
            setAction('none');
        }, 1000);
    }
    const onXrayUpload = (e: any) => {
        let record = JSON.parse(e.target.dataset.record);
        setPatient(record);
        setAction('xray');
    }

    const loadData = () => {
        PatientService.findAll().then(response => {
            setDate(response.data);
            setIsLoaded(true);
        }).catch(reason => {
            if (reason.code === "ERR_NETWORK") {
                navigate("/maintenance");
            }
            if (reason.response.status === 401) {
                AuthService.logout();
                navigate("/login");
            }
        });
    }

    const handleSearch = (params: any) => {
        PatientService.findAllByAllColumn(params).then(response => {
            setDate(response.data);
        }).catch(reason => {
            if (reason.code === "ERR_NETWORK") {
                navigate("/maintenance");
            }
            if (reason.response.status === 401) {
                AuthService.logout();
                navigate("/login");
            }
        });
    }

    const xrayUploadHandler = (params: any) => {
        setAction('');
    }


    useEffect(() => {
        if (!isLoaded) {
            loadData();
        }
    })

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Patient List</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/patients">Patient</a>
                                        </li>
                                        <li className="breadcrumb-item active">List
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <div className="card">
                            <div className="card-content collapse show">
                                <div className="card-header">
                                    {permission.create?<Link to="/patients/create" className="btn btn-sm btn-info box-shadow-1 pull-right"><i
                                        className="ft-plus"></i> Add Patient</Link>:''}
                                </div>
                                <div className="card-body">
                                    <DataTable columns={columns} data={data} onSearch={handleSearch}
                                               endpoint={API_ROUTES.PATIENT_ADVANCE_SEARCH} refresh={refresh}
                                               dateFilter={true}
                                               actionButtons={true}
                                               searchPlaceholder={"Search Package By TestName, Department, TestMethod"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                action === 'report-edit' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-80">
                                    <ReportEditForm report={report} onUpdate={onUpdateMedical}
                                                    onCancel={onCancel}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action === 'patient-edit' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-80">
                                    <PatientEditForm patient={patient} onUpdate={onUpdate} onCancel={onCancel}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action === 'patient-view' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                            <div className="modal-content ">
                                <div className="modal-body p-0 scroll-80">
                                    <UserProfileDetail patient={patient}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action === 'report-view' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body p-0 scroll-85">
                                    <PatientReport patients={patient}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action === 'xray' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body p-0 scroll-85">
                                    <XRayUpload patient={patient} onSuccess={xrayUploadHandler}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action === 'patient-bills' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body p-0 scroll-85">
                                    <PatientBillsContent patient={patient}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
        </>
    );
}

export default PatientList;
