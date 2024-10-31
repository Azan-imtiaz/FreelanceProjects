import React from 'react';
import { motion } from 'framer-motion';
import { FaPlaneDeparture, FaCar, FaMap } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="about-us-container p-8 bg-white shadow-lg rounded-lg relative overflow-hidden">
      <motion.h2
        className="about-us-title text-custom-purple  font-sans text-center text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Us
      </motion.h2>

      <motion.p
        className="about-us-description text-center text-gray-700 mb-8 text-lg font-sans "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your top choice for reliable and professional airport transfers and chauffeuring services in London.
      </motion.p>

      <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          className="service-card bg-purple-50  font-sans  p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <FaPlaneDeparture className="service-icon text-custom-purple  font-sans  mb-2 text-5xl" />
          <h3 className="font-semibold text-xl font-sans">Airport Transfers</h3>
          <p className="text-gray-600 font-sans">Hassle-free transfers to and from major  airports.</p>
        </motion.div>

        <motion.div
          className="service-card bg-purple-50 p-6  font-sans  rounded-lg shadow-lg transform transition-all hover:scale-105 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <FaCar className="service-icon text-custom-purple  font-sans  mb-2 text-5xl" />
          <h3 className="font-semibold text-xl  font-sans ">Chauffeur Services</h3>
          <p className="text-gray-600font-sans ">Enjoy the luxury of a private driver at your convenience.</p>
        </motion.div>

        <motion.div
          className="service-card bg-purple-50 p-6 font-sans  rounded-lg shadow-lg transform transition-all hover:scale-105 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <FaMap className="service-icon  mb-2 text-5xl text-custom-purple  font-sans " />
          {/* <h3 className="font-semibold text-xl font-sans ">Day Trips</h3>
          <p className="text-gray-600  font-sans ">Customized trips to explore iconic sights around London.</p> */}
          <h3 className="font-semibold text-xl font-sans">Seaport Transfers</h3>
<p className="text-gray-600 font-sans">Effortless, reliable transfers to  major seaports, tailored to your travel schedule and needs.</p>

        </motion.div>

        <motion.div
          className="service-card bg-purple-50 font-sans  p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <FaPlaneDeparture className="service-icon text-custom-purple  font-sans  mb-2 text-5xl" />
          <h3 className="font-semibold text-xl  font-sans ">City-to-City Connections</h3>
          <p className="text-gray-600 font-sans ">Efficient transportation between cities for business or leisure.</p>
        </motion.div>
      </div>

      <motion.h3
        className="why-choose-title   text-custom-purple   text-3xl font-bold mt-6 mb-3 text-center font-sans "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Why Choose COMFORT TRIPS?
      </motion.h3>
      <ul className="text-gray-700    font-sans text-lg list-disc list-inside mb-4 text-center">
        <li>Experienced Drivers: Skilled, courteous, and attentive to your needs.</li>
        <li>24/7 Customer Support: Assistance available around the clock.</li>
        <li>Competitive Prices: Transparent pricing with no hidden fees.</li>
        <li>Personalized Service: Tailored to your specific requirements.</li>
      </ul>
    </div>
  );
};

export default AboutUs;




// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaPlaneDeparture, FaCar, FaMap } from 'react-icons/fa';

// const AboutUs = () => {
//   return (
//     <div className="about-us-container p-6 bg-white shadow-lg rounded-lg">
//       <motion.h2
//         className="about-us-title text-purple-700 text-center text-3xl font-bold mb-4"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         About Us
//       </motion.h2>

//       <motion.p
//         className="about-us-description text-center text-gray-700 mb-6 text-lg"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Your top choice for reliable and professional airport transfers and chauffeuring services in London.
//       </motion.p>

//       <motion.div
//         className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="service-card bg-purple-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
//           <FaPlaneDeparture className="service-icon text-purple-700 mb-2 text-4xl" />
//           <h3 className="font-semibold text-xl">Airport Transfers</h3>
//           <p className="text-gray-600">Hassle-free transfers to and from major London airports.</p>
//         </div>

//         <div className="service-card bg-purple-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
//           <FaCar className="service-icon text-purple-700 mb-2 text-4xl" />
//           <h3 className="font-semibold text-xl">Chauffeur Services</h3>
//           <p className="text-gray-600">Enjoy the luxury of a private driver at your convenience.</p>
//         </div>

//         <div className="service-card bg-purple-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
//           <FaMap className="service-icon text-purple-700 mb-2 text-4xl" />
//           <h3 className="font-semibold text-xl">Day Trips</h3>
//           <p className="text-gray-600">Customized trips to explore iconic sights around London.</p>
//         </div>

//         <div className="service-card bg-purple-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
//           <FaPlaneDeparture className="service-icon text-purple-700 mb-2 text-4xl" />
//           <h3 className="font-semibold text-xl">City-to-City Connections</h3>
//           <p className="text-gray-600">Efficient transportation between cities for business or leisure.</p>
//         </div>
//       </motion.div>

//       <motion.h3
//         className="why-choose-title text-purple-800 text-2xl font-bold mt-6 mb-3 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Why Choose COMFORT TRIPS?
//       </motion.h3>
//       <ul className="text-gray-700 text-lg list-disc list-inside mb-4">
//         <li>Experienced Drivers: Skilled, courteous, and attentive to your needs.</li>
//         <li>24/7 Customer Support: Assistance available around the clock.</li>
//         <li>Competitive Prices: Transparent pricing with no hidden fees.</li>
//         <li>Personalized Service: Tailored to your specific requirements.</li>
//       </ul>     
//     </div>
//   );
// };

// export default AboutUs;


// import React from 'react';
// import { motion } from 'framer-motion'; // Importing Framer Motion for animations
// import { FaPlaneDeparture, FaCar, FaMap } from 'react-icons/fa'; // Icons for services

// const AboutUs = () => {
//   return (
//     <div className="about-us-container p-6 bg-white shadow-lg rounded-lg">
//       <motion.h2
//         className="about-us-title text-purple-700 text-center text-2xl font-bold mb-4"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//   About Us
//       </motion.h2>

//       <motion.p
//         className="about-us-description text-center text-gray-700 mb-4"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Your top choice for reliable and professional London airport transfers and chauffeuring services.
//       </motion.p>

//       <motion.div
//         className="services-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="service-card bg-purple-100 p-4 rounded-lg shadow-md">
//           <FaPlaneDeparture className="service-icon text-purple-700 mb-2" />
//           <h3 className="font-semibold">Airport Transfers</h3>
//           <p>Hassle-free transfers to and from major London airports.</p>
//         </div>

//         <div className="service-card bg-purple-100 p-4 rounded-lg shadow-md">
//           <FaCar className="service-icon text-purple-700 mb-2" />
//           <h3 className="font-semibold">Chauffeur Services</h3>
//           <p>Enjoy the luxury of a private driver at your convenience.</p>
//         </div>

//         <div className="service-card bg-purple-100 p-4 rounded-lg shadow-md">
//           <FaMap className="service-icon text-purple-700 mb-2" />
//           <h3 className="font-semibold">Day Trips</h3>
//           <p>Customized trips to explore iconic sights around London.</p>
//         </div>

//         <div className="service-card bg-purple-100 p-4 rounded-lg shadow-md">
//           <FaPlaneDeparture className="service-icon text-purple-700 mb-2" />
//           <h3 className="font-semibold">City-to-City Connections</h3>
//           <p>Efficient transportation between cities for business or leisure.</p>
//         </div>
//       </motion.div>

//       <motion.h3
//         className="fleet-title text-purple-800 text-2xl font-bold mb-3 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         Our Fleet
//       </motion.h3>
//       <p className="text-center text-gray-600 mb-4 text-lg">
//         A wide range of vehicles to suit your needs.
//       </p>

//       <motion.ul
//         className="fleet-list list-disc list-inside text-gray-700 text-lg mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9 }}
//       >
//         <li>Economy Cars: Affordable options for budget-conscious travelers.</li>
//         <li>Luxury Executive Saloons: Elegant vehicles for a premium experience.</li>
//         <li>Spacious MPVs: Ideal for families or groups.</li>
//       </motion.ul>

//       <motion.h3
//         className="why-choose-title text-purple-800 text-2xl font-bold mt-6 mb-3 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Why Choose COMFORT TRIPS?
//       </motion.h3>
//       <ul className="text-gray-700 text-lg list-disc list-inside">
//         <li>Experienced Drivers: Skilled, courteous, and attentive to your needs.</li>
//         <li>24/7 Customer Support: Assistance available around the clock.</li>
//         <li>Competitive Prices: Transparent pricing with no hidden fees.</li>
//         <li>Personalized Service: Tailored to your specific requirements.</li>
//       </ul>     
//     </div>
//   );
// };

// export default AboutUs;
