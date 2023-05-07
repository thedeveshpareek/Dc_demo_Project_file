import React from 'react';

const cardColors = ['bg-gradient-directional-warning','bg-gradient-x-purple-red','bg-gradient-x-blue-green','bg-gradient-x-orange-yellow','bg-gradient-directional-success',
'bg-gradient-directional-danger','bg-gradient-directional-info','bg-gradient-x-purple-red'];
function StatisticCard(props: any) {
    if (props.type === 'left-icon'){
        return (
            <div className={'col-xl-' + props.column + ' col-lg-6 col-12'}>
                <div className={'card ' + cardColors[props.color-1]}>
                    <div className="card-content box-shadow-3">
                        <div className="card-body">
                            <div className="media d-flex">
                                <div className="align-self-top">
                                    <i className={props.icon + ' icon-opacity text-white font-large-4 float-left'}></i>
                                </div>
                                <div
                                    className="media-body text-white text-right align-self-bottom mt-3">
                                    <span className="d-block mb-1 font-medium-1">{props.title}</span>
                                    <h1 className="text-white mb-0">{props.value}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else if (props.type === 'right-icon'){
        return (
            <div className={'col-xl-' + props.column + ' col-lg-6 col-12'}>
                <div className={'card ' + cardColors[props.color-1]}>
                    <div className="card-content box-shadow-3">
                        <div className="card-body">
                            <div className="media d-flex">
                                <div className="media-body text-white text-left align-self-bottom mt-3">
                                    <span className="d-block mb-1 font-medium-1">{props.title}</span>
                                    <h1 className="text-white mb-0">{props.value}</h1>
                                </div>
                                <div className="align-self-top">
                                    <i className={props.icon + ' icon-opacity text-white font-large-4 float-right'}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div>Invalid Type! use left-icon or right-icon</div>
        );
    }

}

export default StatisticCard;
