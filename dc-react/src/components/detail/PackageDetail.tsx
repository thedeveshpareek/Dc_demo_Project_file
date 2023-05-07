import React, {useEffect, useState} from 'react';
import FuncUtil from "../../utils/FuncUtil";
import PackageItemService from "../../services/PackageItemService";

function PackageDetail(props: any) {
    const {record} = props;
    const [packageItems,setPackageItems] = useState([]);
    const loadItems=()=>{
        PackageItemService.findAllByPackageId(record.id).then(response => {
            setPackageItems(response.data);
        })
    }
    useEffect(() => {
        loadItems();
    },[record])

    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card m-1">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="bg-info pl-1 font-weight-bold white">{record.id} - Package Info</p>
                                        <h5 className={"mb-1"}><strong className={'width-50-per'}>Package Name :</strong> {record.name}</h5>
                                        <h5 className={"mb-1"}><strong className={'width-50-per'}>Package Description :</strong> {record.description}</h5>
                                        <h5 className={"mb-1"}><strong>Price :</strong> {FuncUtil.toCurrency(record.price,'BDT')}</h5>
                                        <h5 className={"mb-1"}><strong>Active Status   :</strong> <div className={`badge ${record.activeStatus=='ACTIVE'?'badge-success':"badge-danger"}`}>{record.activeStatus}</div></h5>
                                    </div>
                                    <div className="col-md-12">
                                        <p className="bg-info pl-1 font-weight-bold white">Tests Include With This Package</p>
                                        {packageItems.map((packageItem: any) => (
                                            <div key={'pi-'+packageItem.id} className="alert alert-light alert-dismissible py-1" role="alert">
                                                <strong>{packageItem.name}</strong> - {packageItem.description} - <strong> {FuncUtil.toCurrency(packageItem.price,'BDT')}</strong>
                                            </div>
                                        ))}
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

export default PackageDetail;
