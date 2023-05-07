import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (user:{}) => {
    return http.put(API_ROUTES.USER_PUT, user);
};

const update = async (user:{}) => {
    return http.post(API_ROUTES.USER_POST, user);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.USER_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.USER_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.USER_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.USER_ADVANCE_SEARCH,data);
};
const UserService = {
    save,
    update,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default UserService;
