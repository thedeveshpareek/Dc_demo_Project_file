import React, {useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import {FORM} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import {toast} from "react-toastify";
import AccountService from "../../services/AccountService";
import ExceptionUtil from "../../utils/ExceptionUtil";

function AccountForm(props: any) {
    const {onCancel,onSuccess} = props;
    const [progress, setProgress] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        name: "",
        description: ""
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProgress(true);
        AccountService.save(values).then(response => {
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Account Successfully Saved!");
            setTimeout(args => {
                setResponseCode(0);
                onSuccess(response.data)
            }, 2000);
            e.target.reset();
            toast.success('🦄 Account Successfully Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
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
        <>
            <form className="form" onSubmit={handleSubmit}>
                {ExceptionUtil.handle(responseCode, message)}
                <div className="form-body">
                    <div style={{display: "flex",justifyContent: "flex-start"}} className="form-section">
                        <h3>Account Info</h3>
                        <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                    </div>
                    <div className="row">
                        {FORM.ACCOUNT.map((input) => (
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
                        {progress ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
                    </button>
                </div>
            </form>
        </>
    );
}

export default AccountForm;
