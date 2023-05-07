import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import {FORM} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import TestService from "../../services/TestService";
import BillService from "../../services/BillService";
import CategoryService from "../../services/CategoryService";
import RoleService from "../../services/RoleService";
import ExceptionUtil from "../../utils/ExceptionUtil";

function RoleForm(props: any) {
    const {onCancel,onSuccess} = props;
    const [progress, setProgress] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        id: null,
        name: "",
        description: ""
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        RoleService.save(values).then(response => {
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Role Added!");
            e.target.reset();
            setTimeout(args => {
                setResponseCode(0);
                onSuccess();
            }, 1000);
        }).catch(reason => {
            setProgress(false);
            setResponseCode(reason.response.status);
            setMessage(reason.response.data.message);
            setTimeout(args => {
                setResponseCode(0)
            }, 3000);
        })
    };
    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {ExceptionUtil.handle(responseCode, message)}
            <div className="form-body">
                <div style={{display: "flex",justifyContent: "flex-start"}} className="form-section">
                    <h3>Add Role</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    {FORM.ROLE.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange}/>
                    ))}
                </div>
            </div>
            <div className="form-actions">
                <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                    <i className="ft-x"></i> Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={progress}>
                    <i className="ft-save"></i> Save &nbsp;
                    {progress ? <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"></span> : ''}
                </button>
            </div>
        </form>
    );
}

export default RoleForm;
