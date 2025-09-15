import React , {useState , useEffect} from 'react';
import CustomerOrderCard from '../../components/CustomerOrderCard.jsx';
import AgentNavbar from '../../components/Navbar';
import Samsung from '../../assets/s23.png'
import CustomerSidebar from "../../components/CustomerSidebar.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function CustomerOrder(){
  const [allOrders , setAllOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchAllOrders = async()=>{
      try{
        const res = await axios.get('api/customer/allOrders');
        if(res.status===200){
          setAllOrders(res.data);
        }
      }catch(err){
        console.log(err);  
      }
    }
    fetchAllOrders();
  },[])
  let device1={
    name:"Samsung S23 Ultra",
    pic:Samsung,
    status:"ongoing",
  }
  let device2={
    name:"Samsung S23 Ultra",
    pic:Samsung,
    status:"Paid",
  }
  let device3= {
    name:"Samsung S23 Ultra",
    pic:Samsung,
    status:"Completed",
  }
  let request={
    id:1234567890,
  }
  return(
      <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
        <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
        <div className='bg-[#0d1117] h-[88%] w-[21%] flex justify-start items-center pl-11 pt-[2%]'><CustomerSidebar/></div>
        <div className='h-[90%] w-[79%] flex items-center pl-8 '>
          <div className='bg-[#0d1117] h-[85%] w-[90%]'>
            <div className='bg-[#161b22] w-[100%] h-[100%] flex flex-col items-center rounded-[15px] py-5'>
              <div className='sticky top-0 w-full flex justify-center pb-5 z-10 rounded-[15px]'>
                <h1 className='text-white text-xl font-semibold'>Your Orders</h1>
              </div>
              <div className='w-full h-full flex flex-col items-center gap-[2vw] overflow-y-scroll scrollbar-hide'>
                <style jsx>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}</style>
                {allOrders.length > 0 ? allOrders.map((order)=>{
                  return <CustomerOrderCard order={order} key={order._id}/>
                }) : <div className='w-full flex justify-center'><p className='mb-3 mt-39 text-lg text-white'>No Orders Found</p></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CustomerOrder;