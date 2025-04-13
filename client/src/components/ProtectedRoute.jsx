import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAgent , setIsAgent } = useAuth();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (token) {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    if (role === 'agent') {
        setIsAgent(true);
    } else if (role === 'customer') {
        setIsAgent(false);
    }
 }

  // Check if user role matches the allowed role
  if (allowedRole === 'agent' && !isAgent) {
    return <Navigate to="/customer/dashboard" replace />;
  }
  if (allowedRole === 'customer' && isAgent) {
    return <Navigate to="/agent/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;