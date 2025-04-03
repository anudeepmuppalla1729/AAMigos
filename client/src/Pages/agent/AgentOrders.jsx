import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import OrderCard from '../../components/OrderCard';
import AgentSidebar from '../../components/AgentSideBar';
import AgentNavbar from '../../components/Navbar';
import arrow from '../../assets/arrow.png'
import sampic from '../../assets/s23.png'


function AgentOrders(){

    let device={
        name:"Samsung S23 Ultra",
        pic:sampic,
        status:"Ongoing",
    }
    let request={
        id:1234567890,
    }
    return(
        <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
        <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
        <div className='bg-[#0d1117] h-[88%] w-[20%] flex justify-start items-center pl-11 pt-[2%]'><AgentSidebar/></div>
        <div className='h-[90%] w-[80vw] flex items-center pl-8 '>
            <div className='bg-[#0d1117] h-[85%] w-[90%]'>
                
                <div className='bg-[#161b22] w-[100%] h-[100%] flex flex-col items-center pt-5 rounded-[15px] gap-[1.5vw] overflow-y-scroll scrollbar-hide'>
                    <style jsx>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style> 
                    <h1 className='text-white text-xl'>Your Orders</h1>
                <OrderCard device={device} request={request}/>
                <OrderCard device={device} request={request}/>
                <OrderCard device={device} request={request}/>
                <OrderCard device={device} request={request}/>
                <OrderCard device={device} request={request}/>
                <OrderCard device={device} request={request}/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AgentOrders;