import React from "react";
import AgentSidebar from "../../components/AgentSideBar";
import AgentNavbar from "../../components/Navbar";

const mockPackageData = {
  packageType: "Affordable",
  deviceModel: "Iphone 15 Pro Max",
  repairs: [
    { name: "Motherboard Repair", price: 9000 },
    { name: "Display Repair", price: 5000 },
    { name: "Screen Card Replacement", price: 1200 },
    { name: "Charging Port Repair", price: 2000 }
  ],
  totalPrice: 17200
};

export default function PackageView() {
  return (
    <div className="bg-[#0d1117] h-screen w-screen flex flex-col text-white">
      <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap overflow-hidden'>
        <div className='w-[100vw] h-[10vh] bg-[#171925]'><AgentNavbar/></div>
        <div className='bg-[#0d1117] h-[90vh] w-[20%] flex justify-start items-center pl-11'><AgentSidebar/></div>
        <div className="w-[80%] flex items-center justify-center h-[90%]">
          <div className="bg-[#171925] w-[25%] rounded-2xl p-6 flex flex-col items-center gap-y-2">
            <h2 className="font-semibold text-lg mb-3">{mockPackageData.packageType}</h2>
            <h3 className="text-xl mb-2">{mockPackageData.deviceModel}</h3>
            
            <div className="w-full space-y-1 text-sm">
              {mockPackageData.repairs.map((repair, index) => (
                <div key={index} className="flex justify-between">
                  <span>{repair.name}</span>
                  <span>Rs. {repair.price}</span>
                </div>
              ))}
            </div>

            <div className="font-semibold text-sm flex flex-col items-center w-full">
              <hr className="h-px mt-4 mb-6 bg-gray-200 border-0 w-[90%]"/>
              <div className="flex justify-between w-full">
                <span>Total Price</span>
                <span>Rs. {mockPackageData.totalPrice}</span>
              </div>
            </div>

            <button 
              className="bg-[#ff5c1f] hover:bg-[#ff3b00] text-white rounded-full px-10 py-2 mt-6 transition"
              onClick={() => window.location.href='/agent/track'}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Backend integration code will be added here when ready.