import React, {useRef, useState} from 'react';
import Webcam from 'react-webcam';
import ImageCropper from "./ImageCropper";

function CameraWithCropper(props: any) {
    const {onSuccess} = props;
    const [image, setImage] = useState(null);
    const [action, setAction] = useState('camera');
    const webcamRef = useRef<any>(null);

    const capture = React.useCallback(() => {
        setImage(webcamRef.current.getScreenshot());
        setAction("done");
    }, [webcamRef]);

    const completeHandler = (e: any) => {
        onSuccess(image)
    }

    const cropDoneHandler = (cropped:any) => {
        setImage(cropped);
        setAction("done");
    }

    const retakeHandler = (e: any) => {
        setAction("camera");
        setImage(null);
    }
    const cropHandler = (e: any) => {
        setAction("crop");
    }

    const cropCancelHandler = (e: any) => {
        setAction("done");
    }


    if (action == 'camera') {
        return (
            <div className={'row'}>
                <div className="col-12">
                    <Webcam ref={webcamRef} className={'w-100'}/>
                    <button className={'btn btn-info rounded btn-block'} onClick={capture}>Capture photo</button>
                </div>
            </div>
        );
    } else if (action == 'crop') {
        return (
            <div className={'row'}>
                <div className="col-12">
                    <ImageCropper image={image} onCropDone={cropDoneHandler} onCropCancel={cropCancelHandler}/>
                </div>
            </div>
        );
    } else {
        return (
            <div className={'row'}>
                <div className="col-12">
                    {image ? <img src={image} alt="captured" className={'w-100'}/> : ""}
                    <div className="button-group text-center mt-1">
                        <button className={'btn btn-info width-200 btn-glow round mx-1'} onClick={retakeHandler}>
                            <i className="ft-camera font-medium-3 pt-1"> Retake</i>
                        </button>
                        <button className={'btn btn-info width-200 btn-glow round mx-1'} onClick={cropHandler}>
                            <i className="ft-crop font-medium-3 pt-1"> Crop</i>
                        </button>
                        <button className={'btn btn-info width-200 btn-glow round mx-1'} onClick={completeHandler}>
                            <i className="ft-upload font-medium-3 pt-1"> Attach</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CameraWithCropper;
