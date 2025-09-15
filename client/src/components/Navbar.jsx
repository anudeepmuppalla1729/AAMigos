import React , {useState, useEffect} from 'react';
import Logo from "../assets/Logo.png"
import bell from "../assets/bell.png"
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function AgentNavbar() {
  const navigate = useNavigate();
  const {isAgent , setIsAgent} = useAuth();
  const [pic , setPic] = useState("");
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
        <div className="w-full md:w-auto h-[10%] bg-[#171925] flex justify-between pr-10">
          <img src={Logo} alt="AAmigo's Logo" className={"h-[10vh] ml-[8vh]"} />
          <input type="text" placeholder={"Search..."} className={"mr-[3vh] mt-[2vh] mb-[3vh] ml-[15vh] w-[50vh]" +
              " placeholder-gray-500 rounded-2xl border border-gray-500 w-[45vw] h-[4vh] p-4"} />
            <div className='flex '>
          { !isAgent ? (<button onClick={()=>{navigate("/customer/newOrder")}} className={"rounded-2xl text-white bg-[#FF4E00] h-[5vh] w-[18vh] mt-[7%] ml-[17%] hover:scale-105 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out" +
              " text-xs"}>Book Now</button>): null}
          <img src={bell} alt="Bell icon" className={"w-[3vh] h-[4vh] mt-[3vh] ml-[2vw] text-white hover:scale-110 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out"}/>
          <img src={pic} alt="User icon" className={"rounded-full w-[3vw] h-[6vh] mt-[2vh] ml-[2vw] hover:scale-110 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out"}/>
          </div>
        </div>
        
  );
}

export default AgentNavbar;