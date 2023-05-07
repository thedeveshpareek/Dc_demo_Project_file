import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import FuncUtil from "../../utils/FuncUtil";
import FormInput from "../ui/FormInput";
import CategoryForm from "./CategoryForm";
import SubCategoryForm from "./SubCategoryForm";
import CategoryService from "../../services/CategoryService";
import ExpenseService from "../../services/ExpenseService";
import ExceptionUtil from "../../utils/ExceptionUtil";
import {API_ROUTES} from "../../utils/constants";
import FormSelect from "../ui/FormSelect";

function ExpenseForm(props: any) {
    const navigate = useNavigate();
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
        ExpenseService.save(formData).then(response => {
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Expense Added!");
            e.target.reset();
            setTimeout(args => {
                navigate("/expenses");
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


    const categoryAddHandler = (e: any) => {
        setAction('category-Add');
    }
    const subCategoryAddHandler = (e: any) => {
        setAction('sub-Category-Add');
    }
    const onCancel = (e: any) => {
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
        });
    }

    const loadSubCategories = (categoryId: any) => {
        CategoryService.getSubCategoryById(categoryId).then(response => {
            setSubCategory(response.data);
        });
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
    }, [])

    return (
        <>
            <form className={'form'} onSubmit={handleSubmit} encType={"multipart/form-data"}>
                <div style={{display: "flex", justifyContent: "flex-start"}} className="form-section">
                    <h3>Expense Info</h3>
                    <p className={'red ml-1'}>(*) Marked Fields are Required</p>
                </div>
                {ExceptionUtil.handle(responseCode, message)}
                <div className="row">
                    <FormSelect id={1} name={"accountId"} className={"form-control"}
                                errorMessage={"Please Select a Account!"} label={"Account"}
                                column={4} ajax={true}
                                mapping={{path: API_ROUTES.ACCOUNT_ALL, value: "id", text: "name"}} required={true}
                                onChange={onChange} disableFirstOption={true}/>
                    <div className="col-4">
                        <label htmlFor="cars">Expense Category</label>
                        <div className="input-group">
                            <select className={"form-control"} name="mainCategoryId" onChange={onChange}>
                                <option value="">Select Category</option>
                                {category.map((category: any) => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <button type="button" className="btn btn-sm btn-info box-shadow-1 mr-0 mb-0"
                                    onClick={categoryAddHandler}>Add
                                Category
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <label htmlFor="cars">Sub Category</label>
                        <div className="input-group">
                            <select className={"form-control"} name="subCategoryId">
                                <option value="">Select Sub Category</option>
                                {subCategory.map((category: any) => (
                                    <option value={category.id}>{category.name}</option>
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
                               label={"Expense For"} column={12}/>

                    <FormInput id={3} name={"refNo"} type={"text"} className={"form-control"}
                               placeholder={"Reference No"}
                               errorMessage={"Reference No shouldn't include any special character!"}
                               label={"Reference No"} column={4}/>

                    <FormInput id={4} name={"date"} type={"date"} className={"form-control"}
                               placeholder={"Date"}
                               label={"Date"} column={4}/>

                    <FormInput id={6} name={"amount"} type={"number"} className={"form-control"}
                               placeholder={"Total Amount"}
                               errorMessage={"Total Amount shouldn't include any special character!"}
                               label={"Total Amount"} column={4}/>

                    <div className="col-6">
                        <label htmlFor="{'file'}">Attachment</label>
                        <input type="file" id={'file'} className={'form-control'} name={'attachment'}
                               multiple={false} accept={'.jpg,.png,.webp,.jpeg,.pdf'}/>
                    </div>

                    <FormInput id={7} name={"note"} type={"textarea"} className={"form-control"}
                               placeholder={"Note"}
                               errorMessage={"Please Enter Value"}
                               label={"Note"} column={6}/>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-danger mr-1" onClick={event => navigate('/expenses')}>
                        <i className="ft-x"></i> Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={progress}>
                        <i className="ft-save"></i> Save &nbsp;
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
                                    <CategoryForm onCancel={onCancel} onSuccess={categoryAddSuccessHandler}/>
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
                                    <SubCategoryForm onCancel={onCancel} onSuccess={subCategoryAddSuccessHandler}/>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }

        </>
    );
}

export default ExpenseForm;
