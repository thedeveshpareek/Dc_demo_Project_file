import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (testReport:FormData) => {
    return http.post(API_ROUTES.BUSINESS_POST,
        testReport,
        { headers: {
                "Content-Type": "multipart/form-data",
            }});
};

const find = async () => {
    return http.get(API_ROUTES.BUSINESS_GET);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.BUSINESS_ALL);
};

const BusinessSettingsService = {
    save,
    find,
    findAll,
}
export default BusinessSettingsService;
