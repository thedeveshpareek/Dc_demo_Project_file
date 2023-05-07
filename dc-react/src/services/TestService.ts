import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (test:{}) => {
    return http.post(API_ROUTES.TEST_POST, test);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.TEST_GET+id);
};

const findByPatient = async (id:any) => {
    return http.get(API_ROUTES.PATIENT_TEST_REPORT_GET.replace(':id',id));
};

const findAll = async () =>{
    return await http.get(API_ROUTES.TEST_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.TEST_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.TEST_ADVANCE_SEARCH,data);
};
const TestService = {
    save,
    findById,
    findByPatient,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default TestService;
