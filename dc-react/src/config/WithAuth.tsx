import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from "../services/AuthService";

const WithAuth = (allowedRoles:string[]) => (Component:any) => {
    return class WithAuth extends React.Component {
        render() {
            if (AuthService.isAuthenticate()) {
                const role = AuthService.getCurrentUser().roles[0];
                if (allowedRoles.includes(role.name)) {
                    return <Component {...this.props} />;
                }
                return <Navigate to="/unauthorized" />;
            }else{
                return <Navigate to="/login" />;
            }
        }
    }
}

export default WithAuth;
