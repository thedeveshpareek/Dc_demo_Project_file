import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.BILL_PAYMENT_ADVANCE_SEARCH,data);
};

const BillPaymentService = {
    findAllByAllColumn,
}
export default BillPaymentService;
