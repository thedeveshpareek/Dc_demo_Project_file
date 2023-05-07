import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (expense:FormData) => {
    return http.put(API_ROUTES.EXPENSE_PUT, expense,{ headers: {"Content-Type": "multipart/form-data"}});
};
const update = async (expense:FormData) => {
    return http.post(API_ROUTES.EXPENSE_POST, expense,{ headers: {"Content-Type": "multipart/form-data"}});
};
const findById = async (id:bigint) => {
    return http.get(API_ROUTES.EXPENSE_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.EXPENSE_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.EXPENSE_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.EXPENSE_ADVANCE_SEARCH,data);
};
const ExpenseService = {
    save,
    update,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default ExpenseService;
