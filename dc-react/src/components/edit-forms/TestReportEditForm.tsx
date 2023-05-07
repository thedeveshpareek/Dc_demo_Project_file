import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import {FORM} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import TestReportService from "../../services/TestReportService";
import AuthService from "../../services/AuthService";
import {toast} from "react-toastify";

function TestReportEditForm(props:any) {
    const {report, onUpdate,onCancel,...properties} = props;
    const [isInit, setIsInit] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        id: null,
        testId: "",
        test: {name: ""},
        patientId: "",
        patient: {fullName: ""},
        description: ""
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSaving(true);
        let formData = new FormData(e.target);
        TestReportService.save(formData).then(response => {
            setIsSaved(true);
            setIsError(false);
            setIsSaving(false);
            setMessage("Test Report Successfully Updated!");
            e.target.reset();
            toast.success('Test Report Successfully Updated!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(args => {
                setIsSaved(false);
                onUpdate(response)
            }, 2000);
        }).catch(reason => {
            if (reason.response.status == 401) {
                AuthService.logout();
            } else if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to update test report");
            } else {
                setMessage(reason.response.data.message);
            }
            setIsError(true);
            setIsSaved(false);
            setIsSaving(false);
            setTimeout(args => {
                setIsError(false);
            }, 3000);
        })
    };
    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
    };
    useEffect(() => {
        setValues(report);
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
                <div style={{display: "flex",justifyContent: "flex-start"}} className="form-section">
                    <h3>Test Report Info</h3>
                    <p className={'light-black ml-1'} >Update Form</p>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    {FORM.TEST_REPORT.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={report[input.name]} />
                    ))}
                    <div className="col-6">
                        <label htmlFor="{'file'}">Attachment</label>
                        <input type="file" id={'file'} className={'form-control'} name={'attachment'} multiple={false} accept={'.jpg,.png,.webp,.jpeg,.pdf'}/>
                    </div>
                </div>
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

export default TestReportEditForm;
