import React, {useEffect, useState} from 'react';
import {API_ROUTES} from "../../../utils/constants";
import DataTable from "../../../components/ui/DataTable";
import {useNavigate} from "react-router-dom";
import CommissionService from "../../../services/CommissionService";
import AuthService from "../../../services/AuthService";
import ExceptionUtil from "../../../utils/ExceptionUtil";
import FormSelect from "../../../components/ui/FormSelect";
import AccountService from "../../../services/AccountService";

function AgencyCommissionList(props:any) {
    const navigate = useNavigate();
    const permission = AuthService.getPermission('AGENCY_COMMISSION');
    const [data, setDate] = useState([]);
    const [refresh, doRefresh] = useState(0);
    const [progress, setProgress] = useState(false);
    const [selected, setSelected] = useState<any>([]);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [accounts, setAccounts] = useState([{id: 0, name: ''}]);
    const [accountId, setAccountId] = useState(0);
    const checkboxRender = (row: any) => {
        if (row.status == 'PAID'){
            return "";
        }else{
            return (<input type="checkbox" name={'row-selector'} data-record={row.id} onClick={onClickHandler}/>);
        }
    }
    const statusRender = (row: any) => {
        let badgeStyle = 'badge-light';
        switch (row.status) {
            case "GENERATED":
                badgeStyle = 'badge-primary';
                break;
            case "PAYMENT_DUE":
                badgeStyle = 'badge-danger';
                break;
            case "PARTIALLY_PAID":
                badgeStyle = 'badge-warning';
                break;
            case "PAID":
                badgeStyle = 'badge-success';
                break;
        }
        return (<div className={`badge ${badgeStyle}`}>{row.status}</div>);
    }
    const columns: {}[] = [
        {name: "", render: checkboxRender, class: "width-50 text-center"},
        {data: "index", name: "SL", sortable: true, class: "width-50 text-center"},
        {data: "billNo", name: "Bill ID", sortable: true,sort:true},
        {data: "patientName", name: "Patient Name", class: ""},
        {data: "agencyName", name: "Agency Name", class: "text-center",sort:true},
        {data: "amount", name: "Commission", class: "text-right", calculateSum: true, currency: true,sort:true},
        {data: "paid", name: "Paid", class: "text-right", calculateSum: true, currency: true,sort:true},
        {data: "due", name: "Due", class: "text-right", calculateSum: true, currency: true,sort:true},
        {data: "status",name: "Status", render: statusRender, class: "text-center",sort:true},
    ];

    const onClickHandler = (e:any) => {
        if (e.target.checked) {
            selected.push(e.target.dataset.record);
        }else{
            let index = selected.indexOf(e.target.dataset.record);
            if (index > -1) {
                selected.splice(index, 1);
            }
        }
    }

    const onAccountChange = (e:any) => {
        setAccountId(e.target.value);
    }

    const selectAll = () => {
        let rows = document.getElementsByName('row-selector');
        let commissions: number[] = [];
        rows.forEach((element: any) => {
            element.checked = true;
            commissions.push(element.dataset.record);
        });
        setSelected(commissions);
    }

    const unSelectAll = () => {
        let rows = document.getElementsByName('row-selector');
        rows.forEach((element: any) => {
            element.checked = false;
        });
        setSelected([]);
    }

    const payHandler = (e:any) => {
        setProgress(true);
        CommissionService.pay({data:selected,accountId:accountId}).then(response => {
            doRefresh(refresh == 0?1:0);
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Commission Payment Success!");
            setTimeout(args => {setResponseCode(0)},3000);
        }).catch(reason => {
            console.log(reason.response.status);
            setProgress(false);
            setResponseCode(reason.response.status);
            setMessage(reason.response.data.message);
            setTimeout(args => {setResponseCode(0)},3000);
        });
    }


    const handleSearch = (params: any) => {
        CommissionService.findAllByAgent(params).then(response => {
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

    const loadAccounts = () => {
        AccountService.findAll().then((response) => {
            setAccounts(response.data);
            setAccountId(accounts[0].id);
        })
    }

    useEffect(() => {
        loadAccounts();
    },[])

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Agency Commission List</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/agent">Agency</a>
                                        </li>
                                        <li className="breadcrumb-item active">Commissions
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
                                            {ExceptionUtil.handle(responseCode,message)}
                                            <div className="row">
                                                <div className="col-12">
                                                    {permission.pay?
                                                    <div className={'input-group  pull-right width-500'}>
                                                        <select className={"form-control"} name="accountId" onChange={onAccountChange}>
                                                            {accounts.map((account: any) => (
                                                                <option value={account.id}>{account.name}</option>
                                                            ))}
                                                        </select>
                                                        <button type="button" onClick={payHandler} disabled={progress}
                                                                className="btn btn-purple btn-min-width box-shadow-2 mr-1 mb-1">
                                                            Pay Commission {progress?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                                                        </button>
                                                    </div>:''}

                                                    <button type="button"
                                                            className="btn btn-light btn-min-width box-shadow-2 mr-1 mb-1"
                                                            onClick={selectAll}>Select All
                                                    </button>
                                                    <button type="button"
                                                            className="btn btn-light btn-min-width box-shadow-2 mr-1 mb-1"
                                                            onClick={unSelectAll}>Unselect All
                                                    </button>
                                                </div>
                                            </div>
                                            <DataTable columns={columns} data={data} onSearch={handleSearch}
                                                       endpoint={API_ROUTES.COMMISSION_AGENCY_ADVANCE_SEARCH}
                                                       refresh={refresh}
                                                       dateFilter={true} actionButtons={true}
                                                       searchPlaceholder={"Agent Name, Mobile, Email, Status"}/>
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

export default AgencyCommissionList;
