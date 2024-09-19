import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Us */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-300">About Us</h3>
            <p className="text-gray-200">
            Welcome to COMFORT TRIPS, your trusted provider for reliable and professional London airport transfers. We offer high-quality pickups from major airports including Heathrow, Gatwick, Stansted, Luton, and London City Airport, with services tailored for both personal and corporate travel needs.   </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-300">Our Services</h3>
            <ul className="text-gray-200 space-y-2">
              <li><a href="/transfers" className="hover:text-white transition-colors">Airport Transfers</a></li>
              <li><a href="/chauffeur" className="hover:text-white transition-colors">Chauffeur Services</a></li>
              <li><a href="/car-rental" className="hover:text-white transition-colors">Car Rental</a></li>
              <li><a href="/corporate" className="hover:text-white transition-colors">Corporate Services</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-300">Contact Us</h3>
            <p className="text-gray-200">450 Bath Road, Longford, Heathrow, London, UB7 0EB</p>
            <p className="text-gray-200">Phone: +1 (123) 456-7890</p>
            <p className="text-gray-200">Phone: +447474687168</p>
            <p className="text-gray-200">Email: Contact@ComfortTrips.co.uk</p>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-300">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-200 hover:text-white transition-colors">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-200 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-200 hover:text-white transition-colors">
                <FaLinkedinIn size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-200 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400">© 2024 ComfortTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
