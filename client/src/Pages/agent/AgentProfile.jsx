import React from "react";
import AgentNavbar from "../../components/Navbar.jsx";
import AgentSidebar from "../../components/AgentSideBar.jsx";
import { useNavigate } from "react-router-dom";

function AgentProfilePage() {
    const navigate = useNavigate();
  const address = {
    dno: "10-24",
    streetName: "streetivalli",
    city: "New York",
    pincode: "123456"
  }
  const agent = {
    name: "John Doe",
    profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    contactNumber: "2345678901",
    emailId: "johndoe@gmail.com",
    address: address,
  }

  return (
      <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
        <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
        <div className='bg-[#0d1117] h-[88%] w-[20vw] flex justify-center pl-6 items-center pt-[2%]'><AgentSidebar/></div>
        <div className='h-[90%] w-[80vw] flex flex-col items-center text-white justify-evenly'>
          <div className="flex flex-col items-center text-white justify-evenly w-[100%] h-[100%]" >
            <div>
              <h1 className={"text-2xl py-3 mt-3 mr-10"}>My Profile</h1>
              <img src={agent.profilePic} alt="profile pic" className={"size-20 ml-3"}/>
            </div>
          <div className={"flex justify-end w-full pr-9 translate-y-3 mr-48"}>
            <button className="cursor-pointer" onClick={()=>{navigate("/agent/editProfile")}}>
                <div className="flex">
                <img className ="w-5 h-4 mt-1" src="https://img.icons8.com/?size=100&id=111452&format=png&color=FFFFFF"></img>Edit Details
                </div>
            </button>
          </div>
          <div className={"flex flex-col justify-evenly"}>
            <div className={"bg-[#ffffff]/5 w-[65vw] min-h flex flex-col justify-center rounded-2xl mr-15 mb-3"}>
              <div className={"pl-4 text-[13px] p-4"}>
                <h3 className={" text-sm font-[600] pb-2"}>Details :</h3>
                <h5 className={"py-1"}>Name: {agent.name}</h5>
                <h5 className={"py-1"}>Contact Number: {agent.contactNumber}</h5>
                <h5 className={"py-1"}>Email ID: {agent.emailId}</h5>
              </div>
            </div> <div className={"bg-[#ffffff]/5 w-[65vw] min-h flex flex-col justify-center rounded-2xl mb-10" +
              " mr-15" +
              " mt-2"}>
              <div className={"pl-4 text-[13px] p-4"}>
                <h3 className={" text-sm font-[600] pb-2"}>Address Details :</h3>
                <h5 className={"py-1"}>Door no. {agent.address.dno}</h5>
                <h5 className={"py-1"}>{agent.address.streetName}</h5>
                <h5 className={"py-1"}>{agent.address.pincode}</h5>
              </div>
            </div>

          </div>
          </div>
        </div>
      </div>
  );
}

export default AgentProfilePage;