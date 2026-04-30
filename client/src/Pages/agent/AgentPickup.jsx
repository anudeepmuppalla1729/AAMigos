import React , {useState , useEffect} from "react";
import AgentNavbar from "../../components/Navbar";
import AgentSidebar from "../../components/AgentSidebar";
import PickUpReqCard from "../../components/PickUpReqCard";
import axios from "axios";
import { Briefcase } from "lucide-react";

function AgentPickup() {
    const [pendingOrders, setPendingOrders] = useState([]);

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
    }, [])

  return (
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
                    <div className='flex items-center gap-3 mb-8 pb-6 border-b border-gray-800'>
                        <Briefcase className="w-8 h-8 text-orange-500" />
                        <div>
                            <h2 className='text-2xl font-bold text-white'>Pickup Requests</h2>
                            <p className="text-gray-400 text-sm">View and manage all available service requests in your area.</p>
                        </div>
                    </div>

                    {pendingOrders.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center bg-[#2A2D3E]/10 rounded-2xl border border-dashed border-gray-800 p-12">
                            <Briefcase className="w-16 h-16 text-gray-700 mb-4" />
                            <p className="text-gray-500 text-lg font-medium">No pending requests at the moment</p>
                            <p className="text-gray-600 text-sm">New requests will appear here as they come in.</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                            {pendingOrders.map((order) => (
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
        </div>
    </div>
  );
}

export default AgentPickup;