import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

function InfoBoxes() {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">Explore Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Box 1 */}
          <div className="bg-purple-100 p-6 lg:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">Reliable Transfers</h3>
            <p className="text-gray-700 text-sm lg:text-base">Enjoy our reliable and punctual transfer services, ensuring you reach your destination on time.</p>
          </div>

          {/* Box 2 */}
          <div className="bg-purple-100 p-6 lg:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">Comfortable Rides</h3>
            <p className="text-gray-700 text-sm lg:text-base">Travel in comfort with our well-maintained and spacious vehicles tailored for your convenience.</p>
          </div>

          {/* Box 3 */}
          <div className="bg-purple-100 p-6 lg:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">24/7 Support</h3>
            <p className="text-gray-700 text-sm lg:text-base">Our support team is available 24/7 to assist you with any inquiries or issues during your journey.</p>
          </div>

          {/* Box 4 */}
          <div className="bg-purple-100 p-6 lg:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">Easy Booking</h3>
            <p className="text-gray-700 text-sm lg:text-base">Book your ride quickly and easily through our user-friendly booking system, available on all devices.</p>
          </div>
        </div>
        {/* <div className="text-center mt-8">
          <a
            href="/learn-more"
            className="inline-flex items-center text-purple-700 font-semibold hover:text-purple-900"
          >
            Learn More
            <FaArrowRight className="ml-2" />
          </a>
        </div> */}
      </div>
    </section>
  );
}

export default InfoBoxes;
