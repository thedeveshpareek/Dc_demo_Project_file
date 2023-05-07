import React, {useRef, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import xray from "../../assets/images/pages/chest-xray.png";
import PatientService from "../../services/PatientService";

function XRayUpload(props: any) {
    const {patient,onSuccess} = props;
    const [image, setImage] = useState(xray);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");


    const completeHandler = (e: any) => {
        PatientService.uploadXrayById(patient.id,image).then((response) => {
            setIsSaved(true)
            setIsError(false);
            setMessage("X-Ray Successfully Uploaded!");
            setTimeout(args => {
                setIsSaved(false);
                onSuccess(image);
            }, 2000);
        }).catch(reason => {
            setIsError(true);
            setIsSaved(false);
            setMessage(reason.response.data.message);
            setTimeout(args => {
                setIsError(false);
            }, 2000);
        })

    }
    const maximumSize = 1 * 1024 * 1024 // 1 MegaBytes
    const imageSelectHandler = (e: any) => {
        const file = e.target.files[0];
        if (file.size > maximumSize) {
            alert('File size exceeds 1MB.');
            e.target.value = null; // Reset the input file
        }else{
            FuncUtil.base64(e.target.files[0]).then((value: any) => {
                setImage(value.base64);
            })
        }
    };

    return (
        <div className={'row'}>
            <div className="col-12 p-2 text-center">
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
                <img src={image} alt="captured" style={{maxHeight:250,height:'100%'}}/>
                <div className="button-group text-center mt-1">
                    <input type="file" className={'hidden'} onChange={imageSelectHandler} multiple={false}
                           accept={'.jpg,.png,.webp,.jpeg'} id={'xray-input'}/>
                    <button className={'btn btn-info width-200 btn-glow round mx-1'} onClick={() => {document.getElementById('xray-input')?.click();}}>
                        <i className="ft-camera font-medium-3 pt-1"> Upload X-Ray</i>
                    </button>
                    <button className={'btn btn-info width-200 btn-glow round mx-1'} onClick={completeHandler}>
                        <i className="ft-upload font-medium-3 pt-1"> Attach</i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default XRayUpload;
