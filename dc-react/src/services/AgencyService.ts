import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (agency:{}) => {
    return http.post(API_ROUTES.AGENCY_POST, agency);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.AGENCY_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.AGENCY_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.AGENCY_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.AGENCY_ADVANCE_SEARCH,data);
};
const AgencyService = {
    save,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default AgencyService;
