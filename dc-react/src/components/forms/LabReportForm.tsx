import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import ExceptionUtil from "../../utils/ExceptionUtil";
import {API_ROUTES} from "../../utils/constants";
import FormSelect from "../ui/FormSelect";
import LabReportService from "../../services/LabReportService";

function LabReportForm(props: any) {
    const {onSuccess,onCancel} = props;
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        mainCategoryId: 0,
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProgress(true);
        let formData = new FormData(e.target);
        LabReportService.upload(formData).then(response => {
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Upload Success!");
            e.target.reset();
            setTimeout(args => {
                onSuccess();
            }, 2000);
        }).catch(reason => {
            setProgress(false);
            setResponseCode(reason.response.status);
            setMessage(reason.response.data.message);
            setTimeout(args => {
                setResponseCode(0)
            }, 3000);
        })
    };

    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
        }
    }, [])

    return (
        <>
            <form className={'form'} onSubmit={handleSubmit} encType={"multipart/form-data"}>
                <div style={{display: "flex", justifyContent: "flex-start"}} className="form-section">
                    <h3>Upload Lab Reports</h3>
                </div>
                {ExceptionUtil.handle(responseCode, message)}
                <div className="row">
                    <FormSelect id={1} name={"device"} className={"form-control"}
                                errorMessage={"Please Select a Device!"} label={"Device"}
                                column={6} ajax={true}
                                mapping={{path: API_ROUTES.DEVICE_ALL, value: "id", text: "name"}} required={true}
                                onChange={onChange} disableFirstOption={true}/>
                    <div className="col-md-12">
                        <label htmlFor="{'files'}">Attachments</label>
                        <input type="file" id={'files'} className={'form-control'} name={'files'} multiple={true}
                               accept={'.jpg,.png,.webp,.jpeg,.pdf'}/>
                    </div>
                </div>
                <div className="form-actions text-right">
                    <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                        <i className="ft-x"></i> Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={progress}>
                        <i className="ft-save"></i> Upload &nbsp;
                        {progress ? <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"></span> : ''}
                    </button>
                </div>
            </form>
        </>
    );
}

export default LabReportForm;
