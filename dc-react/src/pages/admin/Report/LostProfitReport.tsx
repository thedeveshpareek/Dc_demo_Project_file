import React, {useEffect, useState} from 'react';
import moment from "moment";
import DashboardService from "../../../services/DashboardService";
import AuthService from "../../../services/AuthService";
import FuncUtil from "../../../utils/FuncUtil";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Pie} from "react-chartjs-2";
import ReactToPrint from "react-to-print";
ChartJS.register(ArcElement, Tooltip, Legend);

function LostProfitReport() {
    const [loading, setLoading] = useState(false);
    const [options] = useState({
        responsive: true,
        maintainAspectRatio:false,
        updateMode:"reset",
        tension:0.4,
        plugins: {
            title: {
                display: false,
            },
        },
    });
    let [page] = useState({
        from: moment(new Date()).format('YYYY-MM-DD'),
        to: moment(new Date()).format('YYYY-MM-DD'),
    });
    const [loss,setLoss] = useState(0.0);
    const [profit,setProfit] = useState(0.0);
    const [metrics, setMetrics] = useState({
        totalBillAmount: 0,
        totalPurchase: 0,
        totalExpenses: 0,
        totalAgencyCommissions: 0,
        totalAgentCommissions: 0,
        totalTestCount: 0,
        totalTestCompleted: 0,
        totalTestPending: 0,
        labels: [],
        data: [],
        accountBalances: [],
    });
    const labels = ['Income', 'Purchase', 'Expense', 'Agent Commission', 'Agency Commission'];
    const backgroundColor = [
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
    ];
    const borderColor = [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
    ];
    const [chartData, setChartData] = useState<any>({
        labels: labels,
        datasets: [{
            label: 'Amount',
            data: [0, 0, 0, 0, 0],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
        }],
    });

    const handleChange = (e: any) => {
        if (e.target.name === 'from') {
            page.from = e.target.value;
        } else if (e.target.name === 'to') {
            page.to = e.target.value;
        } else {
            switch (e.target.value) {
                case 'today':
                    page.from = moment(new Date()).format('YYYY-MM-DD');
                    page.to = moment(new Date()).format('YYYY-MM-DD');
                    break;
                case 'yesterday':
                    page.from = moment(new Date()).subtract(1, "days").format('YYYY-MM-DD');
                    page.to = moment(new Date()).subtract(1, "days").format('YYYY-MM-DD');
                    break;
                case 'week':
                    page.from = moment(new Date()).subtract(7, "days").format('YYYY-MM-DD');
                    page.to = moment(new Date()).format('YYYY-MM-DD');
                    break;
                case 'month':
                    page.from = moment(new Date()).subtract(30, "days").format('YYYY-MM-DD');
                    page.to = moment(new Date()).format('YYYY-MM-DD');
                    break;
                case 'year':
                    page.from = moment(new Date()).subtract(365, "days").format('YYYY-MM-DD');
                    page.to = moment(new Date()).format('YYYY-MM-DD');
                    break;
            }
        }
        loadMatrix();
    }

    const refresh = () => {
        loadMatrix();
    }

    const loadMatrix = () => {
        setLoading(true);
        DashboardService.findBetweenDate(page).then(response => {
            setLoading(false);
            setMetrics(response.data);
            metrics.totalBillAmount = response.data.totalBillAmount;
            metrics.totalPurchase = response.data.totalPurchase;
            metrics.totalExpenses = response.data.totalExpenses;
            metrics.totalAgentCommissions = response.data.totalAgentCommissions;
            metrics.totalAgencyCommissions = response.data.totalAgencyCommissions;
            metrics.accountBalances = response.data.accountBalances;
            metrics.data = response.data.data
            metrics.labels = response.data.labels
            let income = (response.data.totalBillAmount);
            let expenses = (metrics.totalPurchase + metrics.totalExpenses +metrics.totalAgentCommissions+ metrics.totalAgencyCommissions);
            let lost = income - expenses;
            if (lost > 0){
                setLoss(0);
                setProfit(lost);
            }else{
                setLoss(lost);
                setProfit(0);
            }
            initChart();
        }).catch(reason => {
            setLoading(false);
            if (reason.response.status === 401) {
                AuthService.logout();
            }
        })
    }
    const initChart = () => {
        setChartData({
            labels: labels,
            datasets: [{
                label: 'Amount',
                data: [metrics.totalBillAmount, metrics.totalPurchase, metrics.totalExpenses, metrics.totalAgentCommissions, metrics.totalAgencyCommissions],
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            }],
        });
    }

    useEffect(() => {
        loadMatrix();
    }, []);
    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Loss Or Profit Report</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/user">Report</a>
                                        </li>
                                        <li className="breadcrumb-item active">Lost or Profit
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
                                    <div className="card-header">
                                        <div className={'input-group col-7'}>
                                            <input type="date" className="form-control mr-1 box-shadow-1"
                                                   value={page.from}
                                                   name="from"
                                                   onChange={handleChange}/>
                                            <span className={"mr-1 mt-1"}>TO</span>
                                            <input type="date" className="form-control mr-1 box-shadow-1"
                                                   value={page.to} name="to"
                                                   onChange={handleChange}/>
                                            <select className="form-control" name={'duration'} onChange={handleChange}>
                                                <option value="today">Today</option>
                                                <option value="yesterday">Yesterday</option>
                                                <option value="week">This Week</option>
                                                <option value="month">This Month</option>
                                                <option value="year">This Year</option>
                                            </select>
                                            <button type="button" className="btn btn-info btn-min-width mx-1 mb-1"
                                                    onClick={refresh} disabled={loading}>
                                                Reload &nbsp;
                                                {loading ?
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"></span> : ''}
                                            </button>
                                            <ReactToPrint content={() => document.getElementById('lost-profit-content')}
                                                          trigger={() => <button className="btn btn-primary btn-min-width mx-1 mb-1">Print</button>}/>
                                        </div>
                                    </div>
                                    <div className="card-content" id={'lost-profit-content'}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-7">
                                                    <div className="card  border-2 border-blue">
                                                        <div className="card-header">
                                                            <h4 className="card-title">
                                                                Income & Expenses list
                                                            </h4>
                                                            <a href="/#" className="heading-elements-toggle"><i
                                                                className="la la-ellipsis-v font-medium-3"></i></a>
                                                            <div className="heading-elements">
                                                                <ul className="list-inline mb-0">
                                                                    <li><a href="/#" data-action="expand"><i
                                                                        className="ft-maximize"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="card-body">
                                                                <div className="card-text">
                                                                    <h5>Income</h5>
                                                                    <hr/>
                                                                    <dl className="row">
                                                                        <dt className="col-sm-6">Total Sale:</dt>
                                                                        <dd className="col-sm-6">{FuncUtil.toCurrency(metrics.totalBillAmount, "BDT")}</dd>
                                                                    </dl>
                                                                    <dl className="row">
                                                                        <dt className="col-sm-6 h5">Total Income:</dt>
                                                                        <dd className="col-sm-6 h5">{FuncUtil.toCurrency(metrics.totalBillAmount, "BDT")}</dd>
                                                                    </dl>
                                                                    <br/><br/>
                                                                    <h5>Expenses</h5>
                                                                    <hr/>
                                                                    <dl className="row">
                                                                        <dt className="col-sm-6">Total purchase:</dt>
                                                                        <dd className="col-sm-6">{FuncUtil.toCurrency(metrics.totalPurchase, "BDT")}</dd>
                                                                    </dl>
                                                                    <dl className="row">
                                                                        <dt className="col-sm-6">Total Expense:</dt>
                                                                        <dd className="col-sm-6">{FuncUtil.toCurrency(metrics.totalExpenses, "BDT")}</dd>
                                                                    </dl>
                                                                    <dl className="row">
                                                                        <dt className="col-sm-6">Total Agent
                                                                            Commission:
                                                                        </dt>
                                                                        <dd className="col-sm-6">{FuncUtil.toCurrency(metrics.totalAgentCommissions, "BDT")}</dd>
                                                                    </dl>
                                                                    <dl className="row">
                                                                        <dt className="col-sm-6">Total Agency
                                                                            Commission:
                                                                        </dt>
                                                                        <dd className="col-sm-6">{FuncUtil.toCurrency(metrics.totalAgencyCommissions, "BDT")}</dd>
                                                                    </dl>
                                                                    <dl className="row">
                                                                        <dt className="col-sm-6 h5">Total Expenses:</dt>
                                                                        <dd className="col-sm-6 h5">{FuncUtil.toCurrency(
                                                                            (metrics.totalPurchase +
                                                                            metrics.totalExpenses +
                                                                            metrics.totalAgentCommissions+
                                                                            metrics.totalAgencyCommissions)
                                                                            , "BDT")}</dd>
                                                                    </dl>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer text-center p-1">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-md-6 col-12 border-right-blue-grey border-right-lighten-5 text-center">
                                                                        <p className="blue-grey lighten-2 mb-0">Loss</p>
                                                                        <p className="font-medium-5 text-bold-400">{FuncUtil.toCurrency(loss, "BDT")}</p>
                                                                    </div>
                                                                    <div
                                                                        className="col-md-6 col-12 border-right-blue-grey border-right-lighten-5 text-center">
                                                                        <p className="blue-grey lighten-2 mb-0">Profit</p>
                                                                        <p className="font-medium-5 text-bold-400">{FuncUtil.toCurrency(profit, "BDT")}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-3">
                                                    <div className="card">
                                                        <div className="card-content">
                                                            <div className="card-body">
                                                                <Pie data={chartData}  options={options} className={'height-400'}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content collapse show">
                                        <div className="card-body">
                                            <h5>Account Balances Up to Today</h5>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="bg-primary white">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Account</th>
                                                        <th className={'text-right'}>Credit Balance</th>
                                                        <th className={'text-right'}>Debit Balance</th>
                                                        <th className={'text-right'}>Balance</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {metrics.accountBalances.map((account: any) => (
                                                        <tr>
                                                            <th scope="row">{account.id}</th>
                                                            <td>{account.name}</td>
                                                            <td className={'text-right'}>{FuncUtil.toCurrency(account.credit,"BDT")}</td>
                                                            <td className={'text-right'}>{FuncUtil.toCurrency(account.debit,"BDT")}</td>
                                                            <td className={'text-right'}>{FuncUtil.toCurrency(account.balance,"BDT")}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
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

export default LostProfitReport;
