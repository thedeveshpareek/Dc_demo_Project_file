import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import {FORM, SUPPLIER} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import CategoryService from "../../services/CategoryService";
import {toast} from "react-toastify";
import SupplierService from "../../services/SupplierService";
import ExceptionUtil from "../../utils/ExceptionUtil";

function SupplierEditForm(props: any) {
    const {onCancel,onSuccess,supplier} = props;
    const [progress, setProgress] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        id: 0,
        name: "",
        contactNo: "",
        email: "",
        company: "",
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProgress(true);
        SupplierService.save(values).then(response => {
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Supplier Successfully Saved!");
            setTimeout(args => {
                onSuccess(response.data);
            }, 2000);
            e.target.reset();
            toast.success('🦄 Supplier Successfully Saved!', {
                position: "top-right",
                autoClose: 3000,
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

    useEffect(() => {
        setValues(supplier);
    },[supplier]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {ExceptionUtil.handle(responseCode, message)}
            <div className="form-body">
                <div style={{display: "flex",justifyContent: "flex-start"}} className="form-section">
                    <h3>Supplier Info</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    {FORM.SUPPLIER.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={supplier[input.name]}/>
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

export default SupplierEditForm;
