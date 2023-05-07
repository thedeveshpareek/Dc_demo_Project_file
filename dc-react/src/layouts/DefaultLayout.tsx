import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import AuthService from "../services/AuthService";
import "../assets/vendors/css/vendors.min.css";
import "../assets/vendors/css/forms/toggle/switchery.min.css";
import "../assets/css/plugins/forms/switch.min.css";
import "../assets/css/core/colors/palette-switch.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/bootstrap-extended.min.css";
import "../assets/css/colors.min.css";
import "../assets/css/components.min.css";
import "../assets/css/core/menu/menu-types/horizontal-menu.min.css";
import "../assets/css/core/colors/palette-gradient.min.css";
import "../assets/css/pages/login-register.min.css";

function DefaultLayout() {
    document.body.classList.add('bg-full-screen-image');
    return (
        AuthService.isAuthenticate() ? <Navigate to="/dashboard"/> : <Outlet/>
    );
}

export default DefaultLayout;
