import React, {useEffect, useState} from 'react';
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import {MODEL} from "../../utils/FormFields";
import PatientService from "../../services/PatientService";
import RefValuesService from "../../services/RefValuesService";
import moment from "moment";
import ReactToPrint from "react-to-print";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";

function PatientReportContent(props: any) {
    const configuration = AuthService.getConfiguration();
    const [loaded, setLoaded] = useState(false);
    const [patient, setPatient] = useState(props.patient);
    const [report, setReport] = useState(MODEL.REPORT);
    const [refValue, setRefValue] = useState(MODEL.REF_VALUE);
    const pageStyle = `
      @page {
        size: auto;
        margin: 0;
      }
      @media print {
        html, body {
          width: 210mm;
          height: 297mm;
        }
        body {
          margin: 0;
        }
      }
    `;

    useEffect(() => {
        PatientService.findById(patient.id).then(response => {
            setPatient(response.data);
            setReport(response.data.report);
        })
        RefValuesService.find().then(response => {
            setRefValue(response.data);
        })
    }, [])

    return (
        <div className="card mb-0">
            <div className="card-content collapse show">
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h3 className="font-size mb-2">Medical Test Report of {patient.fullName}</h3>
                        </div>
                        <div className="col-4">
                            <ReactToPrint
                                pageStyle={pageStyle}
                                documentTitle={patient.passportNo}
                                content={() => document.getElementById('patient-report-print-content')}
                                          trigger={() => <button className="btn btn-info pull-right">Print</button>}/>
                        </div>
                    </div>
                    <div className={'printable mx-3 my-2'} id={'patient-report-print-content'}>
                        <div className={'row'}>
                            <div className="col-12 text-center">
                                <ul className="px-0 list-unstyled black">
                                    <li><img src={configuration.reportCompanyLogo} className="mb-0" height={60}/></li>
                                    <li><span>Phone : {configuration.reportContactNumber}</span> <span>Email : {configuration.reportEmail}</span></li>
                                    <li>Website : {configuration.websiteUrl} Report Download : {configuration.reportUrl}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h4 className={'font-weight-bolder'}>MEDICAL TEST REPORT</h4>
                            </div>
                        </div>
                        <table className="table-bordered table report-header">
                            <tbody>
                            <tr className={'text-center'}>
                                <td className="black width-20-per text-center">
                                    <span>PASSPORT NO : {patient.passportNo}</span>
                                    <Barcode value={patient.regNo?patient.regNo:'NA'} marginTop={10}  displayValue={false} width={2} height={50}/>
                                    <br/>
                                    <span>REG DATE : {FuncUtil.toDate(patient.createdDate)}</span>
                                </td>
                                <td className="black width-20-per text-center">
                                    <img src={patient.photo} alt="" style={{height:120,maxWidth:150}}/>
                                </td>
                                <td className="black width-20-per text-center">
                                    <img src={patient.fingerPrint} alt="" style={{height:120,maxWidth:150}}/>
                                </td>
                                <td className="black width-20-per text-center">
                                    <img src={report.xrayImage} alt="" style={{height:120,maxWidth:150}}/>
                                </td>
                                <td className="black width-20-per text-center">
                                    <QRCode size={100} className={'qr-image mt-1'} value={patient.qr?patient.qr:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black">DATE : {FuncUtil.toDateTime(report.modifiedDate)}</td>
                                <td className="text-center font-weight-bolder font-size black">PHOTO</td>
                                <td className="text-center font-weight-bolder font-size black">THUMB PRINT</td>
                                <td className="text-center font-weight-bolder font-size black">X –RAY IMAGE</td>
                                <td className="text-center font-weight-bolder font-size black">QR CODE</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table-bordered table">
                            <tbody>
                            <tr>
                                <td className="font-size black">NAME</td>
                                <td className="font-size black">{patient.fullName}</td>
                                <td className="font-size black">PATIENT ID</td>
                                <td className="font-size black">{patient.id}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">GENDER</td>
                                <td className="font-size black">{patient.gender}</td>
                                <td className="font-size black">PROFESSION</td>
                                <td className="font-size black">{patient.profession}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">DATE OF BIRTH</td>
                                <td className="font-size black">{moment(patient.dateOfBirth).format('YYYY-MM-DD')}</td>
                                <td className="font-size black">TRAVELING TO</td>
                                <td className="font-size black">{patient.travelingTo}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">PASSPORT NO.</td>
                                <td className="font-size black">{patient.passportNo}</td>
                                <td className="font-size black">CONTACT NUMBER</td>
                                <td className="font-size black">{patient.mobile}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">NATIONALITY</td>
                                <td className="font-size black">{patient.nationality}</td>
                                <td className="font-size black">NAME OF AGENCY / SUB AGENT</td>
                                <td className="font-size black">{patient.agentOrAgencyName}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-6 pr-0">
                                <table className="table-bordered table ">
                                    <tbody>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={5}>MEDICAL
                                                EXAMINATION
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black">TYPE OF EXAMINATION</td>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={2}>RESULTS</td>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={2}>REF. VALUE</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={2} className="font-size black">VISUAL ACUITY</td>
                                            <td colSpan={2} className="text-center font-size black">UNAIDED</td>
                                            <td colSpan={2} className="text-center font-size black">AIDED</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-size black">RIGHT</td>
                                            <td className="text-center font-size black">LEFT</td>
                                            <td className="text-center font-size black">RIGHT</td>
                                            <td className="text-center font-size black">LEFT</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">DISTANT</td>
                                            <td className="text-center font-size black">{report.distantUnaidedRight}</td>
                                            <td className="text-center font-size black">{report.distantUnaidedLeft}</td>
                                            <td className="text-center font-size black">{report.distantAidedRight}</td>
                                            <td className="text-center font-size black">{report.distantAidedLeft}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">NEAR</td>
                                            <td className="text-center font-size black">{report.nearUnaidedRight}</td>
                                            <td className="text-center font-size black">{report.nearUnaidedLeft}</td>
                                            <td className="text-center font-size black">{report.nearAidedRight}</td>
                                            <td className="text-center font-size black">{report.nearAidedLeft}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">CLEAR VISION</td>
                                            <td colSpan={4} className="text-center font-size black">{report.clearVision}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black" rowSpan={2}>HEARING (EAR)</td>
                                            <td className="text-center font-size black">L</td>
                                            <td className="text-center font-size black">{report.earLeft}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.earLeft}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-size black">R</td>
                                            <td className="text-center font-size black">{report.earRight}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.earRight}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-size black font-weight-bolder" colSpan={5}>
                                                SYSTEMIC EXAM: CARDIO - VASCULAR
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">B.P</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.bloodPressure}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.bloodPressure}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">HEART</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.heart}</td>
                                            <td className="text-center font-size black" colSpan={2} rowSpan={2}>{refValue.heart}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">PULSE</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.pulse}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={5}>
                                                RESPIRATORY EXAM
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">LUNGS</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.lungs}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.lungs}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">GASTROINTESTINAL ABDOMEN</td>
                                            <td className="text-center font-size black"
                                                colSpan={2}>{report.gastrointestinalAbdomen}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.gastrointestinalAbdomen}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={5}>OTHERS</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">HEIGHT (CM)</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.height}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.height}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">WEIGHT (KG)</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.weight}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.weight}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">HERNIA</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.hernia}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.hernia}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">VARICOSEVEINS</td>
                                            <td className="text-center font-size black"
                                                colSpan={2}>{report.varicoseVeins}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.varicoseVeins}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">DEFORMITIES</td>
                                            <td className="text-center font-size black"
                                                colSpan={2}>{report.deformities}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.deformities}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">SKIN</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.skin}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.skin}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">C.N.S.</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.cns}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.cns}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">EXTREMITIES</td>
                                            <td className="text-center font-size black"
                                                colSpan={2}>{report.extremities}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.extremities}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">PSYCHIATRY</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.psychiatry}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.psychiatry}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={5}>VENEREAL
                                                DISEASES
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">SYMPTOMS</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.symptoms}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.symptoms}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={5}>X-RAY
                                                INVESTIGATION
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">CHEST X-RAY</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.chestXray}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.chestXray}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">ECG</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.ecg}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.ecg}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={5}>DRUG TEST
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">THC</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.thc}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.thc}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">MOP</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.mop}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">AMP</td>
                                            <td className="text-center font-size black" colSpan={2}>{report.amp}</td>
                                            <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6 pl-0">
                                <table className="table-bordered table ">
                                    <tbody>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={3}>LABORATORY
                                                INVESTIGATION
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black">TYPE OF EXAMINATION</td>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={1}>RESULTS</td>
                                            <td className="text-center font-weight-bolder font-size black">REF. VALUE</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={3}>URINE</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">SUGAR</td>
                                            <td className="text-center font-size black">{report.sugar}</td>
                                            <td className="text-center font-size black">{refValue.sugar}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">ALBUMIN</td>
                                            <td className="text-center font-size black">{report.albumin}</td>
                                            <td className="text-center font-size black">{refValue.albumin}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">BILHARZIASIS (IF ENDEMIC)</td>
                                            <td className="text-center font-size black">{report.urineBilharziasis}</td>
                                            <td className="text-center font-size black">{refValue.urineBilharziasis}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">PREGNANCY TEST</td>
                                            <td className="text-center font-size black">{report.pregnancy}</td>
                                            <td className="text-center font-size black">{refValue.pregnancy}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">OTHERS</td>
                                            <td className="text-center font-size black">{report.others}</td>
                                            <td className="text-center font-size black">{refValue.others}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={3}>STOOL R/E (IF
                                                REQUIRED)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">HELMINTHS</td>
                                            <td className="text-center font-size black">{report.helminths}</td>
                                            <td className="text-center font-size black">{refValue.helminths}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">GIARDIA</td>
                                            <td className="text-center font-size black">{report.giardia}</td>
                                            <td className="text-center font-size black">{refValue.giardia}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">BILHARZIASIS (IF ENDEMIC)</td>
                                            <td className="text-center font-size black">{report.stoolBilharziasis}</td>
                                            <td className="text-center font-size black">{refValue.stoolBilharziasis}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">CULTURE</td>
                                            <td className="text-center font-size black">{report.culture}</td>
                                            <td className="text-center font-size black">{refValue.culture}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={3}>BLOOD-CBC &
                                                GROUPING
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">MALARIA</td>
                                            <td className="text-center font-size black">{report.malaria}</td>
                                            <td className="text-center font-size black">{refValue.malaria}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">MICROFILARIA</td>
                                            <td className="text-center font-size black">{report.microfilaria}</td>
                                            <td className="text-center font-size black">{refValue.microfilaria}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">BLOOD GROUP</td>
                                            <td className="text-center font-size black">{report.bloodGroup}</td>
                                            <td className="text-center font-size black">{refValue.bloodGroup}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">HEMOGLOBIN</td>
                                            <td className="text-center font-size black">{report.haemoglobin}</td>
                                            <td className="text-center font-size black">{refValue.haemoglobin}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">ESR</td>
                                            <td className="text-center font-size black">{report.esr}</td>
                                            <td className="text-center font-size black">{refValue.esr}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black"
                                                colSpan={3}>BLOOD-BIOCHEMISTRY
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">R.B.S.</td>
                                            <td className="text-center font-size black">{report.rbs}</td>
                                            <td className="text-center font-size black">{refValue.rbs}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">CREATININE</td>
                                            <td className="text-center font-size black">{report.creatinine}</td>
                                            <td className="text-center font-size black">{refValue.creatinine}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">T.BIL</td>
                                            <td className="text-center font-size black">{report.tbil}</td>
                                            <td className="text-center font-size black">{refValue.tbil}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">SGPT</td>
                                            <td className="text-center font-size black">{report.sgpt}</td>
                                            <td className="text-center font-size black">{refValue.sgpt}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">SGOT</td>
                                            <td className="text-center font-size black">{report.sgot}</td>
                                            <td className="text-center font-size black">{refValue.sgot}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">ALP</td>
                                            <td className="text-center font-size black">{report.alp}</td>
                                            <td className="text-center font-size black">{refValue.alp}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">UREA</td>
                                            <td className="text-center font-size black">{report.urea}</td>
                                            <td className="text-center font-size black">{refValue.urea}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center font-weight-bolder font-size black" colSpan={3}>BLOOD-ELISA &
                                                SEROLOGY
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">ANTI HCV</td>
                                            <td className="text-center font-size black">{report.antiHcv}</td>
                                            <td className="text-center font-size black">{refValue.antiHcv}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">TPHA (IF VDRL POSITIVE)</td>
                                            <td className="text-center font-size black">{report.tpha}</td>
                                            <td className="text-center font-size black">{refValue.tpha}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">VDRL</td>
                                            <td className="text-center font-size black">{report.vdrl}</td>
                                            <td className="text-center font-size black">{refValue.vdrl}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">HIV I & HIV II</td>
                                            <td className="text-center font-size black">{report.hiv}</td>
                                            <td className="text-center font-size black">{refValue.hiv}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size black">HB<small>S</small>AG</td>
                                            <td className="text-center font-size black">{report.hbsag}</td>
                                            <td className="text-center font-size black">{refValue.hbsag}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {report.status?
                            <table className="table-bordered table ">
                                <tbody>
                                <tr>
                                    <td className="font-size black">
                                        Mentioned above is the medical report for {patient.gender == 'MALE'?'Mr':'Mrs'}. {patient.fullName}, Who is <span className={"font-weight-bolder"}>{report.status}</span> for the above mentioned job according to the Medical criteria.
                                    </td>
                                    <td className="font-weight-bolder font-size black" style={{whiteSpace: "pre-line"}}>
                                        {report.status!=null?<img src={configuration.reportDoctorSeal} className={'width-100'}/> :''}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-size black">REMARK : {patient.remark}</td>
                                    <td className="font-size black">FINAL CHECKED BY : {patient.lastModifiedBy}</td>
                                </tr>
                                </tbody>
                            </table>:""}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientReportContent;
