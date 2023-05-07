import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (supplier:{}) => {
    return http.post(API_ROUTES.SUPPLIER_POST, supplier);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.SUPPLIER_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.SUPPLIER_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.ACCOUNT_GET+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.ACCOUNT_ADVANCE_SEARCH,data);
};

const SupplierService = {
    save,
    findAll,
    findById,
    deleteById,
    findAllByAllColumn,
}
export default SupplierService;
