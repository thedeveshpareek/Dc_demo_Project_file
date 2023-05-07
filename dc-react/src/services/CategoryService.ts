import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (category:{}) => {
    return http.post(API_ROUTES.CATEGORY_POST, category);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.CATEGORY_GET+id);
};

const getCategory = async () => {
    return http.get(API_ROUTES.MAIN_CATEGORY_GET);
};

const getSubCategory = async () => {
    return http.get(API_ROUTES.SUB_CATEGORY_GET);
};

const getSubCategoryById = async (id: any) => {
    return http.get(API_ROUTES.SUB_CATEGORY_BY_ID_GET.replace(':id', id));
};

const findAll = async () =>{
    return await http.get(API_ROUTES.CATEGORY_ALL);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.CATEGORY_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.CATEGORY_ADVANCE_SEARCH,data);
};
const CategoryService = {
    save,
    findById,
    findAll,
    deleteById,
    findAllByAllColumn,
    getCategory,
    getSubCategory,
    getSubCategoryById
}
export default CategoryService;
