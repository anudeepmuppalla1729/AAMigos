import React, { useState } from "react";
import AgentNavbar from "../../components/Navbar.jsx";
import AgentSidebar from "../../components/AgentSideBar.jsx";

function AgentSupport() {
  const [queryForm, setQueryForm] = useState({
    subject: "",
    description: "",
    priority: "Low"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the query
    console.log("Query submitted:", queryForm);
    // Reset form
    setQueryForm({ subject: "", description: "", priority: "Low" });
  };

  const handleChange = (e) => {
    setQueryForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqData = [
    {
      question: "How do I handle urgent customer requests?",
      answer: "Prioritize based on severity and respond within 2 hours for urgent cases."
    },
    {
      question: "What's the process for escalating issues?",
      answer: "Use the priority system and notify administrators for critical cases."
    },
    {
      question: "How to update ticket status?",
      answer: "Use the status dropdown in the ticket details to mark as In Progress/Resolved."
    }
  ];

  const tickets = [
    {
      id: "TK001",
      customer: "Jane Smith",
      issue: "Device not connecting",
      priority: "High",
      status: "Open"
    },
    {
      id: "TK002",
      customer: "Mike Johnson",
      issue: "Software update failed",
      priority: "Medium",
      status: "In Progress"
    }
  ];

  return (
    <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
      <div className='w-[100vw] h-[10%] bg-[#171925]'><AgentNavbar/></div>
      <div className='bg-[#0d1117] h-[88%] w-[20vw] flex justify-center pl-6 items-center pt-[2%]'><AgentSidebar/></div>
      <div className='h-[90%] w-[74.5vw] flex items-center pl-13'>
        <div className='bg-[#0d1117] h-[85%] w-[100%] flex flex-wrap gap-[1.5vw]'>
          {/* Support Ticket Form */}
          <div className='bg-[#161b22] w-[48.5%] h-[100%] rounded-[15px] p-[3%] text-white'>
            <h2 className='text-xl mb-6'>Create Support Ticket</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div>
                <label className='block text-sm mb-2'>Subject</label>
                <input
                  type='text'
                  name='subject'
                  value={queryForm.subject}
                  onChange={handleChange}
                  className='w-full bg-[#22272d] rounded-lg p-2 text-white'
                  required
                />
              </div>
              <div>
                <label className='block text-sm mb-2'>Description</label>
                <textarea
                  name='description'
                  value={queryForm.description}
                  onChange={handleChange}
                  className='w-full bg-[#22272d] rounded-lg p-2 text-white h-32'
                  required
                />
              </div>
              <div>
                <label className='block text-sm mb-2'>Priority</label>
                <select
                  name='priority'
                  value={queryForm.priority}
                  onChange={handleChange}
                  className='w-full bg-[#22272d] rounded-lg p-2 text-white'
                >
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                </select>
              </div>
              <button
                type='submit'
                className='mt-4 bg-[#ff4e00] hover:bg-[#ff5722] text-white py-2 px-4 rounded-full transition-colors'
              >
                Submit Query
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className='bg-[#161b22] w-[48.5%] h-[100%] rounded-[15px] p-[3%] text-white flex flex-col'>
            <h2 className='text-xl mb-6 sticky top-0 bg-[#161b22] z-10 py-2'>Frequently Asked Questions</h2>
            <div className='space-y-4 overflow-y-auto scrollbar-hide'>
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              {faqData.map((faq, index) => (
                <div key={index} className='bg-[#22272d] p-4 rounded-lg'>
                  <h3 className='font-medium mb-2'>{faq.question}</h3>
                  <p className='text-gray-400'>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default AgentSupport;