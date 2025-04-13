import React from 'react';
import ReactDOM from 'react-dom/client'
import './App.css'
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import './index.css';
import LogInSignUp from "./Pages/LogInSignUp.jsx";
import UserProfileSetup from './Pages/profileSetup/UserProfileSetup.jsx';
import AgentProfileSetup from './Pages/profileSetup/AgentProfileSetup.jsx';
import Home from "./Pages/Home.jsx";
import AgentDashboard from './Pages/agent/AgentDash.jsx';
import AgentPickup from './Pages/agent/AgentPickup.jsx';
import AgentProfilePage from './Pages/agent/AgentProfile.jsx';
import AgentOrders from './Pages/agent/AgentOrders.jsx';
import AgentProfileEdit from './Pages/agent/AgentProfileEdit.jsx';
import CustomerDashboard from './Pages/customer/CustomerDash.jsx';
import CustomerOrder from './Pages/customer/CustomerOrder.jsx';
import CustomerProfile from './Pages/customer/CustomerProfile.jsx';
import CustomerProfileEdit from './Pages/customer/CustomerProfileEdit.jsx';
import NewOrder from './Pages/customer/NewOrder.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"*"} element={<Home />}/>
            <Route path={"/login"} element={<LogInSignUp />}/>
            <Route path={'/customer/setupProfile'} element={<UserProfileSetup />} />
            <Route path={'/agent/setupProfile'} element={<AgentProfileSetup />} />
            <Route path={"/agent/dashboard"} element={<ProtectedRoute allowedRole="agent"><AgentDashboard /></ProtectedRoute>}/>
            <Route path={"/agent/pickup"} element={<ProtectedRoute allowedRole="agent"><AgentPickup /></ProtectedRoute>}/>
            <Route path={"/agent/profile"} element={<ProtectedRoute allowedRole="agent"><AgentProfilePage /></ProtectedRoute>}/>
            <Route path={"/agent/orders"} element={<ProtectedRoute allowedRole="agent"><AgentOrders /></ProtectedRoute>}/>
            <Route path={"/agent/editProfile"} element={<ProtectedRoute allowedRole="agent"><AgentProfileEdit /></ProtectedRoute>}/>
            <Route path={"/customer/dashboard"} element={<ProtectedRoute allowedRole="customer"><CustomerDashboard /></ProtectedRoute>}/>
            <Route path={"/customer/orders"} element={<ProtectedRoute allowedRole="customer"><CustomerOrder /></ProtectedRoute>}/>
            <Route path={"/customer/profile"} element={<ProtectedRoute allowedRole="customer"><CustomerProfile /></ProtectedRoute>}/>
            <Route path={"/customer/editProfile"} element={<ProtectedRoute allowedRole="customer"><CustomerProfileEdit /></ProtectedRoute>}/>
            <Route path={"/customer/newOrder"} element={<ProtectedRoute allowedRole="customer"><NewOrder /></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
}

export default App
