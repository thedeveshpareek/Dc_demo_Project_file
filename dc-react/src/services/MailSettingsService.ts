import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (mail:{}) => {
    return http.post(API_ROUTES.MAIL_POST, mail);
};

const find = async () => {
    return http.get(API_ROUTES.MAIL_GET);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.MAIL_ALL);
};

const MailSettingsService = {
    save,
    find,
    findAll,
}
export default MailSettingsService;
