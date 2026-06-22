import React from 'react'
import { Navigate, Outlet } from "react-router"

const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    if(!isAuthenticated){
         return <Navigate to="/login" replace />;
    }

 return <Outlet />;
}

export default ProtectedRoutes
