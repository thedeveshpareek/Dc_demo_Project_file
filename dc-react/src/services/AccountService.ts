import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (category:{}) => {
    return http.post(API_ROUTES.ACCOUNT_POST, category);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.ACCOUNT_GET+id);
};

const getAll = async () => {
    return http.get(API_ROUTES.ACCOUNT_ALL);
};

const getAccountBalance = async () => {
    return http.get(API_ROUTES.ACCOUNT_BALANCE);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.ACCOUNT_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.ACCOUNT_GET+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.ACCOUNT_ADVANCE_SEARCH,data);
};
const AccountService = {
    save,
    getAll,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
    getAccountBalance,
}
export default AccountService;
