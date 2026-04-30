import React from "react";
import { CheckCircle2, Clock, CreditCard, Navigation, PackageCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomerOrderCard({ order }) {
  const navigate = useNavigate();
  
  if (!order) return null;

  return(
    <div className="bg-[#2A2D3E]/40 backdrop-blur-md border border-gray-700/50 w-[90%] md:w-full flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl text-white hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-orange-500/30 transition-all duration-300 ease-in-out group">
      
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
      <div className="flex items-center justify-end w-full md:w-[40%]">
        
        {/* Track / Pay actions */}
        {["Approved", "FreeApproval", "PickedUp", "InRepair", "Delivering"].includes(order.status) && (
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 bg-gray-800 text-gray-200 hover:text-white px-5 py-2 rounded-full text-sm font-medium border border-gray-700 hover:border-gray-500 hover:bg-gray-700 transition-all shadow-sm"
              onClick={() => navigate(`/customer/track/${order._id}`)}
            >
              <Navigation className="w-4 h-4" />
              Track
            </button>
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF4E00] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#FF4E00] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-orange-500/25 transition-all"
              onClick={() => navigate("/customer/payment")}
            >
              <CreditCard className="w-4 h-4" />
              Pay
            </button>
          </div>
        )}

        {/* Paid Status */}
        {order.status === "Paid" && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Paid</span>
            </div>
            <button 
              className="flex items-center gap-2 bg-gray-800 text-gray-200 hover:text-white px-5 py-2 rounded-full text-sm font-medium border border-gray-700 hover:border-gray-500 hover:bg-gray-700 transition-all shadow-sm"
              onClick={() => navigate(`/customer/track/${order._id}`)}
            >
              <Navigation className="w-4 h-4" />
              Track
            </button>
          </div>
        )}

        {/* Completed Status */}
        {order.status === "Completed" && (
          <div className="flex items-center gap-2 text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/20">
            <PackageCheck className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide">Completed</span>
          </div>
        )}

        {/* Pending Status */}
        {order.status === "Pending" && (
          <div className="flex items-center gap-2 text-orange-400 bg-orange-400/10 px-4 py-2 rounded-full border border-orange-400/20">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Request Pending</span>
          </div>
        )}

      </div>
    </div>
  )
}

export default CustomerOrderCard;