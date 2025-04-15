import React from "react";
import completed from "../assets/completed icon.png";
import clock from "../assets/clock.png";
function CustomerOrderCard(props){
  console.log(props.order);
  return(
      <div className="bg-[#ffffff]/5 w-[90%] h-[20%] flex items-center justify-between px-10 py-5 rounded-[15px] text-white hover:scale-102 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out">
        {/* Left Section: Device Image and Name */}
        <div className="flex items-center gap-x-5 w-[40%]">
          <div className="w-[15%] h-full mr-2">
            <img src={props.order.device.model.img} className="w-[90%] rounded-md" alt="Device" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">{props.order.device.model.name}</h3>
            <h4 className="text-sm text-gray-400">Order ID: #{props.order._id.slice(-6).toUpperCase()}</h4>
          </div>
        </div>

        {/* Right Section: Status and Arrow Button */}
        <div className="flex items-center">
          <div className="flex items-center">
            {props.order.status === ("Approved" || "PickedUp" || "InRepair"|| "Delivering") && (
                <div className="flex gap-x-7  ">
                  <button className="bg-[#FF4E00] pl-5 pr-5 pb-0.5 font-light rounded-[15px] text-[15px]">Track</button>
                  <button className="bg-[#FF4E00] px-6 pb-0.5 font-light rounded-[15px] text-[15px]">Pay</button>
                </div>
            )}

            {props.order.status === "Paid" && (
                <div className="flex gap-x-10">
                  <span className={"flex"}>
                    <img src={completed} alt="completed icon" className={"size-6 mt-0.5"}/>
                    <div className={"text-[15px] pl-0.5 pt-0.5"}>Paid</div>
                  </span>
                  <button className="bg-[#FF4E00] pl-5 pr-5 pb-0.5 font-light rounded-[15px] text-[15px]">Track</button>
                </div>
            )}

            {props.order.status === "Completed" && (
                <span className={"flex"}>
                    <img src={completed} alt="completed icon" className={"size-6 mt-0.5"}/>
                    <div className={"text-[15px] pl-0.5 pt-0.5"}>Completed</div>
                  </span>
            )}

            {props.order.status === "Pending" && (
                <span className={"flex"}>
                    <img src={clock} alt="completed icon" className={"size-6 mt-0.5 mr-1"}/>
                    <div className={"text-[15px] pl-0.5 pt-0.5 mr-4 text-center"}>Request Pending</div>
                  </span>
            )}
          </div>
        </div>
      </div>

  )
}

export default CustomerOrderCard;