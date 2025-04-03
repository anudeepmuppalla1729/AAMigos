import React from "react";
import AgentNavbar from "../../components/Navbar";
import AgentSidebar from "../../components/AgentSideBar";
import PickUpReqCard from "../../components/PickUpReqCard";

function AgentPickup() {

    let user = {
        name: "John Doe",
        profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
    let request = {
        id: "1234567890",
        status: "PickedUp",
    }
  return (
     <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
            <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
            <div className='bg-[#0d1117] h-[88%] w-[20%] flex justify-start items-center pl-11 pt-[1%]'><AgentSidebar/></div>
            <div className='h-[85%] w-[80vw] flex  justify-start items-center pl-8'>
                <div className='bg-[#0d1117] h-[95%] w-[89.7%] flex flex-wrap gap-[1.5vw] '>
               
                    
                    <div className='bg-[#161b22] w-[100%] h-[100%] pt-[3%] flex flex-col items-center rounded-[15px] gap-3 mt-[2.5%] overflow-y-scroll scrollbar-hide'>
                    <h2 className="text-white text-xl font-semibold">Pickup Requests</h2>  
                    <style jsx>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>    

                    <div className="flex flex-wrap justify-center gap-5">
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                        <PickUpReqCard user={user} request={request}/>
                    </div>
                </div>

                    </div>
                </div>
            </div>
        
  );
}

export default AgentPickup;