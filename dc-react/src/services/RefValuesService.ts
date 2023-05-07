import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (ref:{}) => {
    return http.post(API_ROUTES.REF_VALUES_POST, ref);
};

const find = async () => {
    return http.get(API_ROUTES.REF_VALUES_GET);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.REF_VALUES_ALL);
};

const RefValuesService = {
    save,
    find,
    findAll,
}
export default RefValuesService;
