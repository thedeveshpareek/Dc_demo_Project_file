import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {API_ROUTES} from "../../../utils/constants";
import DataTable from "../../../components/ui/DataTable";
import PurchaseEditForm from "../../../components/edit-forms/PurchaseEditForm";
import PurchaseDetail from "../../../components/detail/PurchaseDetail";
import PurchaseService from "../../../services/PurchaseService";
import moment from "moment";
import FuncUtil from "../../../utils/FuncUtil";

function PurchaseList(props: any) {
    const navigate = useNavigate();
    const permission = AuthService.getPermission('PURCHASE');
    const [data, setDate] = useState([]);
    const [action, setAction] = useState('none');
    const [isLoaded, setIsLoaded] = useState(false);
    const [purchase, setPurchase] = useState({});
    const [refresh, doRefresh] = useState(0);

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
    const purchaseDate = (row: any) => {
        return (moment(row.purchaseDate).format('YYYY-MM-DD'))
    }
    const amount = (row: any) => {
        return FuncUtil.toCurrency(row.amount,'BDT')
    }
    const columns: {}[] = [
        {data: "index", name: "ID", sortable: true, class: "text-center width-100"},
        {data: "accountName", name: "Account",sort:true},
        {data: "supplierName", name: "Supplier",class: '',sort:true},
        {data: "refNo", name: "Reference No",sort:true},
        {data: "purchaseDate",name: "Purchase Date", render: purchaseDate,class: "text-center",sort:true},
        {data: "amount",name: "Total Amount",render:amount, class: "text-right",sort:true},
        {data: "status", name: "Purchase Status",class: "text-center",sort:true},
        {name: "Action", render: rowActions, class: "text-center p-0"}
    ];
    const onEdit = (e: any) => {
        setPurchase(JSON.parse(e.target.dataset.record));
        setAction('edit');
    }
    const onView = (e: any) => {
        let record = JSON.parse(e.target.dataset.record);
        setPurchase(record);
        setAction('view');
    }



    useEffect(() => {
        if (!isLoaded) {
            loadData();
        }
    })

    const loadData = () => {
        PurchaseService.findAll().then(response => {
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
        PurchaseService.findAllByAllColumn(params).then(response => {
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
            setAction('none');
        }, 1000);
    }
    const onCancel = (e: any) => {
        setAction('none');
    }

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Purchase List</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/purchase">Purchase</a>
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
                                    {permission.create?<Link to="/purchase/create" className="btn btn-sm btn-info box-shadow-1 pull-right"><i
                                        className="ft-plus"></i> Add Purchase</Link>:''}
                                </div>
                                <div className="card-body">
                                    <DataTable columns={columns} data={data} onSearch={handleSearch}
                                               endpoint={API_ROUTES.PURCHASE_ADVANCE_SEARCH} refresh={refresh}
                                               dateFilter={true} actionButtons={true}
                                               searchPlaceholder={"Search Purchase By Supplier, Reference Number,Status"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                action === 'edit' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body">
                                    <PurchaseEditForm purchase={purchase} onUpdate={onUpdate} onCancel={onCancel}/>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
            {
                action === 'view' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content scroll-95">
                                <div className="modal-body p-0">
                                    <PurchaseDetail purchase={purchase}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>: ""
            }
        </>
    );
}

export default PurchaseList;
