import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import PatientReportContent from "../../../components/detail/PatientReportContent";

function PatientReportPrint(props: any) {
    let {id} = useParams();
    useEffect(() => {
        setTimeout(args => {
            window.print();
        },5000);

    },[])
    return (
        <div className="app-content content printable">
            <div className="content-wrapper">
                <div className="content-body">

                    <div className="row">
                        <div className="col-12">
                            <PatientReportContent patientId={id}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PatientReportPrint;
