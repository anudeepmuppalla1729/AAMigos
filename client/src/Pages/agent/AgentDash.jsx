import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import PickUpReqCard from '../../components/PickUpReqCard';
import arrow from '../../assets/arrow.png'
import AgentSidebar from '../../components/AgentSideBar';
import AgentNavbar from '../../components/AgentNavbar';

function AgentDashboard() {
    let user = {
        name: "John Doe",
        profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
    let request = {
        id: "1234567890"
    }

    return (
        <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
            <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
            <div className='bg-[#0d1117] h-[88%] w-[30%] flex justify-center items-center pt-[2%]'><AgentSidebar/></div>
            <div className='h-[90%] w-[70vw] flex  items-center'>
                <div className='bg-[#0d1117] h-[85%] w-[80%] flex flex-wrap gap-[1.5vw]'>
                    <div className='bg-[#161b22] w-[100%] h-[50%] flex flex-wrap rounded-[15px]'>
                        <div className='w-full h-[25%] text-white flex justify-center items-center'>Pick Up Requests</div>
                        <div className='w-full h-[75%] flex justify-evenly'>
                            <PickUpReqCard user={user} request={request} />
                            <PickUpReqCard user={user} request={request}/>
                            <PickUpReqCard user={user} request={request}/>
                            <button className='mb-7'><img src={arrow}></img></button>
                        </div>   
                    </div>
                    <div className='bg-[#161b22] w-[48.5%] h-[50%] rounded-[15px]'></div>
                    <div className='bg-[#161b22] w-[48.5%] h-[50%] rounded-[15px]'></div>
                </div>
            </div>
        </div>
    );
}

export default AgentDashboard;