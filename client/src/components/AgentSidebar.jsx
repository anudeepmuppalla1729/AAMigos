import React from 'react';
import dashboard from "../assets/dashboard.png";
import orders from "../assets/orders.png";
import settings from "../assets/settings.png";
import support from "../assets/support.png";
import OrdersForAgent from "../assets/pickups.png";
import { useNavigate } from 'react-router-dom';

function AgentSidebar() {
  const navigate = useNavigate();
  const gradientStyle = {
    background:
        "linear-gradient(to bottom, rgba(255, 92, 141, 0.3), rgba(255, 177, 153, 0.3))",
  };

  return (
      
        <div
            className="h-[70vh] w-[90%] md:w-[80%] lg:w-[15vw] rounded-2xl shadow-lg flex flex-col justify-evenly px-4 md:px-6 lg:pl-7 py-4 md:py-6 transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out"
            style={gradientStyle}
        >
          <div className="flex items-center text-white cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all duration-200 " onClick={()=>{navigate("/agent/dashboard")}}>
            <div className="text-xl">
              <span><img src={dashboard} alt="dashboard" className="w-5 h-5 md:w-5 md:h-5 lg:w-5 lg:h-5"/></span>
            </div>
            <span className="text-sm md:text-base font-medium ml-2 whitespace-nowrap" >Dashboard</span>
          </div>

          <div className="flex items-center text-white cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all duration-200" onClick={()=>{navigate("/agent/pickup")}}>
            <div className="text-xl">
              <span><img src={orders} alt="orders icon" className="w-5 h-5 md:w-5 md:h-5 lg:w-5 lg:h-5"/></span>
            </div>
            <span className="text-sm md:text-base font-medium ml-2 whitespace-nowrap">PickUps</span>
          </div>

          <div className="flex items-center text-white cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all duration-200" onClick={()=>{navigate("/agent/orders")}}>
            <div className="text-xl">
              <span><img src={OrdersForAgent} alt="orders icon" className="w-5 h-5 md:w-5 md:h-5 lg:w-5 lg:h-5"/></span>
            </div>
            <span className="text-sm md:text-base font-medium ml-2 whitespace-nowrap">Orders</span>
          </div>

          <div className="flex items-center text-white cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all duration-200" onClick={()=>{navigate("/agent/profile")}}>
            <div className="text-xl">
              <span><img src={settings} alt="settings icon" className="w-5 h-5 md:w-5 md:h-5 lg:w-5 lg:h-5"/></span>
            </div>
            <span className="text-sm md:text-base font-medium ml-2 whitespace-nowrap">Profile</span>
          </div>

          <div className="flex items-center text-white cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all duration-200">
            <div className="text-xl">
              <span><img src={support} alt="support icon" className="w-5 h-5 md:w-5 md:h-5 lg:w-5 lg:h-5"/></span>
            </div>
            <span className="text-sm md:text-base font-medium ml-2 whitespace-nowrap">Support</span>
          </div>
        </div>
     
  );
}

export default AgentSidebar;