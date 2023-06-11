import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';

const ProtectedRoute = (props) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return props.children;
  } 
  
  return <Navigate to="/login" replace />;
  
};


export default ProtectedRoute;