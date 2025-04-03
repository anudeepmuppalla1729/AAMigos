import React from "react";
import completed from "../assets/completed icon.png";
function CustomerOrderCard(props){
  return(
      <div className="bg-[#ffffff]/5 w-[90%] h-[20%] flex items-center justify-between px-8 rounded-[15px] text-white hover:scale-102 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out">
        {/* Left Section: Device Image and Name */}
        <div className="flex items-center gap-x-5">
          <img src={props.device.pic} className="w-[50px] h-[80px] object-cover rounded-md " alt="Device" />
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">{props.device.name}</h3>
            <h4 className="text-sm text-gray-400">Order ID: #{props.request.id}</h4>
          </div>
        </div>

        {/* Right Section: Status and Arrow Button */}
        <div className="flex items-center">
          <div className="flex items-center">
            {props.device.status === "ongoing" && (
                <div className="flex gap-x-10">
                  <button className="bg-[#bf400a] pl-5 pr-5 pb-0.5 font-light rounded-[15px] text-[15px]">Pay</button>
                  <button className="bg-[#bf400a] pl-5 pr-5 pb-0.5 font-light rounded-[15px] text-[15px]">Track</button>
                </div>
            )}

            {props.device.status === "Paid" && (
                <div className="flex gap-x-10">
                  <span className={"flex"}>
                    <img src={completed} alt="completed icon" className={"size-6 mt-0.5"}/>
                    <div className={"text-[15px] pl-0.5 pt-0.5"}>Paid</div>
                  </span>
                  <button className="bg-[#bf400a] pl-5 pr-5 pb-0.5 font-light rounded-[15px] text-[15px]">Track</button>
                </div>
            )}

            {props.device.status === "Completed" && (
                <span className={"flex"}>
                    <img src={completed} alt="completed icon" className={"size-6 mt-0.5"}/>
                    <div className={"text-[15px] pl-0.5 pt-0.5"}>Completed</div>
                  </span>
            )}
          </div>
        </div>
      </div>

  )
}

export default CustomerOrderCard;