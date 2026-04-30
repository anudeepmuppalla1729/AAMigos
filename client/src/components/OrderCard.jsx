import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Order({ order }) {
    const navigate = useNavigate();
    
    if (!order) return null;

    return(
        <div 
            className="bg-[#2A2D3E]/40 backdrop-blur-md border border-gray-700/50 w-[90%] md:w-full flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl text-white cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-orange-500/30 transition-all duration-300 ease-in-out group"
            onClick={() => navigate(`/agent/track/${order._id}`)}
        >
            {/* Left Section: Device Image and Name */}
            <div className="flex items-center gap-x-6 w-full md:w-[60%] mb-4 md:mb-0">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#171925] border border-gray-700 group-hover:border-orange-500/50 transition-colors duration-300 p-2 flex items-center justify-center">
                    <img src={order.device?.model?.img || 'https://via.placeholder.com/150'} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Device" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">{order.device?.model?.name || 'Unknown Device'}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono px-2 py-1 bg-[#171925] text-gray-400 rounded-md border border-gray-700">
                            #{order._id?.slice(-6).toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Section: Status and Arrow Button */}
            <div className="flex items-center justify-between md:justify-end w-full md:w-[40%] gap-6 pr-2">
                <div className="flex flex-col items-end gap-1">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h4>
                    <span className="text-sm font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-200 shadow-sm">
                        {order.status}
                    </span>
                </div>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 group-hover:border-transparent transition-all duration-300 shadow-sm">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </button>
            </div>
        </div>
    )
}

export default Order;