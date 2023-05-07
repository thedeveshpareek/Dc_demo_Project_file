import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import {FORM} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import PatientService from "../../services/PatientService";

function PatientEditForm(props:any) {
    const {patient, onUpdate,onCancel,...properties} = props;
    const [isInit, setIsInit] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        id: null,
        fullName: "",
        passportNo: "",
        issueDate: "",
        expiredDate: "",
        visaNo: "",
        visaDate: "",
        travelingTo: "",
        presentAddress: "",
        permanentAddress: "",
        mobile: "",
        email: "",
        group: "",
        pkgId: null,
        agentId: null,
        agencyId: null,
        deliveryDate: "",
        gender: "",
        maritalStatus: "",
        dateOfBirth: "",
        fathersName: "",
        mothersName: "",
        nationality: "",
        religion: "",
        profession: "",
        status: "",
        nidNumber: "",
        specialNote: "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSaving(true);
        PatientService.save(values).then(response => {
            setIsSaving(false);
            setIsSaved(true);
            setIsError(false);
            setMessage("Patient Successfully Updated!");
            onUpdate(response)
        }).catch(reason => {
            setIsSaving(false);
            if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save patient");
            } else {
                setMessage(reason.response.data.message);
            }
            setIsError(true);
            setIsSaved(false);
        })
    };
    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
    };
    useEffect(() => {
        setValues(patient);
    },[isInit])

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
            <div className="form-body">
                <div style={{display: "flex",justifyContent: "flex-start"}}>
                    <h3>Patient</h3>
                    <p className={'light-black ml-1'} >Update Form</p>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <h4 className="form-section bg-blue white px-2 font-weight-bolder">Personal Info</h4>
                <div className="row">
                    {FORM.PERSONAL_INFO.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={patient[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section bg-blue white px-2 font-weight-bolder">Passport Info</h4>
                <div className="row">
                    {FORM.PASSPORT_INFO.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={patient[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section bg-blue white px-2 font-weight-bolder">Contact Info</h4>
                <div className="row">
                    {FORM.CONTACT_INFO.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={patient[input.name]}/>
                    ))}
                </div>
                {/*<h4 className="form-section">Service / Billing Info</h4>
                <div className="row">
                    {FORM.SERVICE_BILLING_INFO.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={patient[input.name]}/>
                    ))}
                </div>*/}
            </div>
            <div className="form-actions">
                <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                    <i className="ft-x"></i> Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    <i className="ft-save"></i> Update &nbsp;
                    {isSaving?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                </button>
            </div>
        </form>
    );
}

export default PatientEditForm;
