import arrow from '../assets/arrow.png'
function Order(props){
    return(
        <div className="bg-[#ffffff]/5 w-[96%] h-[20%] flex items-center justify-between px-8 rounded-[15px] text-white hover:scale-102 hover:shadow-lg hover:shadow-[#ffffff]/1 transition-all duration-300 ease-in-out">
    {/* Left Section: Device Image and Name */}
    <div className="flex items-center gap-x-5">
        <img src={props.device.pic} className="w-[50px] h-[80px] object-cover rounded-md " alt="Device" />
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{props.device.name}</h3>
            <h4 className="text-sm text-gray-400">Order ID: #{props.request.id}</h4>
        </div>
    </div>

    {/* Right Section: Status and Arrow Button */}
    <div className="flex items-center gap-x-19">
        <div className="flex flex-col items-center gap-y-2 ">
            <h4 className="text-sm text-white text-ul  pl-2 pr-3 underline">Status</h4>
            <h4 className="text-sm text-white">{props.device.status}</h4>
        </div>
        <button>
            <img src={arrow} className="w-5 h-8" alt="Arrow" />
        </button>
    </div>
</div>

    )
}

export default Order;