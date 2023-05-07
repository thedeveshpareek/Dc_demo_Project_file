import React, {useEffect, useState} from 'react';
import moment from "moment";

function PatientProfile(props: any) {
    const {patients,...properties} = props;
    const [record,setRecord] = useState({
        id: 0,
        fullName: "",
        passportNo: "",
        issueDate: "",
        expiredDate: "",
        visaNo: "",
        visaDate: "",
        travelingTo: "",
        presentAddress: "",
        permanentAddress: "",
        mobile: "",
        email: "",
        group: "",
        testOrPackageId: "",
        testOrPackageName: "",
        agentOrAgencyId: "",
        agentOrAgencyName: "",
        deliveryDate: "",
        gender: "",
        maritalStatus: "",
        dateOfBirth: "",
        fathersName: "",
        mothersName: "",
        nationality: "",
        religion: "",
        profession: "",
        status: "",
        nidNumber: "",
        specialNote: "",
    });
    const [loaded,setLoaded] = useState(false);
    useEffect(() => {
        if (loaded==false){
            setRecord(patients);
            setLoaded(false);
        }
    })
    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card m-1">
                        <div className="card-header pb-0">
                            <div className="card-title-wrap bar-primary">
                                <div className="card-title">ID {record.id}</div>
                                <hr/>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="card-body pt-0">
                                <p className="bg-info pl-1 font-weight-bold white">Passport/Visa Info</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className={"mb-1"}><strong>Full Name :</strong> {record.fullName}</h5>
                                        <h5 className={"mb-1"}><strong>Passport No   :</strong> {record.passportNo}</h5>
                                        <h5 className={"mb-1"}><strong>Issue Date   :</strong> {moment(record.issueDate).format('YYYY-MM-DD')}</h5>
                                        <h5 className={"mb-1"}><strong>Expired Date   :</strong> {moment(record.expiredDate).format('YYYY-MM-DD')}</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className={"mb-1"}><strong>Visa No   :</strong> {record.visaNo}</h5>
                                        <h5 className={"mb-1"}><strong>Visa Date   :</strong> {moment(record.visaDate).format('YYYY-MM-DD')}</h5>
                                        <h5 className={"mb-1"}><strong>Traveling To   :</strong> {record.travelingTo}</h5>
                                    </div>
                                </div>
                                <p className="bg-info pl-1 font-weight-bold white">Contact Info</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className={"mb-1"}><strong>Present Address :</strong> {record.presentAddress}</h5>
                                        <h5 className={"mb-1"}><strong>Permanent Address  :</strong> {record.permanentAddress}</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className={"mb-1"}><strong>Mobile Number   :</strong> {record.mobile}</h5>
                                        <h5 className={"mb-1"}><strong>Email   :</strong> {record.email}</h5>
                                    </div>
                                </div>
                                <p className="bg-info pl-1 font-weight-bold white">Service/Billing Info</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className={"mb-1"}><strong>Group :</strong> {record.group}</h5>
                                        <h5 className={"mb-1"}><strong>Package/Test Name    :</strong> {record.testOrPackageName}</h5>
                                        <h5 className={"mb-1"}><strong>Agent/Agency Name  :</strong> {record.agentOrAgencyName}</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className={"mb-1"}><strong>Gender   :</strong> {record.gender}</h5>
                                        <h5 className={"mb-1"}><strong>Marital Status   :</strong> {record.maritalStatus}</h5>
                                        <h5 className={"mb-1"}><strong>Date Of Birth   :</strong> {moment(record.dateOfBirth).format('YYYY-MM-DD')}</h5>
                                        <h5 className={"mb-1"}><strong>Delivery Date   :</strong> {moment(record.deliveryDate).format('YYYY-MM-DD')}</h5>
                                    </div>
                                </div>
                                <p className="bg-info pl-1 font-weight-bold white">Personal Info</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className={"mb-1"}><strong>Father's Name :</strong> {record.fathersName}</h5>
                                        <h5 className={"mb-1"}><strong>Mother's Name  :</strong> {record.mothersName}</h5>
                                        <h5 className={"mb-1"}><strong>Nationality   :</strong> {record.nationality}</h5>
                                        <h5 className={"mb-1"}><strong>Religion   :</strong> {record.religion}</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className={"mb-1"}><strong>Profession   :</strong> {record.profession}</h5>
                                        <h5 className={"mb-1"}><strong>NID Number   :</strong> {record.nidNumber}</h5>
                                        <h5 className={"mb-1"}><strong>Special Note   :</strong> {record.specialNote}</h5>
                                        <h5 className={"mb-1"}><strong>Active Status   :</strong> <div className={`badge ${record.status=='ACTIVE'?'badge-success':"badge-danger"}`}>{record.status}</div></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientProfile;
