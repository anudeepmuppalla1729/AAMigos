import React, { useState , useEffect } from "react";
import AgentNavbar from "../../components/Navbar.jsx";
import CustomerSidebar from "../../components/CustomerSidebar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerProfile() {
  const navigate = useNavigate();
  const [user , setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/customer/getDetails`);
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  } , [])

  return (
      <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
        <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
        <div className='bg-[#0d1117] h-[88%] w-[21%] flex justify-center pl-5.5 items-center pt-[2%] pr-5.5'><CustomerSidebar/></div>
        <div className='h-[90%] w-[79%] flex flex-col items-center text-white justify-evenly'>
          {loading ? (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-xl">Loading profile data...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-white justify-evenly w-[100%] h-[100%]" >
              <div>
                <h1 className={"text-2xl py-3 mt-3 mr-10"}>My Profile</h1>
                <img src={user.profilePicture} alt="profile pic" className={"size-25 ml-1 rounded-full"}/>
              </div>
            <div className={"flex justify-end w-full pr-9 translate-y-3 mr-48"}>
              <button className="cursor-pointer" onClick={()=>{navigate("/customer/editProfile")}}>
                  <div className="flex">
                  <img className ="w-5 h-4 mt-1" src="https://img.icons8.com/?size=100&id=111452&format=png&color=FFFFFF"></img>Edit Details
                  </div>
              </button>
            </div>
            <div className={"flex flex-col justify-evenly"}>
              <div className={"bg-[#ffffff]/5 w-[65vw] min-h flex flex-col justify-center rounded-2xl mr-15 mb-3"}>
                <div className={"pl-4 text-[13px] p-4"}>
                  <h3 className={" text-sm font-[600] pb-2"}>Details :</h3>
                  <h5 className={"py-1"}>Name: {user.name}</h5>
                  <h5 className={"py-1"}>Contact Number: {user.phone}</h5>
                  <h5 className={"py-1"}>Email ID: {user.email}</h5>
                </div>
              </div> <div className={"bg-[#ffffff]/5 w-[65vw] min-h flex flex-col justify-center rounded-2xl mb-10" +
                " mr-15" +
                " mt-2"}>
                <div className={"pl-4 text-[13px] p-4"}>
                  <h3 className={" text-sm font-[600] pb-2"}>Address Details :</h3>
                  <h5 className={"py-1"}>Door no. {user.address.dno}</h5>
                  <h5 className={"py-1"}>{user.address.street}</h5>
                  <h5 className={"py-1"}>{user.address.pincode}</h5>
                </div>
              </div>

            </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default CustomerProfile;