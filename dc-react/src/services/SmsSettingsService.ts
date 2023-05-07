import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (sms:{}) => {
    return http.post(API_ROUTES.SMS_POST, sms);
};

const find = async () => {
    return http.get(API_ROUTES.SMS_GET);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.SMS_ALL);
};

const SmsSettingsService = {
    save,
    find,
    findAll,
}
export default SmsSettingsService;
