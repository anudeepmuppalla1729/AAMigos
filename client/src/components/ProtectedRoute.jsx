import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAgent , setIsAgent } = useAuth();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      console.log(role);
      if (role === 'agent') {
        setIsAgent(true);
      } else if (role === 'customer') {
        setIsAgent(false);
      }
    }
  }, [token, setIsAgent]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const decodedToken = jwtDecode(token);
  let role = decodedToken.role;
  console.log(role);

  // Check if user role matches the allowed role
  if (allowedRole === 'agent' && role == 'customer') {
    return <Navigate to="/customer/dashboard" replace />;
  }
  if (allowedRole === 'customer' && role == 'agent') {
    return <Navigate to="/agent/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;