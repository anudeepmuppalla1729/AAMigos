import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import CustomerSidebar from '../../components/CustomerSidebar';
import personsupport from '../../assets/support.png';

function CustomerSupport() {
    const [ticketForm, setTicketForm] = useState({
        subject: '',
        description: '',
        priority: 'medium'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicketForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle ticket submission logic here
        console.log('Ticket submitted:', ticketForm);
    };

    return (
        <div className='bg-[#0d1117] h-screen w-screen flex flex-wrap'>
            <div className='w-[100vw] h-[10vh] bg-[#171925]'><Navbar/></div>
            <div className='bg-[#0d1117] h-[88%] w-[21%] flex justify-start items-center pl-11 pt-[2%]'><CustomerSidebar/></div>
            <div className='h-[90%] w-[72vw] flex items-center pl-8'>
                <div className='bg-[#0d1117] h-[85%] w-[100%] flex flex-wrap gap-[1.5vw]'>
                    {/* Support Ticket Form */}
                    <div className='bg-[#161b22] w-[48.5%] h-[100%] rounded-[15px] p-[3%] text-white overflow-y-auto scrollbar-hide'>
                        <h2 className='text-xl mb-6'>Create Support Ticket</h2>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <div>
                                <label className='block text-sm mb-2'>Subject</label>
                                <input
                                    type='text'
                                    name='subject'
                                    value={ticketForm.subject}
                                    onChange={handleInputChange}
                                    className='w-full bg-[#22272d] rounded-lg p-2 text-white'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm mb-2'>Description</label>
                                <textarea
                                    name='description'
                                    value={ticketForm.description}
                                    onChange={handleInputChange}
                                    className='w-full bg-[#22272d] rounded-lg p-2 text-white h-32'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm mb-2'>Priority</label>
                                <select
                                    name='priority'
                                    value={ticketForm.priority}
                                    onChange={handleInputChange}
                                    className='w-full bg-[#22272d] rounded-lg p-2 text-white'
                                >
                                    <option value='low'>Low</option>
                                    <option value='medium'>Medium</option>
                                    <option value='high'>High</option>
                                </select>
                            </div>
                            <button
                                type='submit'
                                className='mt-4 bg-[#ff4e00] hover:bg-[#ff5722] text-white py-2 px-4 rounded-full transition-colors'
                            >
                                Submit Ticket
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
                            <div className='bg-[#22272d] p-4 rounded-lg'>
                                <h3 className='font-medium mb-2'>How do I track my repair status?</h3>
                                <p className='text-gray-400'>You can track your repair status in the "Orders" section of your dashboard.</p>
                            </div>
                            <div className='bg-[#22272d] p-4 rounded-lg'>
                                <h3 className='font-medium mb-2'>What payment methods are accepted?</h3>
                                <p className='text-gray-400'>We accept all major credit cards, debit cards, and digital wallets.</p>
                            </div>
                            <div className='bg-[#22272d] p-4 rounded-lg'>
                                <h3 className='font-medium mb-2'>How long does repair typically take?</h3>
                                <p className='text-gray-400'>Most repairs are completed within 24-48 hours after receiving your device.</p>
                            </div>
                            <div className='bg-[#22272d] p-4 rounded-lg'>
                                <h3 className='font-medium mb-2'>Do you offer warranty on repairs?</h3>
                                <p className='text-gray-400'>Yes, all our repairs come with a 90-day warranty on parts and labor.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerSupport;