import React from 'react';
import {Link} from "react-router-dom";

function PageNotFound(props:any) {
    return (
        <div className="app-content content">
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <section className="flexbox-container">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="col-lg-4 col-md-6 col-10 p-0">
                                <div className="card-header bg-transparent border-0">
                                    {/*<h2 className="error-code text-center mb-2">404</h2>*/}
                                    <h3 className="text-uppercase text-center">Page Not Found !</h3>
                                </div>
                                <div className="card-content">
                                    <img src="/assets/images/error/not-found.png" className={"ml-5"} alt="" width={500}/>
                                    <div className="row py-2 text-center">
                                        <div className="col-12">
                                            <Link to="/dashboard" className="btn btn-white danger box-shadow-4"><i
                                                className="ft-home"></i> Back to Home</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
