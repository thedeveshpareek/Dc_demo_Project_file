import React, {useState} from "react";
import Cropper from "react-easy-crop";

function ImageCropper(props: any) {
    const {image, onCropDone, onCropCancel} = props;
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio] = useState(1);

    const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: any) => {
        setCroppedArea(croppedAreaPixels);
    };

    const cropDoneHandler = (area:any) => {
        const canvasEle = document.createElement("canvas");
        canvasEle.width = area.width;
        canvasEle.height = area.height;
        const context = canvasEle.getContext("2d");
        let imageObj1 = new Image();
        imageObj1.src = image;
        imageObj1.onload = function () {
            context?.drawImage(
                imageObj1,
                area.x,
                area.y,
                area.width,
                area.height,
                0,
                0,
                area.width,
                area.height
            );
            const dataURL = canvasEle.toDataURL("image/jpeg");
            onCropDone(dataURL);
        };
    };

    return (
        <div className="container">
            <div className={'row'}>
                <div className="col-12" style={{minHeight:450}}>
                    <Cropper
                        image={image}
                        aspect={aspectRatio}
                        crop={crop}
                        zoom={zoom}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        style={{
                            containerStyle: {
                                width: '100%',
                                minHeight: "400px",
                                backgroundColor: "#fff",
                            },
                        }}
                    />
                </div>
                <div className="col-12 pt-1">
                    <div className="button-group text-center mt-1">
                        <button className="btn btn-info width-200 btn-glow round mx-1"
                                onClick={onCropCancel}>Cancel</button>
                        <button className="btn btn-info width-200 btn-glow round mx-1"
                                onClick={() => {cropDoneHandler(croppedArea);}}>Done</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ImageCropper;
