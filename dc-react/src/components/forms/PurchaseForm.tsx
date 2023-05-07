import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import PurchaseService from "../../services/PurchaseService";
import FormSelect from "../ui/FormSelect";
import {API_ROUTES} from "../../utils/constants";
import FormInput from "../ui/FormInput";
import FormTextArea from "../ui/FormTextArea";
import ExceptionUtil from "../../utils/ExceptionUtil";

function PurchaseForm(props: any) {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState<any>({
        id: null,
        supplierId: "",
        accountId: 0,
        refNo: "",
        purchaseDate: "",
        purchaseStatus: "",
        attachment: "",
        totalAmount: 0.0,
        note: "",
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProgress(true);
        let formData = new FormData(e.target);
        PurchaseService.save(formData).then(response => {
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Purchase Successfully Saved!");
            e.target.reset();
            setTimeout(args => {
                navigate("/purchase");
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
    const onCancel = (e: any) => {
        navigate("/purchase")
    };

    return (
        <form className="form" onSubmit={handleSubmit} encType={"multipart/form-data"}>
            {ExceptionUtil.handle(responseCode, message)}
            <div className="form-body">
                <div style={{display: "flex", justifyContent: "flex-start"}} className="form-section">
                    <h3>Purchase Info</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <div className="row">
                    <FormSelect id={1} name={"accountId"} className={"form-control"}
                                errorMessage={"Please Select a Account!"} label={"Account"}
                                column={4} ajax={true}
                                mapping={{path: API_ROUTES.ACCOUNT_ALL, value: "id", text: "name"}} required={true}
                                onChange={onChange} disableFirstOption={true}/>
                    <FormSelect id={1} name={"supplierId"} className={"form-control"}
                                errorMessage={"Please Select a supplier!"} label={"Supplier"}
                                column={4} ajax={true}
                                mapping={{path: API_ROUTES.SUPPLIER_ALL, value: "id", text: "name"}} required={true}
                                onChange={onChange}/>
                    <FormInput id={2} name={"refNo"} type={"text"} className={"form-control"}
                               placeholder={"Reference No"}
                               errorMessage={"Reference No shouldn't include any special character!"}
                               label={"Reference No"} column={4} onChange={onChange}/>
                    <FormInput id={3} name={"purchaseDate"} type={"date"} className={"form-control"}
                               placeholder={"Purchase Date"}
                               label={"Purchase Date"} column={4} onChange={onChange}/>
                    <FormInput id={4} name={"amount"} type={"number"} className={"form-control text-right"}
                               placeholder={"Total Amount"}
                               errorMessage={"Total Amount shouldn't include any special character!"}
                               label={"Total Amount"} column={4} onChange={onChange}/>
                    <FormInput id={4} name={"attachment"} type={"file"} className={"form-control"}
                               placeholder={"Attachment"}
                               errorMessage={"Please Select Valid File!"}
                               label={"Attachment"} column={4} onChange={onChange} multiple={false}
                               accept={'.jpg,.png,.webp,.jpeg,.pdf'}/>
                    <FormTextArea id={5} name={"note"} type={"textarea"} className={"form-control"}
                                  placeholder={"Note"}
                                  errorMessage={"Total Amount shouldn't include any special character!"}
                                  label={"Note"} column={"12"} onChange={onChange}/>
                    <FormSelect id={6} name={"status"} className={"form-control"} label={"Purchase Status"} column={"3"}
                                values={[{text: "Select Purchase Status", value: ""}, {
                                    text: "Ordered",
                                    value: "ORDERED"
                                }, {text: "Received", value: "RECEIVED"}, {text: "Pending", value: "PENDING"}]}
                                onChange={onChange}/>
                </div>
            </div>
            <div className="form-actions">
                <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                    <i className="ft-x"></i> Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={progress}>
                    <i className="ft-save"></i> Save &nbsp;
                    {progress ? <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"></span> : ''}
                </button>
            </div>
        </form>
    );
}

export default PurchaseForm;

