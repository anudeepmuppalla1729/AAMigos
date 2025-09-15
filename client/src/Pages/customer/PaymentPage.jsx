import React, { useState, useEffect } from "react";
import axios from 'axios';
import AgentNavbar from "../../components/Navbar";
import CustomerSidebar from "../../components/CustomerSidebar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import s23 from "../../assets/s23.png";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);

  // Fetch device and package details
  useEffect(() => {
    // const fetchDeviceInfo = async () => {
    //   try {
    //     setIsLoading(true);
    //     setError(null);
    //     // Replace with your actual endpoint
    //     const response = await axios.get('/api/payment/device-details');
    //     setDeviceInfo(response.data);
    //   } catch (err) {
    //     setError('Failed to load device information. Please try again.');
    //     console.error('Error fetching device info:', err);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    //
    // fetchDeviceInfo();

    setTimeout(() => {
      setDeviceInfo({
        name: "Samsung s23 Ultra",
        orderId: "#674312",
        status: "At Service",
        imageUrl: {s23},
        price: {
          package: 14000,
          handling: 300,
          total: 14300
        }
      });
      setIsLoading(false);
    }, 0);
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPayment || !deviceInfo) return;

    try {
      setIsProcessing(true);
      setError(null);

      // Send payment details to backend
      const response = await axios.post('/api/payment/process', {
        paymentMethod: selectedPayment,
        amount: deviceInfo.price.total,
        orderId: deviceInfo.orderId
      });

      if (response.data.success) {
        navigate('/customer/paymentSuccess');
      } else {
        throw new Error(response.data.message || 'Payment failed');
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
        <div className="bg-[#0d1117] h-screen w-screen flex flex-col items-center justify-center text-white">
          <p className="text-red-500 mb-4">{error}</p>
          <button
              onClick={() => window.location.reload()}
              className="bg-[#ff4d00] px-6 py-2 rounded-[15px]"
          >
            Retry
          </button>
        </div>
    );
  }

  return (
      <div className="bg-[#0d1117] min-h-screen w-full flex flex-col">
        <div className='w-full h-[10vh] bg-[#171925]'><AgentNavbar/></div>
        <div className='flex flex-1 overflow-auto'>
          <div className='w-[17.8%] flex justify-center items-start pt-26 ml-5.5'>
            <CustomerSidebar/>
          </div>
          <div className='w-[76%] p-6 ml-4 flex flex-col space-y-4 pb-8'>
            {/* Device Information Card */}
            {deviceInfo && (
              <div className='bg-[#161b22] rounded-[15px] p-5 hover:border-gray-600 transition-colors'>
                <div className='flex flex-wrap justify-between items-center gap-4'>
                  <div className='flex items-center gap-x-6'>
                    <div className='w-28 h-28 flex items-center justify-center bg-[#1c2129] rounded-[15px] p-3'>
                      <img
                        src={s23}
                        alt={deviceInfo.name}
                        className='w-full h-auto object-contain'
                      />
                    </div>
                    <div className='space-y-2'>
                      <h2 className='text-xl font-semibold text-white'>{deviceInfo.name}</h2>
                      <p className='text-gray-400'>Order ID: {deviceInfo.orderId}</p>
                      <p className='text-gray-400'>Current Status: {deviceInfo.status}</p>
                    </div>
                  </div>
                  <div className='bg-[#1c2129] p-5 rounded-[15px] w-[300px]'>
                    <h3 className='text-lg text-white font-medium mb-4'>Price Breakdown</h3>
                    <div className='space-y-3'>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-400'>Package</span>
                        <span className='text-white'>₹{deviceInfo.price.package}/-</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-400'>Handling Charges</span>
                        <span className='text-white'>₹{deviceInfo.price.handling}/-</span>
                      </div>
                      <div className='flex justify-between items-center pt-3 border-t border-gray-700'>
                        <span className='text-gray-400'>Total Price</span>
                        <span className='text-white font-semibold'>₹{deviceInfo.price.total}/-</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Form */}
            <form onSubmit={handlePaymentSubmit} className='bg-[#161b22] rounded-[15px] p-5 space-y-5'>
              <h2 className='text-xl text-white font-semibold'>Payment Options</h2>

              <div className='space-y-3'>
                <div className='bg-[#1c2129] hover:bg-[#232834] p-3 rounded-[15px] transition-all duration-200'>
                  <label className="custom-radio flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={selectedPayment === 'upi'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    <span className="radio-checkmark"></span>
                    <div className='flex-1 ml-2'>
                      <span className="text-white">Unified Payment Interface (UPI)</span>
                    </div>
                  </label>
                </div>

                <div className='bg-[#1c2129] hover:bg-[#232834] p-3 rounded-[15px] transition-all duration-200'>
                  <label className="custom-radio flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={selectedPayment === 'netbanking'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    <span className="radio-checkmark"></span>
                    <div className='flex-1 ml-2'>
                      <span className="text-white">Net Banking</span>
                    </div>
                  </label>
                </div>

                <div className='bg-[#1c2129] hover:bg-[#232834] p-3 rounded-[15px] transition-all duration-200'>
                  <label className="custom-radio flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={selectedPayment === 'card'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    <span className="radio-checkmark"></span>
                    <div className='flex-1 ml-2'>
                      <span className="text-white">Card</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-center">{error}</p>
              )}

              {/* Submit Button */}
              <div className='flex justify-center mt-4'>
                <button
                  type="submit"
                  disabled={!selectedPayment || isProcessing}
                  className={`bg-[#ff4d00] text-white  hover:bg-[#ff6020] px-8 py-2.5 rounded-[15px] font-medium transition-colors ${isProcessing || !selectedPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}