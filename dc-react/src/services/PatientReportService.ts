import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (patient:{}) => {
    return http.post(API_ROUTES.PATIENT_REPORT_VALUES_POST, patient);
};

const findById = async (id:any) => {
    return http.get(API_ROUTES.PATIENT_REPORT_VALUES_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.PATIENT_REPORT_VALUES_ALL);
};

const PatientReportService = {
    save,
    findById,
    findAll,
}
export default PatientReportService;
