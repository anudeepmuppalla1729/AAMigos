import React , {useState , useEffect} from 'react';
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
import CustomerSupport from './Pages/customer/CustomerSupport.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AgentSupport from './Pages/agent/AgentSupport.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerTrack from './Pages/customer/CustomerTrack.jsx';
import AgentTrack from './Pages/agent/AgentTrack.jsx';
import PaymentPage from './Pages/customer/PaymentPage.jsx';
import PackageUpdation from './Pages/agent/PackageUpdation.jsx';
import PackageView from './Pages/agent/PackageView.jsx';
import WaitingForUserResponse from './Pages/agent/waitingForUserResponse.jsx';
import PackageSelection from './Pages/customer/PackageSelection.jsx';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
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
            <Route path={"/agent/support"} element={<ProtectedRoute allowedRole="agent"><AgentSupport /></ProtectedRoute>}/>
            <Route path={"/agent/track/:reqId"} element={<ProtectedRoute allowedRole="agent"><AgentTrack /></ProtectedRoute>}/>
            <Route path={"/agent/track/:reqId/:nextCount"} element={<ProtectedRoute allowedRole="agent"><AgentTrack /></ProtectedRoute>}/>
            <Route path={"/agent/packageUpdation/:reqId/:status"} element={<ProtectedRoute allowedRole="agent"><PackageUpdation /></ProtectedRoute>}/>
            <Route path={"/agent/packageView"} element={<ProtectedRoute allowedRole="agent"><PackageView /></ProtectedRoute>}/>
            <Route path={"/agent/waitingForUserResponse"} element={<ProtectedRoute allowedRole="agent"><WaitingForUserResponse /></ProtectedRoute>}/>
            <Route path={"/customer/dashboard"} element={<ProtectedRoute allowedRole="customer"><CustomerDashboard /></ProtectedRoute>}/>
            <Route path={"/customer/orders"} element={<ProtectedRoute allowedRole="customer"><CustomerOrder /></ProtectedRoute>}/>
            <Route path={"/customer/profile"} element={<ProtectedRoute allowedRole="customer"><CustomerProfile /></ProtectedRoute>}/>
            <Route path={"/customer/editProfile"} element={<ProtectedRoute allowedRole="customer"><CustomerProfileEdit /></ProtectedRoute>}/>
            <Route path={"/customer/newOrder"} element={<ProtectedRoute allowedRole="customer"><NewOrder /></ProtectedRoute>}/>
            <Route path={"/customer/support"} element={<ProtectedRoute allowedRole="customer"><CustomerSupport /></ProtectedRoute>}/>
            <Route path={"/customer/track/:reqId"} element={<ProtectedRoute allowedRole="customer"><CustomerTrack /></ProtectedRoute>}/>
            <Route path={"/customer/track/:reqId/:Package"} element={<ProtectedRoute allowedRole="customer"><CustomerTrack /></ProtectedRoute>}/>
            <Route path={"/customer/payment"} element={<ProtectedRoute allowedRole="customer"><PaymentPage /></ProtectedRoute>}/>
            <Route path={"/customer/packageSelection/:reqId"} element={<ProtectedRoute allowedRole="customer"><PackageSelection /></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
}

export default App
