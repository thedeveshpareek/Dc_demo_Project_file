import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import {FORM} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import PackageService from "../../services/PackageService";
import TestService from "../../services/TestService";

function PackageForm(props: any) {
    const navigate = useNavigate();
    const [isTestLoaded, setIsTestLoaded] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [testList, setTestList] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [values, setValues] = useState({
        id: null,
        packageName: "",
        testIds:[0],
        price: "",
        description: "",
        activeStatus: ""
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        let tests = document.getElementsByName('test');
        let testArray: number[] = [];
        tests.forEach(function ({checked, dataset, name}: any) {
            if (checked){
                testArray.push(parseInt(dataset.test));
            }
        });
        values.testIds = testArray;
        setIsSaving(true);
        PackageService.save(values).then(value => {
            setIsSaving(false);
            setIsSaved(true);
            setIsError(false);
            setMessage("Package Successfully Saved!");
            e.target.reset();
            setTimeout(args => {
                setIsSaved(false);
                navigate("/packages");
            }, 5000);
        }).catch(reason => {
            console.log(reason);
            setIsSaving(false);
            if (reason.response.status == 401) {
                AuthService.logout();
                navigate("/login");
            } else if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save package");
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
        FuncUtil.validate(e);
        setValues({...values, [e.target.name]: e.target.value});
    };
    const onCancel = (e: any) => {
        navigate("/package")
    };

    const loadTests = () => {
        TestService.findAll().then(response => {
            setTestList(response.data);
            setIsTestLoaded(true);
        }).catch(reason => {
            setIsTestLoaded(true);
            console.log(reason);
        });
    }
    useEffect(() => {
        if (!isTestLoaded) {
            loadTests();
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
                <div style={{display: "flex",justifyContent: "flex-start"}} className="form-section">
                    <h3>Package Info</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    {FORM.PACKAGE.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange}/>
                    ))}
                    <div className="col-md-12">
                        <label><strong>Select Tests</strong></label>
                        <div className={'row'}>
                            {testList.map((test: any) => (
                                <fieldset className={'col-3'}>
                                    <input type="checkbox" name={'test'} data-test={test.id}/>
                                    <label className={'ml-1 font-medium-1'} htmlFor="input-1"> {test.name} - <small>{FuncUtil.toCurrency(test.price,'BDT')}</small></label>
                                </fieldset>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-actions">
                <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                    <i className="ft-x"></i> Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    <i className="ft-save"></i> Save
                    {isSaving?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                </button>
            </div>
        </form>
    );
}

export default PackageForm;

