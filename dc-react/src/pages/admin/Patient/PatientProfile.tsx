import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PatientService from "../../../services/PatientService";
import PatientProfileDetail from "../../../components/detail/PatientProfileDetail";

function PatientProfile(props:any) {
    const {id} = useParams();
    const [patient, setPatient] = useState(null);
    useEffect(() => {
        setPatient(null);
        PatientService.findByProfile(id).then(response => {
            setPatient(response.data);
        })
    },[id]);
    return (
        <>
            {patient ? <PatientProfileDetail patient={patient}/>:""}
        </>
    );
}

export default PatientProfile;
