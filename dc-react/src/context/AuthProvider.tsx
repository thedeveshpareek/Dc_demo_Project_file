import {createContext, useContext, useState} from "react";
import {Outlet} from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = () => {
    const [user, setUser] = useState(null);
    const login = (user: any) => {
        setUser(user);
    }
    const logout = () => {
        setUser(null);
    }
    return (
        <AuthContext.Provider value={user}>
           <Outlet/>
        </AuthContext.Provider>
    );
}
export const useAuth=()=>{
    return useContext(AuthContext)
}
