import React from "react";

const handle = (code: number, message: string) => {
    if (code===0){
        return "";
    }
    let color;
    let icon;
    switch (code) {
        case 200:
            color = 'alert-success';
            icon = 'ft-thumbs-up';
            break;
        case 500:
            color = 'alert-danger';
            icon = 'ft-thumbs-down';
            break;
        case 401:
            color = 'alert-warning';
            icon = 'ft-alert-triangle';
            break;
        case 403:
            color = 'alert-danger';
            icon = 'ft-alert-triangle';
            break;
        case 400:
            color = 'alert-danger';
            icon = 'ft-alert-triangle';
            break;

        case 405:
            color = 'alert-danger';
            icon = 'ft-alert-triangle';
            break;
    }
    return (
        <div className={`alert ${color} mb-1 alert-icon-left`} role="alert">
            <span className="alert-icon"> <i className={icon}></i> </span>
            {message}
        </div>
    );
}

const handleResponse = (response: any) => {
    if (response.status === 0){
        return "";
    }
    let color;
    let icon;
    switch (response.status) {
        case 200:
            color = 'alert-success';
            icon = 'ft-thumbs-up';
            break;
        case 500:
            color = 'alert-danger';
            icon = 'ft-thumbs-down';
            break;
        case 401:
            color = 'alert-warning';
            icon = 'ft-alert-triangle';
            break;
    }
    return (
        <div className={`alert ${color} mb-1 alert-icon-left`} role="alert">
            <span className="alert-icon"> <i className={icon}></i> </span>
            {response.message}
        </div>
    );
}

const ExceptionUtil = {
    handle,
    handleResponse,
}
export default ExceptionUtil;
