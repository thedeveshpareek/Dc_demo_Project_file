import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (purchase:FormData) => {
    return http.put(API_ROUTES.PURCHASE_POST,
        purchase,
        { headers: {
                "Content-Type": "multipart/form-data",
            }});
};

const update = async (purchase:FormData) => {
    return http.post(API_ROUTES.PURCHASE_POST,purchase,{ headers: {"Content-Type": "multipart/form-data"}});
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.PURCHASE_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.PURCHASE_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.PURCHASE_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.PURCHASE_ADVANCE_SEARCH,data);
};
const PurchaseService = {
    save,
    update,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default PurchaseService;
