import React, {useState , useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import OrderCard from '../../components/OrderCard';
import AgentSidebar from '../../components/AgentSideBar';
import AgentNavbar from '../../components/Navbar';
import arrow from '../../assets/arrow.png'
import sampic from '../../assets/s23.png'


function AgentOrders(){
    const [allOrders , setAllOrders] = useState([]);

  useEffect(()=>{
    const fetchAllOrders = async()=>{
      try{
        const res = await axios.get('api/agent/allAssignedRequests');
        if(res.status===200){
          setAllOrders(res.data);
        }
      }catch(err){
        console.log(err);  
      }
    }
    fetchAllOrders();
  },[]);
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
        <div className='h-[90%] w-[80vw] flex items-center pl-13 '>
            <div className='bg-[#0d1117] h-[85.5%] w-[92%]'>
                
                <div className='bg-[#161b22] w-[100%] h-[100%] flex flex-col items-center rounded-[15px] py-7'>
              <div className='sticky top-0 w-full flex justify-center pb-5 z-10 rounded-[15px]'>
                <h1 className='text-white text-xl font-semibold'>Your Orders</h1>
              </div>
              <div className='w-full h-full flex flex-col items-center gap-[2vw] overflow-y-scroll scrollbar-hide'>
                <style jsx>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}</style>
                {allOrders.map((order)=>{
                  return <OrderCard order={order} key={order._id}/>
                })}
              </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default AgentOrders;