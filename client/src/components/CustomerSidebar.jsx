import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Settings, Headset, ChevronLeft, ChevronRight } from 'lucide-react';

function CustomerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/customer/orders', icon: ListOrdered },
    { name: 'Profile', path: '/customer/profile', icon: Settings },
    { name: 'Support', path: '/customer/support', icon: Headset },
  ];

  return (
    <div className={`h-[60vh] ${isCollapsed ? 'w-20 px-2' : 'w-[90%] md:w-[80%] lg:w-[15vw] px-4'} rounded-2xl shadow-xl flex flex-col justify-evenly py-6 bg-[#171925]/80 backdrop-blur-xl border border-gray-800 transition-all duration-300 relative`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-gradient-to-r from-[#FF4E00] to-[#FF7A00] rounded-full p-1 border-2 border-[#171925] text-white hover:scale-110 transition-all z-10 shadow-lg hidden lg:block"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="flex flex-col space-y-2 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          const Icon = item.icon;
          return (
            <div 
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center cursor-pointer rounded-xl p-3 transition-all duration-300 group
                ${isActive 
                  ? 'bg-gradient-to-r from-orange-500/20 to-transparent border-l-4 border-orange-500' 
                  : 'hover:bg-white/5 border-l-4 border-transparent'
                }
                ${isCollapsed ? 'justify-center border-l-0' : ''}
              `}
              title={isCollapsed ? item.name : ''}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-400 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
              <span className={`text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300 group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-gray-300'} ${isCollapsed ? 'w-0 opacity-0 overflow-hidden ml-0' : 'opacity-100 ml-4'}`}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomerSidebar;