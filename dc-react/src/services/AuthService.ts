import axios from "axios";
import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const login = (email: string, password: string) => {
    return axios.post(API_ROUTES.SIGN_IN, {email, password}).then((response) => {
        if (response.data.accessToken) {
            let user = response.data.user;
            let userString = JSON.stringify(user);
            let permissions = JSON.stringify(user.roles[0].privileges);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            localStorage.setItem("user", userString);
            localStorage.setItem("permissions", permissions);
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
};

const getCurrentUser = () =>{
    if (localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
};

const getCurrentUserFromServer = async () =>{
    return await http.get(API_ROUTES.GET_USER);
};

const isAuthenticate = () => {
    return localStorage.getItem('user') == null?false:true;
};
const getConfiguration = () => {
   return JSON.parse(localStorage.getItem('config') || '{}');
};

const getPermissions = () => {
    return JSON.parse(localStorage.getItem('permissions') || '[]');
};

const getSiteConfiguration = async() => {
    return http.get(API_ROUTES.CONFIGURATION);
};
const updateConfiguration = (param:string,value:any,config:any) => {
    config[param] = value;
    localStorage.setItem('config',JSON.stringify(config));
};
const faceAuth = async (image:string) => {
    return http.post(API_ROUTES.FACE_AUTH,{face:image});
};
const hasPermission = (menuItem:any) => {
    let permissions:any = getPermissions();
    if (menuItem.page && menuItem.permission) {
        let permission = permissions.filter((item:any) => item.permission == menuItem.page);
        if (permission.length>0){
            return permission[0][menuItem.permission];
        }else{
            return false;
        }
    }
    return false;
};

const permit = (page:string,field:string) => {
    let permissions:any = getPermissions();
    if (page && field) {
        let permission = permissions.filter((item:any) => item.permission == page);
        if (permission.length>0){
            return permission[0][field];
        }else{
            return false;
        }
    }
    return false;
};

const getPermission = (page:string) => {
    let permissions:any = getPermissions();
    let permission = permissions.filter((item:any) => item.permission == page);
    return permission[0] as Permission;
};

const update = (user:any) => {
    let userString = JSON.stringify(user);
    let permissions = JSON.stringify(user.roles[0].privileges);
    localStorage.setItem("user", userString);
    localStorage.setItem("permissions", permissions);
};

const updatePassword = async (data:any) => {
    return http.post(API_ROUTES.UPDATE_PASSWORD,data);
};

interface Permission {
    id: number;
    roleId:number;
    permission:string;
    list:true;
    view:true;
    create:true;
    edit:boolean;
    remove:boolean;
    pay:boolean;
}

const AuthService = {
    login,
    logout,
    getCurrentUser,
    isAuthenticate,
    getConfiguration,
    getSiteConfiguration,
    updateConfiguration,
    getCurrentUserFromServer,
    faceAuth,
    getPermissions,
    hasPermission,
    update,
    permit,
    getPermission,
    updatePassword,
}
export default AuthService;
