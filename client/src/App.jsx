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
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/login"} element={<LogInSignUp />}/>
            <Route path={'/user/setupProfile'} element={<UserProfileSetup />} />
            <Route path={'/agent/setupProfile'} element={<AgentProfileSetup />} />
            <Route path={"/agent/dashboard"} element={<AgentDashboard />}/>
            {/* <Route path={"/agent/dashboard"} element={<AgentDashboard />}/> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
}

export default App
