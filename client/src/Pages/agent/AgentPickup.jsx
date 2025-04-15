import React , {useState , useEffect} from "react";
import AgentNavbar from "../../components/Navbar";
import AgentSidebar from "../../components/AgentSideBar";
import PickUpReqCard from "../../components/PickUpReqCard";
import axios from "axios";

function AgentPickup() {
    const [pendingOrders, setPendingOrders] = useState([]);

     const handleDeclinedRequest = async (declinedOrderId) => {
        // Get existing declined orders from localStorage
        const declinedOrders = JSON.parse(localStorage.getItem('declinedOrders') || '[]');
        // Add new declined order ID if not already present
        if (!declinedOrders.includes(declinedOrderId)) {
            declinedOrders.push(declinedOrderId);
            localStorage.setItem('declinedOrders', JSON.stringify(declinedOrders));
        }
        setPendingOrders((pendingOrders) => pendingOrders.filter((order) => order._id !== declinedOrderId));
    }

    useEffect(()=>{
        const fetchPendingOrders = async () => {
            try {
                const res = await axios.get(`/api/agent/pendingRequests`);
                if(res.status === 200){
                    const declinedOrders = JSON.parse(localStorage.getItem('declinedOrders') || '[]');
                    const filteredOrders = res.data.filter(order => !declinedOrders.includes(order._id));
                    setPendingOrders(filteredOrders);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPendingOrders();
    }, [])

  return (
     <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
            <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
            <div className='bg-[#0d1117] h-[88%] w-[20%] flex justify-start items-center pl-11 pt-[1%]'><AgentSidebar/></div>
            <div className='h-[84%] w-[80vw] flex  justify-start items-center pl-13'>
                <div className='bg-[#0d1117] h-[95%] w-[92%] flex flex-wrap gap-[1.5vw] '>
               
                    
                    <div className='bg-[#161b22] w-[100%] h-[100%] pt-[3%] flex flex-col items-center rounded-[15px] gap-3 mt-[2.5%] overflow-y-scroll scrollbar-hide'>
                    <h2 className="text-white text-xl font-semibold mb-5">Pickup Requests</h2>  
                    <style jsx>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>  
                    {pendingOrders.length === 0  ? <div className="h-full w-full flex justify-center items-center"><p className="text-white mb-20">No Pending Requests</p></div> :   
                    <div className="flex flex-wrap justify-start gap-x-5  ml-19 gap-y-5 gap-x-11 w-[97%]">
                        {
                          pendingOrders.map((order)=>{
                                return <PickUpReqCard request={order} key={order._id} decline={()=>handleDeclinedRequest(order._id)}/>
                            })
                        }
                    </div>}
                </div>

                    </div>
                </div>
            </div>
        
  );
}

export default AgentPickup;