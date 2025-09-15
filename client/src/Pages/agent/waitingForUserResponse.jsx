import React from "react";
import AgentNavbar from "../../components/Navbar.jsx";
import AgentSidebar from "../../components/AgentSideBar.jsx";
export default function WaitingForUserResponse() {
  return (
    <div className="bg-[#0d1117] h-screen w-screen flex flex-col text-white">
       <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap overflow-hidden'>
            <div className='w-[100vw] h-[10vh] bg-[#171925]'><AgentNavbar/></div>
            <div className='bg-[#0d1117] h-[90vh] w-[20%] flex justify-start items-center pl-11'><AgentSidebar/></div>
          <div className="w-[80%] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full size-14 border-t-2 border-b-2 border-[#bf400a] mb-4"></div>
              <h2 className="text-xl mb-2">Waiting for User To Select The Package</h2>
            </div>
          </div>
        </div>
    </div>
    
  )

}