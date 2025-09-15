import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomerSidebar from "../../components/CustomerSidebar.jsx";
import AgentNavbar from "../../components/Navbar.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
} from "recharts";
import {
  User,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Award,
  MapPinHouse,
} from "lucide-react";

function CustomerProgressChart({ steps }) {
  const progressData = steps.map((step, idx) => ({
    name: step.label,
    x: idx,
    y: 1,
    status: step.status,
  }));

  const getStepIcon = (label) => {
    switch (label) {
      case "Order Placed":
        return <Package className="h-5 w-5" />;
      case "Order Picked":
        return <MapPinHouse className="h-5 w-5" />;
      case "Acceptance at Service Center":
        return <CheckCircle2 className="h-5 w-5" />;
      case "Repair in Progress":
        return <Clock className="h-5 w-5" />;
      case "Out for delivery":
        return <Truck className="h-5 w-5" />;
      case "Order Completed":
        return <Award className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-60 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={progressData}
          margin={{ top: 11, right: 40, left: 40, bottom: 50 }}
        >
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
                    fill={
                      isCompleted ? "#FF4D00" : isCurrent ? "#FF4D00" : null
                    }
                    stroke={isCurrent ? "#FF4D0080" : "#FF4D0090"}
                    strokeWidth={2}
                  />
                  {isCompleted && (
                    <circle cx={cx} cy={cy} r={3} fill="#FFFFFF" />
                  )}
                </g>
              );
            }}
            isAnimationActive={false}
          />
          <XAxis
            dataKey="name"
            tick={(props) => {
              const { x, y, payload } = props;
              const step = progressData?.find((s) => s.name === payload.value);
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";

              return (
                <g transform={`translate(${x},${y + 10})`}>
                  <text
                    x={0}
                    y={0}
                    dy={0}
                    textAnchor="middle"
                    fill={
                      isCompleted
                        ? "#FF4D00"
                        : isCurrent
                        ? "#FFFFFF"
                        : "#8A8D96"
                    }
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
                      color: isCompleted
                        ? "#FF4D00"
                        : isCurrent
                        ? "#FFFFFF"
                        : "#8A8D96",
                    }}
                  >
                    {getStepIcon(payload.value)}
                  </foreignObject>
                </g>
              );
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
  );
}

export default function CustomerTrack() {
  const navigate = useNavigate();
  const { reqId, Package } = useParams();
  console.log(reqId, "id");
  console.log(Package, "package");
  const [orderst, setOrderst] = useState(null);
  //! keep formData empty and use dynamic keys to set values
  const [steps, setSteps] = useState([
    { label: "Order Placed", status: "completed" },
    { label: "Order Picked", status: "current" },
    { label: "Acceptance at Service Center", status: "pending" },
    { label: "Repair in Progress", status: "pending" },
    { label: "Out for delivery", status: "pending" },
    { label: "Order Completed", status: "pending" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEligibleForFreeService, setIsEligibleForFreeService] =
    useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    profilePic: "",
  });
  useEffect(() => {
    // First try to get package from URL parameter
    if (Package) {
      try {
        const parsed = JSON.parse(decodeURIComponent(Package));
        setSelectedPackage(parsed);
        // Save to localStorage to persist across reloads
        localStorage.setItem(
          `selectedPackage_${reqId}`,
          JSON.stringify(parsed)
        );
      } catch (err) {
        console.error("Failed to parse package:", err);
      }
    } else {
      // If not in URL, try to get from localStorage
      const savedPackage = localStorage.getItem(`selectedPackage_${reqId}`);
      if (savedPackage) {
        try {
          setSelectedPackage(JSON.parse(savedPackage));
        } catch (err) {
          console.error("Failed to parse saved package:", err);
        }
      }
    }

    // Cleanup function to remove package from localStorage when component unmounts
    // but only if the order is completed or canceled
    return () => {
      if (orderst === "Paid") {
        localStorage.removeItem(`selectedPackage_${reqId}`);
      }
    };
  }, [Package, reqId, orderst]);
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get(`/api/customer/trackOrder/${reqId}`);

        // Debug logging
        console.log("API Response:", res.data);
        console.log("Order Status:", res.data.status);

        const orderStatus = res.data.status;

        // Map API status to step statuses immediately
        setSteps((prevSteps) =>
          prevSteps.map((step, index) => {
            if (orderStatus === "Approved" && index <= 0)
              return { ...step, status: "completed" };
            if (orderStatus === "PickedUp" && index <= 1)
              return { ...step, status: index === 1 ? "current" : "completed" };
            if (orderStatus === "FreeApproval" && index <= 2)
              return { ...step, status: index === 2 ? "current" : "completed" };
            if (orderStatus === "InRepair" && index <= 3)
              return { ...step, status: index === 3 ? "current" : "completed" };
            if (orderStatus === "Delivering" && index <= 4)
              return { ...step, status: index === 4 ? "current" : "completed" };
            if (orderStatus === "Paid" && index <= 5)
              return { ...step, status: "completed" };
            return { ...step, status: "pending" };
          })
        );

        setCustomer(res.data.assignedAgent);
        console.log(res.data.status, "klk");
        setOrderst(res.data.status);

        // Improved logic for determining service eligibility
        if (orderStatus === "PickedUp") {
          setIsEligibleForFreeService("pending");
        } else if (orderStatus === "FreeApproval") {
          setIsEligibleForFreeService(res.data.FreeService || false);
        } else if (res.data.FreeService) {
          setIsEligibleForFreeService(true);
        }
      } catch (error) {
        console.error("Error fetching request details:", error);
        setError("Failed to fetch request details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequest();
  }, [reqId]);

  const handleCancelOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await axios.post("/api/customer/order/cancel");
      // Clear the saved package from localStorage when canceling the order
      localStorage.removeItem(`selectedPackage_${reqId}`);
      navigate("/customer/dashboard");
    } catch {
      setError("Failed to cancel the order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isOrderPlacedCompleted = steps.some(
    (step) => step.label === "Order Placed" && step.status === "completed"
  );

  const shouldShowServiceStatus = isOrderPlacedCompleted && !selectedPackage;
  const shouldShowSelectedPackage = selectedPackage !== null;

  // Add these console logs to debug the issue
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get(`/api/customer/trackOrder/${reqId}`);

        // Debug logging
        console.log("API Response:", res.data);
        console.log("Order Status:", res.data.status);

        const orderStatus = res.data.status;

        // Map API status to step statuses immediately
        setSteps((prevSteps) =>
          prevSteps.map((step, index) => {
            if (orderStatus === "Approved" && index <= 0)
              return { ...step, status: "completed" };
            if (orderStatus === "PickedUp" && index <= 1)
              return { ...step, status: index === 1 ? "current" : "completed" };
            if (orderStatus === "FreeApproval" && index <= 2)
              return { ...step, status: index === 2 ? "current" : "completed" };
            if (orderStatus === "InRepair" && index <= 3)
              return { ...step, status: index === 3 ? "current" : "completed" };
            if (orderStatus === "Delivering" && index <= 4)
              return { ...step, status: index === 4 ? "current" : "completed" };
            if (orderStatus === "Paid" && index <= 5)
              return { ...step, status: "completed" };
            return { ...step, status: "pending" };
          })
        );

        setCustomer(res.data.assignedAgent);
        console.log(res.data.FreeService, "klkllsdb");

        // Improved logic for determining service eligibility
        if (orderStatus === "PickedUp") {
          console.log("Setting eligibility to pending");
          setIsEligibleForFreeService("pending");
        } else if (res.data.FreeService) {
          console.log("Processing FreeApproval status");
          // Free service approval was granted
          // Check if there are any additional costs
          const affordable = res.data.affordable || {};
          const goodToHave = res.data.goodToHave || {};
          const niceToHave = res.data.niceToHave || {};

          const hasNoCosts =
            Object.keys(affordable).length === 0 &&
            Object.keys(goodToHave).length === 0 &&
            Object.keys(niceToHave).length === 0;

          console.log("Has no costs:", hasNoCosts);
          setIsEligibleForFreeService(hasNoCosts);

          // If free service is approved, clear any saved package
          if (hasNoCosts) {
            localStorage.removeItem(`selectedPackage_${reqId}`);
            setSelectedPackage(null);
          }
        } else {
          console.log("Setting eligibility to false for status:", orderStatus);
          setIsEligibleForFreeService(false);
        }
      } catch (error) {
        console.error("Error fetching request details:", error);
        setError("Failed to fetch request details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequest();
  }, [reqId]);

  // Update the render function to include debugging info and ensure correct display
  return (
    <div className="bg-[#0d1117] h-screen w-screen flex flex-col text-white">
      {isLoading && <LoadingSpinner />}
      <div className="w-full h-[10vh] bg-[#171925]">
        <AgentNavbar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="bg-[#0d1117] h-[88%] w-[21%] flex justify-start items-center pl-11 pt-[6.5%]">
          <CustomerSidebar />
        </div>
        <div className="w-[78%] h-full p-8 overflow-y-auto flex flex-col scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {/* Debug info - remove this in production */}

          <div className="bg-[#161b22] rounded-2xl p-8 mb-8 shadow-lg">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full"></div>
                <img
                  src={customer.profilePicture || "/placeholder.svg"}
                  alt="profile"
                  className="size-27 rounded-full relative z-10"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {customer.name || "Loading..."}
                </h2>
                <div className="flex items-center gap-2 text-gray-400 mt-1">
                  <User className="h-4 w-4" />
                  <p>Phone no : {customer.phone || "Loading..."}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              Service Progress
            </h3>
            <div className="bg-[#1A1D2A]/70 rounded-xl p-4 shadow-inner h-64">
              <div className={"translate-y-9"}>
                <CustomerProgressChart steps={steps} />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4 p-3 bg-red-500/10 rounded-lg">
              {error}
            </div>
          )}

          {/* Always show service status if order is placed (for debugging) */}
          {isOrderPlacedCompleted && (
            <div className="bg-[#161b22] rounded-xl p-6 mb-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Service Status
              </h3>

              {/* Still checking eligibility */}
              {isEligibleForFreeService === null &&
                orderst === "FreeApproval" && (
                  <div className="flex items-center justify-center p-4 flex-col gap-y-4">
                    <div className="animate-pulse flex gap-x-4">
                      <div className="h-3 w-3 bg-[#FF4D00] rounded-full"></div>
                      <div className="h-3 w-3 bg-[#FF4D00] rounded-full"></div>
                      <div className="h-3 w-3 bg-[#FF4D00] rounded-full"></div>
                    </div>
                    <div>
                      <p className="ml-2 text-gray-400">
                        Checking eligibility...
                      </p>
                    </div>
                  </div>
                )}

              {/* Agent hasn't responded yet */}
              {isEligibleForFreeService === "pending" &&
                orderst === "FreeApproval" && (
                  <div className="bg-blue-500/10 p-4 rounded-lg">
                    <p className="text-blue-400 flex items-center">
                      <Clock className="mr-2 h-5 w-5" />
                      Waiting for agent response...
                    </p>
                  </div>
                )}

              {/* Approved for free service */}
              {isEligibleForFreeService === true && (
                <div className="bg-green-500/10 p-4 rounded-lg">
                  <p className="text-green-400 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    {console.log(isEligibleForFreeService, "eligible")}
                    Device is eligible for free service.
                  </p>
                </div>
              )}

              {/* Not eligible after FreeApproval */}
              {isEligibleForFreeService === false &&
                orderst === "FreeApproval" && (
                  <div className="bg-[#23263a] p-4 rounded-lg flex flex-col items-center">
                    <p className="text-gray-300 mb-4">
                      Your device is not eligible for free service.
                    </p>
                    {!selectedPackage ? (
                      <button
                        onClick={() =>
                          navigate(`/customer/packageSelection/${reqId}`)
                        }
                        className="bg-gradient-to-r from-[#FF4D00] to-[#FF7E00] text-white px-6 py-2 rounded-full hover:from-[#FF5E00] hover:to-[#FF8F00] transition-all shadow-lg"
                      >
                        Choose a Package
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          localStorage.removeItem(`selectedPackage_${reqId}`);
                          setSelectedPackage(null);
                        }}
                        className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-all shadow-lg mt-2"
                      >
                        Change Package
                      </button>
                    )}
                  </div>
                )}

              {/* After FreeApproval status but no free service (just show decision) */}
              {["InRepair", "Delivering", "Paid"].includes(orderst) && (
                <>
                  {isEligibleForFreeService ? (
                    <div className="bg-green-500/10 p-4 rounded-lg">
                      <p className="text-green-400 flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Device is eligible for free service.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-500/10 p-4 rounded-lg">
                      <p className="text-red-400 flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Device is not eligible for free service.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {selectedPackage && (
            <div className="bg-[#171925] rounded-xl p-6 mb-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Selected Package
              </h3>
              <div className="bg-[#23263a] rounded-lg p-6 shadow-inner">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-bold text-white">
                    {selectedPackage.name}
                  </div>
                  <div className="text-xl font-bold text-[#FF4D00]">
                    ₹{selectedPackage.price}
                  </div>
                </div>
                <ul className="space-y-2">
                  {selectedPackage.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-[#FF4D00] mr-2" />
                      {feature.label} - ₹{feature.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-auto">
            <button
              onClick={handleCancelOrder}
              className="bg-gradient-to-r from-[#f54900] to-[#FF7E00] text-white px-8 py-3 rounded-full hover:from-[#e04400] hover:to-[#e06e00] transition-all shadow-lg font-medium"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
