import React, { useState } from 'react';
import axios from 'axios';


function PickUpReqCard(props) {
    const acceptOrder = () => {
        try{
            axios.post(`api/agent/approveRequest/${props.request._id}`)
            props.decline(props.request._id);
        }catch(error){
            console.log(error);
        }
    }

    const declineOrder = (id) => {
        props.decline(id);
    }

    return(
        <div className='h-[26vh] w-[27%] bg-[#ffffff]/5 rounded-[12px] flex flex-col justify-start p-[1%] hover:scale-105 shadow-[0px_0px_12px_rgba(0,0,0,0.3)] hover:shadow-l  hover:shadow-[#ffffff]/3 transition-all duration-300 ease-in-out  '>
            <div className='w-100% rounded-full flex justify-center overflow-hidden mb-1'>
                <img src = {props.request.user.profilePicture} className='w-[30%] h-[100%] object-cover rounded-full'></img>
            </div>
            <div className='w-100% flex flex-col justify-center items-center'>
            <h3 className='text-white'>{props.request.user.name}</h3>
            <h4 className='text-xs text-white'>Order Id : #{props.request._id.slice(-6).toUpperCase()}</h4>
            </div>
            <div className='w-100% flex justify-evenly pt-3'>
                <button className='text-white text-[12px] bg-[#be400a] rounded-2xl rounded-xl w-[45%] hover:bg-[#ff5722] transition-colors duration-300 pb-0.5' onClick={acceptOrder}>Accept</button>
                <button className='text-white text-[12px] rounded-xl border-1 border-[#be400a] w-[45%] hover:bg-[#ff00001a] transition-colors duration-300 pb-0.5'   onClick={() => declineOrder(props.request._id)}>Decline</button>
            </div>
            
        </div>
    );
}

export default PickUpReqCard;