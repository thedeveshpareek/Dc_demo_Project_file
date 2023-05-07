import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import RoleService from "../../../services/RoleService";
import RoleForm from "../../../components/forms/RoleForm";
import {toast} from "react-toastify";

function UserRoleList(props: any) {
    const navigate = useNavigate();
    const permission = AuthService.getPermission('ROLE');
    const [roles, setRoles] = useState([]);
    const [selected, setSelected] = useState({
        name:'',
        description:'',
        privileges:[]
    });
    const [action, setAction] = useState('none');

    const addRole = (e: any) => {
        setAction('add');
    }

    const loadRoles = () => {
        RoleService.findAll().then(response => {
            setRoles(response.data);
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
    const loadPermissions = (e:any) => {
        loadRole(e.target.dataset.role);
    }

    const loadRole = (roleId:any) => {
        RoleService.findById(roleId).then(response => {
            setSelected(response.data);
        }).catch(reason => {
            console.log(reason);
        });
    }

    const checkHandler = (e:any) => {
        let record = {
            id:e.target.dataset.id,
            field:e.target.dataset.field,
            value:e.target.checked,
        }
        RoleService.updatePermission(record).then(response => {
            loadRole(response.data.roleId)
            toast.success(response.data.permission+'-'+record.field+' Updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(reason => {
            console.log(record);
        })

    }

    const onSuccess = (e: any) => {
        setAction('none');
        loadRoles();
    }
    const onCancel = (e: any) => {
        setAction('none');
    }

    useEffect(() => {
        loadRoles();
    },[]);

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">List Of Roles</h3>
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
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="card">
                                    <div className="card-content collapse show">
                                        <div className="card-header">
                                            <h5 className={'card-title'}>
                                                Roles

                                                {permission.create?<button className="btn btn-sm btn-info box-shadow-1 pull-right" onClick={addRole}>
                                                    <i className="ft-plus"></i>Add Role
                                                </button>:''}
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="bg-primary white">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Role Name</th>
                                                        <th>Description</th>
                                                        <th></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {roles.map((role: any) => (
                                                        <tr>
                                                            <th scope="row">{role.id}</th>
                                                            <td>{role.name}</td>
                                                            <td>{role.description}</td>
                                                            <td>
                                                                {permission.view?<button className="btn btn-sm btn-info box-shadow-1 pull-right" data-role={role.id} onClick={loadPermissions}>
                                                                    <i className="ft-shield"></i>Permissions
                                                                </button>:''}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {permission.view?<div className="col-md-6 col-sm-12">
                                <div className="card">
                                    <div className="card-content collapse show">
                                        <div className="card-header">
                                            <h5 className={'card-title'}>Permissions of {selected?.name}</h5>
                                        </div>
                                        <div className="card-body pt-0">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="bg-primary white">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>User Interface</th>
                                                        <th>List</th>
                                                        <th>Add</th>
                                                        <th>View</th>
                                                        <th>Edit</th>
                                                        {/*<th>Delete</th>*/}
                                                        <th>Pay</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {selected.privileges.map((privilege: any,index) => (
                                                        <tr>
                                                            <th scope="row">{index+1}</th>
                                                            <td>{privilege.permission}</td>
                                                            <td><input type="checkbox" data-id={privilege.id} data-field="list" onClick={checkHandler} checked={privilege.list} disabled={permission.edit?false:true}/></td>
                                                            <td><input type="checkbox" data-id={privilege.id} data-field="create" onClick={checkHandler} checked={privilege.create} disabled={permission.edit?false:true}/></td>
                                                            <td><input type="checkbox" data-id={privilege.id} data-field="view" onClick={checkHandler} checked={privilege.view} disabled={permission.edit?false:true}/></td>
                                                            <td><input type="checkbox" data-id={privilege.id} data-field="edit" onClick={checkHandler} checked={privilege.edit} disabled={permission.edit?false:true}/></td>
                                                            {/*<td><input type="checkbox" data-id={privilege.id} data-field="remove" onClick={checkHandler} checked={privilege.remove}/></td>*/}
                                                            <td><input type="checkbox" data-id={privilege.id} data-field="pay" onClick={checkHandler} checked={privilege.pay} disabled={permission.edit?false:true}/></td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>:''}
                        </div>
                    </div>
                </div>
            </div>
            {
                action == 'add' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body">
                                    <RoleForm  onCancel={onCancel} onSuccess={onSuccess}/>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
        </>
    );
}

export default UserRoleList;
