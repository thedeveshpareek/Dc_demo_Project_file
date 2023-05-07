import axios from "axios";
import {API_ROUTES, BASE_URL} from "../utils/constants";

const http = axios.create({
    baseURL: BASE_URL,
})
http.interceptors.request.use((config:any) => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
});
/*http.interceptors.response.use((response:any) => {
    return response;
}, (error:any) => {
    if (error.code == "ERR_NETWORK"){
        return Promise.reject(error);
    }else{
        if (error.response.status === 401) {
            return axios.get(API_ROUTES.REFRESH_TOKEN, {
                headers:{'Authorization': 'Bearer '+localStorage.getItem('refresh_token')}
            }).then(response => {
                localStorage.setItem('token', response.data.acceesToken);
                error.config.headers.Authorization = `Bearer ${response.data.acceesToken}`;
                return http(error.config);
            }).catch(refreshError => {
                return Promise.reject(error);
            });
        }
        return Promise.reject(error);
    }
});*/
export default http
