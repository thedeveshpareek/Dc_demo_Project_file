import React from 'react';
import {useParams} from "react-router-dom";
import PatientTestReportContent from "../../../components/detail/PatientTestReportContent";

function PatientTestReport(props: any) {
    const {patients} = props
    let {id} = useParams();

    return (
        <div className="app-content content">
            <div className="content-wrapper">
                <div className="content-wrapper-before"></div>
                <div className="content-header row">
                    <div className="content-header-left col-md-4 col-12 mb-2">
                        <h3 className="content-header-title">Patient Test Report List</h3>
                    </div>
                </div>
                <div className="content-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <PatientTestReportContent patientId={id?id:patients.id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientTestReport;
