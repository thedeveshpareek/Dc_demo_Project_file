import React, {useEffect, useState} from 'react';
import BillService from "../../../services/BillService";
import FuncUtil from "../../../utils/FuncUtil";
import ExceptionUtil from "../../../utils/ExceptionUtil";
import AccountService from "../../../services/AccountService";

function PayBillComponent(props: any) {
    const {billId, onCancel, onSuccess} = props;
    const [bill, setBill] = useState<any>({
        id: 0,
        accountId: 0,
        testPrice: 0.0,
        amount: 0.0,
        paid: 0.0,
        due: 0.0,
        balance: 0.0,
    });
    const [progress, setProgress] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [message, setMessage] = useState("");
    const [accounts, setAccounts] = useState([{id: 0, name: ''}]);

    const payBill = () => {
        setProgress(true);
        let accountSelect = document.getElementById('accountId') as HTMLSelectElement;
        let accountId = parseInt(accountSelect?accountSelect.value:'0');
        BillService.pay({accountId: accountId, billId: bill.id, amount: bill.balance}).then((response) => {
            setBill(response.data);
            setProgress(false);
            setResponseCode(response.status);
            setMessage("Payment Added!");
            onSuccess(response.data);
        }).catch(reason => {
            setProgress(false);
            setResponseCode(reason.response.status);
            setMessage(reason.response.data.message);
            setTimeout(args => {
                setResponseCode(0)
            }, 3000);
        });
    };

    const handleChange = (e: any) => {
        setBill({...bill, [e.target.name]: e.target.value});
    }

    const loadBill = () => {
        BillService.findById(billId).then(response => {
            setBill(response.data);
            bill.balance = bill.due;
            loadAccounts();
        })
    }

    const loadAccounts = () => {
        AccountService.findAll().then((response) => {
            setAccounts(response.data);
            bill.accountId = accounts[0].id;
        })
    }

    useEffect(() => {
        loadBill();
    }, [])

    return (
        <section className="card  mb-0">
            <div id="invoice-template" className="card-body">
                {ExceptionUtil.handle(responseCode, message)}
                <div id="invoice-company-details" className="row">
                    <div className="col-md-6 col-sm-12 text-left text-md-left">
                        <p className="text-muted">Bill To</p>
                        <ul className="px-0 list-unstyled">
                            <li className="text-bold-700">{bill.patientName}</li>
                            <li>{bill.patientAddress}</li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-sm-12 text-center text-md-right">
                        <h2>INVOICE</h2>
                        <p>{bill.billNo}</p>
                        <p>{FuncUtil.toDate(bill.createdDate)}</p>
                    </div>
                </div>
                <div id="invoice-items-details" className="pt-2">
                    <div className="row">
                        <div className="table-responsive col-sm-12">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item &amp; Description</th>
                                    <th className="text-right">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>
                                        <p>{bill.testName}</p>
                                        <p className="text-muted">{bill.testDescription}</p>
                                    </td>
                                    <td className="text-right">{FuncUtil.toCurrency(bill.testPrice, 'BDT')}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <p className="lead">Payment Summery</p>
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td className="text-bold-800">Total</td>
                                        <td className="text-bold-800 text-right">{FuncUtil.toCurrency(bill.amount, 'BDT')}</td>
                                    </tr>
                                    <tr>
                                        <td>Payment Made</td>
                                        <td className="pink text-right">(-) {FuncUtil.toCurrency(bill.paid, 'BDT')}</td>
                                    </tr>
                                    <tr className="bg-grey bg-lighten-4">
                                        <td className="text-bold-800">Balance Due</td>
                                        <td className="text-bold-800 text-right">{FuncUtil.toCurrency(bill.due, 'BDT')}</td>
                                    </tr>
                                    <tr className="bg-grey bg-lighten-4">
                                        <td className="text-bold-800">Account</td>
                                        <td className="text-bold-800 text-right">
                                            <select className={"form-control"} name="accountId" id={'accountId'} onChange={handleChange}>
                                                {accounts.map((account: any) => (
                                                    <option value={account.id}>{account.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr className="bg-grey bg-lighten-4">
                                        <td className="text-bold-800">Paying Amount</td>
                                        <td className="text-bold-800 text-right">
                                            <input type="number" className="form-control text-right"
                                                   placeholder="Amount" name="balance"
                                                   defaultValue={bill.balance} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-group">
                                <button type="button"
                                        className="btn btn-primary btn-min-width box-shadow-1 pull-right mr-2"
                                        onClick={payBill} disabled={progress}>
                                    Pay Now
                                    {progress ? <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"></span> : ''}
                                </button>
                                <button type="button"
                                        className="btn btn-light btn-min-width box-shadow-1 pull-right mx-1"
                                        onClick={onCancel}>Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PayBillComponent;
