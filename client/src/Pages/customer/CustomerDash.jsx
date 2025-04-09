import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import arrow from '../../assets/arrow.png'
import CustomerSidebar from '../../components/CustomerSidebar';
import Navbar from '../../components/Navbar';
import OngoingAssignments from '../../components/OngoingAssignments';
import s23 from '../../assets/s23.png'
import iph from '../../assets/iph.png'
import clock from '../../assets/clock.png'
import personsupport from '../../assets/personsupport.png'
import ipadpro from '../../assets/ipadpro.png'


function CustomerDashboard() {
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
            <div className='w-[100vw] h-[10vh] bg-[#171925]'><Navbar/></div>
            <div className='bg-[#0d1117] h-[88%] w-[20%] flex justify-start items-center pl-11 pt-[2%]'><CustomerSidebar/></div>
            <div className='h-[90%] w-[72vw] flex items-center pl-8'>
                <div className='bg-[#0d1117] h-[85%] w-[100%] flex flex-wrap gap-[1.5vw] '>
                    <div className='bg-[#161b22] w-[48.5%] h-[50%] rounded-[15px] p-[3%] pt-[2%] text-white flex flex-wrap justify-center gap-[15px]'>
                        <h2 className='pb-2'>Active Orders</h2>
                        <OngoingAssignments device = {device} request = {request}/>
                        <OngoingAssignments device = {device} request = {request}/>
                    </div>
                    <div className='bg-[#161b22] w-[48.5%] h-[50%] rounded-[15px] p-[3%] pt-[2%] px-[2.5s%] text-white flex flex-wrap justify-center gap-[15px]'>
                        <h2 className='pb-2'>Requested Orders</h2>
                        <div className='w-[100%] flex justify-between '>
                            <div className='w-[30%] h-full ml-4'>
                                <img src={ipadpro}></img>
                            </div>
                            <div className='w-[60%] h-[100%] flex flex-col justify-between items-center '>
                            <div className='bg-[#23272c] w-[90%] h-[60%] rounded-[10px] mr-3 flex flex-col items-center justify-center shadow-[0px_0px_6px_rgba(0,0,0,0.3)]'>
                                <p className='text-[15px]'>MacBook Air</p>
                                <p className='text-[13px] text-gray-400'>Order ID: #2347685</p>
                            </div>
                            <div className='w-[90%] h-[22%] mb-4 mr-3 ml-3 flex'>
                                <img src={clock} className='h-[100%]'></img>
                                <p className='mt-1.5 ml-1.5 text-sm text-gray-400'> Searching For Agents</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-[#161b22] w-[48.5%] h-[50%] rounded-[15px] p-[3%] pt-[2%] text-white flex flex-wrap justify-center gap-4'>
                        <h2>Payment Summary</h2>
                        <div className='bg-[#22272d] w-[95%] h-[75%] h-[50%] rounded-[15px] flex flex-wrap justify-center items-start hover:scale-102 shadow-[0px_0px_6px_rgba(0,0,0,0.3)] hover:shadow-sm  hover:shadow-[#ffffff]/3 transition-all duration-300 ease-in-out'>
                            <div className='bg-[#2d3238] w-[85%] h-[50%] mt-5 rounded-[15px] p-2.5 pt-3.5 pl-3.5 pr-7 flex justify-between'>
                                <div>
                                    <p className='text-[14px]'>Iphone 15 Pro Max</p>
                                    <p className='text-[10px]'>Order ID: #4569013</p>
                                </div>
                                <div className='pt-0.5 p-0.5 flex flex-col items-center h-[100%]' >
                                    <p className='text-[10px] text-gray-400'>Amount</p>
                                    <p className='text-xl ' >16,000</p>
                                </div>
                            </div>
                            <button className='w-20 h-6 bg-[#ff4e00] rounded-full text-sm hover:bg-[#ff5722] '>Pay</button>
                        </div>
                    </div>
                    <div className='bg-[#161b22] w-[48.5%] h-[50%]  p-[3%] pt-[2%] rounded-[15px] text-white flex flex-col items-center'>
                        <h2>Customer Support</h2>
                        <div className='w-[100%] h-[100%] flex justify-center items-center mt-3 hover:scale-110 hover:shadow-sm  hover:shadow-[#ffffff]/3 transition-all duration-300 ease-in-out'><img src={personsupport}></img></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;