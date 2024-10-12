import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaCheckCircle, FaStar } from 'react-icons/fa';
import { AiFillCreditCard } from 'react-icons/ai'; // Using a different icon
import { SiVisa, SiMastercard, SiAmericanexpress, SiDiscover, SiStripe } from 'react-icons/si'; // Payment icons

import LOGO2 from '../assets/LOGO2.jpg';
import logo from '../assets/ICON.jpg'; 



function Footer() {
  return (
    <footer className="bg-white text-black py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Logo, About Us, Contact Us */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="mb-4">
              <img src={logo} alt="ComfortTrip Logo" className="w-32" />
            </div>
            
            {/* About Us */}
            <h3 className="text-2xl font-bold text-black">About Us</h3>
            <p className="text-gray-700">
              Welcome to <strong>COMFORT TRIPS</strong>, your trusted provider for reliable and professional London airport transfers. We offer high-quality pickups from major airports including Heathrow, Gatwick, Stansted, Luton, and London City Airport.
            </p>

            {/* Contact Us */}
            <h3 className="text-xl font-bold text-black mt-6">Contact Us</h3>
            <p className="text-gray-700">450 Bath Road, Longford, Heathrow, London, UB7 0EB</p>
            <p className="text-gray-700">Phone: +443333399981</p>
            <p className="text-gray-700">Phone: +447474687168</p>
            <p className="text-gray-700">Email: Contact@ComfortTrips.co.uk</p>
          </div>

          {/* Column 2: Top Airports */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black">Top Airports</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Heathrow Airport</li>
              <li>Gatwick Airport</li>
              <li>Stansted Airport</li>
              <li>Luton Airport</li>
              <li>London City Airport</li>
              <li>Birmingham Airport</li>
              <li>Manchester Airport</li>
              <li>Bristol Airport</li>
              <li>Edinburgh Airport</li>
              <li>Glasgow Airport</li>
            </ul>
          </div>

          {/* Column 3: Franfeero Services and Company */}
          <div className="space-y-4">
            {/* Franfeero Services */}
            <h3 className="text-2xl font-bold text-black">Services</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Airport Transfers</li>
              <li>Chauffeur Services</li>
              <li>Car Rental</li>
              <li>Corporate Services</li>
            </ul>

            {/* Company */}
            <h3 className="text-xl font-bold text-black mt-6">Company</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="hover:text-gray-900 transition-colors">For Travel Agencies</li> 
              <li className="hover:text-gray-900 transition-colors">Careers</li>
              <li className="hover:text-gray-900 transition-colors">Privacy Policy</li>
            </ul>
          </div>

          {/* Column 4: Why Us, Reviews, Payment Methods, Follow Us */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            {/* Why Us */}
            <h3 className="text-2xl font-bold text-black text-center md:text-left">Why Us</h3>
            <ul className="text-gray-700 space-y-2 text-center md:text-left">
              <li><FaCheckCircle className="inline-block text-green-500 mr-2" /> Quick Reservation</li>
              <li><FaCheckCircle className="inline-block text-green-500 mr-2" /> Professional Drivers</li>
              <li><FaCheckCircle className="inline-block text-green-500 mr-2" /> No Hidden Fees</li>
            </ul>

            {/* Best Reviews */}
            <h3 className="text-xl font-bold text-black mt-6 text-center md:text-left">Best Reviews</h3>
            <div className="text-yellow-400 flex justify-center space-x-1 md:justify-start">
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
            </div>

            {/* Payment Methods */}
            <h3 className="text-xl font-bold text-black mt-6 text-center md:text-left">Payment Methods</h3>
            <div className="flex space-x-4 text-gray-700 justify-center md:justify-start">
              <AiFillCreditCard size={32} /> {/* Using credit card icon */}
              <SiVisa size={32} />
              <SiMastercard size={32} />
              <SiAmericanexpress size={32} />
              <SiDiscover size={32} />
              <SiStripe size={32} />
            </div>

            {/* Follow Us */}
            <h3 className="text-xl font-bold text-black mt-6 text-center md:text-left">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-700 hover:text-black transition-colors">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-700 hover:text-black transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-700 hover:text-black transition-colors">
                <FaLinkedinIn size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-700 hover:text-black transition-colors">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-12">
          <p className="text-gray-500">© 2024 ComfortTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;




// import React from 'react';
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaCheckCircle, FaStar } from 'react-icons/fa';
// import { AiFillCreditCard } from 'react-icons/ai'; // Using a different icon
// import { SiVisa, SiMastercard, SiAmericanexpress, SiDiscover, SiStripe } from 'react-icons/si'; // Payment icons

// import LOGO2 from '../assets/LOGO2.jpg';

// function Footer() {
//   return (
//     <footer className="bg-custom-purple text-white py-16 lg:py-24">
//       <div className="container mx-auto px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

//           {/* Column 1: Logo, About Us, Contact Us */}
//           <div className="space-y-4">
//             {/* Logo */}
//             <div className="mb-4">
//               <img src={LOGO2} alt="ComfortTrip Logo" className="w-32" />
//             </div>
            
//             {/* About Us */}
//             <h3 className="text-2xl font-bold text-purple-300">About Us</h3>
//             <p className="text-gray-200">
//               Welcome to <strong>COMFORT TRIPS</strong>, your trusted provider for reliable and professional London airport transfers. We offer high-quality pickups from major airports including Heathrow, Gatwick, Stansted, Luton, and London City Airport.
//             </p>

//             {/* Contact Us */}
//             <h3 className="text-xl font-bold text-purple-300 mt-6">Contact Us</h3>
//             <p className="text-gray-200">450 Bath Road, Longford, Heathrow, London, UB7 0EB</p>
//             <p className="text-gray-200">Phone: +443333399981</p>
//             <p className="text-gray-200">Phone: +447474687168</p>
//             <p className="text-gray-200">Email: Contact@ComfortTrips.co.uk</p>
//           </div>

//           {/* Column 2: Top Airports */}
//           <div className="space-y-4">
//             <h3 className="text-2xl font-bold text-purple-300">Top Airports</h3>
//             <ul className="text-gray-200 space-y-2">
//               <li>Heathrow Airport</li>
//               <li>Gatwick Airport</li>
//               <li>Stansted Airport</li>
//               <li>Luton Airport</li>
//               <li>London City Airport</li>
//               <li>Birmingham Airport</li>
//               <li>Manchester Airport</li>
//               <li>Bristol Airport</li>
//               <li>Edinburgh Airport</li>
//               <li>Glasgow Airport</li>
//             </ul>
//           </div>

//           {/* Column 3: Franfeero Services and Company */}
//           <div className="space-y-4">
//             {/* Franfeero Services */}
//             <h3 className="text-2xl font-bold text-purple-300">Services</h3>
//             <ul className="text-gray-200 space-y-2">
//               <li>Airport Transfers</li>
//               <li>Chauffeur Services</li>
//               <li>Car Rental</li>
//               <li>Corporate Services</li>
//             </ul>

//             {/* Company */}
//             <h3 className="text-xl font-bold text-purple-300 mt-6">Company</h3>
//             <ul className="text-gray-200 space-y-2">
//               <li className="hover:text-white transition-colors">For Travel Agencies</li> 
//               <li className="hover:text-white transition-colors">Careers</li>
//               <li className="hover:text-white transition-colors">Privacy Policy</li>
//             </ul>
//           </div>

//           {/* Column 4: Why Us, Reviews, Payment Methods, Follow Us */}
//           <div className="space-y-4 flex flex-col items-center md:items-start">
//             {/* Why Us */}
//             <h3 className="text-2xl font-bold text-purple-300 text-center md:text-left">Why Us</h3>
//             <ul className="text-gray-200 space-y-2 text-center md:text-left">
//               <li><FaCheckCircle className="inline-block text-green-500 mr-2" /> Quick Reservation</li>
//               <li><FaCheckCircle className="inline-block text-green-500 mr-2" /> Professional Drivers</li>
//               <li><FaCheckCircle className="inline-block text-green-500 mr-2" /> No Hidden Fees</li>
//             </ul>

//             {/* Best Reviews */}
//             <h3 className="text-xl font-bold text-purple-300 mt-6 text-center md:text-left">Best Reviews</h3>
//             <div className="text-yellow-400 flex justify-center space-x-1 md:justify-start">
//               <FaStar size={24} />
//               <FaStar size={24} />
//               <FaStar size={24} />
//               <FaStar size={24} />
//               <FaStar size={24} />
//             </div>

//             {/* Payment Methods */}
//             <h3 className="text-xl font-bold text-purple-300 mt-6 text-center md:text-left">Payment Methods</h3>
//             <div className="flex space-x-4 text-gray-200 justify-center md:justify-start">
//               <AiFillCreditCard size={32} /> {/* Using credit card icon */}
//               <SiVisa size={32} />
//               <SiMastercard size={32} />
//               <SiAmericanexpress size={32} />
//               <SiDiscover size={32} />
//               <SiStripe size={32} />
//             </div>

//             {/* Follow Us */}
//             <h3 className="text-xl font-bold text-purple-300 mt-6 text-center md:text-left">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a href="https://facebook.com" className="text-gray-200 hover:text-white transition-colors">
//                 <FaFacebookF size={24} />
//               </a>
//               <a href="https://twitter.com" className="text-gray-200 hover:text-white transition-colors">
//                 <FaTwitter size={24} />
//               </a>
//               <a href="https://linkedin.com" className="text-gray-200 hover:text-white transition-colors">
//                 <FaLinkedinIn size={24} />
//               </a>
//               <a href="https://instagram.com" className="text-gray-200 hover:text-white transition-colors">
//                 <FaInstagram size={24} />
//               </a>
//             </div>
//           </div>
          
//         </div>

//         {/* Footer Bottom */}
//         <div className="text-center mt-12">
//           <p className="text-gray-400">© 2024 ComfortTrip. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
