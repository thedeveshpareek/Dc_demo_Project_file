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
import FormSelect from "../ui/FormSelect";
import FormInput from "../ui/FormInput";
import SmsSettingsService from "../../services/SmsSettingsService";

function SmsSettingsForm(props: any) {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState<any>(MODEL.CONFIGURATION);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        SmsSettingsService.save(values).then(response => {
            setValues(response.data);
            setIsSaved(true);
            setIsError(false);
            setMessage("SMS Settings Successfully Saved!");
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
                setMessage("Sorry! Tou don't have permission to save sms settings");
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
        SmsSettingsService.find().then(response => {
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
                    <h3>SMS Settings Info</h3>
                </div>
                <div className="row">
                    <FormSelect id={1} name={"smsService"} className={"form-control"} values={[{text:"Bulk SMS", value: "BULKSMSBD"}]}
                                errorMessage={"Please Select a SMS Service!"} label={"SMS Service"}
                                column={3} onChange={onChange} defaultValue={values.smsService}/>
                    <FormInput id={2} name={"smsUrl"} type={"text"} className={"form-control"}
                               placeholder={"Url"} label={"Url"} column={6} onChange={onChange} defaultValue={values.smsUrl}/>
                    <FormSelect id={1} name={"smsMethod"} className={"form-control"} values={[{text:"GET", value: "GET"},{text:"POST", value: "POST"}]}
                                errorMessage={"Please Select a HTTP Method!"} label={"HTTP Method"}
                                column={3} onChange={onChange} defaultValue={values.smsMethod}/>
                </div>
                <hr/>
                <div className="row">
                    <FormInput id={2} name={"smsHeader1key"} type={"text"} className={"form-control"}
                               placeholder={"Header 1 key"} label={"Header 1 key"} column={3} onChange={onChange} defaultValue={values.smsHeader1key}/>
                    <FormInput id={3} name={"smsHeader1value"} type={"text"} className={"form-control"}
                               placeholder={"Header 1 value"} label={"Header 1 value"} column={3} onChange={onChange} defaultValue={values.smsHeader1value}/>
                    <FormInput id={4} name={"smsHeader2key"} type={"text"} className={"form-control"}
                               placeholder={"Header 2 key"} label={"Header 2 key"} column={3} onChange={onChange} defaultValue={values.smsHeader2key}/>
                    <FormInput id={5} name={"smsHeader2value"} type={"text"} className={"form-control"}
                               placeholder={"Header 2 value"} label={"Header 2 value"} column={3} onChange={onChange} defaultValue={values.smsHeader2value}/>
                    <FormInput id={6} name={"smsHeader3key"} type={"text"} className={"form-control"}
                               placeholder={"Header 3 key"} label={"Header 3 key"} column={3} onChange={onChange} defaultValue={values.smsHeader3key}/>
                    <FormInput id={7} name={"smsHeader3value"} type={"text"} className={"form-control"}
                               placeholder={"Header 3 value"} label={"Header 3 value"} column={3} onChange={onChange} defaultValue={values.smsHeader3value}/>
                </div>
                <hr/>
                <div className="row">
                    <FormInput id={8} name={"smsParameter1key"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 1 key"} label={"Parameter 1 key"} column={3} onChange={onChange} defaultValue={values.smsParameter1key}/>
                    <FormInput id={9} name={"smsParameter1value"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 1 value"} label={"Parameter 1 value"} column={3} onChange={onChange} defaultValue={values.smsParameter1value}/>

                    <FormInput id={10} name={"smsParameter2key"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 2 key"} label={"Parameter 2 key"} column={3} onChange={onChange} defaultValue={values.smsParameter2key}/>
                    <FormInput id={11} name={"smsParameter2value"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 2 value"} label={"Parameter 2 value"} column={3} onChange={onChange} defaultValue={values.smsParameter2value}/>
                </div>
                <div className="row">
                    <FormInput id={12} name={"smsParameter3key"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 3 key"} label={"Parameter 3 key"} column={3} onChange={onChange} defaultValue={values.smsParameter3key}/>
                    <FormInput id={13} name={"smsParameter3value"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 3 value"} label={"Parameter 3 value"} column={3} onChange={onChange} defaultValue={values.smsParameter3value}/>

                    <FormInput id={14} name={"smsParameter4key"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 4 key"} label={"Parameter 4 key"} column={3} onChange={onChange} defaultValue={values.smsParameter4key}/>
                    <FormInput id={15} name={"smsParameter4value"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 4 value"} label={"Parameter 4 value"} column={3} onChange={onChange} defaultValue={values.smsParameter4value}/>

                    <FormInput id={16} name={"smsParameter5key"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 5 key"} label={"Parameter 5 key"} column={3} onChange={onChange} defaultValue={values.smsParameter5key}/>
                    <FormInput id={17} name={"smsParameter5value"} type={"text"} className={"form-control"}
                               placeholder={"Parameter 5 value"} label={"Parameter 5 value"} column={3} onChange={onChange} defaultValue={values.smsParameter5value}/>
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

export default SmsSettingsForm;
