import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (packages:{}) => {
    return http.post(API_ROUTES.PACKAGE_ITEM_POST, packages);
};

const update = async (packages:{}) => {
    return http.post(API_ROUTES.PACKAGE_ITEM_POST, packages);
};

const findById = async (id:bigint) => {
    return http.get(API_ROUTES.PACKAGE_ITEM_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.PACKAGE_ITEM_ALL);
};
const findAllByPackageId = async (id:any) =>{
    return await http.get(API_ROUTES.PACKAGE_ITEM_BY_PACKAGE+id);
};

const deleteByPackageAndTest = async (packageId:any,testId:any) => {
    return http.delete(API_ROUTES.PACKAGE_ITEM_DELETE+packageId+'/'+testId);
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.PACKAGE_ITEM_DELETE+id);
};
const PackageItemService = {
    save,
    update,
    findById,
    findAll,
    deleteById,
    findAllByPackageId,
    deleteByPackageAndTest,
}
export default PackageItemService;
