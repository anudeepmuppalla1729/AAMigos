import React, {useState , useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import OrderCard from '../../components/OrderCard';
import AgentSidebar from '../../components/AgentSidebar';
import AgentNavbar from '../../components/Navbar';
import { ClipboardList, Filter } from 'lucide-react';

function AgentOrders(){
    const [allOrders , setAllOrders] = useState([]);
    const navigate = useNavigate();

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

    return(
        <div className='bg-[#0d1117] min-h-screen w-full flex flex-col font-sans overflow-x-hidden'>
            <AgentNavbar />
            <div className='flex flex-1 overflow-hidden h-[calc(100vh-80px)]'>
                {/* Sidebar Section */}
                <div className='w-auto md:w-1/4 lg:w-1/5 flex justify-center pt-8'>
                    <AgentSidebar />
                </div>
                
                {/* Main Content Area */}
                <div className='flex-1 h-full p-8 overflow-y-auto custom-scrollbar'>
                    <style jsx>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: #2A2D3E;
                            border-radius: 10px;
                        }
                    `}</style>

                    <div className='bg-[#171925]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 flex flex-col shadow-xl min-h-full'>
                        <div className='flex justify-between items-center mb-8 pb-6 border-b border-gray-800'>
                            <div className='flex items-center gap-3'>
                                <ClipboardList className="w-8 h-8 text-orange-500" />
                                <div>
                                    <h2 className='text-2xl font-bold text-white'>Your Orders</h2>
                                    <p className="text-gray-400 text-sm">Manage and track the progress of all your assigned service orders.</p>
                                </div>
                            </div>
                            
                            <button className="flex items-center gap-2 bg-[#2A2D3E]/40 hover:bg-[#2A2D3E]/60 border border-gray-700 px-4 py-2 rounded-xl text-sm text-gray-300 transition-all">
                                <Filter className="w-4 h-4" />
                                <span>Filter</span>
                            </button>
                        </div>

                        <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar'>
                            {allOrders.length > 0 ? (
                                <div className='flex flex-col gap-4 max-w-4xl mx-auto'>
                                    {allOrders.map((order)=>(
                                        <OrderCard order={order} key={order._id}/>
                                    ))}
                                </div>
                            ) : (
                                <div className='w-full h-64 flex flex-col items-center justify-center bg-[#2A2D3E]/10 rounded-2xl border border-dashed border-gray-800 p-12'>
                                    <ClipboardList className='w-12 h-12 text-gray-700 mb-4' />
                                    <p className='text-gray-500 font-medium'>No Orders Found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentOrders;