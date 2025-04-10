import React, { useState, useRef, useEffect } from "react";
import AgentNavbar from "../../components/Navbar.jsx";
import CustomerSidebar from "../../components/CustomerSidebar.jsx";
import LoadingPopup from "../../components/LoadingPopup.jsx";
import axios from "axios";

function NewOrder() {
  const [activeCategory, setActiveCategory] = useState('Smartphones');
  const [warrantyCover, setWarrantyCover] = useState("Yes");
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [imei, setImei] = useState('');
  const [description, setDescription] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [companyOptions, setCompanyOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('Upload Invoice');
  const token = localStorage.getItem('token');

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInvoice(file);
    setFileName(file ? file.name : 'Upload Invoice');
  };

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        console.log(activeCategory);
        const res = await axios.get(`/api/request/companies/${activeCategory}` );

        setCompanyOptions(res.data);
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };
    fetchCompanies();
  }, [activeCategory]);

  useEffect(() => {
    const fetchModels = async () => {
      if (!company) return;
      try {
        const res = await axios.get(`/api/request/models/${activeCategory}/${company}`,{
          
        });
        setModelOptions(res.data);
      } catch (error) {
        console.error("Failed to fetch models", error);
        setModelOptions([]);
      }
    };
    fetchModels();
  }, [company , activeCategory]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    console.log("Sending data:");
    console.log( model, warrantyCover, imei, description);
    console.log(invoice)

    formData.append("modelname", model);
    formData.append("warranty", warrantyCover);
    formData.append("imeiNumber", imei);
    formData.append("issue", description);
    if(invoice) formData.append("invoice", invoice);

    try {
      const response = await axios.post("/api/request/newOrder", formData);

      if (response.status === 201) {
        console.log("Order submitted successfully!");
        setActiveCategory('Smartphones');
  setWarrantyCover("Yes");
  setCompany('');
  setModel('');
  setImei('');
  setDescription('');
  setInvoice(null);
  setFileName('Upload Invoice');
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
        {isSubmitting && <LoadingPopup />}
        <div className='w-[100vw] h-[10%] bg-[#171925]'>
          <AgentNavbar />
        </div>
        <div className='bg-[#0d1117] h-[88%] w-[20%] flex justify-start items-center pl-11 pt-[1%]'>
          <CustomerSidebar />
        </div>
        <div className="w-[75%] mt-[6vh] bg-[#ffffff]/0.9 h-[75%] flex flex-col items-center justify-center gap-y-1 rounded-2xl ml-1">
          <div className="text-white w-full flex flex-col items-center mr-4">
            <div className="flex justify-between w-[60%] bg-[#ffffff0d] rounded-[30px] p-1 shadow-inner shadow-[#ffffff0a]">
              {['Smartphones', 'Tablets', 'Laptops'].map((cat) => (
                  <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                  px-8 py-2 mx-1 rounded-[20px] text-sm font-medium transition-all duration-300 ease-in-out
                  ${activeCategory === cat
                          ? 'bg-[#bf400a] text-white scale-[1.05] shadow-md shadow-[#bf400a80]'
                          : 'text-gray-400 hover:bg-[#ffffff0c] hover:text-white'}
                `}
                  >
                    {cat}
                  </button>
              ))}
            </div>
          </div>

          <div className="mt-8 w-[80%] flex flex-col space-y-4">
            {/* Company Dropdown */}
            <div >
              <select
                  id="company"
                  className="w-full p-3 bg-[#171925] text-gray-400 rounded-[12px] outline-none appearance-none cursor-pointer hover:bg-[#1f2937] transition-colors duration-200 focus:ring-1 focus:ring-[#bf400a] focus:ring-opacity-10"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    setModel(""); // reset model when company changes
                  }}
              >
                <option value="" className="bg-[#171925] hover:bg-[#1f2937]">Select Company</option>
                {companyOptions.map((c) => (
                    <option key={c.name} value={c.name} className="bg-[#171925] hover:bg-[#1f2937]">{c.name}</option>
                ))}
              </select>
            </div>

            {/* Model Dropdown */}
            <div>
              <select
                  id="model"
                  className="w-full p-3 bg-[#171925] text-gray-400 rounded-[12px] outline-none appearance-none cursor-pointer hover:bg-[#1f2937] transition-colors duration-200 focus:ring-2 focus:ring-[#bf400a] focus:ring-opacity-50"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!company}
              >
                {!company ? (
                    <option value="" className="bg-[#171925] hover:bg-[#1f2937]">Select Device Model</option>
                ) : modelOptions.length === 0 ? (
                    <option value="" className="bg-[#171925] hover:bg-[#1f2937]">Loading Device models...</option>
                ) : (
                    <>
                      <option value="" className="bg-[#171925] hover:bg-[#1f2937]">Select Device Model</option>
                      {modelOptions.map((m) => (
                          <option key={m.name} value={m.name} className="bg-[#171925] hover:bg-[#1f2937]">{m.name}</option>
                      ))}
                    </>
                )}
              </select>
            </div>

            {/* Warranty toggle */}
            <div className="flex items-center py-1 ml-1">
              <p className="text-gray-400 mr-4 mb-1">Warranty Cover (Optional)</p>
              <span className="bg-[#ffffff]/5 rounded-[12px] flex w-[18%]  justify-around">
              <button onClick={() => setWarrantyCover("Yes")} className={`py-1.5 pr-2 pl-5 ${warrantyCover === "Yes" ? "text-[#bf400a]" : "text-white"}`}>Yes</button>
              <button onClick={() => setWarrantyCover("No")} className={`py-1.5 pr-4 pl-1 ${warrantyCover === "No" ? "text-[#bf400a]" : "text-white"}`}>No</button>
            </span>
            </div>

            {/* IMEI & Invoice */}
            <div className="flex space-x-4 w-full items-center">
              <div className="flex flex-col flex-1">
                <label htmlFor="imei" className="text-[12px] ml-1 text-gray-400">Identification Number</label>
                <input
                    type="text"
                    id="imei"
                    placeholder={activeCategory === "Laptops" ? "Device Identification Number" : "IMEI Number"}
                    className="p-[13.5px] mt-1 bg-[#171925] text-gray-400 rounded-[12px] outline-none w-full"
                    value={imei}
                    onChange={(e) => setImei(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="invoice" className="text-[12px] text-gray-400 mb-1">
                    Invoice Upload
                </label>
                <div
                    className="bg-[#171925] p-3 rounded-[12px] flex items-center w-full cursor-pointer"
                    onClick={handleFileClick}
                >
                    <span className="text-orange-500 mr-2 text-lg">📄</span>
                    <span className="text-gray-400 text-sm truncate">{fileName}</span>
                    <input
                    type="file"
                    id="invoice"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    />
                </div>
                </div>
            </div>

            {/* Description */}
            <textarea
                placeholder="Describe Issue..."
                className="w-full h-24 p-3 bg-[#171925] text-gray-400 rounded-[12px] outline-none resize-none mb-6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button onClick={handleSubmit} className="w-[20%] bg-[#bf400a] py-2 rounded-[12px] text-white font-semibold">
                Book Agent
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NewOrder;
