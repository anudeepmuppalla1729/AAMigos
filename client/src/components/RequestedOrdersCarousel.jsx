import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const RequestedOrdersCarousel = ({ orders }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (!orders || orders.length <= 1) return;
        
        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === orders.length - 1 ? 0 : prevIndex + 1
                );
                setAnimate(false);
            }, 300); // Smoother fade duration
        }, 3500);

        return () => clearInterval(interval);
    }, [orders]);

    if (!orders || orders.length === 0) return null;

    return (
        <div className='w-full h-full flex flex-col items-center justify-center p-6 relative gap-4'>
            {/* IMAGE CONTAINER */}
            <div className='w-full flex-1 relative overflow-hidden flex items-center justify-center min-h-[100px]'>
                {orders.map((order, index) => (
                    <img
                        key={order._id}
                        src={order.device?.model?.img || 'https://via.placeholder.com/150'}
                        alt={order.device?.model?.name}
                        className={`
                            absolute max-w-[80%] max-h-[120px] object-contain transition-all duration-700 ease-in-out drop-shadow-xl
                            ${index === currentIndex ? 'opacity-100 scale-100 translate-y-0 z-10' : 'opacity-0 scale-95 translate-y-4 z-0'}
                        `}
                    />
                ))}
            </div>

            {/* ORDER DETAILS */}
            <div className='w-full flex flex-col justify-end items-center gap-y-3 mt-auto'>
                <div className={`bg-[#2A2D3E]/50 backdrop-blur-md border border-gray-700/50 w-full rounded-2xl flex flex-col items-center justify-center py-3 px-4 shadow-lg
                    transform transition-all duration-300
                    ${animate ? 'opacity-0 scale-95 -translate-y-2' : 'opacity-100 scale-100 translate-y-0'}
                `}>
                    <p className='text-base font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400'>
                        {orders[currentIndex].device?.model?.name || 'Unknown Device'}
                    </p>
                    <span className='mt-1.5 text-xs font-mono px-2.5 py-1 bg-[#171925] text-gray-400 rounded-md border border-gray-700'>
                        #{orders[currentIndex]._id?.slice(-6).toUpperCase()}
                    </span>
                </div>
                
                <div className='flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2.5 rounded-xl w-full justify-center'>
                    <Search className='w-4 h-4 text-orange-400 animate-pulse shrink-0' />
                    <p className='text-sm font-medium text-orange-400 tracking-wide'>Searching For Agents...</p>
                </div>
            </div>
        </div>
    );
};

export default RequestedOrdersCarousel;
