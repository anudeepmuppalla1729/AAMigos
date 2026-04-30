import React , {useState, useEffect} from 'react';
import Logo from "../assets/Logo.png"
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { Search, LogOut } from 'lucide-react';

function AgentNavbar() {
  const navigate = useNavigate();
  const {isAgent , setIsAgent} = useAuth();
  const [pic , setPic] = useState("");
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  useEffect(()=>{
    const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.role);
      const role = decodedToken.role;
      if (role === 'agent') {
          setIsAgent(true);
      } else if (role === 'customer') {
          setIsAgent(false);
      }
  } 
  }, [])
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    if(role === 'agent'){
     axios.get("/api/agent/getDetails").then((res)=>{
       if(res.data){
         let user = res.data;
         console.log(user.profilePicture); // Log the profilePic property to check its value
         setPic(user.profilePicture)
       }
     }).catch((err)=>{
       console.log(err);
     })
    }
    else{
      axios.get("/api/customer/getDetails").then((res)=>{
        if(res.data){
          let user = res.data;
          console.log(user)
          setPic(user.profilePicture);
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
  } , [])
  return (
    <nav className="w-full sticky top-0 z-50 h-[80px] bg-[#171925]/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4 sm:px-8 shadow-xl transition-all duration-300">
      
      {/* Logo Section */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img src={Logo} alt="AAmigo's Logo" className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300" />
      </div>

      {/* Search Bar Section */}
      <div className="flex-1 max-w-xl mx-8 hidden lg:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" />
          </div>
          <input 
            type="text" 
            placeholder="Search for services..." 
            className="w-full bg-[#2A2D3E]/80 text-gray-200 text-sm rounded-full pl-11 pr-4 py-2.5 outline-none border border-transparent focus:border-orange-500/50 focus:bg-[#1E2130] focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 shadow-inner"
          />
        </div>
      </div>

      {/* Right Actions Section */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        { !isAgent && (
          <button 
            onClick={() => navigate("/customer/newOrder")} 
            className="hidden sm:flex items-center justify-center rounded-full text-white bg-gradient-to-r from-[#FF4E00] to-[#FF7A00] px-6 py-2 text-sm font-semibold hover:scale-105 hover:shadow-[0_0_15px_rgba(255,78,0,0.4)] transition-all duration-300"
          >
            Book Now
          </button>
        )}
        
        {/* Profile Picture */}
        <div className="relative group cursor-pointer" onClick={() => navigate(`/${isAgent ? 'agent' : 'customer'}/profile`)}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
          <img 
            src={pic || "https://ui-avatars.com/api/?name=User&background=2A2D3E&color=fff"} 
            alt="User Profile" 
            className="relative rounded-full w-10 h-10 object-cover ring-2 ring-gray-700 group-hover:ring-orange-500 transition-all duration-300"
          />
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-2 rounded-full text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default AgentNavbar;