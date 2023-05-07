import React from 'react';
import Barcode from "react-barcode";

function BarcodeSticker(props: any) {
    const {patient,type,description,bNumber} = props;
    return (
        <div className={'card'} style={{width:'58mm'}}>
            <div className="card-content box-shadow-3">
                <div className="card-body">
                    <label>{patient.regNo}</label>
                    <label className={'text-center w-100'}>{bNumber}</label>
                    <Barcode value={patient.regNo ? patient.regNo : 'NA'} marginTop={1} displayValue={false}
                             width={2} height={50}/>
                    <label className={'text-center w-100'}>{type}</label>
                    <label className={'text-center w-100'}><small>{description}</small></label>
                </div>
            </div>
        </div>
    );
}

export default BarcodeSticker;
