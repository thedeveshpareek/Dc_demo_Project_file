import React from "react";
const Footer = (props:any) => {
    const {configuration,...properties} = props;
    const time = new Date();
    return (
        <footer className="footer footer-static navbar-shadow fixed-bottom" style={{background:'#0170B9'}}>
            <div className="clearfix blue-grey text-sm-center mb-0 px-2 text-center">
                <span className="font-weight-bolder d-block d-md-inline-block white h5 mb-0" style={{fontFamily:'serif'}}>
                    Copyright © {time.getFullYear()} <a
                    className="white" href="https://multipixeltec.com/" target="_blank">
                         Multipixel Technology
                    </a> | All rights reserved
                </span>
            </div>
        </footer>
    );
};
export default Footer;
