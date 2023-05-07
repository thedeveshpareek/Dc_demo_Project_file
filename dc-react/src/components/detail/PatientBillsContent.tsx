import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import moment from "moment";
import BillService from "../../services/BillService";
import Invoice from "../../pages/admin/Bill/Invoice";

function PatientBillsContent(props: any) {
    const {patient} = props;
    const [loaded, setLoaded] = useState(false);
    const [testBills, setBills] = useState([]);

    useEffect(() => {
        BillService.findByPatient(patient.id).then(response => {
            setBills(response.data);
        })
        setLoaded(true);
    },[loaded]);

    return (
        <div className="card">
            <div className="card-content collapse show">
                <div className="card-body">
                    <div className="col-lg-12 col-xl-12">
                        <div id="collapse4" className="card-accordion">
                            <div className="card collapse-icon accordion-icon-rotate left">
                                {testBills.length == 0 ? <div className="alert alert-light mb-2" role="alert">
                                    <strong>Sorry ! </strong> There Are no Bills!
                                </div> : ""}
                                {testBills.map((report: any,index) => (
                                    <div key={'pr-'+index} className="card">
                                        <div className="card-header" id={"heading"+report.id}>
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" data-toggle="collapse"
                                                        data-target={'#id' + report.id} aria-expanded="false"
                                                        aria-controls={'id' + report.id}>
                                                    {report.testName} - {moment(report.createdDate).format('YYYY-MM-DD')}
                                                </button>
                                            </h5>
                                        </div>
                                        <div id={'id' + report.id} className="collapse show" aria-labelledby={"heading"+report.id}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className={'col-12 border-1 border-blue'}>
                                                        <Invoice billId={report.id}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientBillsContent;
