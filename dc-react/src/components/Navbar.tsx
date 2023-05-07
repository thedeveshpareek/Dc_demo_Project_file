import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import {MENU} from "../utils/constants";

const Navbar = (props: any) => {
    const {configuration} = AuthService.getConfiguration();
    const navigate = useNavigate();
    const [uri] = useState("/");
    const [mobile,setMobile] = useState(true);
    const [menu,setMenu] = useState(MENU);

    const handleWindowSizeChange = ()=> {
        setMobile(window.innerWidth <= 768 ? true : false);
    }


    const onMenuClick = (e:any) => {
        e.preventDefault();
        let menuId = e.target.dataset.menu;
        let parent = e.target.closest('.nav-item');
        if(parent.classList.contains('open')){
            parent.classList.remove('open');
        }else{
            parent.classList.add('open');
        }
    };

    const onLinkClick = (e:any) => {
        document.body.classList.remove('menu-open');
        document.body.classList.add('menu-hide');
    };

    useEffect(() => {
        setMobile(window.innerWidth <= 768 ? true : false);
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <>
            {mobile?
                <div className="main-menu menu-light menu-fixed menu-shadow" role="navigation" data-menu="menu-wrapper"
                     data-nav="brand-center">
                    <div className="navbar-container main-menu-content ps ps--active-y" data-menu="menu-container">
                        <ul className="navigation navigation-main" id="main-menu-navigation"
                            data-menu="menu-navigation" style={{maxHeight:'90vh',overflow:'scroll'}}>
                            {menu.map((item) => (
                                <li key={'menu-'+item.id} className={`nav-item has-sub`} data-menu="dropdown">
                                    <a className="dropdown-toggle" href="#/" data-toggle="dropdown" data-menu={item.id} onClick={onMenuClick}>
                                        <i className={item.icon}></i><span>{item.label}</span>
                                    </a>
                                    {item.submenu ?
                                        <ul className="">
                                            <div className="arrow_box">
                                                {item.submenu?.map((submenu) => (
                                                    AuthService.hasPermission(submenu) ?
                                                        <li key={'m-mm-' + item.id + '-' + submenu.id}
                                                            className={uri === submenu.path ? "active" : ""}>
                                                            <Link key={'mm-' + item.id + '-' + submenu.id + '-link'}
                                                                  className="dropdown-item"
                                                                  to={submenu.path} onClick={onLinkClick}>{submenu.label}</Link>
                                                        </li> : ""
                                                ))}
                                            </div>
                                        </ul> : ""
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                :
                <div id="sticky-wrapper" className="sticky-wrapper" style={{height: 70}}>
                    <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-dark navbar-without-dd-arrow navbar-shadow"
                         role="navigation" data-menu="menu-wrapper">
                        <div className="navbar-container main-menu-content" data-menu="menu-container">
                            <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
                                {menu.map((item) => (
                                    <li key={'mm-' + item.id} className="dropdown nav-item" data-menu="dropdown">
                                        <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#/">
                                            <i className={item.icon}></i><span>{item.label}</span>
                                        </a>
                                        {item.submenu ?
                                            <ul className="dropdown-menu">
                                                <div className="arrow_box">
                                                    {item.submenu?.map((submenu) => (
                                                        AuthService.hasPermission(submenu) ?
                                                            <li key={'mm-' + item.id + '-' + submenu.id}
                                                                className={uri === submenu.path ? "active" : ""} data-menu="">
                                                                <Link key={'mm-' + item.id + '-' + submenu.id + '-link'}
                                                                      className="dropdown-item"
                                                                      to={submenu.path}>{submenu.label}</Link>
                                                            </li> : ""
                                                    ))}
                                                </div>
                                            </ul>
                                            : ""
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
export default Navbar;
