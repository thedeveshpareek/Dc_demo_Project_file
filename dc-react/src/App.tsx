import React from 'react';
import './App.css';
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import {Routes, Route} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import PageNotFound from "./pages/error/PageNotFound";
import AddUser from "./pages/admin/User/AddUser";
import UserList from    "./pages/admin/User/UserList";
import PatientList from "./pages/admin/Patient/PatientList";
import AddPatient from "./pages/admin/Patient/AddPatient";
import PatientBills from "./pages/admin/Bill/PatientBillList";
import AgentBillList from "./pages/admin/Bill/AgentBillList";
import AllTest from "./pages/admin/TestList/TestList";
import AddTest from "./pages/admin/TestList/AddTest";
import TestReports from "./pages/admin/TestList/TestReports";
import PackageList from "./pages/admin/PackageList/PackageList";
import AddPackage from "./pages/admin/PackageList/AddPackage";
import AgentList from "./pages/admin/Agent/AgentList";
import AddAgent from "./pages/admin/Agent/AddAgent";
import AgentCommissionList from "./pages/admin/Agent/AgentCommissionList";
import AgencyList from "./pages/admin/Agency/AgencyList";
import AgencyCommissionList from "./pages/admin/Agency/AgencyCommissionList";
import AddAgency from "./pages/admin/Agency/AddAgency";
import AgencyBillList from "./pages/admin/Bill/AgencyBillList";
import NoPermission from "./pages/error/NoPermission";
import UnderMaintenance from "./pages/error/UnderMaintenance";
import AddTestReport from "./pages/admin/TestList/AddTestReport";
import PatientReport from "./pages/admin/Patient/PatientReport";
import RefValues from "./pages/admin/Settings/RefValues";
import PatientReportPrint from "./pages/admin/Patient/PatientReportPrint";
import AddExpense from "./pages/admin/Expense/AddExpense";
import AddPurchase from "./pages/admin/Purchase/AddPurchase";
import PurchaseList from "./pages/admin/Purchase/PurchaseList";
import ExpenseList from "./pages/admin/Expense/ExpenseList";
import PatientProfile from "./pages/admin/Patient/PatientProfile";
import SystemSettings from "./pages/admin/Settings/SystemSettings";
import ReportSearch from "./pages/ReportSearch";
import LostProfitReport from "./pages/admin/Report/LostProfitReport";
import AccountList from "./pages/admin/Account/AccountList";
import UserRoleList from "./pages/admin/User/UserRoleList";
import UserProfile from "./pages/admin/User/UserProfile";
import CashierReport from "./pages/admin/Report/CashierReport";
import AccountTransferList from "./pages/admin/Account/AccountTransferList";

import "./assets/css/style.css";
import SupplierList from "./pages/admin/Supplier/SupplierList";
import EditableBillsList from "./pages/admin/Bill/EditableBillsList";
import LabReports from "./pages/admin/LabReport/LabReports";

function App() {
    return (
        <Routes key={'r-1'}>
            <Route key={'r-1'} path="/" element={<ReportSearch/>}/>
            <Route key={'public-routs'} element={<DefaultLayout/>}>
                <Route key={'pl-r-1'} path="/login" element={<Login/>}/>
            </Route>
            <Route key={'private-routs'} element={<AdminLayout/>}>
                <Route key={'pt-r-1'} path="*" element={<PageNotFound/>}/>
                <Route key={'pt-r-2'} path="/unauthorized" element={<NoPermission/>}/>
                <Route key={'pt-r-3'} path="/maintenance" element={<UnderMaintenance/>}/>
                <Route key={'pt-r-4'} path="/dashboard" element={<Dashboard/>}/>
                <Route key={'pt-r-5'} path={'/users'} element={<UserList/>}/>
                <Route key={'pt-r-6'} path={'/users/create'} element={<AddUser/>}/>
                <Route key={'pt-r-7'} path={'/settings'} element={<SystemSettings/>}/>
                <Route key={'pt-r-8'} path={'/user/create'} element={<AddUser/>}/>
                <Route key={'pt-r-9'} path={'/patients'} element={<PatientList/>}/>
                <Route key={'pt-r-10'} path={'/patients/:id'} element={<PatientProfile/>}/>
                <Route key={'pt-r-11'} path={'/patients/create'} element={<AddPatient/>}/>
                <Route key={'pt-r-12'} path={'/patients/:id/report'} element={<PatientReport/>}/>
                <Route key={'pt-r-13'} path={'/bills/patient'} element={<PatientBills/>}/>
                <Route key={'pt-r-14'} path={'/bills/agent'} element={<AgentBillList/>}/>
                <Route key={'pt-r-15'} path={'/bills/agency'} element={<AgencyBillList/>}/>
                <Route key={'pt-r-16'} path={'/tests'} element={<AllTest/>}/>
                <Route key={'pt-r-17'} path={'/tests/create'} element={<AddTest/>}/>
                <Route key={'pt-r-18'} path={'/tests/report'} element={<TestReports/>}/>
                <Route key={'pt-r-19'} path={'/tests/report/create'} element={<AddTestReport/>}/>
                <Route key={'pt-r-20'} path={'/packages'} element={<PackageList/>}/>
                <Route key={'pt-r-21'} path={'/packages/create'} element={<AddPackage/>}/>
                <Route key={'pt-r-22'} path={'/agents'} element={<AgentList/>}/>
                <Route key={'pt-r-23'} path={'/agents/create'} element={<AddAgent/>}/>
                <Route key={'pt-r-24'} path={'/agents/commissions'} element={<AgentCommissionList/>}/>
                <Route key={'pt-r-25'} path={'/agencies'} element={<AgencyList/>}/>
                <Route key={'pt-r-26'} path={'/agencies/create'} element={<AddAgency/>}/>
                <Route key={'pt-r-27'} path={'/agencies/commissions'} element={<AgencyCommissionList/>}/>
                <Route key={'pt-r-28'} path={'/purchase/create'} element={<AddPurchase/>}/>
                <Route key={'pt-r-29'} path={'/purchase'} element={<PurchaseList/>}/>
                <Route key={'pt-r-30'} path={'/expenses/create'} element={<AddExpense/>}/>
                <Route key={'pt-r-31'} path={'/expenses'} element={<ExpenseList/>}/>
                <Route key={'pt-r-32'} path={'/settings/reference/update'} element={<RefValues/>}/>
                <Route key={'pt-r-33'} path={'/report/lost-profit'} element={<LostProfitReport/>}/>
                <Route key={'pt-r-34'} path={'/accounts'} element={<AccountList/>}/>
                <Route key={'pt-r-35'} path={'/roles'} element={<UserRoleList/>}/>
                <Route key={'pt-r-35'} path={'/profile'} element={<UserProfile/>}/>
                <Route key={'pt-r-36'} path={'/cashier-report'} element={<CashierReport/>}/>
                <Route key={'pt-r-37'} path={'/account-transfer'} element={<AccountTransferList/>}/>
                <Route key={'pt-r-38'} path={'/suppliers'} element={<SupplierList/>}/>
                <Route key={'pt-r-39'} path={'/bills/update'} element={<EditableBillsList/>}/>
                <Route key={'pt-r-40'} path={'/lab-reports'} element={<LabReports/>}/>
            </Route>
            <Route key={'pt-r-25'} path={'/print/:id/report'} element={<PatientReportPrint/>}/>
        </Routes>
    );
}

export default App;
