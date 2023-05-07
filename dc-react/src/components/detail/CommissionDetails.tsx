import React, {useEffect, useState} from 'react';
import CommissionService from "../../services/CommissionService";
import FuncUtil from "../../utils/FuncUtil";

function CommissionDetails(props: any) {
    const {agentOrAgencyId} = props;
    const [loaded, setLoaded] = useState(false);
    const [summery, setSummery] = useState({
        totalBills: 0,
        completedBills: 0,
        pendingBills: 0,
        dueAmount: 0.0,
    });

    const loadSummery = () => {
        CommissionService.summery(agentOrAgencyId).then(response => {
            setSummery(response.data);
        });
    }

    const generateBadge = (data: any) => {
        if (data.totalBills == 0) {
            return (
                <a className="btn btn-md btn-light box-shadow-2 round btn-min-width pull-right white">Not Applicable</a>);
        } else if (data.totalBills == data.pendingBills) {
            return (
                <a className="btn btn-md btn-danger box-shadow-2 round btn-min-width pull-right white">Not Paid</a>);
        } else if (data.totalBills == data.completedBills) {
            return (
                <a className="btn btn-md btn-success box-shadow-2 round btn-min-width pull-right white">Fully Paid</a>);
        } else {
            return (<a className="btn btn-md btn-warning box-shadow-2 round btn-min-width pull-right white">Partially
                Paid</a>);
        }
    }

    useEffect(() => {
        if (loaded == false) {
            loadSummery();
            setLoaded(true);
        }
    })

    return (
        <div className="card m-1">
            <div className="card-header">
                <h4 className="card-title">Commission Details</h4>
                <div className="heading-elements">
                    <ul className="list-inline mb-0 display-block">
                        <li>
                            {generateBadge(summery)}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card-content collapse show">
                <div className="card-body pt-0 pb-1">
                    <p>Address</p>

                    <div className="row mb-1">
                        <div
                            className="col-6 col-sm-3 col-md-6 col-lg-3 border-right-blue-grey border-right-lighten-5 text-center">
                            <p className="blue-grey lighten-2 mb-0">Total Bills</p>
                            <p className="font-medium-5 text-bold-400">{summery.totalBills}</p>

                        </div>
                        <div
                            className="col-6 col-sm-3 col-md-6 col-lg-3 border-right-blue-grey border-right-lighten-5 text-center">
                            <p className="blue-grey lighten-2 mb-0">Completed</p>
                            <p className="font-medium-5 text-bold-400">{summery.completedBills}</p>
                        </div>
                        <div
                            className="col-6 col-sm-3 col-md-6 col-lg-3 border-right-blue-grey border-right-lighten-5 text-center">
                            <p className="blue-grey lighten-2 mb-0">Pending Bills</p>
                            <p className="font-medium-5 text-bold-400">{summery.pendingBills}</p>
                        </div>

                        <div className="col-6 col-sm-3 col-md-6 col-lg-3 text-center">
                            <p className="blue-grey lighten-2 mb-0">Due Amount</p>
                            <p className="font-medium-5 text-bold-400">{FuncUtil.toCurrency(summery.dueAmount,"BDT")}</p>
                        </div>
                    </div>

                    <h6 className="text-bold-600">Payment Completed :
                        <span> {summery.completedBills}/{summery.totalBills}</span>
                    </h6>
                    <div className="progress progress-sm mt-1 mb-0 box-shadow-2">
                        <div className="progress-bar bg-gradient-x-primary" role="progressbar"
                             style={{width: `${summery.totalBills * summery.completedBills / 100}%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommissionDetails;
