import React, { useState } from 'react';


function PickUpReqCard(props) {
    console.log(props.user);
    console.log(props.request);

    return(
        <div className='h-[90%] w-[27%] bg-[#ffffff]/5 rounded-[12px] flex flex-col justify-start p-[2%] hover:scale-105 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out'>
            <div className='w-100% rounded-full flex justify-center gap-5'>
                <img src = {props.user.profilePic} className='w-[30%] h-[100%]'></img>
            </div>
            <div className='w-100% flex flex-col justify-center items-center'>
            <h3 className='text-white'>{props.user.name}</h3>
            <h4 className='text-xs text-white'>Order Id : {props.request.id}</h4>
            </div>
            <div className='w-100% flex justify-evenly pt-3'>
                <button className='text-white text-[12px] bg-[#be400a] rounded-2xl rounded-xl w-[45%] hover:bg-[#ff5722] transition-colors duration-300'>Accept</button>
                <button className='text-white text-[12px] rounded-xl border-1 border-[#be400a] w-[45%] hover:bg-[#ff00001a] transition-colors duration-300'>Decline</button>
            </div>
            
        </div>
    );
}

export default PickUpReqCard;