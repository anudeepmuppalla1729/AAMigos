import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import PickUpReqCard from '../../components/PickUpReqCard';
import arrow from '../../assets/arrow.png'
import AgentSidebar from '../../components/AgentSideBar';
import AgentNavbar from '../../components/Navbar';
import OngoingAssignments from '../../components/OngoingAssignments';
import s23 from '../../assets/s23.png'


function AgentDashboard() {
    const navigate = useNavigate();
    let user = {
        name: "John Doe",
        profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
    let request = {
        id: "1234567890",
        status: "PickedUp",
    }

    const [time] = useState(new Date().toLocaleDateString("en-IN"));
    let device = {
    name: "Samsung s23 Ultra",
    cost: 13000
    }

    return (
        <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
            <div className='w-[100vw] h-[10vh] bg-[#171925]'><AgentNavbar/></div>
            <div className='bg-[#0d1117] h-[88%] w-[20%] flex justify-start items-center pl-11 pt-[2%]'><AgentSidebar/></div>
            <div className='h-[90%] w-[72vw] flex items-center pl-8'>
                <div className='bg-[#0d1117] h-[85%] w-[100%] flex flex-wrap gap-[1.5vw] '>
                    <div className='bg-[#161b22] w-[100%] h-[50%] flex flex-wrap rounded-[15px] '>
                        <div className='w-full h-[25%] text-white flex justify-center items-center'>Pick Up Requests</div>
                        <div className='w-full h-[75%] flex justify-evenly'>
                            <PickUpReqCard user={user} request={request} />
                            <PickUpReqCard user={user} request={request}/>
                            <PickUpReqCard user={user} request={request}/>
                            <button className='mb-7 hover:scale-110 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out' onClick={()=>{navigate("/agent/pickup")}}><img src={arrow}></img></button>
                        </div>   
                    </div>
                    <div className='bg-[#161b22] w-[48.5%] h-[50%] rounded-[15px] p-[3%] text-white flex flex-wrap justify-center gap-[15px]'>
                        <h2>Ongoing Assignments</h2>
                        <OngoingAssignments device = {device} request = {request}/>
                        <OngoingAssignments device = {device} request = {request}/>
                    </div>
                    <div className='bg-[#161b22] w-[48.5%] h-[50%] rounded-[15px] text-white flex flex-col justify-between'>
                        <div className="flex flex-col items-center pt-3">
                            <h3 className="text-3xl pl-2">39,000/-</h3>
                            <h5 className="text-[10px]">Earned Till {time}</h5>
                        </div>

                        <div className={"flex flex-col px-10"}>
                            <div className={"flex justify-between pl-6 pr-6 pt-3"}>
                            <span className={"flex flex-col items-center "}> 
                                <h3 className={"text-[13px]"}>{device.name}</h3>
                                <h3 className={"text-[13px]"}>(Order ID: {request.id})</h3>
                            </span>
                                <h3 className={"mt-2 text-[14px]"}>{device.cost}/-</h3>
                            </div>

                            <div className={"flex justify-between p-1 pl-6 pr-6"}>
                            <span className={"flex flex-col items-center"}>
                                <h3 className={"text-[13px]"}>{device.name}</h3>
                                <h3 className={"text-[13px]"}>(Order ID: {request.id})</h3>
                            </span>
                                <h3 className={"mt-2 text-[14px]"}>{device.cost}/-</h3>
                            </div>

                            <div className={"flex justify-between p-1 pl-6 pr-6 pb-7"}>
                            <span className={"flex flex-col items-center"}>
                                <h3 className={"text-[13px]"}>{device.name}</h3>
                                <h3 className={"text-[13px]"}>(Order ID: {request.id})</h3>
                            </span>
                                <h3 className={"mt-2 text-[13px]"}>{device.cost}/-</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentDashboard;