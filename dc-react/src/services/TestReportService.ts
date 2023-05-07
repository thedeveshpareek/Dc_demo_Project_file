import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (testReport:FormData) => {
    return http.post(API_ROUTES.TEST_REPORT_POST,
        testReport,
        { headers: {
            "Content-Type": "multipart/form-data",
        }});
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.TEST_REPORT_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.TEST_REPORT_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.TEST_REPORT_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.TEST_REPORT_ADVANCE_SEARCH,data);
};
const TestReportService = {
    save,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default TestReportService;
