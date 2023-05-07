import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";


const upload = async (labReports:FormData) => {
    return http.post(API_ROUTES.LAB_REPORT_UPLOAD, labReports,{ headers: {"Content-Type": "multipart/form-data"}});
};
const save = async (category:{}) => {
    return http.post(API_ROUTES.LAB_REPORT_POST, category);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.LAB_REPORT_GET+id);
};

const getAll = async () => {
    return http.get(API_ROUTES.LAB_REPORT_ALL);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.LAB_REPORT_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.LAB_REPORT_GET+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.LAB_REPORT_ADVANCE_SEARCH,data);
};
const LabReportService = {
    upload,
    save,
    getAll,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default LabReportService;
