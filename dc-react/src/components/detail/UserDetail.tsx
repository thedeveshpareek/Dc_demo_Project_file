import React, {useEffect, useState} from 'react';

function UserDetail(props: any) {
    const {user,...properties} = props;
    const [record,setRecord] = useState({
        id: null,
        email: "",
        password: "",
        fullName: "",
        roles: [{name: ""}],
        enabled: true,
    });
    const [loaded,setLoaded] = useState(false);
    useEffect(() => {
        if (loaded==false){
            setRecord(user);
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
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="bg-info pl-1 font-weight-bold white">User Info</p>
                                        <h5 className={"mb-1"}><strong>User Name :</strong> {record.fullName}</h5>
                                        <h5 className={"mb-1"}><strong>Email :</strong> {record.email}</h5>
                                        <h5 className={"mb-1"}><strong>Role :</strong> {record.roles[0].name}</h5>
                                        <h5 className={"mb-1"}><strong>Active Status :</strong>  <div className={`badge ${record.enabled?'badge-success':"badge-danger"}`}>{record.enabled?'Active':'Inactive'}</div></h5>
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

export default UserDetail;
