import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (category:{}) => {
    return http.post(API_ROUTES.ACCOUNT_TRANSFER_POST, category);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.ACCOUNT_TRANSFER_GET+id);
};

const getAll = async () => {
    return http.get(API_ROUTES.ACCOUNT_TRANSFER_ALL);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.ACCOUNT_TRANSFER_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.ACCOUNT_TRANSFER_GET+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.ACCOUNT_TRANSFER_ADVANCE_SEARCH,data);
};
const AccountTransferService = {
    save,
    getAll,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default AccountTransferService;
