import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {API_ROUTES} from "../../../utils/constants";
import DataTable from "../../../components/ui/DataTable";
import UserService from "../../../services/UserService";
import UserEditForm from "../../../components/edit-forms/UserEditForm";
import UserDetail from "../../../components/detail/UserDetail";

function UserList(props: any) {
    const navigate = useNavigate();
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
    const statusRender = (row: any) => {
        return (
            <div className={`badge ${row.enabled?'badge-success':"badge-danger"}`}>{row.enabled?'Active':'Inactive'}</div>
        );
    }

    const columns: {}[] = [
        {data: "index", name: "SL", sortable: true, class: "width-5-per"},
        {data: "fullName", name: "Full Name"},
        {data: "roleId", name: "Role ID"},
        {data: "email", name: "Email"},
        {name: "Active Status", render: statusRender, class: "text-center width-10-per"},
        {name: "Action", render: rowActions, class: "text-center width-15-per"}
    ];

    const onEdit = (e: any) => {
        setUser(JSON.parse(e.target.dataset.record));
        setOnEditing(true);
    }
    const onView = (e: any) => {
        let record = JSON.parse(e.target.dataset.record);
        setUser(record);
        setOnViewing(true);
    }

    const [data, setDate] = useState([]);
    const [onEditing, setOnEditing] = useState(false);
    const [onViewing, setOnViewing] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState({});
    const [refresh, doRefresh] = useState(0);

    useEffect(() => {
        if (!isLoaded) {
            loadData();
        }
    })

    const loadData = () => {
        UserService.findAll().then(response => {
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
        UserService.findAllByAllColumn(params).then(response => {
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
                            <h3 className="content-header-title">List Of Users</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/user">User</a>
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
                                    <Link to="/users/create" className="btn btn-sm btn-info box-shadow-1 pull-right"><i
                                        className="ft-plus"></i> Add User</Link>
                                </div>
                                <div className="card-body">
                                    <DataTable columns={columns} data={data} onSearch={handleSearch}
                                               endpoint={API_ROUTES.USER_ADVANCE_SEARCH} refresh={refresh}
                                               searchSize={6}
                                               searchPlaceholder={"Search User By Name, Email"}/>
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
                                    <UserEditForm user={user} onUpdate={onUpdate} onCancel={onCancel}/>
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
                                    <UserDetail user={user}/>
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

export default UserList;
