import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Logo from '../assets/Logo.png'
import { useAuth } from '../context/AuthContext.jsx';

function LogInSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isAgent } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }

      console.log(isAgent);
      if(!isAgent){
        if (isRegistering) {
        const response = await axios.post("http://localhost:3000/api/auth/user/register", {
          email,
          password
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("Registration Successful!");
        navigate('/user/setupProfile');
      } else {
        const response = await axios.post("http://localhost:3000/api/auth/user/login", {
          email,
          password
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("LogIn Successful!");
        navigate('/Dashboard');
      }
    }
    else{
      if (isRegistering) {
        const response = await axios.post("http://localhost:3000/api/auth/agent/register", {
          email,
          password
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("Registration Successful!");
        navigate('/agent/setupProfile');
      } else {
        const response = await axios.post("http://localhost:3000/api/auth/agent/login", {
          email,
          password
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("Login Successful!");
        navigate('/Agent/Dashboard');
      } 
    }
    } catch (error) {
      // alert(isRegistering ? "Registration Failed" : "LogInSignUp Failed");'
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className='bg-[#0d1117] min-h-screen flex items-center justify-center p-4'>
      <div className='bg-[#1A1D22] w-full max-w-[800px] flex flex-col md:flex-row justify-start rounded-[15px] overflow-hidden'>
        <div className='w-full md:w-[45%] bg-[#BF400A] py-12 md:py-0 md:rounded-r-[120px] rounded-t-[15px] md:rounded-l-[15px] flex items-center'>
          <div className='flex flex-col items-center justify-center w-full space-y-4 px-4'>
            <h1 className='text-white text-3xl md:text-3xl'>Hello, AAmigo's</h1>
            {isRegistering ? (
              <div className='flex flex-col items-center space-y-3'>
                <h4 className='text-white'>Already A User?</h4>
                <button type="button" onClick={() => setIsRegistering(false)} className='border border-black rounded-[10px] w-24 py-1 text-white hover:bg-white hover:text-[#BF400A] transition-colors'>
                  Log In
                </button>
              </div>
            ) : (
              <div className='flex flex-col items-center space-y-3'>
                <h4 className='text-white'>Not A User?</h4>
                <button type="button" onClick={() => setIsRegistering(true)} className='border border-black rounded-[10px] w-24 py-1 text-white hover:bg-white hover:text-[#BF400A] transition-colors'>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='w-full md:w-[55%] p-6 md:p-12'>
          <img src={Logo} alt="AAmigo's Logo" className='w-[70%] max-w-[350px] mx-auto '/>
          <div className='text-center'>
            <h3 className='text-white text-xl mb-6'>{isRegistering ? 'Sign Up' : 'Log In'}</h3>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
              <input
                type="email"
                className='bg-[#3d4045] rounded-md p-2 text-white w-full max-w-[400px] mb-4'
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative w-full max-w-[400px] mb-6">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-[#3d4045] rounded-md p-2 text-white w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-[#bf400a] transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
              <button type="submit" className='bg-[#bf400a] text-white rounded-md px-6 py-2 hover:bg-[#a33508] transition-colors'>
                {isRegistering ? "Sign Up" : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default LogInSignUp;