import React from 'react';
import Logo from '../assets/Logo.png'
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Home(){
    const { isAgent, setIsAgent } = useAuth();
    const navigate = useNavigate();

    return (
        <div className='bg-[#0d1117] min-h-screen flex items-center justify-center p-4'>
            <div className='bg-[#1A1D22] w-full max-w-[800px] flex flex-col items-center justify-center p-8 rounded-[15px]'>
                <img src={Logo} alt="AAMigo's Logo" className='w-[70%] max-w-[350px] mb-8'/>
                <div className='flex flex-col items-center justify-center gap-4 w-full max-w-[300px]'>
                    <button className='bg-[#BF400A] text-white rounded-[15px] px-6 py-3 w-full hover:bg-[#a33508] transition-colors' onClick={() => {
                        setIsAgent(true);
                        navigate('/login');
                    }}>Agent</button>
                    <button className='bg-[#BF400A] text-white rounded-[15px] px-6 py-3 w-full hover:bg-[#a33508] transition-colors' onClick={() => {
                        setIsAgent(false);
                        navigate('/login');
                    }}>User</button>
                </div>
            </div>
        </div>
    );
}

export default Home;