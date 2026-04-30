import React from 'react';
import { MapPin } from 'lucide-react';

function OngoingAssignments({ order }) {
  if (!order) return null;

  return (
    <div className='w-full bg-[#2A2D3E]/40 backdrop-blur-sm border border-gray-700/50 p-3 mt-2 text-white rounded-xl flex justify-between items-center hover:-translate-y-1 hover:shadow-lg hover:border-orange-500/30 transition-all duration-300 ease-in-out group cursor-pointer'>
        <div className='flex items-center gap-x-4 w-full'>
          <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-[#171925] border border-gray-700 group-hover:border-orange-500/50 p-1 flex items-center justify-center transition-colors">
            <img src={order.device?.model?.img || 'https://via.placeholder.com/150'} className='max-w-full max-h-full object-contain drop-shadow-md' alt="Device" />
          </div>
         <div className='flex flex-col'>
            <p className='text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400'>{order.device?.model?.name || 'Unknown Device'}</p>
            <div className="flex items-center mt-0.5">
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#171925] text-gray-400 rounded border border-gray-700">
                #{order._id?.slice(-6).toUpperCase()}
              </span>
            </div>
        </div>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/10 group-hover:bg-orange-500 transition-colors duration-300 shrink-0">
          <MapPin className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300" />
        </div>
    </div>
  );
}

export default OngoingAssignments;