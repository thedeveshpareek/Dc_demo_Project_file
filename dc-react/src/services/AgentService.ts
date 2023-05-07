import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (agent:{}) => {
    return http.post(API_ROUTES.AGENT_POST, agent);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.AGENT_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.AGENT_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.AGENT_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.AGENT_ADVANCE_SEARCH,data);
};
const AgentService = {
    save,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
}
export default AgentService;
