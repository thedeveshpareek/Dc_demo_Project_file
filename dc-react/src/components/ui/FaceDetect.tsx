import React, {useEffect, useRef, useState} from 'react';
import AuthService from "../../services/AuthService";
function FaceDetect(props: any) {
    const {onSuccess} = props;
    const videoHeight = 300;
    const videoWidth = 300;
    const [initializing, setInitializing] = useState(false);
    const videoRef = useRef<any>();
    const canvasRef = useRef<any>();
    const [image, setImage] = useState('');
    const webcamRef = useRef<any>(null);

    const capture = React.useCallback(() => {
        let screenshot = webcamRef.current.getScreenshot();
        setImage(screenshot);
        AuthService.faceAuth(screenshot).then(response => {
            console.log(response.data);
        }).catch(reason => {
            console.log(reason.response.data);
        })
        onSuccess();
    }, [webcamRef]);

    const completeHandler = (e: any) => {
        onSuccess(image)
    }
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        }).then(stream => videoRef.current.srcObject = stream );
    }

    const handleVideoOnPlay = () => {
        // setInterval(() => {
        //     if (initializing) {
        //         setInitializing(false);
        //     }
        //     canvasRef.current.innerHTML = FaceApi.createCanvasFromMedia(videoRef.current);
        //     const displaySize = {
        //         width:videoWidth,
        //         height:videoHeight,
        //     }
        //     FaceApi.matchDimensions(canvasRef.current,displaySize);
        //     const detections:any = FaceApi.detectAllFaces(videoRef.current,new FaceApi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        //     const resizeDetections = FaceApi.resizeResults(detections,displaySize);
        //     canvasRef.current.getContext('2d').clearRect(0,0,videoWidth,videoHeight)
        //     FaceApi.draw.drawDetections(canvasRef.current,detections);
        //     FaceApi.draw.drawFaceLandmarks(canvasRef.current,detections);
        //     FaceApi.draw.drawFaceExpressions(canvasRef.current,detections);
        //     console.log(detections);
        // },100);
    }

    const loadModels = async () => {
        /*const MODEL_URL = process.env.PUBLIC_URL+'/assets/weights';
        setInitializing(true);
        Promise.all([
            FaceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            FaceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            FaceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            FaceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]).then(value => {
            startVideo();
        })*/
    }

    useEffect(() => {
        console.log('jshdajdsa');
        loadModels();
    },[])

    return (
        <div className={'row'}>
            <div className="col-12">
                <span>{initializing ? 'initializing':'ready'}</span>
                <div>
                    <video ref={videoRef} autoPlay={true} muted={true} height={videoHeight}  width={videoWidth} onPlay={handleVideoOnPlay}></video>
                    <canvas className={'bg-light'} ref={canvasRef}></canvas>
                </div>
                {/*<Webcam ref={webcamRef} audio={false} videoConstraints={videoConstraints} className={'w-100'}/>
                <button className={'btn btn-info rounded btn-block'} onClick={capture}>Capture photo</button>*/}
            </div>
        </div>
    );
}

export default FaceDetect;
