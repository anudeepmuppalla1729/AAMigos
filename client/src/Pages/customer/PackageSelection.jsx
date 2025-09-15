import AgentNavbar from "../../components/Navbar.jsx";
import CustomerSidebar from "../../components/CustomerSidebar.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function packageSelection() {
  let { reqId } = useParams();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/customer/getPackages/${reqId}`);
        setDevice(res.data.device);
        console.log(res.data.device);
        console.log(res.data.packages);
        setPackages(res.data.packages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const response = {
    id: 123456,
    name: "IPhone 15 Pro Max",
  };
  const packageData = {
    recommended: [
      { label: "Screen Replacement", price: 2000 },
      { label: "Battery Change", price: 1500 },
      { label: "Camera Repair", price: 1200 },
    ],
    goodToHave: [
      { label: "Speaker Fix", price: 800 },
      { label: "Charging Port Repair", price: 600 },
      { label: "Button Replacement", price: 400 },
    ],
    niceToHave: [
      { label: "Software Update", price: 300 },
      { label: "Deep Cleaning", price: 200 },
      { label: "Screen Guard", price: 150 },
    ],
  };

  const getTotal = (items) => items.reduce((sum, item) => sum + item.price, 0);

  const renderCard = (title, section, items) => {
    const isSelected = selectedPackage === section;
    if (!device) {
      return (
        <div className="bg-[#0d1117] h-screen w-screen flex justify-center items-center text-white">
          Loading...
        </div>
      );
    }
    return (
      <div
        className={`bg-[#171925] w-[27%] rounded-2xl p-4 flex flex-col items-center gap-y-1 relative ${
          isSelected ? "border-2 border-[#bf400a]" : ""
        }`}
      >
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#bf400a] px-4 py-3 font-semibold text-[15px] rounded-full text-sm mb-20">
          {title}
        </div>
        <h3 className={"text-white font-bold mt-20"}>{device.modelName}</h3>
        <div className="w-full mt-4 flex flex-col">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-3 rounded-lg transition-all duration-200"
            >
              <span className="text-sm text-gray-300">{item.label}</span>
              <span className="text-sm font-medium">₹{item.price}</span>
            </div>
          ))}
          {items.length !== 0 && (
            <div className="font-semibold text-sm flex flex-col items-center">
              <hr className="h-px mt-4 mb-6 bg-gray-200 border-0 w-[90%]" />
              Total Price: Rs. {getTotal(items)}
            </div>
          )}
          <button
            onClick={() => setSelectedPackage(isSelected ? null : section)}
            className={`mt-13 w-full py-2 rounded-lg transition-all duration-200 ${
              isSelected
                ? "bg-[#bf400a] text-white"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            {isSelected ? "Deselect" : "Select Package"}
          </button>
        </div>
      </div>
    );
  };
  const handleContinue = () => {
    if (selectedPackage) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    // Add navigation or API call here
    setShowModal(false);
    // TODO: Implement the package confirmation logic
    console.log("Package confirmed:", selectedPackage);
    let packag = {
      name: selectedPackage,
      price: getTotal(packages[selectedPackage]),
      features: packages[selectedPackage],
    };
    const stringifiedPackage = encodeURIComponent(JSON.stringify(packag));
    const updateStatus = async () => {
      try {
        const response = await axios.post(
          `/api/customer/updatePackage/${reqId}/${packag.name}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };
    updateStatus();
    navigate(`/customer/track/${reqId}/${stringifiedPackage}`);
  };

  return (
    <div className="bg-[#0d1117] h-screen w-screen flex flex-wrap">
      <div className="w-[100vw] h-[10%] bg-[#171925]">
        <AgentNavbar />
      </div>
      <div className="bg-[#0d1117] h-[88%] w-[21%] flex justify-start items-center pl-11 pt-[2%]">
        <CustomerSidebar />
      </div>
      <div className="w-[75%] h-[83%] text-white flex flex-col gap-y-5 mt-11">
        <div className="flex justify-around w-full h-[85%] bg-[#0d1117] ">
          {renderCard("Recommended", "affordable", packages.affordable)}
          {renderCard("Good to Have", "goodToHave", packages.goodToHave)}
          {renderCard("Nice to Have", "niceToHave", packages.niceToHave)}
        </div>

        <div className={"w-full flex items-center justify-center"}>
          <button
            className={`rounded-2xl px-3 py-1 ${
              selectedPackage
                ? "bg-[#bf400a] cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedPackage}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
        {console.log(selectedPackage, "allu")}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-[#171925] p-6 rounded-2xl shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">
                Confirm Package Selection
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure about your package selection? You won't be able to
                change it later.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#bf400a] text-white rounded hover:bg-[#a83600] transition-colors"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default packageSelection;
