import React, {useState} from 'react';
import axios from 'axios';
import Logo from "../../assets/Logo.png";
import { useNavigate } from 'react-router-dom';

function UserProfileSetup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dno, setDno] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleProfilePicChange = (e) => {
    const imageFile = e.target.files[0]
    if (!imageFile) {
      alert("No file selected");
      return;
    }
    setProfilePic(imageFile)
    setPreviewUrl(URL.createObjectURL(imageFile));
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!name || !phone) {
        alert("Please fill all the required fields in step 1");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!dno || !street || !city || !pincode) {
        alert("Please fill all the required fields in step 2");
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("dno", dno);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("pincode", pincode);
    formData.append("profilePic", profilePic);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        alert("Authentication token missing");
        return;
      }
      
      const response = await axios.post("http://localhost:3000/api/setup/user/setupProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });
      console.log("Details are saved.", response.data);
      alert("Profile setup successful!");
      navigate('/customer/Dashboard');
    } catch (error) {
      console.error("Error uploading profile:", error);
      console.error("Error details:", error.response ? error.response.data : error.message);
      alert(`Error: ${error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message}`);
    }
  };

  return (
    <div className='w-screen h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-4'>
      <img src={Logo} alt="AAMigo's Logo" className='w-[60%] max-w-[200px] mb-2'/>
      <div className='bg-[#10141a] w-full max-w-[400px] p-6 rounded-[20px] border border-gray-700 relative'>
        {currentStep !== 1 && (
          <button 
            onClick={() => setCurrentStep(prevStep => prevStep - 1)} 
            className='absolute top-4 left-4 text-white hover:text-[#BF400A] transition-colors'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        )}
        
        {/* Step indicator */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full ${currentStep >= 1 ? 'bg-[#BF400A]' : 'bg-gray-600'}`}></div>
            <div className={`h-[2px] w-4 ${currentStep >= 2 ? 'bg-[#BF400A]' : 'bg-gray-600'}`}></div>
            <div className={`h-2 w-2 rounded-full ${currentStep >= 2 ? 'bg-[#BF400A]' : 'bg-gray-600'}`}></div>
          </div>
        </div>
        
        {/* Step 1: Profile Details */}
        {currentStep === 1 ? (
          <form className='flex flex-col items-center gap-8 mt-8'>
            <div className='flex flex-col items-center'>
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

            <div className='w-full max-w-[320px] space-y-6'>
              <div className='flex flex-col space-y-2'>
                <label htmlFor="nameInput" className='text-sm text-gray-300'>Name</label>
                <input 
                  type="text" 
                  id={"nameInput"} 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='bg-[#2d3035] rounded-[12px] p-3 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#BF400A]'
                />
              </div>

              <div className='flex flex-col space-y-2'>
                <label htmlFor={"phoneInput"} className='text-sm text-gray-300'>Contact no.</label>
                <input 
                  type="number" 
                  id={"phoneInput"} 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='bg-[#2d3035] rounded-[12px] p-3 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#BF400A]'
                />
              </div>
            </div>

            <div className='w-full max-w-[320px] flex justify-center mt-4'>
              <button 
                type="button"
                onClick={handleNextStep}
                className='bg-[#BF400A] text-white rounded-[12px] px-6 py-2 hover:bg-[#a33508] transition-colors'
              >
                Next
              </button>
            </div>
          </form>
        ) : (
          // Step 2: Address Details
          <form className='flex flex-col items-center gap-3 mt-2'>
            <h2 className="text-lg font-semibold">Address Details</h2>
            <div className='w-full max-w-[320px] space-y-2'>
              <div className='flex flex-col space-y-1'>
                <label htmlFor={"dnoInput"} className='text-sm text-gray-300'>Door No/Building Name</label>
                <input 
                  type="text" 
                  id={"dnoInput"} 
                  value={dno}
                  onChange={(e) => setDno(e.target.value)}
                  className='bg-[#2d3035] rounded-[12px] p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#BF400A]'
                />
              </div>

              <div className='flex flex-col space-y-1'>
                <label htmlFor={"streetInput"} className='text-sm text-gray-300'>Street Name and Locality</label>
                <textarea 
                  id={"streetInput"} 
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className='bg-[#2d3035] rounded-[12px] p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#BF400A] resize-none'
                  rows={2}
                />
              </div>

              <div className='flex flex-col space-y-1'>
                <label htmlFor={"cityInput"} className='text-sm text-gray-300'>City</label>
                <input 
                  type="text" 
                  id={"cityInput"} 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className='bg-[#2d3035] rounded-[12px] p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#BF400A]'
                />
              </div>

              <div className='flex flex-col space-y-1'>
                <label htmlFor={"pincodeInput"} className='text-sm text-gray-300'>Pincode</label>
                <input 
                  type="text" 
                  id={"pincodeInput"} 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className='bg-[#2d3035] rounded-[12px] p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#BF400A]'
                />
              </div>
            </div>

            <div className='w-full max-w-[320px] flex justify-center mt-4'>
              <button 
                type="button"
                onClick={handleNextStep}
                className='bg-[#BF400A] text-white rounded-[12px] px-6 py-2 hover:bg-[#a33508] transition-colors'
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserProfileSetup;