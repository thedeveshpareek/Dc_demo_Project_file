import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (testReport:FormData) => {
    return http.post(API_ROUTES.REPORT_POST,
        testReport,
        { headers: {
                "Content-Type": "multipart/form-data",
            }});
};
const saveInvoice = async (invoice:FormData) => {
    return http.post(API_ROUTES.CONFIGURATION_INVOICE_POST,
        invoice,
        { headers: {
                "Content-Type": "multipart/form-data",
            }});
};

const find = async () => {
    return http.get(API_ROUTES.REPORT_GET);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.REPORT_ALL);
};

const ReportSettingsService = {
    save,
    find,
    findAll,
    saveInvoice,
}
export default ReportSettingsService;
