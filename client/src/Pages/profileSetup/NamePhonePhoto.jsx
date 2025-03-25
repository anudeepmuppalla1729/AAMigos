import React, {useState} from 'react';
// import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Logo from "../../assets/Logo.png"
// import {preview} from "vite";

function NamePhonePhoto() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  const handleProfilePicChange = (e) => {
    const imageFile = e.target.files[0]
    if (!imageFile) {
      alert("No file selected");
    }
    setProfilePic(imageFile)
    setPreviewUrl(URL.createObjectURL(imageFile));
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!profilePic) {
        alert("Please select a profile Picture")
        return;
      }
      if (!name || !phone) {
        alert("Please Fill both the name and password")
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("profilePic", profilePic);

      try {
        const response = await axios.post("http://localhost:3000/api/setup/user/setupProfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log("Details are saved.", response.data);
      } catch (error) {
        console.error("Error uploading profile:", error);
      }

    };
    return (
        <>
          <img src={Logo} alt="AAMigo's Logo"/>
          <form onSubmit={handleSubmit} >
            <input type="file" accept={"image/*"} onClick={handleProfilePicChange}/>
            {previewUrl && <img src={previewUrl} alt="Profile Pic Preview "/>}

            <label htmlFor="nameInput">Name</label>
            <input type="text" id={"nameInput"} onChange={(e) => setName(e.target.value)}
                   placeholder={"Enter Name..."}/>

            <label htmlFor={"phoneInput"}>Contact no.</label>
            <input type="number" id={"phoneInput"} onChange={(e) => setPhone(e.target.value)}
                   placeholder={"Enter Contact Number..."}/>

            <button type={"submit"}>Next</button>
          </form>
        </>
    )
}
export default NamePhonePhoto;