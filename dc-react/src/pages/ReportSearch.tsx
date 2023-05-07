import React, {useState} from 'react';
import reactLogo from "../assets/images/logo/logo-without-bg.png";
import PatientReport from "./admin/Patient/PatientReport";
import PatientService from "../services/PatientService";
import {Link} from "react-router-dom";
import logo from "../assets/images/logo/mt-logo-with-bg.jpg";
import Footer from "../components/Footer";

function ReportSearch(props: any) {
    const [patient, setPatient] = useState(null);
    const [passport, setPassport] = useState('');
    const [searching, setSearching] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const typeHandler = (e: any) => {
        setPassport(e.target.value);
    }

    const searchHandler = (e: any) => {
        setSearching(true);
        setPatient(null);
        PatientService.findByPassport(passport).then((response) => {
            if (response.data){
                setPatient(response.data);
            }
            setSearching(false);
        }).catch(response => {
            setPatient(null);
            setSearching(false);
            setInvalid(true);
            setTimeout(()=> {
                setInvalid(false);
            },5000);
        })
    }

    return (
        <>
            <nav className="navbar navbar-light bg-white justify-content-between shadow-lg">
                <a className="navbar-brand" href="#">
                    <img src={reactLogo} height="30" alt=""/>
                    GCC ERP
                </a>
                <form className="form-inline">
                    <Link to={'/login'} className={'btn btn-outline-info'}>Login</Link>
                </form>
            </nav>
            <div className="container-fluid bg-search-report-background">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="card bg-transparent">
                            <div className="card-header text-center bg-transparent">
                                <p className="card-text white" style={{fontSize:25}}>Find your report using passport number</p>
                                <input type="text" className="form-control input-black-placeholder round border-3 border-blue-grey round box-shadow-2 m-auto text-center black"
                                       id="iconLeft1" style={{maxWidth:500,fontSize:20,height:45}}
                                       placeholder="Passport Number" onChange={typeHandler}/>
                                <button type="button" className="btn btn-bg-gradient-x-blue-cyan round border-3 border-white btn-min-width box-shadow-2 my-1" disabled={searching} onClick={searchHandler}>
                                    Find Report
                                    {searching?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                                </button>
                            </div>
                            <div className="card-body pt-0 bg-transparent scroll-report" style={{minHeight:'50vh'}}>
                                {invalid ? <div className="alert alert-light mb-2" role="alert">Report Not Found</div> : ""}
                                {patient ?<div style={{minWidth:1080}}><PatientReport patients={patient}/></div>  : ""}
                            </div>
                            <div className={'card-footer bg-transparent text-center mt-5'} style={{border:0}}>
                                <img src={logo} alt="branding logo" style={{width:'20%'}}/>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        </>

    );
}

export default ReportSearch;
