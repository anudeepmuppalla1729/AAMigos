import React, { useState } from 'react';


function PickUpReqCard(props) {
    console.log(props.user);
    console.log(props.request);

    return(
        <div className='h-[26vh] w-[27%] bg-[#ffffff]/5 rounded-[12px] flex flex-col justify-start p-[1%] hover:scale-105 shadow-[0px_0px_12px_rgba(0,0,0,0.3)] hover:shadow-l  hover:shadow-[#ffffff]/3 transition-all duration-300 ease-in-out  '>
            <div className='w-100% rounded-full flex justify-center '>
                <img src = {props.user.profilePic} className='w-[30%] h-[100%]'></img>
            </div>
            <div className='w-100% flex flex-col justify-center items-center'>
            <h3 className='text-white'>{props.user.name}</h3>
            <h4 className='text-xs text-white'>Order Id : {props.request.id}</h4>
            </div>
            <div className='w-100% flex justify-evenly pt-3'>
                <button className='text-white text-[12px] bg-[#be400a] rounded-2xl rounded-xl w-[45%] hover:bg-[#ff5722] transition-colors duration-300 pb-0.5'>Accept</button>
                <button className='text-white text-[12px] rounded-xl border-1 border-[#be400a] w-[45%] hover:bg-[#ff00001a] transition-colors duration-300 pb-0.5'>Decline</button>
            </div>
            
        </div>
    );
}

export default PickUpReqCard;