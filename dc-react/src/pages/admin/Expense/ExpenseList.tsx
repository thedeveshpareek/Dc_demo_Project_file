import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {API_ROUTES} from "../../../utils/constants";
import DataTable from "../../../components/ui/DataTable";
import ExpenseService from "../../../services/ExpenseService";
import ExpenseEditForm from "../../../components/edit-forms/ExpenseEditForm";
import ExpenseDetail from "../../../components/detail/ExpenseDetail";
import moment from "moment";
import FuncUtil from "../../../utils/FuncUtil";

function ExpenseList(props: any) {
    const navigate = useNavigate();
    const permission = AuthService.getPermission('EXPENSES');
    const rowActions = (row: any) => {
        return (
            <>
                {permission.view?<button type="button" className="btn btn-xss btn-success box-shadow-1"
                        data-record={JSON.stringify(row)} onClick={onView}>
                    <i className="ft-eye"></i> View
                </button>:''}
                {permission.edit?<button type="button" className="btn btn-xss btn-info box-shadow-1"
                        data-record={JSON.stringify(row)} onClick={onEdit}>
                    <i className="ft-edit"></i> Edit
                </button>:''}
            </>);
    }
    const dateRender = (row: any) => {
        return (moment(row.purchaseDate).format('YYYY-MM-DD'))
    }
    const amountRender = (row: any) => {
        return FuncUtil.toCurrency(row.amount,'BDT')
    }

    const columns: {}[] = [
        {data: "index", name: "ID", sortable: true, class: "text-center width-100",sort:true},
        {data: "accountName", name: "Account",sort:true},
        {data: "categoryName", name: "Expense Category",sort:true},
        {data: "subCategoryName", name: "Sub Category",sort:true},
        {data: "refNo", name: "Reference No"},
        {render:dateRender, name: "Date",class: "text-center",sort:true},
        {data: "expenseFor", name: "Expense for"},
        {data: "amount",render: amountRender, name: "Total Amount",class: "text-right",sort:true},
        {data: "note", name: "Note"},
        {name: "Action", render: rowActions, class: "text-center p-0"}
    ];
    const onEdit = (e: any) => {
        setExpense(JSON.parse(e.target.dataset.record));
        setOnEditing(true);
    }
    const onView = (e: any) => {
        setExpense(JSON.parse(e.target.dataset.record));
        setOnViewing(true);
    }

    const [data, setDate] = useState([]);
    const [onEditing, setOnEditing] = useState(false);
    const [onViewing, setOnViewing] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [expense, setExpense] = useState({});
    const [refresh, doRefresh] = useState(0);

    useEffect(() => {
        if (!isLoaded) {
            loadData();
            setIsLoaded(true);
        }
    },[])

    const loadData = () => {
        ExpenseService.findAll().then(response => {
            setDate(response.data);
            setIsLoaded(true);
        }).catch(reason => {
            if (reason.code === "ERR_NETWORK") {
                navigate("/maintenance");
            }
            if (reason.response.status === 401) {
                AuthService.logout();
                navigate("/login");
            }
        });
    }

    const handleSearch = (params: any) => {
        ExpenseService.findAllByAllColumn(params).then(response => {
            setDate(response.data);
        }).catch(reason => {
            if (reason.code === "ERR_NETWORK") {
                navigate("/maintenance");
            }
            if (reason.response.status === 401) {
                AuthService.logout();
                navigate("/login");
            }
        });
    }

    const onUpdate = (e: any) => {
        doRefresh(refresh ===0 ? 1 : 0);
        setTimeout(() => {
            setOnEditing(false);
        }, 1000);
    }
    const onCancel = (e: any) => {
        setOnEditing(false);
    }

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Expense List</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/expense">Expense</a>
                                        </li>
                                        <li className="breadcrumb-item active">List
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <div className="card">
                            <div className="card-content collapse show">
                                <div className="card-header">
                                    {permission.create?<Link to="/expenses/create" className="btn btn-sm btn-info box-shadow-1 pull-right"><i
                                        className="ft-plus"></i> Add Expense</Link>:''}
                                </div>
                                <div className="card-body">
                                    <DataTable columns={columns} data={data} onSearch={handleSearch}
                                               endpoint={API_ROUTES.EXPENSE_ADVANCE_SEARCH} refresh={refresh}
                                               dateFilter={true} actionButtons={true}
                                               searchPlaceholder={"Search Expense By FullName"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                onEditing ?
                    <div className={`modal fade fadeIn ${onEditing ? 'show' : ''}`} role="dialog"
                         style={{display: onEditing ? 'block' : 'none'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body">
                                    <ExpenseEditForm expense={expense} onUpdate={onUpdate} onCancel={onCancel}/>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
            {
                onViewing ?
                    <div className={`modal fade fadeIn ${onViewing ? 'show' : ''}`} role="dialog"
                         style={{display: onViewing ? 'block' : 'none'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content ">
                                <div className="modal-body scroll-85">
                                    <ExpenseDetail expense={expense}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setOnViewing(false)}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
        </>
    );
}

export default ExpenseList;
