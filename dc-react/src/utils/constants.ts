export const BASE_URL = 'http://192.168.8.120:8080'
export const API_ROUTES = {
    SIGN_UP: `${BASE_URL}/api/v1/auth/signup`,
    SIGN_IN: `${BASE_URL}/api/v1/auth/signin`,
    UPDATE_PASSWORD: `${BASE_URL}/api/v1/auth/update-password`,
    FACE_AUTH: `${BASE_URL}/api/v1/auth/face`,
    REFRESH_TOKEN: `${BASE_URL}/api/v1/auth/refresh`,
    GET_USER: `${BASE_URL}/api/v1/auth/userinfo`,

    CONFIGURATION: `${BASE_URL}/api/v1/configuration`,
    CONFIGURATION_INVOICE_POST: `${BASE_URL}/api/v1/configuration/invoice`,

    // Dashboard Endpoints
    DASHBOARD_METRICS_BETWEEN_DATE: `${BASE_URL}/api/v1/dashboard/metrics-between-date`,
    DASHBOARD_CASHIER_SUMMARIES: `${BASE_URL}/api/v1/dashboard/cashier-summaries`,

    // User Endpoints
    USER_PUT: `${BASE_URL}/api/v1/user`,
    USER_POST: `${BASE_URL}/api/v1/user`,
    USER_ALL: `${BASE_URL}/api/v1/user`,
    USER_GET: `${BASE_URL}/api/v1/user/`,
    USER_DELETE: `${BASE_URL}/api/v1/user/`,
    USER_ADVANCE_SEARCH: `${BASE_URL}/api/v1/user/advanced`,

    // Purchase Endpoints
    PURCHASE_PUT: `${BASE_URL}/api/v1/purchase`,
    PURCHASE_POST: `${BASE_URL}/api/v1/purchase`,
    PURCHASE_ALL: `${BASE_URL}/api/v1/purchase`,
    PURCHASE_GET: `${BASE_URL}/api/v1/purchase/`,
    PURCHASE_DELETE: `${BASE_URL}/api/v1/purchase/`,
    PURCHASE_ADVANCE_SEARCH: `${BASE_URL}/api/v1/purchase/advanced`,

    // Expense Endpoints
    EXPENSE_PUT: `${BASE_URL}/api/v1/expense`,
    EXPENSE_POST: `${BASE_URL}/api/v1/expense`,
    EXPENSE_ALL: `${BASE_URL}/api/v1/expense`,
    EXPENSE_GET: `${BASE_URL}/api/v1/expense/`,
    EXPENSE_DELETE: `${BASE_URL}/api/v1/expense/`,
    EXPENSE_ADVANCE_SEARCH: `${BASE_URL}/api/v1/expense/advanced`,

    // Category Endpoints
    CATEGORY_POST: `${BASE_URL}/api/v1/expense-category`,
    CATEGORY_ALL: `${BASE_URL}/api/v1/expense-category`,
    CATEGORY_GET: `${BASE_URL}/api/v1/expense-category/`,
    MAIN_CATEGORY_GET: `${BASE_URL}/api/v1/expense-category/main/`,
    SUB_CATEGORY_GET: `${BASE_URL}/api/v1/expense-category/sub`,
    SUB_CATEGORY_BY_ID_GET: `${BASE_URL}/api/v1/expense-category/:id/sub`,
    CATEGORY_DELETE: `${BASE_URL}/api/v1/expense-category/`,
    CATEGORY_ADVANCE_SEARCH: `${BASE_URL}/api/v1/expense-category/advanced`,

    // Agent Endpoints
    AGENT_POST: `${BASE_URL}/api/v1/agentoragency/agent`,
    AGENT_ALL: `${BASE_URL}/api/v1/agentoragency/agent`,
    AGENT_GET: `${BASE_URL}/api/v1/agentoragency/agent/`,
    AGENT_DELETE: `${BASE_URL}/api/v1/agentoragency/agent/`,
    AGENT_ADVANCE_SEARCH: `${BASE_URL}/api/v1/agentoragency/agent/advanced`,

    // Agency Endpoints
    AGENCY_POST: `${BASE_URL}/api/v1/agentoragency/agency`,
    AGENCY_ALL: `${BASE_URL}/api/v1/agentoragency/agency`,
    AGENCY_GET: `${BASE_URL}/api/v1/agentoragency/agency/`,
    AGENCY_DELETE: `${BASE_URL}/api/v1/agentoragency/agency/`,
    AGENCY_ADVANCE_SEARCH: `${BASE_URL}/api/v1/agentoragency/agency/advanced`,

    // Agency or AgentEndpoints
    AGENT_AND_AGENCY_POST: `${BASE_URL}/api/v1/agentoragency`,
    AGENT_AND_AGENCY_ALL: `${BASE_URL}/api/v1/agentoragency`,
    AGENT_AND_AGENCY_GET: `${BASE_URL}/api/v1/agentoragency/`,
    AGENT_AND_AGENCY_DELETE: `${BASE_URL}/api/v1/agentoragency/`,
    AGENT_AND_AGENCY_ADVANCE_SEARCH: `${BASE_URL}/api/v1/agentoragency/advanced`,

    // Package & Test Endpoints
    PACKAGE_AND_TEST_POST: `${BASE_URL}/api/v1/diagnostic`,
    PACKAGE_AND_TEST_ALL: `${BASE_URL}/api/v1/diagnostic`,
    PACKAGE_AND_TEST_GET: `${BASE_URL}/api/v1/diagnostic/`,
    PACKAGE_AND_TEST_DELETE: `${BASE_URL}/api/v1/diagnostic/`,
    PACKAGE_AND_TEST_ADVANCE_SEARCH: `${BASE_URL}/api/v1/diagnostic/advanced`,

    // Package Endpoints
    PACKAGE_POST: `${BASE_URL}/api/v1/diagnostic/package`,
    PACKAGE_ALL: `${BASE_URL}/api/v1/diagnostic/package`,
    PACKAGE_GET: `${BASE_URL}/api/v1/diagnostic/package/`,
    PACKAGE_DELETE: `${BASE_URL}/api/v1/diagnostic/package/`,
    PACKAGE_ADVANCE_SEARCH: `${BASE_URL}/api/v1/diagnostic/package/advanced`,

    // Package Endpoints
    PACKAGE_ITEM_POST: `${BASE_URL}/api/v1/package-item`,
    PACKAGE_ITEM_ALL: `${BASE_URL}/api/v1/package-item`,
    PACKAGE_ITEM_GET: `${BASE_URL}/api/v1/package-item/`,
    PACKAGE_ITEM_DELETE: `${BASE_URL}/api/v1/package-item/`,
    PACKAGE_ITEM_BY_PACKAGE: `${BASE_URL}/api/v1/package-item/by-package/`,

    // Test Endpoints
    TEST_POST: `${BASE_URL}/api/v1/diagnostic/test`,
    TEST_ALL: `${BASE_URL}/api/v1/diagnostic/test`,
    TEST_GET: `${BASE_URL}/api/v1/diagnostic/test/`,
    PATIENT_TEST_REPORT_GET: `${BASE_URL}/api/v1/diagnostic-report/by-patient/:id`,
    TEST_DELETE: `${BASE_URL}/api/v1/diagnostic/test/`,
    TEST_ADVANCE_SEARCH: `${BASE_URL}/api/v1/diagnostic/test/advanced`,

    // Test Endpoints
    TEST_REPORT_POST: `${BASE_URL}/api/v1/diagnostic-report`,
    TEST_REPORT_ALL: `${BASE_URL}/api/v1/diagnostic-report`,
    TEST_REPORT_GET: `${BASE_URL}/api/v1/diagnostic-report/`,
    TEST_REPORT_DELETE: `${BASE_URL}/api/v1/diagnostic-report/`,
    TEST_REPORT_ADVANCE_SEARCH: `${BASE_URL}/api/v1/diagnostic-report/advanced`,

    // Patient Endpoints
    PATIENT_POST: `${BASE_URL}/api/v1/patient`,
    PATIENT_UPDATE: `${BASE_URL}/api/v1/patient/`,
    PATIENT_ALL: `${BASE_URL}/api/v1/patient`,
    PATIENT_GET: `${BASE_URL}/api/v1/patient/`,
    PATIENT_SEARCH: `${BASE_URL}/api/v1/patient/search?text=:query`,
    PATIENT_PROFILE_GET: `${BASE_URL}/api/v1/patient/:id`,
    PATIENT_DELETE: `${BASE_URL}/api/v1/patient/`,
    PATIENT_ADVANCE_SEARCH: `${BASE_URL}/api/v1/patient/advanced`,
    PATIENT_UPLOAD_PROFILE: `${BASE_URL}/api/v1/patient/profile`,
    PATIENT_UPLOAD_FINGER: `${BASE_URL}/api/v1/patient/finger`,
    PATIENT_UPLOAD_PROFILE_BY_ID: `${BASE_URL}/api/v1/patient/:id/profile`,
    PATIENT_UPLOAD_FINGER_BY_ID: `${BASE_URL}/api/v1/patient/:id/finger`,
    PATIENT_UPLOAD_XRAY_BY_ID: `${BASE_URL}/api/v1/patient/:id/xray`,
    PATIENT_BY_PASSPORT: `${BASE_URL}/api/v1/patient/:passport/passport`,

    // Role Endpoints
    ROLE_POST: `${BASE_URL}/api/v1/role`,
    ROLE_ALL: `${BASE_URL}/api/v1/role`,
    ROLE_GET: `${BASE_URL}/api/v1/role/`,
    ROLE_DELETE: `${BASE_URL}/api/v1/role/`,
    ROLE_PERMISSION: `${BASE_URL}/api/v1/role-permission`,
    ROLE_ADVANCE_SEARCH: `${BASE_URL}/api/v1/role/advanced`,

    // Reference Values Endpoints
    REF_VALUES_POST: `${BASE_URL}/api/v1/ref-value`,
    REF_VALUES_ALL: `${BASE_URL}/api/v1/ref-value`,
    REF_VALUES_GET: `${BASE_URL}/api/v1/ref-value`,

    // Business Settings Endpoints
    BUSINESS_POST: `${BASE_URL}/api/v1/configuration/business`,
    BUSINESS_BY_ID_GET: `${BASE_URL}/api/v1/configuration/:id`,
    BUSINESS_ALL: `${BASE_URL}/api/v1/configuration`,
    BUSINESS_GET: `${BASE_URL}/api/v1/configuration`,

    // Report Settings Endpoints
    REPORT_POST: `${BASE_URL}/api/v1/configuration/report`,
    REPORT_ALL: `${BASE_URL}/api/v1/configuration`,
    REPORT_GET: `${BASE_URL}/api/v1/configuration`,

    // Mail Settings Endpoints
    MAIL_POST: `${BASE_URL}/api/v1/configuration/email`,
    MAIL_ALL: `${BASE_URL}/api/v1/configuration`,
    MAIL_GET: `${BASE_URL}/api/v1/configuration`,

    // SMS Settings Endpoints
    SMS_POST: `${BASE_URL}/api/v1/configuration/sms`,
    SMS_ALL: `${BASE_URL}/api/v1/configuration`,
    SMS_GET: `${BASE_URL}/api/v1/configuration`,

    // Patient Report Values Endpoints
    PATIENT_REPORT_VALUES_POST: `${BASE_URL}/api/v1/patient/report`,
    PATIENT_REPORT_VALUES_ALL: `${BASE_URL}/api/v1/patient/report`,
    PATIENT_REPORT_VALUES_GET: `${BASE_URL}/api/v1/patient/report`,

    // Bill Endpoints
    BILL_POST: `${BASE_URL}/api/v1/bill`,
    BILL_PUT: `${BASE_URL}/api/v1/bill`,
    BILL_ALL: `${BASE_URL}/api/v1/bill`,
    BILL_GET: `${BASE_URL}/api/v1/bill/`,
    PATIENT_REPORT_BILL_GET: `${BASE_URL}/api/v1/bill/:id/patient`,
    BILL_DELETE: `${BASE_URL}/api/v1/bill/`,
    BILL_ADVANCE_SEARCH: `${BASE_URL}/api/v1/bill/advanced`,
    BILL_ADVANCE_SEARCH_AGENT: `${BASE_URL}/api/v1/bill/advanced/agent`,
    BILL_ADVANCE_SEARCH_AGENCY: `${BASE_URL}/api/v1/bill/advanced/agency`,
    BILL_PAYMENT_ADD: `${BASE_URL}/api/v1/bill/:ID/pay`,

    // Bill Payment Endpoints
    BILL_PAYMENT_ADVANCE_SEARCH: `${BASE_URL}/api/v1/bill-payment/advanced`,

    // Commission Endpoints
    COMMISSION_POST: `${BASE_URL}/api/v1/commission`,
    COMMISSION_ALL: `${BASE_URL}/api/v1/commission`,
    COMMISSION_GET: `${BASE_URL}/api/v1/commission/`,
    COMMISSION_DELETE: `${BASE_URL}/api/v1/commission/`,
    COMMISSION_AGENT_ADVANCE_SEARCH: `${BASE_URL}/api/v1/commission/agent/advanced`,
    COMMISSION_AGENCY_ADVANCE_SEARCH: `${BASE_URL}/api/v1/commission/agency/advanced`,
    COMMISSION_SUMMERY: `${BASE_URL}/api/v1/commission/:ID/summery`,
    COMMISSION_PAY_ALL: `${BASE_URL}/api/v1/commission/pay`,

    // Account Endpoints
    ACCOUNT_POST: `${BASE_URL}/api/v1/account`,
    ACCOUNT_ALL: `${BASE_URL}/api/v1/account`,
    ACCOUNT_GET: `${BASE_URL}/api/v1/account/`,
    ACCOUNT_DELETE: `${BASE_URL}/api/v1/account/`,
    ACCOUNT_BALANCE: `${BASE_URL}/api/v1/account/balance`,
    ACCOUNT_ADVANCE_SEARCH: `${BASE_URL}/api/v1/account/advanced`,

    // Account Transfer Endpoints
    ACCOUNT_TRANSFER_POST: `${BASE_URL}/api/v1/account-transfer`,
    ACCOUNT_TRANSFER_ALL: `${BASE_URL}/api/v1/account-transfer`,
    ACCOUNT_TRANSFER_GET: `${BASE_URL}/api/v1/account-transfer/`,
    ACCOUNT_TRANSFER_DELETE: `${BASE_URL}/api/v1/account-transfer/`,
    ACCOUNT_TRANSFER_ADVANCE_SEARCH: `${BASE_URL}/api/v1/account-transfer/advanced`,

    // Supplier Transfer Endpoints
    SUPPLIER_POST: `${BASE_URL}/api/v1/supplier`,
    SUPPLIER_ALL: `${BASE_URL}/api/v1/supplier`,
    SUPPLIER_GET: `${BASE_URL}/api/v1/supplier/`,
    SUPPLIER_DELETE: `${BASE_URL}/api/v1/supplier/`,
    SUPPLIER_ADVANCE_SEARCH: `${BASE_URL}/api/v1/supplier/advanced`,


    // Lab Report Endpoints
    LAB_REPORT_UPLOAD: `${BASE_URL}/api/v1/lab-report/upload`,
    LAB_REPORT_POST: `${BASE_URL}/api/v1/lab-report`,
    LAB_REPORT_ALL: `${BASE_URL}/api/v1/lab-report`,
    LAB_REPORT_GET: `${BASE_URL}/api/v1/lab-report/`,
    LAB_REPORT_DELETE: `${BASE_URL}/api/v1/lab-report/`,
    LAB_REPORT_ADVANCE_SEARCH: `${BASE_URL}/api/v1/lab-report/advanced`,

    // Supplier Transfer Endpoints
    DEVICE_POST: `${BASE_URL}/api/v1/device`,
    DEVICE_ALL: `${BASE_URL}/api/v1/device`,
}
export const APP_ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    DASHBOARD: '/dashboard',
}

export const DAYS_IN_MONTH = [
    {text: "Select Repeat On", value: ""},
    {text: "1st", value: "1"},
    {text: "2nd", value: "2"},
    {text: "3rd", value: "3"},
    {text: "4th", value: "4"},
    {text: "5th", value: "5"},
    {text: "6th", value: "6"},
    {text: "7th", value: "7"},
    {text: "8th", value: "8"},
    {text: "9th", value: "9"},
    {text: "10th", value: "10"},
    {text: "11th", value: "11"},
    {text: "12th", value: "12"},
    {text: "13th", value: "13"},
    {text: "14th", value: "14"},
    {text: "15th", value: "15"},
    {text: "16th", value: "16"},
    {text: "17th", value: "17"},
    {text: "18th", value: "18"},
    {text: "19th", value: "19"},
    {text: "20th", value: "20"},
    {text: "21st", value: "21"},
    {text: "22nd", value: "22"},
    {text: "23rd", value: "23"},
    {text: "24th", value: "24"},
    {text: "25th", value: "25"},
    {text: "26th", value: "26"},
    {text: "27th", value: "27"},
    {text: "28th", value: "28"},
    {text: "29th", value: "29"},
    {text: "30th", value: "30"},
    {text: "31st", value: "31"},
];

export const MENU = [
    {
        id: 1, label: "Dashboard", icon: "ft-home",open:false,
        submenu: [
            {id: 1, label: "Analytics", path: "/dashboard",page:"DASHBOARD",permission:'list'},
        ]
    }, {
        id: 2, label: "Patient", icon: "ft-users",open:false,
        submenu: [
            {id: 1, label: "Add Patient", path: "/patients/create", page:"PATIENT",permission:'create'},
            {id: 2, label: "Patient List", path: "/patients",page:"PATIENT",permission:'list'},
        ]
    }, {
        id: 3, label: "Bills", icon: "ft-book",open:false,
        submenu: [
            {id: 1, label: "Patient Bill", path: "/bills/patient",page:"PATIENT_BILL",permission:'list'},
            {id: 2, label: "Agent Bill", path: "/bills/agent",page:"AGENT_BILL",permission:'list'},
            {id: 3, label: "Agency Bill", path: "/bills/agency",page:"AGENCY_BILL",permission:'list'},
            // {id: 4, label: "Update Bill", path: "/bills/update",page:"PATIENT_BILL",permission:'edit'},
        ]
    }, {
        id: 4, label: "Test & Package", icon: "ft-tag",open:false,
        submenu: [
            {id: 1, label: "All Test", path: "/tests",page:"TEST",permission:'list'},
            {id: 2, label: "Add Test", path: "/tests/create",page:"TEST",permission:'create'},
            {id: 3, label: "All Package", path: "/packages",page:"PACKAGE",permission:'list'},
            {id: 4, label: "Add Package", path: "/packages/create",page:"PACKAGE",permission:'create'},
        ]
    }, {
        id: 5, label: "Agent & Agency", icon: "ft-user-plus",open:false,
        submenu: [
            {id: 1, label: "All Agent", path: "/agents",page:"AGENT",permission:'list'},
            {id: 2, label: "Add Agent", path: "/agents/create",page:"AGENT",permission:'create'},
            {id: 3, label: "All Agency", path: "/agencies",page:"AGENCY",permission:'list'},
            {id: 4, label: "Add Agency", path: "/agencies/create",page:"AGENCY",permission:'create'},
            {id: 5, label: "Agent Commission List", path: "/agents/commissions",page:"AGENT_COMMISSION",permission:'list'},
            {id: 6, label: "Agency Commission List", path: "/agencies/commissions",page:"AGENCY_COMMISSION",permission:'list'},
        ]
    }, {
        id: 6, label: "Accounts", icon: "ft-shield",open:false,
        submenu: [
            {id: 0, label: "Accounts", path: "/accounts",page:"ACCOUNT",permission:'list'},
            {id: 1, label: "Purchase", path: "/purchase",page:"PURCHASE",permission:'list'},
            {id: 2, label: "Add Purchase", path: "/purchase/create",page:"PURCHASE",permission:'create'},
            {id: 3, label: "Expenses", path: "/expenses",page:"EXPENSES",permission:'list'},
            {id: 4, label: "Add Expense", path: "/expenses/create",page:"EXPENSES",permission:'create'},
            {id: 5, label: "Profit/Loss Report", path: "/report/lost-profit",page:"LOST_PROFIT",permission:'list'},
            // {id: 6, label: "Sale", path: "/bills/patient",page:"PATIENT_BILL",permission:'list'},
            {id: 7, label: "Cashier Report", path: "/cashier-report",page:"CASHIER_REPORT",permission:'list'},
            {id: 8, label: "Account Transfer", path: "/account-transfer",page:"ACCOUNT_TRANSFER",permission:'list'},
            {id: 9, label: "Supplier", path: "/suppliers",page:"SUPPLIER",permission:'list'},
        ]
    },{
        id: 8, label: "Lab Reports", icon: "ft-paperclip",open:false,
        submenu: [
            {id: 1, label: "Lab Reports", path: "/lab-reports",page:"LAB_REPORTS",permission:'list'},
        ]
    }, {
        id: 7, label: "User Management", icon: "ft-users",open:false,
        submenu: [
            {id: 1, label: "Roles", path: "/roles",page:"ROLE",permission:'list'},
            {id: 2, label: "All Users", path: "/users",page:"USER",permission:'list'},
            {id: 3, label: "Add User", path: "/users/create",page:"USER",permission:'create'},
        ]
    }, {
        id: 9, label: "Settings", icon: "ft-settings",open:false,
        submenu: [
            {id: 1, label: "System Settings", path: "/settings" ,page:"SETTING",permission:'list'},
            {id: 5, label: "Reference Value Settings", path: "/settings/reference/update",page:"REF_VAL",permission:'list'},
        ]
    },
];
