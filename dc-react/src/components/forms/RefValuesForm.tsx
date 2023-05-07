import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import {FORM, HEARING_TEST, MODEL, RESPIRATORY_EXAM, SYSTEMIC_EXAM, VISUAL_ACUITY} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import RefValuesService from "../../services/RefValuesService";

function RefValuesForm(props: any) {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState<any>(MODEL.REF_VALUE);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        RefValuesService.save(values).then(response => {
            setValues(response.data);
            setIsSaved(true);
            setIsError(false);
            setMessage("Reference Value Successfully Saved!");
            setTimeout(args => {
                setIsSaved(false);
            }, 5000);

        }).catch(reason => {
            console.log(reason);
            if (reason.response.status == 401) {
                AuthService.logout();
                navigate("/login");
            } else if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save medical test");
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
        RefValuesService.find().then(response => {
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
            <div className="form-body">
                <div style={{display: "flex",justifyContent: "flex-start"}}>
                    <h3>Reference Values</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <h4 className="form-section">Visual Acuity Info</h4>
                <div className="row">
                    {FORM.VISUAL_ACUITY.map((input:any) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Hearing Acuity Info</h4>
                <div className="row">
                    {FORM.HEARING_TEST.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Systemic Exam: Cardio - Vascular Info</h4>
                <div className="row">
                    {FORM.SYSTEMIC_EXAM.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Respiratory Exam Info</h4>
                <div className="row">
                    {FORM.RESPIRATORY_EXAM.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Others Info</h4>
                <div className="row">
                    {FORM.OTHERS.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Venereal Diseases Info</h4>
                <div className="row">
                    {FORM.VENEREAL_DISEASES.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">X-RAY Investigation Info</h4>
                <div className="row">
                    {FORM.X_RAY_INVESTIGATION.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Blood-Elisa & Serology Info</h4>
                <div className="row">
                    {FORM.BLOOD_ELISA_SEROLOGY_MEDICAL.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Drug Test Info</h4>
                <div className="row">
                    {FORM.DRUG_TEST.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Urine Info</h4>
                <div className="row">
                    {FORM.URINE.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Stool R/E Info</h4>
                <div className="row">
                    {FORM.STOOL.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Blood-CBC & Grouping Info</h4>
                <div className="row">
                    {FORM.BLOOD_CBC_GROUPING.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Blood-Biochemistry Info</h4>
                <div className="row">
                    {FORM.BLOOD_BIOCHEMISTRY.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
                <h4 className="form-section">Blood-Elisa & Serology Info</h4>
                <div className="row">
                    {FORM.BLOOD_ELISA_SEROLOGY_LABORATORY.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={values[input.name]}/>
                    ))}
                </div>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    <i className="ft-save"></i> Save
                </button>
            </div>
        </form>
    );
}

export default RefValuesForm;
