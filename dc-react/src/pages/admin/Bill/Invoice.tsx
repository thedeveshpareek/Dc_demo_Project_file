import React, {useEffect, useState} from 'react';
import BillService from "../../../services/BillService";
import FuncUtil from "../../../utils/FuncUtil";
import ReactToPrint from "react-to-print";
import AuthService from "../../../services/AuthService";
import PatientService from "../../../services/PatientService";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import PriceUtil from "../../../utils/PriceUtil";
import PayBillComponent from "./PayBillComponent";

function Invoice(props: any) {
    const {billId} = props;
    const configuration = AuthService.getConfiguration();
    const permission = AuthService.getPermission('PATIENT_BILL');
    const [patient,setPatient] = useState<any>({});
    const [action, setAction] = useState('none');
    const [bill, setBill] = useState<any>({
        testPrice: 0.0,
        amount: 0.0,
        paid: 0.0,
        due: 0.0,
        qr: '',
    });

    const payHandler = (e: any) => {
        setAction('pay');
    }

    const loadBill = () => {
        BillService.findById(billId).then(response => {
            setBill(response.data);
            loadPatient(response.data.patientId);
        })
    };
    const loadPatient = (patientId:number) => {
        PatientService.findById(patientId).then(response => {
            setPatient(response.data);
        })
    };

    const cancelHandler = (e: any) => {
        setAction('none');
    }

    const successHandler = (e: any) => {
        setAction('none');
        loadBill();
    }

    useEffect(() => {
        loadBill();
    },[]);


    return (
        <>
        <section className="card">
            <div className="row">
                <div className="col-12">
                    <ReactToPrint documentTitle={patient.passportNo} content={()=>document.getElementById('invoice-template')} trigger={()=><button className="btn btn-info pull-right m-1 width-100">Print</button>}/>
                    {bill.status !== 'PAID' && permission.pay?<button type="button" className="btn btn-primary btn-min-width pull-right m-1 mb-1" onClick={payHandler}>Pay</button>:''}
                </div>
            </div>
            <div id="invoice-template" className="card-body invoice-template">
                <div className="row">
                    <div className="col-3 text-center">
                        <ul className="px-0 list-unstyled">
                            <li><span>Passport No : {patient.passportNo}</span></li>
                            <li><Barcode value={patient.regNo} marginTop={5} displayValue={false} width={2} height={50}/></li>
                            <li><span>REG DATE <br/>{FuncUtil.toDateTime(patient.createdDate)}</span></li>
                        </ul>
                    </div>
                    <div className="col-2 text-center">
                        <ul className="px-0 list-unstyled">
                            <li><img src={patient.photo} alt="" height={150}/></li>
                        </ul>
                    </div>
                    <div className="col-7 text-center">
                        <ul className="px-0 list-unstyled text-center">
                            <li><img src={configuration.invoiceLogo} alt="company logo mr-1" className="mb-0" height={110}/></li>
                            <li className={'font-weight-bolder'}><span>{configuration.businessName}</span></li>
                            <li><span>{configuration.invoiceAddress}</span></li>
                            <li><span>Contact : {configuration.invoiceContactNumber}</span> <span>Email : {configuration.invoiceEmail}</span></li>
                            <li>Website: {configuration.websiteUrl} Report Download: {configuration.reportUrl}</li>
                        </ul>
                    </div>
                    {/*<div className="col-2" style={{textAlign:'center'}}>
                        <img src={configuration.invoiceLogo} alt="company logo mr-1" className="mb-0" height={120}/>
                    </div>*/}
                </div>
                <table className={'w-100 font-weight-bolder invoice'} style={{width:'100%'}}>
                    <tr>
                        <td className={'text-center bg-light font-weight-bolder'} style={{height:25,fontSize:25}} colSpan={4}>INVOICE</td>
                    </tr>
                    <tr><td className={'w-25'}>NAME</td><td className={'w-25'}>{patient.fullName}</td>
                        <td className={'w-25'}>BILL NO</td><td>{bill.billNo}</td>
                    </tr>
                    <tr><td>GENDER</td><td>{patient.gender}</td><td>PATIENT ID</td><td>{bill.regNo}</td></tr>
                    <tr><td>DATE OF BIRTH</td><td>{patient.dateOfBirth?FuncUtil.toDate(patient.dateOfBirth):''}</td><td>TRAVELLING TO</td><td>{patient.travelingTo}</td></tr>
                    <tr><td>PASSPORT NO</td><td>{patient.passportNo}</td><td>REPORT DELIVERY DATE</td><td>{patient.expiredDate?FuncUtil.toDate(patient.deliveryDate):""}</td></tr>
                    <tr><td>MOBILE NUMBER</td><td>{patient.mobile}</td><td>NAME OF AGENCY / AGENCY</td><td>{bill.agentOrAgencyName}</td></tr>
                </table>
                <div className="row mt-2">
                    <div className="col-md-6 col-sm-12 text-center">
                        <QRCode size={120} className={'qr-image'} value={bill.qr}/>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <table className="table pull-right bill-total">
                            <tbody>
                            <tr>
                                <td className={'text-center h5 p-0 m-0'} colSpan={2}>Bill Summery</td>
                            </tr>
                            <tr>
                                <td className="text-bold-800 m-0">Total</td>
                                <td className="text-bold-800 text-right m-0">{FuncUtil.toCurrency(bill.amount, 'BDT')}</td>
                            </tr>
                            <tr>
                                <td>Payment Made</td>
                                <td className="pink text-right">(-) {FuncUtil.toCurrency(bill.paid, 'BDT')}</td>
                            </tr>
                            <tr className="bg-grey bg-lighten-4">
                                <td className="text-bold-800">Balance Due</td>
                                <td className="text-bold-800 text-right">{FuncUtil.toCurrency(bill.due, 'BDT')}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <span>Total Paid : {PriceUtil.toWord(bill.paid)}</span>
                        <span className={'pull-right'}>Received by : {bill.paidBy}</span>
                    </div>
                </div>
                <table className={'w-100 text-center mt-1 bill-footer'}>
                    <tr>
                        <td>PHYSICIAN <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td>BLOOD <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td>URINE <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td>X RAY <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td>STOOL <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                    </tr>
                </table>
                <div className={'w-100 text-center'}>------------------------------------------------------------------------------------------------------------------------------------------------------</div>
                <div className="row">
                    <div className="col-3 text-center">
                        <ul className="px-0 list-unstyled">
                            <li><span>Passport No : {patient.passportNo}</span></li>
                            <li><Barcode value={patient.regNo} marginTop={5} displayValue={false} width={2} height={50}/></li>
                            <li><span>REG DATE <br/>{FuncUtil.toDateTime(patient.createdDate)}</span></li>
                        </ul>
                    </div>
                    <div className="col-2 text-center">
                        <ul className="px-0 list-unstyled">
                            <li><img src={patient.photo} alt="" height={150}/></li>
                        </ul>
                    </div>
                    <div className="col-7 text-center">
                        <ul className="px-0 list-unstyled text-center">
                            <li><img src={configuration.invoiceLogo} alt="company logo mr-1" className="mb-0" height={110}/></li>
                            <li className={'font-weight-bolder'}><span>{configuration.businessName}</span></li>
                            <li><span>{configuration.invoiceAddress}</span></li>
                            <li><span>Contact : {configuration.invoiceContactNumber}</span> <span>Email : {configuration.invoiceEmail}</span></li>
                            <li>Website: {configuration.websiteUrl} Report Download: {configuration.reportUrl}</li>
                        </ul>
                    </div>
                    {/*<div className="col-2" style={{textAlign:'center'}}>
                        <img src={configuration.invoiceLogo} alt="company logo mr-1" className="mb-0" height={120}/>
                    </div>*/}
                </div>
                <table className={'w-100 font-weight-bolder invoice'} style={{width:'100%'}}>
                    <tr>
                        <td className={'text-center bg-light font-weight-bolder'} style={{height:25,fontSize:25}} colSpan={4}>INVOICE</td>
                    </tr>
                    <tr><td className={'w-25'}>NAME</td><td className={'w-25'}>{patient.fullName}</td>
                        <td className={'w-25'}>BILL NO</td><td>{bill.billNo}</td>
                    </tr>
                    <tr><td>GENDER</td><td>{patient.gender}</td><td>PATIENT ID</td><td>{bill.regNo}</td></tr>
                    <tr><td>DATE OF BIRTH</td><td>{patient.dateOfBirth?FuncUtil.toDate(patient.dateOfBirth):''}</td><td>TRAVELLING TO</td><td>{patient.travelingTo}</td></tr>
                    <tr><td>PASSPORT NO</td><td>{patient.passportNo}</td><td>REPORT DELIVERY DATE</td><td>{patient.expiredDate?FuncUtil.toDate(patient.deliveryDate):""}</td></tr>
                    <tr><td>MOBILE NUMBER</td><td>{patient.mobile}</td><td>NAME OF AGENCY / AGENCY</td><td>{bill.agentOrAgencyName}</td></tr>
                </table>
                <div className="row mt-2">
                    <div className="col-md-6 col-sm-12 text-center">
                        <QRCode size={120} className={'qr-image'} value={bill.qr}/>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <table className="table pull-right bill-total">
                            <tbody>
                            <tr>
                                <td className={'text-center h5 p-0 m-0'} colSpan={2}>Bill Summery</td>
                            </tr>
                            <tr>
                                <td className="text-bold-800 m-0">Total</td>
                                <td className="text-bold-800 text-right m-0">{FuncUtil.toCurrency(bill.amount, 'BDT')}</td>
                            </tr>
                            <tr>
                                <td>Payment Made</td>
                                <td className="pink text-right">(-) {FuncUtil.toCurrency(bill.paid, 'BDT')}</td>
                            </tr>
                            <tr className="bg-grey bg-lighten-4">
                                <td className="text-bold-800">Balance Due</td>
                                <td className="text-bold-800 text-right">{FuncUtil.toCurrency(bill.due, 'BDT')}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <span>Total Paid : {PriceUtil.toWord(bill.paid)}</span>
                        <span className={'pull-right'}>Received by : {bill.paidBy}</span>
                    </div>
                </div>
                <table className={'w-100 text-center mt-1 bill-footer'}>
                    <tr>
                        <td>PHYSICIAN <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td>BLOOD <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td>URINE <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td>X RAY <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td>STOOL <span className={'border-black border-2 round'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                    </tr>
                </table>
            </div>
        </section>
            {
                action === 'pay' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-85">
                                    <PayBillComponent billId={bill.id} onCancel={cancelHandler} onSuccess={successHandler}/>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
        </>
    );
}
export default Invoice;
