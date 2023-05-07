import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (packages:{}) => {
    return http.put(API_ROUTES.PACKAGE_POST, packages);
};

const update = async (packages:{}) => {
    return http.post(API_ROUTES.PACKAGE_POST, packages);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.PACKAGE_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.PACKAGE_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.PACKAGE_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.PACKAGE_ADVANCE_SEARCH,data);
};
const PackageService = {
    save,
    update,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default PackageService;
