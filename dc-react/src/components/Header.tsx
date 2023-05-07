import React, {useEffect, useState} from "react";
import AuthService from "../services/AuthService";
import {useNavigate} from "react-router-dom";
import reactLogo from "../assets/images/logo/mt-logo-without-bg.png";
import avatarPng from "../assets/images/portfolio/profile.jpeg";
import finger from "../assets/images/pages/finger.gif";
import SearchBox from "./ui/SearchBox";
import FaceDetect from "./ui/FaceDetect";
import FingerDetect from "./ui/FingerDetect";
import {FingerResponse} from "../utils/Models";

const Header = (props: any) => {
    const {configuration, ...properties} = props;
    const user = AuthService.getCurrentUser();
    const [isOpen, setIsOpn] = useState(false);
    const [action, setAction] = useState('none');
    const navigate = useNavigate();

    const logout = (e: any) => {
        e.preventDefault();
        AuthService.logout()
        navigate("/login");
    };

    const onMenuClick = (e: any) => {
        e.preventDefault();
        setIsOpn(isOpen ? false : true);
        handleDrawer();
    };

    const handleDrawer = () => {
        if (isOpen) {
            document.body.classList.add('menu-open');
            document.body.classList.remove('menu-hide');
        } else {
            document.body.classList.add('menu-hide');
            document.body.classList.remove('menu-open');
        }
    };

    const handleFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };
    const openCamera = () => {
        // setAction('face-identify');
    };
    const openScanner = () => {
        setAction('finger-identify');
    };
    const onAuthenticated = (url:string) => {
        navigate(url);
        setAction('none');
    };

    const cancelHandler = () => {
        setAction('none');
    };

    return (
        <>
            <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow navbar-static-top navbar-light navbar-brand-center">
                <div className="navbar-header">
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item mobile-menu d-md-none mr-auto">
                            <a onClick={onMenuClick} className="nav-link nav-menu-main menu-toggle hidden-xs is-active">
                                <i className="ft-menu font-large-1"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand" href={'https://multipixeltec.com'} target={'_blank'}>
                                <img className="" alt="creative admin logo" src={reactLogo} width={200}/>
                            </a>
                        </li>
                        <li className="nav-item d-md-none">
                            <a className="nav-link open-navbar-container" data-toggle="collapse"
                               data-target="#navbar-mobile" onClick={onMenuClick} href={'/'}>
                                <i className="la la-ellipsis-v"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-wrapper">
                    <div className="navbar-container content">
                        <div className="collapse navbar-collapse" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left">
                                <li className="nav-item d-none d-md-block">
                                    <a className="nav-link nav-link-expand" onClick={handleFullScreen}>
                                        <i className="ficon ft-maximize"></i>
                                    </a>
                                </li>
                                <li className="nav-item d-none d-md-block">
                                    <SearchBox/>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav float-right">
                                {/*<li className="nav-item d-none d-md-block">
                                    <a className="nav-link nav-menu-main menu-toggle hidden-xs" onClick={openCamera} href={'/'}>
                                        <i className="ft-camera"></i>
                                    </a>
                                </li>*/}
                                <li className="nav-item d-none d-md-block">
                                    <a className="nav-link nav-menu-main menu-toggle hidden-xs" onClick={openScanner} href={'/'}>
                                        <i className="ft-shield"></i>
                                    </a>
                                </li>
                                <li className="dropdown dropdown-user nav-item">
                                    <a className="dropdown-toggle nav-link dropdown-user-link"
                                       href="/dashboard" data-toggle="dropdown"> <span
                                        className="avatar avatar-online"><img
                                        src={avatarPng}
                                        alt="avatar"/></span></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <div className="arrow_box_right">
                                            <a className="dropdown-item" href="/abc"><span
                                                className="avatar avatar-online"><img
                                                src={avatarPng}
                                                alt="avatar"/><span
                                                className="user-name text-bold-700 ml-1">{user.firstName}</span></span></a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/profile">
                                                <i className="ft-user"></i> Edit Profile</a>
                                            <div className="dropdown-divider"></div>
                                            <a href={'/'} className="dropdown-item" onClick={logout}><i
                                                className="ft-power"></i> Logout</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {
                action === 'face-identify' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                         style={{display: 'block'}} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-sm" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-80">
                                    <FaceDetect onSuccess={onAuthenticated}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                            onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action === 'finger-identify' ?
                    <div className={`modal fade fadeIn show`} role="dialog" style={{display: 'block'}}
                         data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-80 text-center">
                                   <FingerDetect onSuccess={onAuthenticated} onCancel={cancelHandler}/>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
        </>
    );
};
export default Header;
