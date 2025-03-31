import React from 'react';
import Logo from "../assets/Logo.png"
import bell from "../assets/bell.png"
function AgentNavbar() {

  function handleNewOrder() {
  }
  return (
        <div className="w-full md:w-auto h-[10%] bg-[#171925] flex">
          <img src={Logo} alt="AAmigo's Logo" className={"h-[10vh] ml-[10vh]"} />
          <input type="text" placeholder={"Search..."} className={"mr-[3vh] mt-[2vh] mb-[3vh] ml-[35vh] w-[50vh]" +
              " placeholder-gray-500 rounded-2xl border border-gray-500 w-[45vw] h-[4vh] p-4"} />
          <button onClick={handleNewOrder} className={"rounded-2xl text-white bg-[#FF4E00] h-[5vh] w-[14vh] mt-[1.2%] ml-[17%]" +
              " text-xs"}>Book Now</button>
          <img src={bell} alt="Bell icon" className={"w-[3vh] h-[4vh] mt-[3vh] ml-[2vw] text-white"}/>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User icon" className={"w-[3vw] h-[6vh] mt-[2vh] ml-[2vw]"}/>
        </div>
        
  );
}

export default AgentNavbar;