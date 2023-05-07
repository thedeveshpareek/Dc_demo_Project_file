import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import FuncUtil from "../../utils/FuncUtil";
import ExceptionUtil from "../../utils/ExceptionUtil";
import AuthService from "../../services/AuthService";
import {useNavigate} from "react-router-dom";

function PasswordUpdateForm(props:any) {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        id:0,
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProgress(true);
        AuthService.updatePassword(values).then(response => {
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Password Updated! Please Login Again");
            setTimeout(args => {
                setResponseCode(0);
                AuthService.logout();
                navigate('/login');
            }, 3000);
            e.target.reset();
            toast.success('🦄 Password Updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(reason => {
            console.log(reason)
            setProgress(false);
            setResponseCode(reason.response.status);
            setMessage(reason.response.data);
            setTimeout(args => {
                setResponseCode(0)
            }, 3000);
        })
    };

    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        let user = AuthService.getCurrentUser();
        values.id = user.id;
    },[]);

    return (
        <div className="card">
            <div className="card-content collapse show">
                <div className="card-body">
                    <form className="form" onSubmit={handleSubmit}>
                        {ExceptionUtil.handle(responseCode, message)}
                        <div className="form-body">
                            <h4 className="form-section"><i className="ft-shield"></i>Update Password</h4>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <input type="password" id="oldPassword" className="form-control"
                                               placeholder="Old Password" name="oldPassword" onChange={onChange}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input type="password" id="newPassword" className="form-control"
                                               placeholder="New Password" name="newPassword" onChange={onChange}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="newPasswordConfirm">Confirm New Password</label>
                                        <input type="password" id="newPasswordConfirm" className="form-control"
                                               placeholder="Confirm New Password" name="newPasswordConfirm" onChange={onChange}/>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-sm btn-danger mr-1">
                                <i className="ft-x"></i> Cancel
                            </button>
                            <button type="submit" className="btn btn-sm btn-primary" disabled={progress}>
                                <i className="ft-save"></i> Update &nbsp;
                                {progress ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordUpdateForm;
