import React, {useEffect, useRef, useState} from 'react';
import finger from "../../assets/images/pages/finger.gif";
import FingerService from "../../services/FingerService";
import {FingerResponse} from "../../utils/Models";
function FingerDetect(props: any) {
    const {onSuccess,onCancel} = props;
    const [status, setStatus] = useState<FingerResponse>({
        status:'',
        message:'',
        imageEncoded:'',
        imagePath:'',
        url:'',
        finger:{
            id:0,
            imagePath:"",
            blob:"",
            userId:0
        },
    });
    const [image, setImage] = useState(finger);
    let intervalID:any = null;

    const verifyHandler = (e:any) => {
        intervalID = setInterval(updateStatus,2000);
        FingerService.verify().then(response => {
            let finger = response.data as FingerResponse;
            setStatus(finger);
            if (finger.status == "VERIFIED"){
                onSuccess(finger.url);
            }
            clearInterval(intervalID);
        }).catch(reason => {
            console.log(reason);
            clearInterval(intervalID)
        });
    }

    const scanHandler = (e:any) => {
        intervalID = setInterval(updateStatus,2000);
        FingerService.scan().then(response => {
            clearInterval(intervalID);
            setStatus(response.data);
            setImage(response.data.imageEncoded);
            onSuccess(response.data);
        }).catch(reason => {
            clearInterval(intervalID)
        });
    }

    const cancelHandler = (e:any) => {
        onCancel(e);
        clearInterval(intervalID);
    }

    const updateStatus = async () => {
        FingerService.status().then(response => {
            setStatus(response.data)
        })
    }

    const init = async () => {
        FingerService.init().then(response => {
            updateStatus();
        }).catch(reason => {
            console.log(reason);
        })
    }

    useEffect(() => {
        init();
    },[])

    return (
        <div className={'row'}>
            <div className="col-12">
                <h5>{status.message}</h5>
                <img src={image} alt="" className={'w-75'}/>
                <div className={"buttons-group"}>
                    {status.status == "READY" ?<button type="button" className="btn btn-sm btn-primary mr-1 box-shadow-1" onClick={scanHandler}>SCAN</button>:""}
                    {status.status == "READY" ?<button type="button" className="btn btn-sm btn-blue-grey mr-1 box-shadow-1" onClick={verifyHandler}>VERIFY</button>:""}
                    <button type="button" className="btn btn-sm btn-purple mr-1 box-shadow-1" onClick={cancelHandler}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}

export default FingerDetect;
