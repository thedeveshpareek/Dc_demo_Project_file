import http from "../config/httpConfig";

export const BASE_HOST = 'http://127.0.0.1:8082/finger';
const init = async () => {
    return http.get(`${BASE_HOST}/init`);
};

const status = async () => {
    return http.get(`${BASE_HOST}/status`);
};
const scan = async () => {
    return http.get(`${BASE_HOST}/scan`);
};

const verify = async () => {
    return http.get(`${BASE_HOST}/verify`);
};

const register = async () => {
    return http.get(`${BASE_HOST}/register`);
};
const FingerService = {
    init,
    status,
    scan,
    verify,
    register,
}
export default FingerService;
