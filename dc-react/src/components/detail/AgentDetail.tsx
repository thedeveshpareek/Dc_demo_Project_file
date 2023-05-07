import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import CommissionDetails from "./CommissionDetails";

function AgentDetail(props: any) {
    const {agent,...properties} = props;
    const [record,setRecord] = useState({
        id: 0,
        fullName: "",
        mobile: "",
        email: "",
        address: "",
        commissionRate: 0.0,
        commissionAmount: 0.0,
    });
    const [loaded,setLoaded] = useState(false);
    useEffect(() => {
        if (loaded==false){
            setRecord(agent);
            setLoaded(false);
        }
    })
    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card m-1">
                        <div className="card-header pb-0">
                            <div className="card-title-wrap bar-primary">
                                <div className="card-title">RECORD ID : {record.id}</div>
                                <hr/>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="bg-info pl-1 font-weight-bold white">Agent Info</p>
                                        <h5 className={"mb-1"}><strong>Full Name :</strong> {record.fullName}</h5>
                                        <h5 className={"mb-1"}><strong>Email      :</strong> {record.email}</h5>
                                        <h5 className={"mb-1"}><strong>Mobile     :</strong> {record.mobile}</h5>
                                        <h5 className={"mb-1"}><strong>Line 1      :</strong> {record.address}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="bg-info pl-1 font-weight-bold white">Commission Info</p>
                                        <h5 className={"mb-1"}><strong>Commission Rate  :</strong> {record.commissionRate}%</h5>
                                        <h5 className={"mb-1"}><strong>Commission Amount :</strong> {FuncUtil.toCurrency(record.commissionAmount,'BDT')}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CommissionDetails agentOrAgencyId={agent.id}/>
                </div>
            </div>
        </>
    );
}

export default AgentDetail;
