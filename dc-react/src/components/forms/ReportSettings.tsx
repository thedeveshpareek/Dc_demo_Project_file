import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import {
    CONFIGURATION,
    FORM,
    HEARING_TEST,
    MODEL,
    RESPIRATORY_EXAM,
    SYSTEMIC_EXAM,
    VISUAL_ACUITY
} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import ReportSettingsService from "../../services/ReportSettingsService";

function ReportSettingsForm(props: any) {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState<any>(MODEL.CONFIGURATION);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSaving(true)
        let formData = new FormData(e.target);
        ReportSettingsService.save(formData).then(response => {
            setIsSaved(true);
            setIsError(false);
            setMessage("Report Settings Successfully Saved!");
            e.target.reset();
            setTimeout(args => {
                setIsSaved(false);
                setIsSaving(false);
            }, 4000);
        }).catch(reason => {
            if (reason.response.status == 401) {
                AuthService.logout();
                navigate("/login");
            } else if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save report settings");
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
        ReportSettingsService.find().then(response => {
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
        <form className="form" onSubmit={handleSubmit} encType={"multipart/form-data"}>
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
                    <h3>Report Settings Info</h3>
                </div>
                <div className="row">
                    {FORM.REPORT_SETTINGS.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="{'file'}">Doctor Seal</label>
                        <input type="file" name={'reportDoctorSeal'} className={'form-control'} multiple={false} accept={'.jpg,.png,.webp,.jpeg,.pdf'}  onChange={onChange}/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="{'file'}">Company Logo</label>
                        <input type="file" name={'reportCompanyLogo'} className={'form-control'} multiple={false} accept={'.jpg,.png,.webp,.jpeg,.pdf'}  onChange={onChange}/>
                    </div>
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

export default ReportSettingsForm;
