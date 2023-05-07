import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (role:{}) => {
    return http.post(API_ROUTES.ROLE_POST, role);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.ROLE_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.ROLE_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.ROLE_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.ROLE_ADVANCE_SEARCH,data);
};

const updatePermission = async (data:any) => {
    return http.put(API_ROUTES.ROLE_PERMISSION,data);
};
const RoleService = {
    save,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
    updatePermission,
}
export default RoleService;
