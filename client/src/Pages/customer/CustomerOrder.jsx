import React from 'react';
import CustomerOrderCard from '../../components/CustomerOrderCard.jsx';
import AgentNavbar from '../../components/Navbar';
import Samsung from '../../assets/s23.png'
import CustomerSidebar from "../../components/CustomerSidebar.jsx";


function CustomerOrder(){
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
        <div className='bg-[#0d1117] h-[88%] w-[20%] flex justify-start items-center pl-11 pt-[2%]'><CustomerSidebar/></div>
        <div className='h-[90%] w-[80vw] flex items-center pl-8 '>
          <div className='bg-[#0d1117] h-[85%] w-[90%]'>
            <div className='bg-[#161b22] w-[100%] h-[100%] flex flex-col items-center pt-5 rounded-[15px] gap-[1.5vw] overflow-y-scroll scrollbar-hide'>
              <h1 className={"text-white text-xl"}>Your Orders</h1>
              <style jsx>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>
              <CustomerOrderCard device={device1} request={request}/>
              <CustomerOrderCard device={device2} request={request}/>
              <CustomerOrderCard device={device3} request={request}/>
              <CustomerOrderCard device={device1} request={request}/>
              <CustomerOrderCard device={device2} request={request}/>
              <CustomerOrderCard device={device3} request={request}/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CustomerOrder;