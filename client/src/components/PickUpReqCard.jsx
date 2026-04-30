import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, XCircle } from 'lucide-react';

function PickUpReqCard({ request, decline }) {
    if (!request) return null;

    const acceptOrder = async () => {
        try {
            await axios.post(`/api/agent/approveRequest/${request._id}`);
            decline(request._id);
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <div className='w-full bg-[#2A2D3E]/40 backdrop-blur-md border border-gray-700/50 rounded-2xl flex flex-col justify-between p-5 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-orange-500/30 transition-all duration-300 ease-in-out group'>
            
            <div className='flex flex-col items-center mb-4'>
                <div className='w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-gray-600 group-hover:border-orange-500/50 transition-colors duration-300 p-0.5'>
                    <img 
                      src={request.user?.profilePicture || 'https://via.placeholder.com/150'} 
                      alt="User Profile"
                      className='w-full h-full object-cover rounded-full'
                    />
                </div>
                <h3 className='text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400'>{request.user?.name || 'Unknown User'}</h3>
                <span className="text-xs font-mono px-2 py-1 mt-1 bg-[#171925] text-gray-400 rounded-md border border-gray-700">
                  #{request._id?.slice(-6).toUpperCase()}
                </span>
            </div>

            <div className='flex justify-between gap-3 pt-2 w-full'>
                <button 
                    className='flex items-center justify-center gap-1 flex-1 text-white text-sm font-medium bg-gradient-to-r from-[#FF4E00] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#FF4E00] rounded-full py-2 shadow-md hover:shadow-orange-500/25 transition-all' 
                    onClick={acceptOrder}
                >
                    <CheckCircle2 className="w-4 h-4" />
                    Accept
                </button>
                <button 
                    className='flex items-center justify-center gap-1 flex-1 text-gray-300 text-sm font-medium bg-transparent border border-gray-600 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 rounded-full py-2 transition-all'   
                    onClick={() => decline(request._id)}
                >
                    <XCircle className="w-4 h-4" />
                    Decline
                </button>
            </div>
            
        </div>
    );
}

export default PickUpReqCard;