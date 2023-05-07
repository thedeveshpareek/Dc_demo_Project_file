import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import ExpenseService from "../../services/ExpenseService";
import FormInput from "../ui/FormInput";
import ExceptionUtil from "../../utils/ExceptionUtil";
import CategoryService from "../../services/CategoryService";
import CategoryForm from "../forms/CategoryForm";
import SubCategoryForm from "../forms/SubCategoryForm";
import {API_ROUTES} from "../../utils/constants";
import FormSelect from "../ui/FormSelect";

function ExpenseEditForm(props: any) {
    const {expense, onUpdate, onCancel, ...properties} = props;
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [action, setAction] = useState('none');
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [values, setValues] = useState({
        mainCategoryId: 0,
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProgress(true);
        let formData = new FormData(e.target);
        ExpenseService.update(formData).then(response => {
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Expense Updated!");
            e.target.reset();
            onUpdate(response.data);
        }).catch(reason => {
            setProgress(false);
            setResponseCode(reason.response.status);
            setMessage(reason.response.data.message);
            setTimeout(args => {
                setResponseCode(0)
            }, 3000);
        })
    };


    const categoryAddHandler = (e: any) => {
        setAction('category-Add');
    }
    const subCategoryAddHandler = (e: any) => {
        setAction('sub-Category-Add');
    }
    const cancelHandler = (e: any) => {
        setAction('none');
    }

    const categoryAddSuccessHandler = (data: any) => {
        loadMainCategories();
        setAction('none');
    }

    const subCategoryAddSuccessHandler = (e: any) => {
        setAction('none');
        loadSubCategories(values.mainCategoryId);
    }

    const loadMainCategories = () => {
        CategoryService.getCategory().then(response => {
            setCategory(response.data);
            loadSubCategories(expense.mainCategoryId);
        }).then(reason => {
            console.log(reason);
        })
    }

    const loadSubCategories = (categoryId: any) => {
        CategoryService.getSubCategoryById(categoryId).then(response => {
            setSubCategory(response.data);
        }).then(reason => {
            console.log(reason);
        })
    }

    const onChange = (e: any) => {
        FuncUtil.validate(e)
        setValues({...values, [e.target.name]: e.target.value});
        if (e.target.name == 'mainCategoryId') {
            loadSubCategories(e.target.value);
        }
    };

    useEffect(() => {
        if (!loaded) {
            loadMainCategories();
            setLoaded(true);
        }
    })

    return (
        <>
            <form className={'form'} onSubmit={handleSubmit} encType={"multipart/form-data"}>
                {ExceptionUtil.handle(responseCode, message)}
                <div style={{display: "flex", justifyContent: "flex-start"}} className="form-section">
                    <h3>Expense Info</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                <input type="hidden" name={'id'} value={expense.id}/>
                <div className="row">
                    <FormSelect id={1} name={"accountId"} className={"form-control"}
                                errorMessage={"Please Select a Account!"} label={"Account"}
                                column={12} ajax={true}
                                mapping={{path: API_ROUTES.ACCOUNT_ALL, value: "id", text: "name"}} required={true}
                                onChange={onChange} disableFirstOption={true} defaultValue={expense.accountId}/>
                    <div className="col-6">
                        <label htmlFor="cars">Expense Category</label>
                        <div className="input-group">
                            <select className={"form-control"} name="mainCategoryId" onChange={onChange}
                                    defaultValue={expense.mainCategoryId}>
                                <option value="">Select Category</option>
                                {category.map((category: any) => (
                                    <option value={category.id}
                                            selected={category.id == expense.mainCategoryId ? true : false}>{category.name}</option>
                                ))}
                            </select>
                            <button type="button" className="btn btn-sm btn-info box-shadow-1 mr-0 mb-0"
                                    onClick={categoryAddHandler}>Add
                                Category
                            </button>
                        </div>
                    </div>
                    <div className="col-6">
                        <label htmlFor="cars">Sub Category</label>
                        <div className="input-group">
                            <select className={"form-control"} name="subCategoryId"
                                    defaultValue={expense.subCategoryId}>
                                <option value="">Select Sub Category</option>
                                {subCategory.map((category: any) => (
                                    <option value={category.id}
                                            selected={category.id == expense.subCategoryId ? true : false}>{category.name}</option>
                                ))}
                            </select>
                            <button type="button" className="btn btn-sm btn-info box-shadow-1 mr-0 mb-0"
                                    onClick={subCategoryAddHandler}>Add Sub
                                Category
                            </button>
                        </div>
                    </div>

                    <FormInput id={5} name={"expenseFor"} type={"text"} className={"form-control"}
                               placeholder={"Expense For"}
                               errorMessage={"Expense For shouldn't include any special character!"}
                               label={"Expense For"} column={12} defaultValue={expense.expenseFor}/>

                    <FormInput id={3} name={"refNo"} type={"text"} className={"form-control"}
                               placeholder={"Reference No"}
                               errorMessage={"Reference No shouldn't include any special character!"}
                               label={"Reference No"} column={4} defaultValue={expense.refNo}/>

                    <FormInput id={4} name={"date"} type={"date"} className={"form-control"}
                               placeholder={"Date"}
                               label={"Date"} column={4} defaultValue={expense.date}/>

                    <FormInput id={6} name={"amount"} type={"number"} className={"form-control text-right"}
                               placeholder={"Total Amount"}
                               errorMessage={"Total Amount shouldn't include any special character!"}
                               label={"Total Amount"} column={4} defaultValue={expense.amount}/>

                    <div className="col-12">
                        <label htmlFor="{'file'}">Attachment</label>
                        <input type="file" id={'file'} className={'form-control'} name={'attachment'}
                               multiple={false} accept={'.jpg,.png,.webp,.jpeg,.pdf'}/>
                    </div>

                    <FormInput id={7} name={"note"} type={"text"} className={"form-control"}
                               placeholder={"Note"}
                               errorMessage={"Total Amount shouldn't include any special character!"}
                               label={"Note"} column={12} defaultValue={expense.note}/>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                        <i className="ft-x"></i> Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={progress}>
                        <i className="ft-save"></i> Update &nbsp;
                        {progress ? <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"></span> : ''}
                    </button>
                </div>
            </form>

            {
                action == 'category-Add' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-80">
                                    <CategoryForm onCancel={cancelHandler} onSuccess={categoryAddSuccessHandler}/>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action == 'sub-Category-Add' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-80">
                                    <SubCategoryForm onCancel={cancelHandler} onSuccess={subCategoryAddSuccessHandler}/>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }

        </>
    );
}

export default ExpenseEditForm;
