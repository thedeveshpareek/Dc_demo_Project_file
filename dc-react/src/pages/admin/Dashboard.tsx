import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import StatisticCard from "../../components/ui/StatisticCard";
import moment from "moment";
import DashboardService from "../../services/DashboardService";
import FuncUtil from "../../utils/FuncUtil";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import AuthService from "../../services/AuthService";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const permission = AuthService.getPermission('DASHBOARD');
    const navigate = useNavigate();
    let [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    let [options] = useState({
        responsive: true,
        maintainAspectRatio:false,
        interaction: {
            intersect: false,
        },
        updateMode:"reset",
        tension:0.4,
        stacked: false,
        plugins: {
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                },
            }
        },
    });
    let [page, setPage] = useState({
        from: moment(new Date()).format('YYYY-MM-DD'),
        to: moment(new Date()).format('YYYY-MM-DD'),
    });
    let [metrics, setMetrics] = useState({
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
    });
    const [chartData, setChartData] = useState<any>({
        labels:[],
        datasets: [],
    });

    const handleChange = (e: any) => {
        if (e.target.name == 'from'){
            page.from = e.target.value;
        }else if(e.target.name == 'to'){
            page.to = e.target.value;
        }else{
            switch (e.target.value){
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
    const refresh = (e: any) => {
        loadMatrix();
    }

    const loadMatrix = () => {
        setLoading(true);
        DashboardService.findBetweenDate(page).then(response => {
            setLoading(false);
            setMetrics(response.data);
            metrics.data = response.data.data
            metrics.labels = response.data.labels
            initChart();
        }).catch(reason => {
            setLoading(false);
            if (reason.response.status == 401) {
                AuthService.logout();
                navigate("/login");
            }
        })
    }
    const initChart = () => {
        setChartData({
            labels:metrics.labels,
            datasets: [
                {
                    label: 'Sales',
                    data: metrics.data[0],
                    borderColor: 'rgb(115,216,103)',
                    backgroundColor: 'rgba(115,216,103,255)',
                    yAxisID: 'y',
                },
                {
                    label: 'Purchase',
                    data: metrics.data[1],
                    borderColor: 'rgb(18,143,242)',
                    backgroundColor: 'rgba(18,143,242,255)',
                    yAxisID: 'y',
                },{
                    label: 'Expenses',
                    data: metrics.data[2],
                    borderColor: 'rgb(255,73,97)',
                    backgroundColor: 'rgba(255,73,97,255)',
                    yAxisID: 'y',
                },
            ],
        });
    }

    useEffect(() => {
        if (!isLoaded) {
            loadMatrix();
            setIsLoaded(true);
        }
    },[isLoaded]);

    return (
        <div className="app-content content">
            <div className="content-wrapper">
                <div className="content-wrapper-before"></div>
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <div className="row">
                        <div className="col-12">
                            {permission.list?
                                <div className="card">
                                    <div className="card-content collapse show">
                                        <div className="card-body">
                                            <div className={'input-group col-md-6 col-sm-12'}>
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
                                                <button type="button" className="btn btn-info btn-min-width mx-1 mb-1" onClick={refresh} disabled={loading}>
                                                    Reload &nbsp;
                                                    {loading?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                                                </button>
                                            </div>
                                            <hr/>
                                            <section id="minimal-statistics-bg">
                                                <div className="row">
                                                    <StatisticCard title={'Total bill amount BDT'}
                                                                   value={FuncUtil.toCurrency(metrics.totalBillAmount, "BDT")}
                                                                   icon={'icon-tag'} color={3} column={3}
                                                                   type={'left-icon'}/>
                                                    <StatisticCard title={'Total Test No.'} value={metrics.totalTestCount}
                                                                   icon={'icon-users'} color={2} column={3}
                                                                   type={'left-icon'}/>
                                                    <StatisticCard title={'Test report Uploaded No'}
                                                                   value={metrics.totalTestCompleted}
                                                                   icon={'icon-basket-loaded'} color={1} column={3}
                                                                   type={'left-icon'}/>
                                                    <StatisticCard title={'Test report Pending No'}
                                                                   value={metrics.totalTestPending} icon={'icon-users'}
                                                                   color={4} column={3} type={'left-icon'}/>
                                                </div>
                                                <div className="row">
                                                    <StatisticCard title={'Total Purchase BDT'}
                                                                   value={FuncUtil.toCurrency(metrics.totalPurchase, "BDT")}
                                                                   icon={'icon-tag'} color={5} column={3}
                                                                   type={'right-icon'}/>
                                                    <StatisticCard title={'Total Expense BDT'}
                                                                   value={FuncUtil.toCurrency(metrics.totalExpenses, "BDT")}
                                                                   icon={'icon-tag'} color={6} column={3}
                                                                   type={'right-icon'}/>
                                                    <StatisticCard title={'Total Agency commission BDT'}
                                                                   value={FuncUtil.toCurrency(metrics.totalAgencyCommissions, "BDT")}
                                                                   icon={'icon-tag'} color={7} column={3}
                                                                   type={'right-icon'}/>
                                                    <StatisticCard title={'Total Agent commission BDT'}
                                                                   value={FuncUtil.toCurrency(metrics.totalAgentCommissions, "BDT")}
                                                                   icon={'icon-tag'} color={8} column={3}
                                                                   type={'right-icon'}/>
                                                </div>
                                            </section>
                                            <div id="line-statics" className="height-250 w-100 BarChartShadow">
                                                <Line options={options} data={chartData}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :""}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Dashboard;
