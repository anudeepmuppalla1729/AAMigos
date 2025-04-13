import React, { useState, useEffect } from 'react';
import ipadpro from '../assets/ipadpro.png';
import s23 from '../assets/s23.png'; // Assuming you have an image for s2
import clock from '../assets/clock.png';
import iph from '../assets/iph.png';

const RequestedOrdersCarousel = ({ orders }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Mock data for demonstration
    const mockOrders = [
        { id: '#2347685', name: 'MacBook Air', image: ipadpro },
        { id: '#2347686', name: 'iPhone 14 Pro', image: s23 },
        { id: '#2347687', name: 'iPad Pro', image: iph },
    ];

    const displayOrders = orders || mockOrders;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === displayOrders.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    });

    return (
        <div className='w-[100%] flex justify-between overflow-hidden h-[70%]'>
            <div className='w-[30%] h-full ml-4'>
                <img 
                    src={displayOrders[currentIndex].image} 
                    alt={displayOrders[currentIndex].name}
                    className='transition-transform duration-500 ease-in-out h-full'
                />
            </div>
            <div className='w-[60%] h-[100%] flex flex-col justify-between items-center'>
                <div className='bg-[#23272c] w-[90%] h-[60%] rounded-[10px] mr-3 flex flex-col items-center justify-center shadow-[0px_0px_6px_rgba(0,0,0,0.3)] transition-opacity duration-500'>
                    <p className='text-[15px]'>{displayOrders[currentIndex].name}</p>
                    <p className='text-[13px] text-gray-400'>Order ID: {displayOrders[currentIndex].id}</p>
                </div>
                <div className='w-[90%] h-[22%] mb-4 mr-3 ml-3 flex'>
                    <img src={clock} className='h-[100%]' alt="clock"/>
                    <p className='mt-1.5 ml-1.5 text-sm text-gray-400'> Searching For Agents</p>
                </div>
            </div>
        </div>
    );
};

export default RequestedOrdersCarousel;