import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const findBetweenDate = async (data:any) => {
    return http.post(API_ROUTES.DASHBOARD_METRICS_BETWEEN_DATE,data);
};

const getCashierSummaries = async (data:any) => {
    return http.post(API_ROUTES.DASHBOARD_CASHIER_SUMMARIES,data);
};
const DashboardService = {
    findBetweenDate,
    getCashierSummaries,
}
export default DashboardService;
