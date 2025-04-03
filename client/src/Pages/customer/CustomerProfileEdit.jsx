import React from 'react';
import CustomerSidebar from "../../components/CustomerSidebar.jsx";
import Navbar from '../../components/Navbar';
import ProfileEdit from '../../components/ProfileEdit.jsx';


function CustomerProfileEdit() {
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
        <div className='w-[100vw] h-[10%] bg-[#171925]'><Navbar/></div>
        <div className='bg-[#0d1117] h-[88%] w-[20%] flex justify-start items-center pl-11 pt-[1%]'><CustomerSidebar/></div>
        <div className='h-[85%] w-[80vw] flex  justify-start items-center pl-8'>
          <div className='bg-[#0d1117] h-[95%] w-[89.7%] flex flex-wrap gap-[1.5vw] '>


            <div className='bg-[#161b22] w-[100%] h-[100%] pt-[3%] flex flex-col items-center rounded-[15px] gap-3 mt-[2.5%] '>
              <ProfileEdit/>
            </div>

          </div>
        </div>
      </div>
  );
}

export default CustomerProfileEdit;