import React, {useState , useEffect , useRef} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import CustomerSidebar from '../../components/CustomerSidebar';
import Navbar from '../../components/Navbar';
import OngoingAssignments from '../../components/OngoingAssignments';
import RequestedOrdersCarousel from '../../components/RequestedOrdersCarousel';
import { Headset, MessageSquare, PhoneCall, ReceiptText } from 'lucide-react';

function CustomerDashboard() {
    const navigate = useNavigate();
    const [pendingOrders, setPendingOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);

    const pendingOrdersFetch = useRef(false)
    const activeOrdersFetch = useRef(false)

    useEffect(()=>{
        if (activeOrdersFetch.current) return;
        activeOrdersFetch.current = true;
        const fetchActiveOrders = async () => {
            try {
                const res = await axios.get('/api/customer/activeOrders');
                setActiveOrders(res.data);
            } catch (error) {
                console.error("Error fetching active orders:", error);
            }
        } 
        fetchActiveOrders();
    },[]);
    
    useEffect(()=>{
        if (pendingOrdersFetch.current) return;
        pendingOrdersFetch.current = true;
        const fetchPendingOrders = async () => {
            try {
                const res = await axios.get(`/api/customer/pendingOrders`);
                if(res.status === 200){
                    setPendingOrders(res.data);
                } 
            }
            catch(error){
                console.log(error);
            }
        }
        fetchPendingOrders();
    } ,[])

    const latestOrder = activeOrders.length > 0 ? activeOrders[0] : null;

    return (
        <div className='bg-[#0d1117] min-h-screen w-full flex flex-col font-sans'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden h-[calc(100vh-80px)]'>
                {/* Sidebar Section */}
                <div className='w-auto md:w-1/4 lg:w-1/5 flex justify-center pt-8'>
                    <CustomerSidebar />
                </div>
                
                {/* Main Dashboard Area */}
                <div className='flex-1 h-full p-8 overflow-y-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 h-full'>
                        
                        {/* Active Orders Panel */}
                        <div className='bg-[#171925]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 flex flex-col shadow-xl'>
                            <h2 className='text-xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400'>Active Orders</h2>
                            <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar'>
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
                                {activeOrders.length > 0 ? (
                                    <div className="flex flex-col gap-3">
                                        {activeOrders.map((order) => (
                                            <OngoingAssignments order={order} key={order._id}/>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='w-full h-full flex items-center justify-center'>
                                        <p className='text-gray-500 font-medium'>No Active Orders</p>
                                    </div> 
                                )}
                            </div>
                        </div>

                        {/* Requested Orders Panel */}
                        <div className='bg-[#171925]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 flex flex-col shadow-xl'>
                            <h2 className='text-xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400'>Requested Orders</h2>
                            <div className='flex-1 flex items-center justify-center bg-[#2A2D3E]/20 rounded-xl border border-gray-700/50 overflow-hidden'>
                                {pendingOrders.length > 0 ? (
                                    <RequestedOrdersCarousel orders={pendingOrders}/> 
                                ) : (
                                    <p className='text-gray-500 font-medium'>No Pending Orders</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Payment Summary Panel */}
                        <div className='bg-[#171925]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 flex flex-col shadow-xl'>
                            <div className="flex items-center gap-2 mb-6">
                                <ReceiptText className="w-6 h-6 text-orange-500" />
                                <h2 className='text-xl font-bold text-white'>Payment Summary</h2>
                            </div>
                            
                            {latestOrder ? (
                                <div className='flex-1 bg-[#2A2D3E]/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 flex flex-col justify-between hover:border-orange-500/30 transition-colors group relative overflow-hidden'>
                                    {/* Decorative Gradient Blob */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                    
                                    <div>
                                        <p className='text-sm text-gray-400 font-medium uppercase tracking-wider mb-1'>Last Order</p>
                                        <p className='text-xl text-white font-semibold'>{latestOrder.device?.model?.name || 'Unknown Device'}</p>
                                        <p className='text-sm text-gray-500 font-mono mt-1'>Order ID: #{latestOrder._id?.slice(-6).toUpperCase()}</p>
                                    </div>
                                    
                                    <div className="border-t border-dashed border-gray-700 my-4"></div>
                                    
                                    <div className='flex justify-between items-end relative z-10'>
                                        <div>
                                            <p className='text-sm text-gray-400 mb-1'>Total Amount</p>
                                            <p className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400'>
                                                {latestOrder.cost ? `₹${latestOrder.cost}` : 'Pending'}
                                            </p>
                                        </div>
                                        <button 
                                            className='bg-gradient-to-r from-[#FF4E00] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#FF4E00] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5'
                                            onClick={() => navigate("/customer/payment")}
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex-1 flex items-center justify-center bg-[#2A2D3E]/20 rounded-xl border border-gray-700/50'>
                                    <p className='text-gray-500 font-medium'>No pending payments</p>
                                </div>
                            )}
                        </div>

                        {/* Customer Support Panel */}
                        <div className='bg-[#171925]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 flex flex-col shadow-xl overflow-hidden relative group'>
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent z-0 pointer-events-none"></div>
                            
                            <h2 className='text-xl font-bold text-white mb-6 relative z-10'>Customer Support</h2>
                            
                            <div className='flex-1 flex flex-col items-center justify-center relative z-10 space-y-6'>
                                <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <Headset className="w-10 h-10 text-orange-500" />
                                </div>
                                
                                <div className="text-center space-y-2">
                                    <h3 className="text-lg text-white font-medium">Need Help?</h3>
                                    <p className="text-sm text-gray-400 max-w-[250px] mx-auto">Our support team is available 24/7 to resolve your issues.</p>
                                </div>
                                
                                <div className="flex gap-4 w-full justify-center">
                                    <button className="flex items-center gap-2 bg-[#2A2D3E] hover:bg-[#34384e] border border-gray-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
                                        <MessageSquare className="w-4 h-4" />
                                        Chat
                                    </button>
                                    <button className="flex items-center gap-2 bg-gradient-to-r from-[#FF4E00] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#FF4E00] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-orange-500/25">
                                        <PhoneCall className="w-4 h-4" />
                                        Call Us
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;