import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import {FORM, HEARING_TEST, MODEL, RESPIRATORY_EXAM, SYSTEMIC_EXAM, VISUAL_ACUITY} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import RefValuesService from "../../services/RefValuesService";
import MailSettingsService from "../../services/MailSettingsService";

function EmailSettingsForm(props: any) {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState<any>(MODEL.REF_VALUE);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        MailSettingsService.save(values).then(response => {
            setValues(response.data);
            setIsSaved(true);
            setIsError(false);
            setMessage("Email Settings Successfully Saved!");
            setTimeout(args => {
                setIsSaved(false);
                setIsSaving(false);
            }, 5000);

        }).catch(reason => {
            console.log(reason);
            if (reason.response.status == 401) {
                AuthService.logout();
                navigate("/login");
            } else if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save email settings");
            } else {
                setMessage(reason.response.data.message);
            }
            setIsError(true);
            setIsSaved(false);
            setTimeout(args => {
                setIsError(false);
            }, 5000);
        })
    };
    const loadCurrentValues = ()=>{
        MailSettingsService.find().then(response => {
            setValues(response.data);
        })
        setIsLoaded(true);
    }
    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (!isLoaded){
            loadCurrentValues();
        }
    })

    return (
        <form className="form" onSubmit={handleSubmit}>
            {isSaved ? (
                <div className="alert alert-success mb-1 alert-icon-left" role="alert">
                    <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
                    {message}
                </div>) : ''}
            {isError ? (
                <div className="alert alert-danger mb-1 alert-icon-left" role="alert">
                    <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
                    {message}
                </div>) : ''}
            <div className="form-body mt-3">
                <div style={{display: "flex", justifyContent: "flex-start"}} className="form-section">
                    <h3>Email Settings Info</h3>
                </div>
                <div className="row">
                    {FORM.EMAIL_SETTINGS.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    <i className="ft-save"></i> Update &nbsp;
                    {isSaving?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                </button>
            </div>
        </form>
    );
}

export default EmailSettingsForm;
