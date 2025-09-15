import React, { useState, useEffect } from "react";
import AgentNavbar from "../../components/Navbar.jsx";
import AgentSidebar from "../../components/AgentSideBar.jsx";
import "./PackageUpdation.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PackageUpdation() {
  const { reqId , status } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for each section
  const [recommededList, setRecommendedList] = useState([]);
  const [goodToHaveList, setGoodToHaveList] = useState([]);
  const [niceToHaveList, setNiceToHaveList] = useState([]);
  
  // Device info (can be fetched from API in real implementation)
  const deviceInfo = {
    name: "iPhone 15 Pro Max"
  };

  // Input states
  const [inputs, setInputs] = useState({
    recommended: { label: "", price: "" },
    goodToHave: { label: "", price: "" },
    niceToHave: { label: "", price: "" },
  });

  const handleChange = (section, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleAdd = (section) => {
    const input = inputs[section];
    if (!input.label || !input.price) return;

    let currentList;
    switch (section) {
      case "recommended":
        currentList = recommededList;
        break;
      case "goodToHave":
        currentList = goodToHaveList;
        break;
      case "niceToHave":
        currentList = niceToHaveList;
        break;
    }

    if (currentList.length >= 9) return;

    const newItem = { label: input.label, price: parseInt(input.price) };

    switch (section) {
      case "recommended":
        setRecommendedList([...recommededList, newItem]);
        break;
      case "goodToHave":
        setGoodToHaveList([...goodToHaveList, newItem]);
        break;
      case "niceToHave":
        setNiceToHaveList([...niceToHaveList, newItem]);
        break;
    }

    setInputs((prev) => ({
      ...prev,
      [section]: { label: "", price: "" },
    }));
  };

  const handleRemove = (section, index) => {
    switch (section) {
      case "recommended":
        setRecommendedList(prev => prev.filter((_, i) => i !== index));
        break;
      case "goodToHave":
        setGoodToHaveList(prev => prev.filter((_, i) => i !== index));
        break;
      case "niceToHave":
        setNiceToHaveList(prev => prev.filter((_, i) => i !== index));
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const packageData = {
        affordable: recommededList,
        goodToHave: goodToHaveList,
        niceToHave: niceToHaveList
      };

      console.log(packageData);

      const response = await axios.post(`/api/agent/packages/${reqId}`, packageData);

      if (response.status != 200) throw new Error('Failed to update package');
      let n = 3;
      navigate(`/agent/track/${reqId}/${n}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTotal = (items) => items.reduce((sum, item) => sum + item.price, 0);

  const renderCard = (title, section, items) => {
    return (
      <div className="bg-[#171925] w-[27%] rounded-2xl p-4 flex flex-col items-center gap-y-1 relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#bf400a] px-4 py-3 font-semibold text-[15px] rounded-full text-sm mb-20">{title}</div>
        <h3 className="text-white font-bold mt-10">{deviceInfo.name}</h3>
        
        <div className="w-full mt-4 flex flex-col">
          <input
            type="text"
            placeholder="Enter Repair Details"
            value={inputs[section].label}
            onChange={(e) => handleChange(section, "label", e.target.value)}
            className="bg-[#0d1117]/20 text-center text-gray-300 border border-gray-600 rounded-lg p-1.5 mb-2 w-full text-sm"
            disabled={items.length >= 9}
          />
          <input
            type="number"
            placeholder="Enter Price"
            value={inputs[section].price}
            onChange={(e) => handleChange(section, "price", e.target.value)}
            className="bg-[#0d1117]/20 ml-13 text-center text-gray-300 border border-gray-600 rounded-lg p-1 mb-2 w-[50%] no-spinner text-sm"
            disabled={items.length >= 9}
          />
          <button
            onClick={() => handleAdd(section)}
            className={`${items.length >= 9 ? 'bg-gray-500  cursor-not-allowed' : 'bg-[#bf400a] hover:bg-[#a83600]'} text-white px-6 py-1 text-sm mb-4 mt-5 transition rounded-lg`}
            disabled={items.length >= 9}
          >
            Add
          </button>
          
          { items.length> 0 ? <div className="w-full space-y-1 text-sm overflow-y-scroll scrollbar-hide h-[35%]">
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                  display: none;
              }
              .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
              }
          `}</style>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-1 px-3 rounded-lg transition-all duration-200 hover:bg-[#22272d]">
                <span className="text-sm text-gray-300">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">₹{item.price}</span>
                  <button
                    onClick={() => handleRemove(section, index)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <div className="border rounded-full size-4 mt-1"><p className="-translate-y-1">-</p></div>
                  </button>
                </div>
              </div>
            ))}
          </div> : <p className="ml-6 mt-17">No Package Details Added</p>}
          
          {(items.length !== 0) && (
            <div className="font-semibold text-sm flex flex-col items-center">
              <hr className="h-px mt-4 mb-6 bg-gray-200 border-0 w-[90%]"/>
              Total Price: Rs. {getTotal(items)}
            </div>
          )}
          

        </div>
      </div>
    );
  };

  return (
      <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
        <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
        <div className='bg-[#0d1117] h-[88%] w-[21%] flex justify-start items-center pl-11 pt-[2%]'><AgentSidebar/></div>
        <div className="w-[75%] h-[83%] text-white flex flex-col gap-y-5 mt-11">
          <div className="flex justify-around w-full h-[85%] bg-[#0d1117]">
            {renderCard("Recommended", "recommended", recommededList)}
            {renderCard("Good to Have", "goodToHave", goodToHaveList)}
            {renderCard("Nice to Have", "niceToHave", niceToHaveList)}
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mt-2 mb-1">{error}</div>
          )}
          
          <div className={"w-full flex items-center justify-center"}>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className={`${loading ? 'bg-gray-500' : 'bg-[#bf400a] hover:bg-[#a83600]'} text-white rounded-2xl px-10 py-2 transition`}
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
  );
}

export default PackageUpdation;
