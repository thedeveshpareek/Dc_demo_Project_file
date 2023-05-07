import "../assets/fonts.googleapis.com/css93c2.css?family=Muli:300,300i,400,400i,600,600i,700,700i%7CComfortaa:300,400,700";
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
import "../assets/css/pages/dashboard-analytics.min.css";
import "../assets/css/pages/login-register.min.css";
import "../assets/fonts/simple-line-icons/style.min.css";
import "../assets/css/pages/users.min.css";
import "../assets/css/pages/timeline.min.css";
import "../assets/css/plugins/animate/animate.min.css";
import "../assets/css/plugins/forms/checkboxes-radios.min.css";

import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Customizer from "../components/Customizer";
import CallForSupport from "../components/CallForSupport";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [configuration,setConfiguration] = useState(AuthService.getConfiguration());
    const [isLogged, setIsLogged] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadUserInfo = () => {
        AuthService.getCurrentUserFromServer().then(response => {
            AuthService.update(response.data);
            setIsLogged(true);
        }).catch(reason => {
            if (reason.code == "ERR_NETWORK"){
                navigate("/maintenance");
            }else{
                if (reason.response.status == 401) {
                    AuthService.logout();
                    navigate("/login");
                }
            }
        })
        setIsLoaded(true);
        let config = AuthService.getConfiguration();
        AuthService.getSiteConfiguration().then((response) => {
            Object.keys(response.data).map(key => {
                AuthService.updateConfiguration(key,response.data[key],config);
            })
            setConfiguration(AuthService.getConfiguration());
        });
    }

    useEffect(() => {
        if (isLoaded == false) {
            loadUserInfo()
        }
    }, [isLogged])

    useEffect(() => {
        document.body.classList.remove('bg-full-screen-image');
        document.body.classList.add('horizontal-layout', 'horizontal-menu', '2-columns','vertical-overlay-menu');
        document.body.dataset.color = configuration.navbarColor;
    })

    return (
        isLogged ?
            <>
                <ToastContainer />
                <Header configuration={configuration}/>
                <Navbar configuration={configuration}/>
                <Outlet/>
                <Customizer configuration={configuration}/>
                <CallForSupport/>
                <Footer configuration={configuration}/>
            </>
            :
            <Navigate to="/login"/>
    );
};
export default AdminLayout;
