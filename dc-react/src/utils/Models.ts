export interface FingerResponse{
    status:string,
    message:string,
    imageEncoded:string,
    imagePath:string,
    url:string,
    finger:{
        id:number,
        imagePath:string,
        blob:string,
        userId:number
    }
}
