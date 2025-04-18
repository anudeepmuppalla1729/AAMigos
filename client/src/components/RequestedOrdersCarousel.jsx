import React, { useState, useEffect } from 'react';
import clock from '../assets/clock.png';

const RequestedOrdersCarousel = ({ orders }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === orders.length - 1 ? 0 : prevIndex + 1
                );
                setAnimate(false);
            }, 200); // Duration of fade out
        }, 3000);

        return () => clearInterval(interval);
    }, [orders]);

    return (
        <div className='w-[100%] flex justify-between overflow-hidden h-[70%] relative'>
            {/* IMAGE CONTAINER */}
            <div className='w-[30%] h-full ml-4 relative overflow-hidden'>
                {orders.map((order, index) => (
                    <img
                        key={order._id}
                        src={order.device.model.img}
                        alt={order.device.model.name}
                        className={`
                            absolute top-0 left-0 w-full h-full object-contain transition-all duration-700 ease-in-out
                            ${index === currentIndex ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-10 z-0'}
                        `}
                    />
                ))}
            </div>

            {/* ORDER DETAILS */}
            <div className='w-[60%] h-full flex flex-col justify-between items-center'>
                <div className={`bg-[#23272c] w-[90%] h-[60%] rounded-[10px] mr-3 flex flex-col items-center justify-center shadow-[0px_0px_6px_rgba(0,0,0,0.3)]
                    transform transition-all duration-500
                    ${animate ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}
                `}>
                    <p className='text-[15px]'>{orders[currentIndex].device.model.name}</p>
                    <p className='text-[13px] text-gray-400'>
                        Order ID: #{orders[currentIndex]._id.slice(-6).toUpperCase()}
                    </p>
                </div>
                <div className='w-[90%] h-[22%] mb-4 mr-3 ml-3 flex'>
                    <img src={clock} className='h-full' alt="clock" />
                    <p className='mt-1.5 ml-1.5 text-sm text-gray-400'> Searching For Agents</p>
                </div>
            </div>
        </div>
    );
};

export default RequestedOrdersCarousel;
