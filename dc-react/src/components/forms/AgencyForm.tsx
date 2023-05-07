import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import AgencyService from "../../services/AgencyService";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import {FORM} from "../../utils/FormFields";
import FormField from "../ui/FormField";

function AgencyForm(props:any) {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        id: null,
        fullName: "",
        mobile: "",
        email: "",
        address: "",
        commissionRate: 0.0,
        commissionAmount: 0.0
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        AgencyService.save(values).then(value => {
            setIsSaved(true);
            setIsError(false);
            setMessage("Agency Successfully Saved!");
            e.target.reset();
            setTimeout(args => {
                setIsSaved(false);
                navigate("/agencies");
            }, 5000);

        }).catch(reason => {
            if (reason.response.status == 401) {
                AuthService.logout();
                navigate("/login");
            } else if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save agency");
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
    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
    };
    const onCancel = (e: any) => {
        navigate("/agencies")
    };
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
                    <h3>Agency Info</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    {FORM.AGENCY.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange}/>
                    ))}
                </div>
            </div>
            <div className="form-actions">
                <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                    <i className="ft-x"></i> Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    <i className="ft-save"></i> Save
                </button>
            </div>
        </form>
    );
}

export default AgencyForm;
