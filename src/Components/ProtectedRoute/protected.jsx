import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Auth from '../Auth/Auth';

const Protected = () => {
  const token = Cookies.get('token');

  
  if (!token) {
    console.log(token,"token")
    return <Navigate to="/" />;
  }

 
  return <Outlet />;
};

export default Protected;
