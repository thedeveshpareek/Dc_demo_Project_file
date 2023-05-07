import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import {FORM} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import PackageService from "../../services/PackageService";
import TestService from "../../services/TestService";
import PackageItemService from "../../services/PackageItemService";

function PackageEditForm(props:any) {
    const {record, onUpdate,onCancel} = props;
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [isTestLoaded, setIsTestLoaded] = useState(false);
    const [testList, setTestList] = useState([]);
    const [values, setValues] = useState({
        id: null,
        name: "",
        description: "",
        price: "",
        activeStatus: "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSaving(true);
        PackageService.update(values).then(response => {
            setIsSaving(false);
            setIsSaved(true);
            setIsError(false);
            setMessage("Package Successfully Updated!");
            onUpdate(response)
        }).catch(reason => {
            setIsSaving(false);
            if (reason.response.status === 403) {
                setMessage("Sorry! Tou don't have permission to save package");
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

    const loadTests = () => {
        TestService.findAll().then(response => {
            setTestList(response.data);
            setIsTestLoaded(true);
            selectItems();
        }).catch(reason => {
            setIsTestLoaded(true);
            console.log(reason);
        });
    }
    const selectItems = () => {
        PackageItemService.findAllByPackageId(record.id).then(response => {
            let selectedItems = response.data;
            let elements = document.getElementsByName('test');
            elements.forEach((element: any) => {
                element.checked = selectedItems.filter((item: any) => parseInt(element.dataset.test) === item.testId).length > 0;
            });
        })
    }

    const clickHandler = (e:any) => {
        setIsSaving(true);
        let testId = parseInt(e.target.dataset.test);
        if (e.target.checked){
            PackageItemService.save({pkgId:record.id,testId:testId}).then(response =>{
                selectItems();
                setIsSaving(false);
                setIsError(false);
                setIsSaved(true);
                setMessage("Successfully Added!")
                setTimeout(() => {
                    setIsSaved(false);
                },2000);
            }).catch(reason => {
                setIsSaving(false);
                console.log(reason);
                setIsError(true);
                setMessage(reason.code);
            })
        }else{
            PackageItemService.deleteByPackageAndTest(record.id,testId).then(response =>{
                setIsSaving(false);
                setIsError(false);
                setIsSaved(true);
                setMessage("Successfully Removed!");
                setTimeout(() => {
                    setIsSaved(false);
                },2000);
            }).catch(reason => {
                setIsSaving(false);
                console.log(reason);
                setIsError(true);
                setMessage(reason.code);
            })
        }
    }


    useEffect(() => {
        if (!isTestLoaded) {
            setValues(record);
            loadTests();
        }
    },[record,values,isTestLoaded,loadTests])

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
                    <p className={'light-black ml-1'} >Update Form</p>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    {FORM.PACKAGE.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={record[input.name]} />
                    ))}
                    <div className="col-md-12 mt-1">
                        <label><strong>Tests</strong></label>
                        <div className={'row'}>
                            {testList.map((test: any) => (
                                <fieldset className={'col-6'}>
                                    <input type="checkbox" name={'test'} data-test={test.id} onClick={clickHandler}/>
                                    <label className={'ml-1 font-medium-1'} htmlFor="input-1"> {test.name} - <small>{FuncUtil.toCurrency(test.price,'USD')}</small></label>
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
                    <i className="ft-save"></i> Save &nbsp;
                    {isSaving?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                </button>
            </div>
        </form>
    );
}

export default PackageEditForm;
