import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import {FORM, MODEL} from "../../utils/FormFields";
import FormField from "../ui/FormField";
import PatientReportService from "../../services/PatientReportService";
import RefValuesService from "../../services/RefValuesService";

function ReportEditForm(props:any) {
    const {report, onUpdate,onCancel} = props;
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [refValue, setRefValue] = useState(MODEL.REF_VALUE);
    const [values, setValues] = useState({
        id: null,
        patientId: "",
        eyeVisualAcuityLeft: "",
        eyeVisualAcuityRight: "",
        earLeft: "",
        earRight: "",
        bloodPressure: "",
        heart: "",
        lungs: "",
        gastrointestinalAbdomen: "",
        height: "",
        weight: "",
        hernia: "",
        varicoseVeins: "",
        deformities: "",
        skin: "",
        cns: "",
        extremities: "",
        psychiatry: "",
        symptoms: "",
        chestXray: "",
        ecg: "",
        hiv: "",
        hbsag: "",
        thc: "",
        mop: "",
        amp: "",
        sugar: "",
        albumin: "",
        urineBilharziasis: "",
        pregnancy: "",
        others: "",
        helminths: "",
        giardia: "",
        bilharziasis: "",
        culture: "",
        stoolBilharziasis: "",
        malaria: "",
        microfilaria: "",
        bloodGroup: "",
        haemoglobin: "",
        esr: "",
        rbs: "",
        creatinine: "",
        tbil: "",
        sgot: "",
        sgpt: "",
        alp: "",
        urea: "",
        antiHcv: "",
        tpha: "",
        vdrl: "",
        status: "",
        remark: "",
        expireDate: "",
        pulse: "",
        distantAidedRight: "",
        distantAidedLeft: "",
        distantUnaidedRight: "",
        distantUnaidedLeft: "",
        nearAidedRight: "",
        nearAidedLeft: "",
        nearUnaidedRight: "",
        nearUnaidedLeft: "",
        clearVision: "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSaving(true);
        PatientReportService.save(values).then(response => {
            setIsSaving(false);
            setIsSaved(true);
            setIsError(false);
            setMessage("Medical Test Successfully Updated!");
            onUpdate(response)
        }).catch(reason => {
            setIsSaving(false);
            if (reason.response.status == 403) {
                setMessage("Sorry! Tou don't have permission to save medical test");
            } else {
                setMessage(reason.response.data.message);
            }
            setIsError(true);
            setIsSaved(false);
        })
    };
    const onChange = (e: any) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const loadRefValues = () => {
        RefValuesService.find().then(response => {
            setRefValue(response.data);
        })
    };


    useEffect(() => {
        setValues(report);
        loadRefValues();
    },[])

    return (
        <form className="form" onSubmit={handleSubmit}>
            {isSaved ? (
                <div className="alert alert-success mb-1 alert-icon-left" role="alert">
                    <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
                    {message}
                </div>) : ''}
            {isError ? (
                <div className="alert alert-danger mb-1 alert-icon-left" role="alert">
                    <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
                    {message}
                </div>) : ''}
            <div className="form-body">
                <div style={{display: "flex",justifyContent: "flex-start"}}>
                    <h3>Medical Test</h3>
                    <p className={'light-black ml-1'} >Update Form</p>
                </div>
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
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="distantUnaidedRight" onChange={onChange} defaultValue={report.distantUnaidedRight}/>
                                </td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="distantUnaidedLeft" onChange={onChange} defaultValue={report.distantUnaidedLeft}/>
                                </td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="distantAidedRight" onChange={onChange} defaultValue={report.distantAidedRight}/>
                                </td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="distantAidedLeft" onChange={onChange} defaultValue={report.distantAidedLeft}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">NEAR</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="nearUnaidedRight" onChange={onChange} defaultValue={report.nearUnaidedRight}/>
                                </td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="nearUnaidedLeft" onChange={onChange} defaultValue={report.nearUnaidedLeft}/>
                                </td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="nearAidedRight" onChange={onChange} defaultValue={report.nearAidedRight}/>
                                </td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="nearAidedLeft" onChange={onChange} defaultValue={report.nearAidedLeft}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">CLEAR VISION</td>
                                <td colSpan={4} className="text-center font-size black">
                                    <input type="text" className="form-control" name="clearVision" onChange={onChange} defaultValue={report.clearVision}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black" rowSpan={2}>HEARING (EAR)</td>
                                <td className="text-center font-size black">L</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="earLeft" onChange={onChange} defaultValue={report.earLeft}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.earLeft}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-size black">R</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="earRight" onChange={onChange} defaultValue={report.earRight}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.earRight}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-size black font-weight-bolder" colSpan={5}>
                                    SYSTEMIC EXAM: CARDIO - VASCULAR
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">B.P</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="bloodPressure" onChange={onChange} defaultValue={report.bloodPressure}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.bloodPressure}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">HEART</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="heart" onChange={onChange} defaultValue={report.heart}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2} rowSpan={2}>{refValue.heart}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">PULSE</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="pulse" onChange={onChange} defaultValue={report.pulse}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black" colSpan={5}>
                                    RESPIRATORY EXAM
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">LUNGS</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="lungs" onChange={onChange} defaultValue={report.lungs}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.lungs}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">GASTROINTESTINAL ABDOMEN</td>
                                <td className="text-center font-size black"
                                    colSpan={2}>
                                    <input type="text" className="form-control" name="gastrointestinalAbdomen" onChange={onChange} defaultValue={report.gastrointestinalAbdomen}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.gastrointestinalAbdomen}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black" colSpan={5}>OTHERS</td>
                            </tr>
                            <tr>
                                <td className="font-size black">HEIGHT (CM)</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="height" onChange={onChange} defaultValue={report.height}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.height}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">WEIGHT (KG)</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="weight" onChange={onChange} defaultValue={report.weight}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.weight}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">HERNIA</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="hernia" onChange={onChange} defaultValue={report.hernia}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.hernia}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">VARICOSEVEINS</td>
                                <td className="text-center font-size black"
                                    colSpan={2}>
                                    <input type="text" className="form-control" name="varicoseVeins" onChange={onChange} defaultValue={report.varicoseVeins}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.varicoseVeins}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">DEFORMITIES</td>
                                <td className="text-center font-size black"
                                    colSpan={2}>
                                    <input type="text" className="form-control" name="deformities" onChange={onChange} defaultValue={report.deformities}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.deformities}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">SKIN</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="skin" onChange={onChange} defaultValue={report.skin}/>
                                 </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.skin}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">C.N.S.</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="cns" onChange={onChange} defaultValue={report.cns}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.cns}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">EXTREMITIES</td>
                                <td className="text-center font-size black"
                                    colSpan={2}>
                                    <input type="text" className="form-control" name="extremities" onChange={onChange} defaultValue={report.extremities}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.extremities}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">PSYCHIATRY</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="psychiatry" onChange={onChange} defaultValue={report.psychiatry}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.psychiatry}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black" colSpan={5}>VENEREAL
                                    DISEASES
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">SYMPTOMS</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="symptoms" onChange={onChange} defaultValue={report.symptoms}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.symptoms}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black" colSpan={5}>X-RAY
                                    INVESTIGATION
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">CHEST X-RAY</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="chestXray" onChange={onChange} defaultValue={report.chestXray}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.chestXray}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">ECG</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="ecg" onChange={onChange} defaultValue={report.ecg}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.ecg}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black" colSpan={5}>DRUG TEST
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">THC</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="thc" onChange={onChange} defaultValue={report.thc}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.thc}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">MOP</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="mop" onChange={onChange} defaultValue={report.mop}/>
                                </td>
                                <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">AMP</td>
                                <td className="text-center font-size black" colSpan={2}>
                                    <input type="text" className="form-control" name="amp" onChange={onChange} defaultValue={report.amp}/>
                                </td>
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
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="sugar" onChange={onChange} defaultValue={report.sugar}/>
                                </td>
                                <td className="text-center font-size black">{refValue.sugar}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">ALBUMIN</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="albumin" onChange={onChange} defaultValue={report.albumin}/>
                               </td>
                                <td className="text-center font-size black">{refValue.albumin}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">BILHARZIASIS (IF ENDEMIC)</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="urineBilharziasis" onChange={onChange} defaultValue={report.urineBilharziasis}/>
                                </td>
                                <td className="text-center font-size black">{refValue.urineBilharziasis}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">PREGNANCY TEST</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="pregnancy" onChange={onChange} defaultValue={report.pregnancy}/>
                                </td>
                                <td className="text-center font-size black">{refValue.pregnancy}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">OTHERS</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="others" onChange={onChange} defaultValue={report.others}/>
                                </td>
                                <td className="text-center font-size black">{refValue.others}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black" colSpan={3}>STOOL R/E (IF
                                    REQUIRED)
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">HELMINTHS</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="helminths" onChange={onChange} defaultValue={report.helminths}/>
                                </td>
                                <td className="text-center font-size black">{refValue.helminths}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">GIARDIA</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="giardia" onChange={onChange} defaultValue={report.giardia}/>
                                </td>
                                <td className="text-center font-size black">{refValue.giardia}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">BILHARZIASIS (IF ENDEMIC)</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="stoolBilharziasis" onChange={onChange} defaultValue={report.stoolBilharziasis}/>
                                </td>
                                <td className="text-center font-size black">{refValue.stoolBilharziasis}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">CULTURE</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="culture" onChange={onChange} defaultValue={report.culture}/>
                                </td>
                                <td className="text-center font-size black">{refValue.culture}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black" colSpan={3}>BLOOD-CBC &
                                    GROUPING
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">MALARIA</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="malaria" onChange={onChange} defaultValue={report.malaria}/>
                                </td>
                                <td className="text-center font-size black">{refValue.malaria}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">MICROFILARIA</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="microfilaria" onChange={onChange} defaultValue={report.microfilaria}/>
                                </td>
                                <td className="text-center font-size black">{refValue.microfilaria}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">BLOOD GROUP</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="bloodGroup" onChange={onChange} defaultValue={report.bloodGroup}/>
                                </td>
                                <td className="text-center font-size black">{refValue.bloodGroup}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">HEMOGLOBIN</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="haemoglobin" onChange={onChange} defaultValue={report.haemoglobin}/>
                                </td>
                                <td className="text-center font-size black">{refValue.haemoglobin}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">ESR</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="esr" onChange={onChange} defaultValue={report.esr}/>
                                </td>
                                <td className="text-center font-size black">{refValue.esr}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black"
                                    colSpan={3}>BLOOD-BIOCHEMISTRY
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">R.B.S.</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="rbs" onChange={onChange} defaultValue={report.rbs}/>
                                </td>
                                <td className="text-center font-size black">{refValue.rbs}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">CREATININE</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="creatinine" onChange={onChange} defaultValue={report.creatinine}/>
                                </td>
                                <td className="text-center font-size black">{refValue.creatinine}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">T.BIL</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="tbil" onChange={onChange} defaultValue={report.tbil}/>
                                </td>
                                <td className="text-center font-size black">{refValue.tbil}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">SGPT</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="sgpt" onChange={onChange} defaultValue={report.sgpt}/>
                                </td>
                                <td className="text-center font-size black">{refValue.sgpt}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">SGOT</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="sgot" onChange={onChange} defaultValue={report.sgot}/>
                                </td>
                                <td className="text-center font-size black">{refValue.sgot}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">ALP</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="alp" onChange={onChange} defaultValue={report.alp}/>
                                </td>
                                <td className="text-center font-size black">{refValue.alp}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">UREA</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="urea" onChange={onChange} defaultValue={report.urea}/>
                                </td>
                                <td className="text-center font-size black">{refValue.urea}</td>
                            </tr>
                            <tr>
                                <td className="text-center font-weight-bolder font-size black" colSpan={3}>BLOOD-ELISA &
                                    SEROLOGY
                                </td>
                            </tr>
                            <tr>
                                <td className="font-size black">ANTI HCV</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="antiHcv" onChange={onChange} defaultValue={report.antiHcv}/>
                                </td>
                                <td className="text-center font-size black">{refValue.antiHcv}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">TPHA (IF VDRL POSITIVE)</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="tpha" onChange={onChange} defaultValue={report.tpha}/>
                                </td>
                                <td className="text-center font-size black">{refValue.tpha}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">VDRL</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="vdrl" onChange={onChange} defaultValue={report.vdrl}/>
                                </td>
                                <td className="text-center font-size black">{refValue.vdrl}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">HIV I & HIV II</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="hiv" onChange={onChange} defaultValue={report.hiv}/>
                                </td>
                                <td className="text-center font-size black">{refValue.hiv}</td>
                            </tr>
                            <tr>
                                <td className="font-size black">HB<small>S</small>AG</td>
                                <td className="text-center font-size black">
                                    <input type="text" className="form-control" name="hbsag" onChange={onChange} defaultValue={report.hbsag}/>
                                </td>
                                <td className="text-center font-size black">{refValue.hbsag}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h4 className="form-section">Doctor Remark</h4>
                <div className="row">
                    {FORM.PATIENT_FORM_EXTRA_FIELDS.map((input) => (
                        <FormField key={input.id} {...input} onChange={onChange} defaultValue={report[input.name]} />
                    ))}
                </div>
            </div>
            <div className="form-actions">
                <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
                    <i className="ft-x"></i> Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    <i className="ft-save"></i> Update &nbsp;
                    {isSaving?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                </button>
            </div>
        </form>
    );
}

export default ReportEditForm;
