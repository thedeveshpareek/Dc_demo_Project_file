import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import {FORM, MODEL, PATIENT_TEST_REPORT} from "../../utils/FormFields";
import {useParams} from "react-router-dom";
import PatientService from "../../services/PatientService";
import RefValuesService from "../../services/RefValuesService";
import TestService from "../../services/TestService";
import DataTable from "../ui/DataTable";
import {API_ROUTES} from "../../utils/constants";
import FormField from "../ui/FormField";
import moment from "moment";

function PatientTestReportContent(props: any) {
    const {patientId} = props;
    const [loaded, setLoaded] = useState(false);
    const [testReports, setTestReport] = useState([]);

    useEffect(() => {
        if (!loaded) {
            TestService.findByPatient(props.patientId).then(response => {
                setTestReport(response.data);
            })
            setLoaded(true);
        }
    })

    return (
        <div className="card">
            <div className="card-content collapse show">
                <div className="card-body">
                    <div className="col-lg-12 col-xl-12">
                        <div id="collapse4" className="card-accordion">
                            <div className="card collapse-icon accordion-icon-rotate left">
                                {testReports.map((report: any) => (
                                    <div className="card">
                                        <div className="card-header" id="headingDThree">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target={'#id' + report.id} aria-expanded="false"
                                                        aria-controls={'id' + report.id}>
                                                    {report.testName} - {moment(report.createdDate).format('YYYY-MM-DD')}
                                                </button>
                                            </h5>
                                        </div>
                                        <div id={'id' + report.id} className="collapse" aria-labelledby="headingDThree">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <ul>
                                                            <li>
                                                                <strong>Patient Name : </strong>
                                                                <span>{report.patientName}</span>
                                                            </li>
                                                            <li>
                                                                <strong>Test Name : </strong>
                                                                <span>{report.testName}</span>
                                                            </li>
                                                            <li>
                                                                <strong>Description : </strong>
                                                                <span>{report.description}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-6">
                                                        <ul>
                                                            {report.attachment==null?'':
                                                                <li>
                                                                    <strong>Attachment : </strong>
                                                                    <br/>
                                                                    <a className={`btn btn-primary btn-min-width box-shadow-1 mr-1 mb-1`}
                                                                       href={report.attachment} target={"_blank"}>Download</a>
                                                                </li>
                                                            }

                                                        </ul>
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

export default PatientTestReportContent;
