import React, {useEffect, useState} from 'react';

function TestDetail(props: any) {
    const {test} = props;
    const [record,setRecord] = useState({
        id: 0,
        name: "",
        department: "",
        method: "",
        sample: "Blood",
        description: ""
    });
    useEffect(() => {

        setRecord(test);
    },[record])
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
                                        <p className="bg-info pl-1 font-weight-bold white">Test Info</p>
                                        <h5 className={"mb-1"}><strong>Test Name :</strong> {record.name}</h5>
                                        <h5 className={"mb-1"}><strong>Department    :</strong> {record.department}</h5>
                                        <h5 className={"mb-1"}><strong>Method   :</strong> {record.method}</h5>
                                        <h5 className={"mb-1"}><strong>Sample   :</strong> {record.sample}</h5>
                                        <h5 className={"mb-1"}><strong>Description   :</strong> {record.description}</h5>
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

export default TestDetail;
