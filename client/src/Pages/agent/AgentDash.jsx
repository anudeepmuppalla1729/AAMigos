import React, {useState , useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import PickUpReqCard from '../../components/PickUpReqCard';
import { ArrowRight, Briefcase, IndianRupee, TrendingUp } from 'lucide-react';
import AgentSidebar from '../../components/AgentSidebar';
import AgentNavbar from '../../components/Navbar';
import OngoingAssignments from '../../components/OngoingAssignments';

function AgentDashboard() {
    const navigate = useNavigate();
    const [pendingOrders , setPendingOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [allAssignedRequests, setAllAssignedRequests] = useState([]);
    
    const handleDeclinedRequest = async (declinedOrderId) => {
        const declinedOrders = JSON.parse(localStorage.getItem('declinedOrders') || '[]');
        if (!declinedOrders.includes(declinedOrderId)) {
            declinedOrders.push(declinedOrderId);
            localStorage.setItem('declinedOrders', JSON.stringify(declinedOrders));
        }
        setPendingOrders((pendingOrders) => pendingOrders.filter((order) => order._id !== declinedOrderId));
    }

    useEffect(()=>{
        const fetchPendingOrders = async () => {
            try {
                const res = await axios.get(`/api/agent/pendingRequests`);
                if(res.status === 200){
                    const declinedOrders = JSON.parse(localStorage.getItem('declinedOrders') || '[]');
                    const filteredOrders = res.data.filter(order => !declinedOrders.includes(order._id));
                    setPendingOrders(filteredOrders);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPendingOrders();

        const fetchActiveOrders = async () => {
            try {
                const res = await axios.get(`/api/agent/onGoingRequests`);
                if(res.status === 200){
                    setActiveOrders(res.data);
                }
            } catch (error) {
                console.error(error); 
            }
        }
        fetchActiveOrders();

        const fetchAllAssigned = async () => {
            try {
                const res = await axios.get(`/api/agent/allAssignedRequests`);
                if(res.status === 200){
                    setAllAssignedRequests(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllAssigned();
    }, []);

    const [time] = useState(new Date().toLocaleDateString("en-IN"));

    return (
        <div className='bg-[#0d1117] min-h-screen w-full flex flex-col font-sans overflow-x-hidden'>
            <AgentNavbar />
            <div className='flex flex-1 overflow-hidden h-[calc(100vh-80px)]'>
                {/* Sidebar Section */}
                <div className='w-auto md:w-1/4 lg:w-1/5 flex justify-center pt-8'>
                    <AgentSidebar />
                </div>
                
                {/* Main Dashboard Area */}
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
                    
                    <div className='flex flex-col gap-8 h-full'>
                        
                        {/* Pick Up Requests Section */}
                        <div className='bg-[#171925]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 flex flex-col shadow-xl'>
                            <div className='flex justify-between items-center mb-6'>
                                <div className='flex items-center gap-2'>
                                    <Briefcase className="w-6 h-6 text-orange-500" />
                                    <h2 className='text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400'>Pick Up Requests</h2>
                                </div>
                                {pendingOrders.length > 3 && (
                                    <button 
                                        onClick={() => navigate("/agent/pickup")}
                                        className='flex items-center gap-1 text-sm text-orange-500 hover:text-orange-400 font-medium transition-colors group'
                                    >
                                        View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}
                            </div>

                            <div className='flex-1'>
                                {pendingOrders.length === 0 ? (
                                    <div className="h-40 w-full flex items-center justify-center bg-[#2A2D3E]/20 rounded-xl border border-dashed border-gray-700">
                                        <p className="text-gray-500 font-medium">No Pending Requests</p>
                                    </div>
                                ) : (
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        {pendingOrders.slice(0, 3).map((order) => (
                                            <PickUpReqCard 
                                                request={order} 
                                                key={order._id} 
                                                decline={() => handleDeclinedRequest(order._id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {/* Ongoing Assignments Panel */}
                            <div className='bg-[#171925]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 flex flex-col shadow-xl min-h-[400px]'>
                                <h2 className='text-xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400'>Ongoing Assignments</h2>
                                <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar'>
                                    {activeOrders.length > 0 ? (
                                        <div className='flex flex-col gap-3'>
                                            {activeOrders.map((order) => (
                                                <OngoingAssignments key={order._id} order={order}/>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center bg-[#2A2D3E]/10 rounded-xl border border-dashed border-gray-800'>
                                            <p className='text-gray-500 font-medium'>No Ongoing Assignments</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Earnings & Stats Panel */}
                            <div className='bg-[#171925]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 flex flex-col shadow-xl'>
                                <div className='flex items-center gap-2 mb-8'>
                                    <TrendingUp className="w-6 h-6 text-green-500" />
                                    <h2 className='text-xl font-bold text-white'>Earnings Summary</h2>
                                </div>

                                <div className='flex-1 flex flex-col gap-6'>
                                    {/* Total Earnings Card */}
                                    <div className='bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden group'>
                                        <div className='absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500'></div>
                                        <p className='text-gray-400 text-sm font-medium uppercase tracking-widest mb-2'>Total Earned Till {time}</p>
                                        <div className='flex items-center gap-1'>
                                            <IndianRupee className='w-8 h-8 text-orange-500' />
                                            <h3 className='text-5xl font-black text-white'>
                                                {allAssignedRequests.reduce((acc, curr) => acc + (curr.amountDue || 0), 0).toLocaleString()}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className='flex-1 bg-[#2A2D3E]/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 flex flex-col'>
                                        <h4 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4'>Recent Transactions</h4>
                                        <div className='space-y-4 overflow-y-auto custom-scrollbar max-h-[200px]'>
                                            {allAssignedRequests.length > 0 ? (
                                                allAssignedRequests.slice(0, 5).map((req) => (
                                                    <div key={req._id} className='flex justify-between items-center py-2 border-b border-gray-700/50 last:border-0'>
                                                        <div className='flex flex-col'>
                                                            <span className='text-sm text-white font-medium truncate max-w-[150px]'>
                                                                {req.device?.model?.name || 'Device Request'}
                                                            </span>
                                                            <span className='text-[10px] text-gray-500 font-mono'>#{req._id.slice(-6).toUpperCase()}</span>
                                                        </div>
                                                        <span className='text-sm font-bold text-green-400'>+₹{req.amountDue || 0}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className='text-gray-500 text-center py-4'>No transactions yet</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentDashboard;