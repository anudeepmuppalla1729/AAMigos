import { useState, useEffect, useCallback, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import AgentSidebar from "../../components/AgentSideBar.jsx";
import AgentNavbar from "../../components/Navbar.jsx"
import LoadingSpinner from "../../components/LoadingSpinner.jsx"
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid } from "recharts"
import { User, Package, CheckCircle2, Clock, Truck, Award, MapPinHouse } from "lucide-react"

// Simple transitions with fade effect for updating dot
const progressAnimation = `
.step-icon {
  transition: transform 0.2s ease;
}

.step-icon:hover {
  transform: scale(1.1);
}

.progress-dot {
  transition: all 0.5s ease-in-out;
}

.progress-dot.updating circle {
  transition: fill 0.5s ease-in-out;
}

.progress-line {
  transition: all 0.5s ease-in-out;
}

.step-label {
  transition: fill 0.5s ease-in-out;
}

.step-icon-container {
  transition: color 0.5s ease-in-out;
}
`;

// Memoized component to prevent unnecessary rerenders
function AgentProgressChart({steps}) {
  const progressData = steps.map((step, idx) => ({
    name: step.label,
    x: idx,
    y: 1,
    status: step.status,
  }));

  const getStepIcon = (label) => {
    switch (label) {
      case "Order Placed":
        return <Package className="h-5 w-5" />
      case "Picked From User":
        return <MapPinHouse className="h-5 w-5"/>
      case "Acceptance at Service Center":
        return <CheckCircle2 className="h-5 w-5" />
      case "Repair in Progress":
        return <Clock className="h-5 w-5" />
      case "Picked From Center":
        return <Truck className="h-5 w-5" />
      case "Order Completed":
        return <Award className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
      <div className="w-full h-60 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData} margin={{ top: 11, right: 40, left: 40, bottom: 50 }}>
            <CartesianGrid vertical={false} horizontal={false} />
            <Line 
              type="monotone"
              dataKey="y" 
              stroke="#FF4D00" 
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke="none"
              dot={(dotProps) => {
                const { cx, cy, index } = dotProps;
                const step = progressData[index];
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";

                return (
                    <g>
                      <circle
                          cx={cx}
                          cy={cy}
                          r={8}
                          fill={isCompleted ? "#FF4D00" : isCurrent ? "#FF4D00" : null}
                          stroke={isCurrent ? "#FF4D0080" : "#FF4D0090"}
                          strokeWidth={2}
                      />
                      {isCompleted && (
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={3} 
                          fill="#FFFFFF"
                        />
                      )}
                    </g>
                )
              }}
              isAnimationActive={false}
            />
            <XAxis
              dataKey="name"
              tick={(props) => {
                const { x, y, payload } = props;
                const step = progressData.find((s) => s.name === payload.value);
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";

                return (
                    <g transform={`translate(${x},${y + 10})`}>
                      <text
                          x={0}
                          y={0}
                          dy={0}
                          textAnchor="middle"
                          fill={isCompleted ? "#FF4D00" : isCurrent ? "#FFFFFF" : "#8A8D96"}
                          fontSize={12}
                      >
                        {payload.value}
                      </text>
                      <foreignObject
                          x={-12}
                          y={-50}
                          width={24}
                          height={24}
                          style={{ 
                            color: isCompleted ? "#FF4D00" : isCurrent ? "#FFFFFF" : "#8A8D96"
                          }}
                      >
                        {getStepIcon(payload.value)}
                      </foreignObject>
                    </g>
                )
              }}
              interval={0}
              axisLine={false}
              tickLine={false}
              height={100}
              padding={{ left: 20, right: 20 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
  )
}

export default function AgentTrack() {
  const navigate = useNavigate();
  const { reqId, nextCount } = useParams();
  const [steps, setSteps] = useState([
    { label: "Order Placed", status: "completed" },
    { label: "Picked From User", status: "pending" },
    { label: "Acceptance at Service Center", status: "pending" },
    { label: "Repair in Progress", status: "pending" },
    { label: "Picked From Center", status: "pending" },
    { label: "Order Completed", status: "pending" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const [userPackage, setUserPackage] = useState("Pending");
  
  // Use ref to track if initial data has been loaded
  const dataLoaded = useRef(false);
  // Use ref to track manual updates
  const manualUpdate = useRef(false);
  // Use ref to track the last status sent to API
  const lastStatus = useRef(null);
  
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    profilePic: "",
    address: [{
      dno: "",
      street: "",
      city: "",
      pincode: ""
    }]
  });
  
  const [deviceDetails, setDeviceDetails] = useState({
    name: "",
    pic: "",
    serviceAddress: [{
      dno: "",
      street: "",
      city: "",
      pincode: ""
    }],
    issue: ""
  });

  // FIXED: Status mappers to exactly match the database enum values
  // "Approved", "PickedUp", "FreeApproval", "InRepair", "Delivering", "Paid"
  const countMapper = useCallback((count) => {
    switch (count) {
      case 1: return "Approved"; 
      case 2: return "PickedUp";
      case 3: return "FreeApproval";
      case 4: return "InRepair";
      case 5: return "Delivering";
      case 6: return "Paid"; // Changed from "Completed" to "Paid" to match enum
      default: return "Approved";
    } 
  }, []);

  const statusMapper = useCallback((status) => {
    switch (status) {
      case "Approved": return 1; 
      case "PickedUp": return 2;
      case "FreeApproval": return 3;
      case "InRepair": return 4;
      case "Delivering": return 5;
      case "Paid": return 6; // Changed from "Completed" to "Paid" to match enum
      default: return 1;
    } 
  }, []);

  // Generate steps based on count value - memoized function
  const generateSteps = useCallback((c) => {
    return [
      { label: "Order Placed", status: "completed" },
      { label: "Picked From User", status: c >= 2 ? "completed" : c === 1 ? "current" : "pending" },
      { label: "Acceptance at Service Center", status: c >= 3 ? "completed" : c === 2 ? "current" : "pending" },
      { label: "Repair in Progress", status: c >= 4 ? "completed" : c === 3 ? "current" : "pending" },
      { label: "Picked From Center", status: c >= 5 ? "completed" : c === 4 ? "current" : "pending" },
      { label: "Order Completed", status: c >= 6 ? "completed" : c === 5 ? "current" : "pending" },
    ];
  }, []);

  // Update step count and API in one place to avoid duplicate calls
  const updateStepCount = useCallback(async (newCount) => {
    try {
      // Set the manual update flag to true
      manualUpdate.current = true;
      
      const status = countMapper(newCount);
      // Store the last status sent to API
      lastStatus.current = status;
      
      console.log(`Updating status to: ${status} (count: ${newCount})`);
      
      // Make API call
      const response = await axios.post(`/api/agent/updateStatus/${reqId}/update/${status}`);
      console.log("API response:", response.data);
      
      // Update state
      setCount(newCount);
      setSteps(generateSteps(newCount));
      
      // Keep manual update flag true for 2 seconds to prevent overrides
      setTimeout(() => {
        manualUpdate.current = false;
      }, 2000);
    } catch (error) {
      console.error('Error updating step count:', error);
      manualUpdate.current = false;
    }
  }, [reqId, countMapper, generateSteps]);

  // Fetch order details - only called once on component mount
  const fetchOrderDetails = useCallback(async () => {
    try {
      // Don't fetch if a manual update is in progress
      if (manualUpdate.current) {
        console.log("Manual update in progress, skipping fetch");
        return;
      }
      
      console.log("Fetching order details...");
      const request = await axios.get(`/api/agent/trackOrder/${reqId}`);
      console.log("Order details response:", request.data);
      
      const user = request.data.user;
      const device = request.data.device.model;
      
      setUserPackage(request.data.userPackage);
      setCustomer({
        name: user.name,
        phoneNumber: user.phone,
        profilePic: user.profilePic || user.profilePicture,
        address: [user.address]
      });
      
      setDeviceDetails({
        name: device.name,
        pic: device.img,
        serviceAddress: [device.company.serviceCenters[0].address],
        issue: request.data.device.issue,
      });
      
      // Only update the count if we haven't manually updated
      if (!manualUpdate.current) {
        const dbStatus = request.data.status;
        console.log(`Current status from DB: ${dbStatus}`);
        
        // Check if this is the same as our last known status
        if (lastStatus.current && lastStatus.current !== dbStatus) {
          console.log(`Status mismatch: UI=${lastStatus.current}, DB=${dbStatus}`);
        }
        
        const initialCount = statusMapper(dbStatus);
        console.log(`Mapped status count: ${initialCount}`);
        
        setCount(initialCount);
        setSteps(generateSteps(initialCount));
        
        // Update our last known status
        lastStatus.current = dbStatus;
      }
      
      dataLoaded.current = true;
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError(error.message);
      setIsLoading(false);
    }
  }, [reqId, statusMapper, generateSteps]);

  // Initial setup - run once on mount
  useEffect(() => {
    if (reqId && !dataLoaded.current) {
      fetchOrderDetails();
    }
  }, [reqId, fetchOrderDetails]);

  // Handle nextCount param changes - but only if not a manual update
  useEffect(() => {
    if (nextCount && !isLoading && !manualUpdate.current) {
      const parsedCount = parseInt(nextCount);
      if (!isNaN(parsedCount) && parsedCount !== count) {
        console.log(`Updating count from URL param: ${parsedCount}`);
        
        // Update through the API to ensure DB sync
        updateStepCount(parsedCount);
      }
    }
  }, [nextCount, isLoading, count, updateStepCount]);

  // Add polling to ensure UI stays in sync with DB
  useEffect(() => {
    // Only start polling after initial loading
    if (!isLoading && dataLoaded.current) {
      const pollInterval = setInterval(() => {
        // Only poll if not in the middle of a manual update
        if (!manualUpdate.current) {
          console.log("Polling for status updates...");
          fetchOrderDetails();
        }
      }, 10000); // Poll every 10 seconds
      
      return () => clearInterval(pollInterval);
    }
  }, [isLoading, fetchOrderDetails]);

  const questions = [
    "Has the order been picked up from the customer?",
    "Approval of Device from Service Center for Free Service?",
    "Is the repair in progress or already done?",
    "Is the device out for delivery?",
    "Did the user accept the order?",
  ];

  // Handle Yes button click
  const handleYesClick = () => {
    // Set manual update flag and update count
    if(count === 2) {
      const freeApproval = async()=>{
        let res = axios.post(`/api/agent/freeService/${reqId}`);
      }
      freeApproval();
    }
    updateStepCount(count + 1);
  };

  // Handle No button click
  const handleNoClick = () => {
    switch (count) {
      case 2:
        navigate(`/agent/packageUpdation/${reqId}/${countMapper(count)}`);
        break;
      case 6:
        navigate("/agent/");
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d1117]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#bf400a]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] h-screen w-screen flex flex-col text-white">
      <div className="w-full h-[10vh] bg-[#171925]">
        <AgentNavbar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[20%] h-full flex justify-center items-center ml-[0.85%] mt-[0.5%] mr-2">
          <AgentSidebar />
        </div>
        <div className="w-[75%] h-full p-8 overflow-y-auto flex flex-col scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
          `}</style>

          <div className="bg-[#161b22] rounded-[15px] p-8 mb-8 mt-2.5 shadow-lg">
            <h1 className="font-semibold text-2xl pb-5 ml-[43.5%]">Order Status</h1>
            <div className="bg-[#1A1D2A]/70 rounded-[15px] p-4 shadow-inner">
              <div className="translate-y-15">
                <AgentProgressChart steps={steps}/>
              </div>
              <div className="text-center mt-2 text-gray-400">
                Current Status: {countMapper(count)}
              </div>
            </div>
            {count <= questions.length && ((userPackage === "Pending" && count === 3 && countMapper(count) != "FreeApproval") ? (
              <div className="flex flex-col items-center mt-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#bf400a] mb-4"></div>
                <h2 className="text-lg mb-2">Waiting for User To Select The Package</h2>
              </div>
            ) : (
              <div className="flex flex-col gap-y-2 items-center justify-center text-lg mt-4">
                <p className="mb-2">{questions[count - 1]}</p>
                <div className="flex gap-x-4">
                  <button
                    className="px-9 py-1 rounded bg-[#059730] text-white hover:bg-green-700"
                    onClick={handleYesClick}
                  >
                    Yes
                  </button>
                  <button
                    className="px-9 py-1 rounded bg-[#ff560e] text-white hover:bg-red-600"
                    onClick={handleNoClick}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-8">
            {/* Device Details Card */}
            <div className="flex w-[47%] bg-[#161b22] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-6">
                <img src={deviceDetails.pic} alt={deviceDetails.name} className="w-24 h-auto object-contain"/>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-white">{deviceDetails.name}</h3>
                  <p className="text-gray-400">Order ID: #{reqId.slice(-6).toUpperCase()}</p>
                  <div>
                    <p className="font-semibold">Issue:</p><p>{deviceDetails.issue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details Card */}
            <div className="flex w-[49%] bg-[#161b22] rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-6">
                <img src={customer.profilePic} alt="Customer" className="w-12 h-12 rounded-full"/>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-white">{customer.name}</h3>
                  <p className="text-gray-400">Phone no. {customer.phoneNumber}</p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400 font-medium">Address</p>
                    <p className="text-sm text-white">
                      {customer.address[0].dno}, {customer.address[0].street},<br/>
                      {customer.address[0].city}, {customer.address[0].pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Center Address Card */}
          <div className="mt-8 mx-55">
            <div className="bg-[#161b22] rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Service Center Address :</h3>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-semibold">Street</span> : {deviceDetails.serviceAddress[0].street},<br/>
                    <span className="font-semibold">City</span> : {deviceDetails.serviceAddress[0].city}, {deviceDetails.serviceAddress[0].pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}