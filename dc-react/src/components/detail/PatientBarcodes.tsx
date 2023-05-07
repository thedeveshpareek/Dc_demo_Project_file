import React from 'react';
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import BarcodeSticker from "../ui/BarcodeSticker";

function PatientBarcodes(props: any) {
    const {patient} = props;
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

    return (
        <div className="card">
            <div className="card-content collapse show">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <ReactToPrint
                                pageStyle={pageStyle}
                                documentTitle={patient.passportNo}
                                content={() => document.getElementById('barcodes-content')}
                                trigger={() => <button className="btn btn-info">Print</button>}/>
                        </div>
                    </div>
                    <div id={'barcodes-content'}>
                        <BarcodeSticker patient={patient} type={'STOOL'} description={'HEL,M,GMR'} bNumber={'230321011'}/>
                        <BarcodeSticker patient={patient} type={'URINE'} description={'SUGAR,AL,BILHA,ETC'} bNumber={'230321011'}/>
                        <BarcodeSticker patient={patient} type={'BLOOD-CBC'} description={'HGB,BGROUP,MP,MFP'} bNumber={'230321011'}/>
                        <BarcodeSticker patient={patient} type={'BLOOD-ELISA'} description={'HCV,HIV,HBsAG'} bNumber={'230321011'}/>
                        <BarcodeSticker patient={patient} type={'BLOOD-BIOCHEMISTRY'} description={'GLUC,TBIL,SGPT,SGOT,CREA'} bNumber={'230321011'}/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PatientBarcodes;
