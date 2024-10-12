import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function HowItWorks() {
  return (
    <section className="bg-gray-50 py-12 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-custom-purple font-sans text-center mb-8">How It Works</h2>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Step 1 */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border-2 border-purple-300 mb-4 lg:mb-0 lg:relative lg:before:content-[''] lg:before:absolute lg:before:-left-8 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:w-8 lg:before:h-8 lg:before:bg-purple-300 lg:before:rounded-full lg:before:border-2 lg:before:border-purple-700 lg:before:transform lg:before:scale-105">
            <div className="relative z-20">
              <h3 className="text-2xl font-semibold text-custom-purple font-sans  mb-2">Step 1</h3>
              <p className="text-gray-700 font-sans">Enter all the required data in the search field and then choose the desired vehicle.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border-2 border-purple-300 mb-4 lg:mb-0 lg:relative lg:before:content-[''] lg:before:absolute lg:before:-left-8 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:w-8 lg:before:h-8 lg:before:bg-purple-300 lg:before:rounded-full lg:before:border-2 lg:before:border-purple-700 lg:before:transform lg:before:scale-105">
            <div className="relative z-20">
              <h3 className="text-2xl font-semibold text-custom-purple font-sans  mb-2">Step 2</h3>
              <p className="text-gray-700  font-sans">Enter the details of the lead passenger, add extras if you wish. Proceed to payment and receive your voucher.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border-2 border-purple-300 mb-4 lg:mb-0 lg:relative lg:before:content-[''] lg:before:absolute lg:before:-left-8 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:w-8 lg:before:h-8 lg:before:bg-purple-300 lg:before:rounded-full lg:before:border-2 lg:before:border-purple-700 lg:before:transform lg:before:scale-105">
            <div className="relative z-20">
              <h3 className="text-2xl font-semibold text-custom-purple font-sans mb-2">Step 3</h3>
              <p className="text-gray-700 font-sans">You will receive your driver's details 6 hours prior to pickup, and he will be waiting for you on-site with a Name Sign.</p>
            </div>
          </div>

          {/* Completed Step */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-4 lg:mb-0 lg:relative lg:before:content-[''] lg:before:absolute lg:before:-left-8 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:w-8 lg:before:h-8 lg:before:bg-blue-500 lg:before:rounded-full lg:before:border-2 lg:before:border-blue-700 lg:before:transform lg:before:scale-105">
            <div className="relative z-20 flex items-center">
              <FaCheckCircle className="text-blue-500 text-3xl mr-4 font-sans" />
              <div>
                <h3 className="text-2xl font-semibold text-custom-purple font-sans">Completed</h3>
                <p className="text-gray-700 font-sans">Your booking process is completed. Thank you for choosing our service!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
