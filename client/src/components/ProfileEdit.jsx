import React, {useState} from 'react';
import {useAuth} from "../context/AuthContext.jsx";

const ProfileEdit = () => {
  const {isAgent} = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const handleProfilePicChange = (e) => {
    const imageFile = e.target.files[0]
    if (!imageFile) {
      alert("No file selected");
      return;
    }
    setProfilePic(imageFile)
    setPreviewUrl(URL.createObjectURL(imageFile));
  };
  return (
    <div className="text-white flex flex-col  overflow-y-scroll scrollbar-hide justify-evenly w-[80%] gap-y-4 ">
     <style jsx>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>
      <div className='flex items-center justify-center mb-2'>
      <div className='relative'>
                <div className='w-24 h-24 rounded-full bg-[#2d3035] overflow-hidden flex items-center justify-center'>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile Preview" className='w-full h-full object-cover'/>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )}
                </div>
                <input 
                  type="file" 
                  accept={"image/*"} 
                  onChange={handleProfilePicChange}
                  className='hidden'
                  id="profilePicInput"
                />
                <label 
                  htmlFor="profilePicInput"
                  className='absolute bottom-0 right-0 bg-[#BF400A] p-2 rounded-full cursor-pointer hover:bg-[#a33508] transition-colors'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </label>
              </div>
              </div>
      <div className='flex flex-col justify-evenly pl-6 bg-[#ffffff]/5 rounded-[15px] p-5 gap-y-4'>
      <h2 className='pl-2 '> Agent Info</h2>
      <div className='flex flex-col gap-y-0.5 pl-11'>
        <label htmlFor='name' className='pl-3'>Name</label>
        <input type='text' id='name' className='w-[80%] bg-[rgba(255, 255, 255, 0.02)] pl-3 border-gray-400 border-[0.3px] rounded-[15px] py-1 gap-x-2 mb-2'></input>
        <label htmlFor='contactnum' className='pl-3' >Contact Number</label>
        <input type='tel' id='contactnum' className='w-[80%] bg-[rgba(255, 255, 255, 0.02)]  pl-3 border-gray-400 border-[0.3px]  rounded-[15px] py-1 gap-x-2 mb-2'></input>
        <label htmlFor='email' className='pl-3'>Email ID</label>
        <input type='email' id='email' className='w-[80%] bg-[rgba(255, 255, 255, 0.02)]  pl-3 border-gray-400 border-[0.3px]  rounded-[15px] py-1 gap-x-2 mb-2'></input></div>
      </div>
      <div className='flex flex-col justify-evenly pl-6 bg-[#ffffff]/5 rounded-[15px] p-5 gap-y-4'>
      <h2 className='pl-2 '>Address Details</h2>
      <div className='flex flex-col gap-y-0.5 pl-11'>
        <label htmlFor='doorno' className='pl-3'>Door No./ Apartment Name</label>
        <input type='text' id='name' className='w-[80%] bg-[rgba(255, 255, 255, 0.02)]  pl-3 border-gray-400 border-[0.3px]  rounded-[15px] py-1 gap-x-2 mb-2'></input>
        <label htmlFor='sname' className='pl-3'>Street Name/ Area Name, Near LandMark</label>
        <input type='text' id='sname' className='w-[80%] bg-[rgba(255, 255, 255, 0.02)]  pl-3 border-gray-400 border-[0.3px]  rounded-[15px] py-1 gap-x-2 mb-2'></input>
        <div className='flex gap-x-2'> <div className='flex flex-col'><label htmlFor='city' className='pl-3'>City</label>
        <input type='text' id='city' className='w-[80%] bg-[rgba(255, 255, 255, 0.02)]  pl-3 border-gray-400 border-[0.3px]  rounded-[15px] py-1 gap-x-2 mb-2'></input></div>
       <div className='flex flex-col'> <label htmlFor='pincode' className='pl-3'>Pin Code</label>
        <input type='text' id='pincode' className='w-[80%] bg-[rgba(255, 255, 255, 0.02)]  pl-3 border-gray-400 border-[0.3px]  rounded-[15px] py-1 gap-x-2 mb-2'></input></div></div></div>
    </div>
      { isAgent ? (
          <div className='flex flex-col justify-evenly pl-6 bg-[#ffffff]/5 rounded-[15px] p-5 gap-y-4'>
        <h2 className='pl-2 '> Identification Details</h2>
        <div className='flex  gap-x-3 pl-11'>
          <div className='flex flex-col'>
            <label htmlFor='aadhar'className='pl-3'>Aadhar Number</label>
            <input type='text' id='aadhar' className='w-[18vw] bg-[rgba(255, 255, 255, 0.02)]  pl-3 border-gray-400 border-[0.3px]  rounded-[15px] py-1 gap-x-2 mb-2 pl-3'></input>
          </div>
          <div className='flex flex-col '>
            <label htmlFor='pan' className='pl-3'>PAN Number</label>
            <input type='text' id='pan' className='w-[18vw] bg-[rgba(255, 255, 255, 0.02)]  pl-3 border-gray-400 border-[0.3px]  rounded-[15px] py-1 gap-x-2 mb-2 pl-3'></input></div>
        </div>
      </div>
       ) : null
      }
      <div className='w-full flex justify-center items-center  my-7'>
        <button type="submit" className='w-[40%] bg-[#bf400a] rounded-[15px] py-2'> Submit </button>
      </div>

    </div>
  );
};

export default ProfileEdit;