import React from 'react';
import Logo from "../assets/Logo.png"
import bell from "../assets/bell.png"
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from'react-router-dom';

function AgentNavbar() {
  const navigate = useNavigate();
  const {isAgent} = useAuth();
  function handleNewOrder() {
  }
  return (
        <div className="w-full md:w-auto h-[10%] bg-[#171925] flex justify-between pr-10">
          <img src={Logo} alt="AAmigo's Logo" className={"h-[10vh] ml-[10vh]"} />
          <input type="text" placeholder={"Search..."} className={"mr-[3vh] mt-[2vh] mb-[3vh] ml-[15vh] w-[50vh]" +
              " placeholder-gray-500 rounded-2xl border border-gray-500 w-[45vw] h-[4vh] p-4"} />
            <div className='flex '>
          { !isAgent ? (<button onClick={()=>{handleNewOrder , navigate("/customer/newOrder")}} className={"rounded-2xl text-white bg-[#FF4E00] h-[5vh] w-[18vh] mt-[7%] ml-[17%] hover:scale-105 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out" +
              " text-xs"}>Book Now</button>): null};
          <img src={bell} alt="Bell icon" className={"w-[3vh] h-[4vh] mt-[3vh] ml-[2vw] text-white hover:scale-110 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out"}/>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User icon" className={"w-[3vw] h-[6vh] mt-[2vh] ml-[2vw] hover:scale-110 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out"}/>
          </div>
        </div>
        
  );
}

export default AgentNavbar;