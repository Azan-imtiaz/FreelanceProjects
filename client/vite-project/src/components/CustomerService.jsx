import React, { useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaTimes } from 'react-icons/fa';

function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle contact options visibility
  const toggleContact = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-5 right-5 z-50"> {/* z-50 ensures it's above other elements */}
      {/* Floating Button */}
{/*       
      <button
  className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg focus:outline-none hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition duration-300"
  onClick={() => setShowContact(!showContact)}
>
  Contact Us
</button> */}

      
      <button
        onClick={toggleContact}
        className="bg-gradient-to-r  from-purple-500 to-pink-500 text-white p-3 lg:p-3 rounded-full shadow-lg focus:outline-none hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition duration-300"
        aria-label="Contact Us"
      >
        {isOpen ? <FaTimes size={24} /> : 'Contact Us'}
      </button>

      {/* Contact Options (show when isOpen is true) */}
      {isOpen && (
        <div className="mt-3 bg-white rounded-lg shadow-xl p-4 space-y-4 z-50">
          {/* WhatsApp Option */}
          <button
            onClick={() => window.open('https://wa.me/+447474687168', '_blank')}
            className="flex items-center justify-start p-2 hover:bg-gray-100 w-full rounded-md transition duration-200"
          >
            <FaWhatsapp className="text-green-500 mr-3" size={24} />
            <span className="text-gray-700">WhatsApp</span>
          </button>

          {/* Email Option */}
          <button
            onClick={() => window.location.href = 'mailto:Contact@ComfortTrips.co.uk'}
            className="flex items-center justify-start p-2 hover:bg-gray-100 w-full rounded-md transition duration-200"
          >
            <FaEnvelope className="text-blue-500 mr-3" size={24} />
            <span className="text-gray-700">Email</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default FloatingContact;

