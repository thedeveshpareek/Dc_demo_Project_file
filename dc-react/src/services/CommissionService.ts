import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (commission:{}) => {
    return http.post(API_ROUTES.COMMISSION_POST, commission);
};

const findById = async (id:any) => {
    return http.get(API_ROUTES.COMMISSION_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.COMMISSION_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.COMMISSION_DELETE+id);
};

const findAllByAgent = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.COMMISSION_AGENT_ADVANCE_SEARCH,data);
};

const findAllByAgency = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.COMMISSION_AGENCY_ADVANCE_SEARCH,data);
};

const pay = async (data:{data: number[],accountId:number}) => {
    return http.post(API_ROUTES.COMMISSION_PAY_ALL,data);
};

const summery = async (id:number) => {
    return http.get(API_ROUTES.COMMISSION_SUMMERY.replace(':ID',id.toString()));
};

const CommissionService = {
    save,
    findById,
    findAll,
    deleteById,
    findAllByAgent,
    findAllByAgency,
    pay,
    summery,
}
export default CommissionService;
