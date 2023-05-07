import React, {useEffect, useState} from 'react';
import AuthService from "../../../services/AuthService";
import {useNavigate} from "react-router-dom";
import DataTable from "../../../components/ui/DataTable";
import {API_ROUTES} from "../../../utils/constants";
import AccountForm from "../../../components/forms/AccountForm";
import AccountEditForm from "../../../components/edit-forms/AccountEditForm";
import LabReportService from "../../../services/LabReportService";
import LabReportForm from "../../../components/forms/LabReportForm";
import FuncUtil from "../../../utils/FuncUtil";
import LabReport from "../../../components/detail/LabReport";

function LabReports(props: any) {
    const navigate = useNavigate();
    const permission = AuthService.getPermission('ACCOUNT');
    const [data, setDate] = useState([]);
    const [action, setAction] = useState('none');
    const [isLoaded, setIsLoaded] = useState(false);
    const [report, setReport] = useState({});
    const [refresh, doRefresh] = useState(0);

    const rowActions = (row: any) => {
        return (
            <>
                {permission.edit?<button type="button" className="btn btn-xss btn-info box-shadow-1 my-0 mx-1"
                        data-record={JSON.stringify(row)} onClick={onEdit}>
                    <i className="ft-eye"></i> View
                </button>:''}
            </>);
    }

    const uploadedTime = (row: any) => {
        return row.createdDate?FuncUtil.toDateTime(row.createdDate):'';
    }

    const columns: {}[] = [
        {data: "index", name: "ID", sortable: true, class: "text-center"},
        {data: "name", name: "File Name", class: ''},
        {render: uploadedTime, name: "Uploaded Time"},
        {name: "Action", render: rowActions, class: "text-center p-0"}
    ];
    const onEdit = (e: any) => {
        setReport(JSON.parse(e.target.dataset.record));
        setAction('view');
    }
    const onAdd = (e: any) => {
        setAction('add');
    }


    useEffect(() => {
        if (!isLoaded) {
            loadData();
        }
    })

    const loadData = () => {
        LabReportService.findAll().then(response => {
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
        LabReportService.findAllByAllColumn(params).then(response => {
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
        setAction('none');
        doRefresh(refresh == 0 ? 1 : 0);
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
                            <h3 className="content-header-title">Lab Reports</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/lab">Lab</a>
                                        </li>
                                        <li className="breadcrumb-item active">Reports
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
                                    {permission.create?
                                        <button type={'button'} className="btn btn-sm btn-info box-shadow-1 pull-right" onClick={onAdd}>
                                            <i className="ft-plus"></i> Upload Reports
                                        </button>
                                        :''
                                    }
                                </div>
                                <div className="card-body">
                                    <DataTable columns={columns} data={data} onSearch={handleSearch}
                                               endpoint={API_ROUTES.LAB_REPORT_ADVANCE_SEARCH} refresh={refresh}
                                               searchPlaceholder={"Search Files By Name"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                action == 'view' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body">
                                    <LabReport report={report} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={onCancel}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action == 'add' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body">
                                    <LabReportForm onSuccess={onUpdate} onCancel={onCancel}/>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
        </>
    );
}

export default LabReports;
