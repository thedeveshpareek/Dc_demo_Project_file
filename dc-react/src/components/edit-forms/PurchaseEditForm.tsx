import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import FormSelect from "../ui/FormSelect";
import {API_ROUTES} from "../../utils/constants";
import FormInput from "../ui/FormInput";
import PurchaseService from "../../services/PurchaseService";
import FormTextArea from "../ui/FormTextArea";

function PurchaseEditForm(props:any) {
    const {purchase, onUpdate,onCancel,...properties} = props;
    const [isInit, setIsInit] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState(purchase);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSaving(true);
        let formData = new FormData(e.target);
        PurchaseService.update(formData).then(response => {
            setIsSaving(false);
            setIsSaved(true);
            setIsError(false);
            setMessage("Purchase Successfully Updated!");
            onUpdate(response)
        }).catch(reason => {
            setIsSaving(false);
            if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save purchase");
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
        setValues(purchase);
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
                    <h3>Purchase Info</h3>
                    <p className={'light-black ml-1'} >Update Form</p>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    <input type="hidden" value={purchase.id} name={'id'}/>
                    <FormSelect id={1} name={"accountId"} className={"form-control"}
                                errorMessage={"Please Select a Account!"} label={"Account"}
                                column={4} ajax={true}
                                mapping={{path: API_ROUTES.ACCOUNT_ALL, value: "id", text: "name"}} required={true}
                                onChange={onChange} disableFirstOption={true} defaultValue={purchase.accountId}/>
                    <FormSelect id={1} name={"supplierId"} className={"form-control"}
                                errorMessage={"Please Select a supplier!"} label={"Supplier"}
                                column={6} ajax={true}
                                mapping={{path: API_ROUTES.SUPPLIER_ALL, value: "id", text: "name"}} required={true} onChange={onChange} defaultValue={purchase.supplierId}/>

                    <FormInput id={2} name={"refNo"} type={"text"} className={"form-control"}
                               placeholder={"Reference No"}
                               errorMessage={"Reference No shouldn't include any special character!"}
                               label={"Reference No"} column={6} onChange={onChange} defaultValue={purchase.refNo}/>

                    <FormInput id={3} name={"purchaseDate"} type={"date"} className={"form-control"} placeholder={"Purchase Date"}
                               label={"Purchase Date"} column={6} onChange={onChange} defaultValue={purchase.purchaseDate}/>

                    <FormInput id={5} name={"amount"} type={"number"} className={"form-control"}
                               placeholder={"Total Amount"}
                               errorMessage={"Total Amount shouldn't include any special character!"}
                               label={"Total Amount"} column={6} onChange={onChange} defaultValue={purchase.amount}/>

                    <div className="col-12">
                        <label htmlFor="{'file'}">Attachment</label>
                        <input type="file" name={'attachment'} className={'form-control'} multiple={false} accept={'.jpg,.png,.webp,.jpeg,.pdf'}  onChange={onChange}/>
                    </div>

                    <FormTextArea id={6} name={"note"} type={"textarea"} className={"form-control"}
                                  placeholder={"Note"}
                                  errorMessage={"Total Amount shouldn't include any special character!"}
                                  label={"Note"} column={"12"} onChange={onChange} initValue={purchase.note}/>
                    <FormSelect id={4} name={"status"} className={"form-control"} label={"Purchase Status"} column={6}
                                values={[{text:"Select Purchase Status", value: ""}, {text:"Received", value: "RECEIVED"}, {text: "Pending", value: "PENDING"}, {text: "Ordered", value: "ORDERED"}]}
                                onChange={onChange} defaultValue={purchase.status}/>
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

export default PurchaseEditForm;
