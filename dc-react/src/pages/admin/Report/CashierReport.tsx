import React, {useEffect, useState} from 'react';
import moment from "moment";
import DashboardService from "../../../services/DashboardService";
import AuthService from "../../../services/AuthService";
import FuncUtil from "../../../utils/FuncUtil";
import ReactToPrint from "react-to-print";
import BillService from "../../../services/BillService";
import DataTable from "../../../components/ui/DataTable";
import {API_ROUTES} from "../../../utils/constants";
import PayBillComponent from "../Bill/PayBillComponent";
import Invoice from "../Bill/Invoice";
import {useNavigate} from "react-router-dom";
import BillPaymentService from "../../../services/BillPaymentService";

function CashierReport() {
    const navigate = useNavigate();
    const [data, setDate] = useState([]);
    const [refresh, doRefresh] = useState(0);
    const pageSizes = [100,200,500,1000,10000];

    const columns: {}[] = [
        {data: "index", name: "SL",  class: "text-center px-0"},
        {data: "billNo", name: "Bill No", class: "",sort:true},
        {data: "patientName", name: "Patient Name", class: ""},
        {data: "passportNo", name: "Passport #", class: "text-center "},
        {data: "amount", name: "Amount", class: "text-right", calculateSum: true, currency: true,sort:true},
        {data: "accountName", name: "Account Name", class: "",sort:true},
        {data: "createdByName", name: "Cashier", class: "",sort:true},
    ];

    const handleSearch = (params: any) => {
        BillPaymentService.findAllByAllColumn(params).then(response => {
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

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Bills With Cashier</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/user">Bills</a>
                                        </li>
                                        <li className="breadcrumb-item active">Cashier
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content collapse show">
                                        <div className="card-body">
                                            <DataTable columns={columns} data={data} onSearch={handleSearch}
                                                       endpoint={API_ROUTES.BILL_PAYMENT_ADVANCE_SEARCH} refresh={refresh}
                                                       dateFilter={true}
                                                       actionButtons={true}
                                                       pagesSizes={pageSizes}
                                                       searchPlaceholder={"Bill Number, Amount, Account Name, Cashier Name"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CashierReport;
