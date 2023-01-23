import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";
const useAuth = () => {
    try{
      var enc = new TextEncoder();
      const token = jwt_decode(localStorage.getItem('token'),enc.encode('secret123'))
      //console.log(token);
      const user ={loggedIn:false}
      if(token.role==='admin')
      {user.loggedIn=true}
      else
      {user.loggedIn=false}
    
      return user && user.loggedIn;
    }catch(err){
      return false}
  }
const AdminRoutes = () => {
    const isAuth = useAuth();
    return  isAuth ? <Outlet/> :<Navigate to="/creatorcontinut"/>

}

export default AdminRoutes
