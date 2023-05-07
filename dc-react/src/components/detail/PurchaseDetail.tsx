import React, {useEffect, useState} from 'react';
import moment from "moment";
function PurchaseDetail(props: any) {
    const {purchase,...properties} = props;
    const [record,setRecord] = useState({
        id: "",
        supplierName: "",
        refNo: "",
        purchaseDate: "",
        status: "",
        attachment: "",
        totalAmount: 0.0,
        note: "",
    });
    const [loaded,setLoaded] = useState(false);
    useEffect(() => {
        if (loaded==false){
            setRecord(purchase);
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
                                        <p className="bg-info pl-1 font-weight-bold white">Purchase Info</p>
                                        <h5 className={"mb-1"}><strong>Supplier :</strong> {record.supplierName}</h5>
                                        <h5 className={"mb-1"}><strong>Reference No :</strong> {record.refNo}</h5>
                                        <h5 className={"mb-1"}><strong>Purchase Date :</strong> {moment(record.purchaseDate).format('YYYY-MM-DD')}</h5>
                                        <h5 className={"mb-1"}><strong>Purchase Status :</strong> {record.status}</h5>
                                        <h5 className={"mb-1"}><strong>Total Amount :</strong> {record.totalAmount}</h5>
                                        <h5 className={"mb-1"}><strong>Note :</strong> {record.note}</h5>
                                        <div className="col-md-12">
                                            { record.attachment?.endsWith(".pdf")?
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
            </div>
        </>
    );
}

export default PurchaseDetail;
