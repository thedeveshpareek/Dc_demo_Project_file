import React, {useEffect, useState} from 'react';
import {MODEL} from "../../utils/FormFields";

function TestReportDetail(props: any) {
    const {report,...properties} = props;
    const [record,setRecord] = useState(MODEL.PATIENT_TEST_REPORT);
    const [loaded,setLoaded] = useState(false);
    useEffect(() => {
        if (loaded==false){
            setRecord(report);
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
                                <div className="card-title">ID {record.id}</div>
                                <hr/>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="bg-info pl-1 font-weight-bold white">Test Report Info</p>
                                        <h5 className={"mb-1"}><strong>Test Name :</strong> {record.testName}</h5>
                                        <h5 className={"mb-1"}><strong>Patient Name :</strong> {record.patientName}</h5>
                                        <h5 className={"mb-1"}><strong>Description :</strong> {record.description}</h5>
                                    </div>
                                    <div className="col-md-12">
                                        { report.attachment?.endsWith(".pdf")?
                                            <embed src={record.attachment} type="application/pdf"  className={'w-100'} style={{minHeight:400}}></embed>
                                            :
                                            <img src={record.attachment} className={'w-100'}/>
                                        }

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

export default TestReportDetail;
