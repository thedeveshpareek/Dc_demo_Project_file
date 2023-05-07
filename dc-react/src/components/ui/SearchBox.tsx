import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import PatientService from "../../services/PatientService";

function SearchBox(props:any) {
    const navigate = useNavigate();
    const [searching,setSearching] = useState(false);
    const [patients,setPatients] = useState([]);

    const typeHandler = (e: any) => {
        setSearching(true);
        PatientService.search(e.target.value).then((response) => {
            setPatients(response.data);
        })
    }

    return (
        <>
            <li key={'main-search-list'} className={`dropdown nav-item ${searching?'show':''}`} data-menu="dropdown">
                <input type="text" id="roundText" className="form-control round dropdown-toggle mt-1" placeholder="Find Patient" data-toggle="dropdown"
                       onChange={typeHandler}/>
                <ul className="dropdown-menu">
                    <div className="arrow_box">
                        {patients.map((patient:any) => (
                            <li key={'patient-'+patient.id} data-menu="">
                                <Link key={'patient-'+patient.id + '-link'}
                                      className="dropdown-item"
                                      to={`/patients/${patient.id}`}>{patient.fullName}</Link>
                            </li>
                        ))}
                    </div>
                </ul>
            </li>
        </>
    );
}

export default SearchBox;
