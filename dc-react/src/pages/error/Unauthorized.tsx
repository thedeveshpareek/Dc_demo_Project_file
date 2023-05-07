import React from 'react';
import {Link} from "react-router-dom";

function Unauthorized(props: any) {
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
                                    <h2 className="error-code text-center mb-2">401</h2>
                                    <h3 className="text-uppercase text-center">Unauthorized!</h3>
                                </div>
                                <div className="card-content">
                                    <fieldset className="row py-2">
                                        <div className="input-group col-12">
                                            <input type="text"
                                                   className="form-control form-control-xl input-xl border-grey border-lighten-1 box-shadow-4"
                                                   placeholder="How can we help?" aria-describedby="button-addon2"/>
                                            <span className="input-group-append" id="button-addon2">
                               <button className="btn btn-lg btn-danger border-grey border-lighten-1 box-shadow-4"
                                       type="button"><i className="ft-search "></i></button>
                           </span>
                                        </div>
                                    </fieldset>
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

export default Unauthorized;
