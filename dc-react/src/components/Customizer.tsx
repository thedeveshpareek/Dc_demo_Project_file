import React, {useState} from 'react';
import AuthService from "../services/AuthService";

function Customizer(props: any) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleCustomizer = (e: any) => {
        e.preventDefault();
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };
    const changeColor = (e:any) => {
        document.body.dataset.color = e.target.dataset.bg;
        let config = AuthService.getConfiguration();
        AuthService.updateConfiguration("navbarColor",e.target.dataset.bg,config);
    };
    return (
        <div
            className={`customizer border-left-blue-grey border-left-lighten-4 d-none d-xl-block ${isOpen ? "open" : ""}`}>
            <a className="customizer-close" onClick={toggleCustomizer}><i className="ft-x font-medium-3"></i></a>
            <a className="customizer-toggle bg-primary box-shadow-3" onClick={toggleCustomizer}
               id="customizer-toggle-setting">
                <i className="ft-settings font-medium-3 spinner white"></i>
            </a>
            <div className="customizer-content p-2">
                <h5 className="mt-1 mb-1 text-bold-500">Navbar Color Options</h5>
                <div className="navbar-color-options clearfix">
                    <div className="gradient-colors mb-1 clearfix">
                        <div className="bg-gradient-x-purple-blue navbar-color-option"
                             data-bg="bg-gradient-x-purple-blue"
                             title="bg-gradient-x-purple-blue" onClick={changeColor}></div>
                        <div className="bg-gradient-x-purple-red navbar-color-option" data-bg="bg-gradient-x-purple-red"
                             title="bg-gradient-x-purple-red" onClick={changeColor}></div>
                        <div className="bg-gradient-x-blue-green navbar-color-option" data-bg="bg-gradient-x-blue-green"
                             title="bg-gradient-x-blue-green" onClick={changeColor}></div>
                        <div className="bg-gradient-x-orange-yellow navbar-color-option" data-bg="bg-gradient-x-orange-yellow"
                             title="bg-gradient-x-orange-yellow" onClick={changeColor}></div>
                        <div className="bg-gradient-x-blue-cyan navbar-color-option" data-bg="bg-gradient-x-blue-cyan"
                             title="bg-gradient-x-blue-cyan" onClick={changeColor}></div>
                        <div className="bg-gradient-x-red-pink navbar-color-option" data-bg="bg-gradient-x-red-pink"
                             title="bg-gradient-x-red-pink" onClick={changeColor}></div>
                    </div>
                    <div className="solid-colors clearfix">
                        <div className="bg-primary navbar-color-option" data-bg="bg-primary" title="primary" onClick={changeColor}></div>
                        <div className="bg-success navbar-color-option" data-bg="bg-success" title="success" onClick={changeColor}></div>
                        <div className="bg-info navbar-color-option" data-bg="bg-info" title="info" onClick={changeColor}></div>
                        <div className="bg-warning navbar-color-option" data-bg="bg-warning" title="warning" onClick={changeColor}></div>
                        <div className="bg-danger navbar-color-option" data-bg="bg-danger" title="danger" onClick={changeColor}></div>
                        <div className="bg-blue navbar-color-option" data-bg="bg-blue" title="blue" onClick={changeColor}></div>
                    </div>
                </div>

                {/*<hr/>

                <h5 className="my-1 text-bold-500">Layout Options</h5>
                <div className="row">
                    <div className="col-12">
                        <div className="d-inline-block custom-control custom-radio mb-1 col-4">
                            <input type="radio" className="custom-control-input bg-primary" name="layouts"
                                   id="default-layout"
                                   checked/>
                            <label className="custom-control-label" htmlFor="default-layout">Default</label>
                        </div>
                        <div className="d-inline-block custom-control custom-radio mb-1 col-4">
                            <input type="radio" className="custom-control-input bg-primary" name="layouts"
                                   id="fixed-layout"/>
                            <label className="custom-control-label" htmlFor="fixed-layout">Fixed</label>
                        </div>
                        <div className="d-inline-block custom-control custom-radio mb-1 col-4">
                            <input type="radio" className="custom-control-input bg-primary" name="layouts"
                                   id="static-layout"/>
                            <label className="custom-control-label" htmlFor="static-layout">Static</label>
                        </div>
                        <div className="d-inline-block custom-control custom-radio mb-1">
                            <input type="radio" className="custom-control-input bg-primary" name="layouts"
                                   id="boxed-layout"/>
                            <label className="custom-control-label" htmlFor="boxed-layout">Boxed</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-inline-block custom-control custom-checkbox mb-1">
                            <input type="checkbox" className="custom-control-input bg-primary"
                                   name="right-side-icons"
                                   id="right-side-icons"/>
                            <label className="custom-control-label" htmlFor="right-side-icons">Right Side
                                Icons</label>
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>
    );
}

export default Customizer;
