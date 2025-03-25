import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Logo from '../assets/Logo.png'

function LogInSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }

      if (isRegistering) {
        const response = await axios.post("http://localhost:3000/api/auth/user/register", {
          email,
          password
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("Registration Successful!");
        navigate('/name-phone-photo');
      } else {
        const response = await axios.post("http://localhost:3000/api/auth/user/login", {
          email,
          password
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("LogIn Successful!");
        navigate('/Dashboard');
      }

    } catch (error) {
      alert(isRegistering ? "Registration Failed" : "LogInSignUp Failed");
      console.log(error);
    }
  };

  return (
      <>
        <div>
          <img src={Logo} alt="AAmigo's Logo" />
          {isRegistering ? <h3>Sign Up</h3> : <h3>Log In</h3>}
          <form onSubmit={handleSubmit}>
            <input
                type="email"
                className='border border-black rounded-md p-2'
                placeholder={"Email Id"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              {isRegistering ? "Sign Up" : "Log In"}
            </button>
          </form>
        </div>

        <div>
          <h1>Hello, AAmigo's</h1>
          {isRegistering ? (
              <>
                <h4>Already A User?</h4>
                <button type="button" onClick={() => setIsRegistering(false)}>
                  Log In
                </button>
              </>
          ) : (
              <>
                <h4>Not A User?</h4>
                <button type="button" onClick={() => setIsRegistering(true)}>
                  Sign Up
                </button>
              </>
          )}
        </div>
      </>
  );
}


export default LogInSignUp;