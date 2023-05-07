import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import {FORM} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import CategoryService from "../../services/CategoryService";
import {toast} from "react-toastify";

function CategoryForm(props: any) {
    const navigate = useNavigate();
    const {onCancel,onSuccess,...properties} = props;
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        mainId: null,
        name: "",
        description: ""
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        CategoryService.save(values).then(response => {
            setIsSaved(true);
            setIsError(false);
            setMessage("Category Successfully Saved!");
            setTimeout(args => {
                onSuccess(response.data);
                setIsError(false);
            }, 2000);
            e.target.reset();
            toast.success('🦄 Category Successfully Saved!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(reason => {
            console.log(reason);
            if (reason.response.status == 401) {
                AuthService.logout();
                navigate("/login");
            } else if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save category");
            } else {
                setMessage(reason.response.data.message);
            }
            setIsError(true);
            setIsSaved(false);
            setTimeout(args => {
                setIsError(false);
            }, 25000);
        })
    };
    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
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
                    <h3>Category Info</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    {FORM.CATEGORY.map((input) => (
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

export default CategoryForm;
