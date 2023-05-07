import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {API_ROUTES} from "../../../utils/constants";
import DataTable from "../../../components/ui/DataTable";
import FuncUtil from "../../../utils/FuncUtil";
import AgencyService from "../../../services/AgencyService";
import AgencyEditForm from "../../../components/edit-forms/AgencyEditForm";
import AgencyDetail from "../../../components/detail/AgencyDetail";

function AgencyList(props: any) {
    const navigate = useNavigate();
    const permission = AuthService.getPermission('AGENCY');
    const rowActions = (row: any) => {
        return (
            <>
                {permission.view ?<button type="button" className="btn btn-xss btn-success box-shadow-1"
                                          data-record={JSON.stringify(row)} onClick={onView}>
                    <i className="ft-eye"></i> View
                </button>:''}
                {permission.edit?<button type="button" className="btn btn-xss btn-info box-shadow-1"
                                         data-record={JSON.stringify(row)} onClick={onEdit}>
                    <i className="ft-edit"></i> Edit
                </button>:''}
            </>
        );
    }
    const commissionAmountRender = (row: any) => {
        return row.commissionAmount ? FuncUtil.toCurrency(row.commissionAmount, 'BDT'):'';
    }
    const commissionRateRender = (row: any) => {
        return row.commissionRate ? row.commissionRate + '%':'';
    }

    const columns: {}[] = [
        {data: "index", name: "ID", sortable: true, class: ""},
        {data: "fullName", name: "Agency Name"},
        {data: "mobile", name: "Mobile Number", class: "text-center"},
        {data: "email", name: "Email"},
        {data: "address", name: "Address"},
        {name: "Commission Rate", render: commissionRateRender, class: "text-right"},
        {name: "Commission Amount", render: commissionAmountRender, class: "text-right"},
        {name: "Action", render: rowActions, class: "text-center py-0"}
    ];
    const onEdit = (e: any) => {
        setAgency(JSON.parse(e.target.dataset.record));
        setOnEditing(true);
    }
    const onView = (e: any) => {
        let record = JSON.parse(e.target.dataset.record);
        setAgency(record);
        setOnViewing(true);
    }

    const [data, setDate] = useState([]);
    const [onEditing, setOnEditing] = useState(false);
    const [onViewing, setOnViewing] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [agency, setAgency] = useState({});
    const [refresh, doRefresh] = useState(0);

    useEffect(() => {
        if (!isLoaded) {
            loadData();
        }
    })

    const loadData = () => {
        AgencyService.findAll().then(response => {
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
        AgencyService.findAllByAllColumn(params).then(response => {
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
            setOnEditing(false);
        }, 1000);
    }
    const onCancel = (e: any) => {
        setOnEditing(false);
    }

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Agency List</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/agencies">Agency</a>
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
                                    {permission.create?<Link to="/agencies/create" className="btn btn-sm btn-info box-shadow-1 pull-right"><i
                                        className="ft-plus"></i> Add Agency</Link>:''}
                                </div>
                                <div className="card-body">
                                    <DataTable columns={columns} data={data} onSearch={handleSearch}
                                               endpoint={API_ROUTES.AGENCY_ADVANCE_SEARCH} refresh={refresh}
                                               searchSize={6}
                                               searchPlaceholder={"Search Agency By AgencyName, Email, Address"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                onEditing ?
                    <div className={`modal fade fadeIn ${onEditing ? 'show' : ''}`} role="dialog"
                         style={{display: onEditing ? 'block' : 'none'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body">
                                    <AgencyEditForm agency={agency} onUpdate={onUpdate} onCancel={onCancel}/>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
            {
                onViewing ?
                    <div className={`modal fade fadeIn ${onViewing ? 'show' : ''}`} role="dialog"
                         style={{display: onViewing ? 'block' : 'none'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body p-0">
                                    <AgencyDetail agency={agency}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setOnViewing(false)}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
        </>
    );
}

export default AgencyList;
