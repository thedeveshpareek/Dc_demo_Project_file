import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {API_ROUTES} from "../../../utils/constants";
import DataTable from "../../../components/ui/DataTable";
import TestReportService from "../../../services/TestReportService";
import {MODEL} from "../../../utils/FormFields";
import TestReportEditForm from "../../../components/edit-forms/TestReportEditForm";
import TestReportDetail from "../../../components/detail/TestReportDetail";

function TestReport(props: any) {
    const navigate = useNavigate();
    const [data, setDate] = useState([]);
    const [report, setReport] = useState(MODEL.PATIENT_TEST_REPORT);
    const [action, setAction] = useState('none');
    const [isLoaded, setIsLoaded] = useState(false);
    const [refresh, doRefresh] = useState(0);

    const rowActions = (row: any) => {
        return (
            <>
                <button type="button" className="btn btn-sm btn-success box-shadow-1 mr-1 mb-0"
                        data-record={JSON.stringify(row)} onClick={onView}>
                    <i className="ft-eye"></i> View
                </button>
                <button type="button" className="btn btn-sm btn-info box-shadow-1 mr-0 mb-0"
                        data-record={JSON.stringify(row)} onClick={onEdit}>
                    <i className="ft-edit"></i> Edit
                </button>
            </>);
    }

    const columns: {}[] = [
        {data: "index", name: "SL", sortable: true, class: "width-5-per"},
        {data: "testName", name: "Test Name"},
        {data: "patientName", name: "Patient Name"},
        {data: "description", name: "Description"},
        {data: "status", name: "Status",class: "text-center"},
        {render:rowActions, name: "Actions",class: "width-15-per text-center" },
    ];

    const onEdit = (e: any) => {
        setReport(JSON.parse(e.target.dataset.record));
        setAction('edit');
    }
    const onView = (e: any) => {
        setReport(JSON.parse(e.target.dataset.record));
        setAction('view');
    }

    useEffect(() => {
        if (!isLoaded) {
            loadData();
        }
    })

    const loadData = () => {
        TestReportService.findAll().then(response => {
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
        TestReportService.findAllByAllColumn(params).then(response => {
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

    const onUpdate = (e: any) => {
        doRefresh(e.id);
        setTimeout(() => {
            setAction('none');
        }, 1000);
    }
    const onCancel = (e: any) => {
        setAction('none');
    }

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Test Report</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/tests/report">Test</a>
                                        </li>
                                        <li className="breadcrumb-item active">Report</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <div className="card">
                            <div className="card-content collapse show">
                                <div className="card-header">
                                    <Link to="/tests/report/create" className="btn btn-sm btn-info box-shadow-1 pull-right"><i
                                        className="ft-plus"></i> Add Test Report</Link>
                                </div>
                                <div className="card-body">
                                    <DataTable columns={columns} data={data} onSearch={handleSearch}
                                               endpoint={API_ROUTES.TEST_REPORT_ADVANCE_SEARCH} refresh={refresh}
                                               searchSize={6}
                                               searchPlaceholder={"Search TestReport By TestName, PatientName, Description"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                action==='edit' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display:'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body">
                                    <TestReportEditForm report={report} onUpdate={onUpdate} onCancel={onCancel}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={onCancel}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
            {
                action==='view' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display:'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body p-0">
                                    <TestReportDetail report={report}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={onCancel}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
        </>
    );
}

export default TestReport;
