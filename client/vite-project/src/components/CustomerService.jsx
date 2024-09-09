import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa'; // Importing necessary icons

function CustomerService() {
  return (
    <div className="customer-service-container">
      <h2 className="customer-service-title text-purple-700 text-center">Customer Service</h2>
      <p className="customer-service-description text-center">
        We're here to help! Choose any of the options below to get in touch with our support team.
      </p>

      <div className="customer-service-options">
        <div className="service-option">
          <FaPhoneAlt className="service-icon" />
          <h3>Call Us</h3>
          <p>+1-800-123-4567</p>
        </div>

        <div className="service-option">
          <FaEnvelope className="service-icon" />
          <h3>Email Us</h3>
          <p>support@yourwebsite.com</p>
        </div>

        <div className="service-option">
          <FaClock className="service-icon" />
          <h3>Need Help?</h3>
          <p>Our support team is available 24/7.</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerService;











// import React from 'react';
// import { FaPhoneAlt, FaEnvelope,FaClock } from 'react-icons/fa'; // Importing necessary icons

// function CustomerService() {
//   return (
//     <div className="customer-service-container">
//       <h2 className="customer-service-title text-purple-700">Customer Service</h2>
//       <p className="customer-service-description">
//         We're here to help! Choose any of the options below to get in touch with our support team.
//       </p>
      
//       <div className="customer-service-options">
//         <div className="service-option">
//           <FaPhoneAlt className="service-icon" />
//           <h3>Call Us</h3>
//           <p>+1-800-123-4567</p>
//         </div>

//         <div className="service-option">
//           <FaEnvelope className="service-icon" />
//           <h3>Email Us</h3>
//           <p>support@yourwebsite.com</p>
//         </div>
//         <div className="service-option">
//           <FaClock className="service-icon" />
//           <h3>Need Help?</h3>
//           <p>Our support team is available 24/7.</p>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default CustomerService;


















// import React, { useState } from 'react';
// import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from 'react-icons/fa'; // Importing necessary icons

// function CustomerService() {
//   const [showFAQs, setShowFAQs] = useState(false); // State to manage FAQ visibility

//   // Function to toggle FAQ section visibility
//   const toggleFAQs = () => {
//     setShowFAQs(!showFAQs);
//   };

//   return (
//     <div className="customer-service-container">
//       <h2 className="customer-service-title">Customer Service</h2>
//       <p className="customer-service-description">
//         We're here to help! Choose any of the options below to get in touch with our support team.
//       </p>
      
//       <div className="customer-service-options">
//         <div className="service-option">
//           <FaPhoneAlt className="service-icon" />
//           <h3>Call Us</h3>
//           <p>+1-800-123-4567</p>
//         </div>

//         <div className="service-option">
//           <FaEnvelope className="service-icon" />
//           <h3>Email Us</h3>
//           <p>support@yourwebsite.com</p>
//         </div>

//         <div className="service-option" onClick={toggleFAQs} style={{ cursor: 'pointer' }}>
//           <FaQuestionCircle className="service-icon" />
//           <h3>FAQs</h3>
//           <p>Find answers to common questions.</p>
//         </div>
//       </div>

//       {/* Conditional rendering for FAQ section */}
//       {showFAQs && (
//         <div className="faq-section">
//           <h3 className="faq-title">Frequently Asked Questions</h3>
//           <div className="faq-item">
//             <h4>Q: How can I contact customer support?</h4>
//             <p>A: You can contact customer support via phone, email, or our website's live chat feature.</p>
//           </div>
//           <div className="faq-item">
//             <h4>Q: What is your refund policy?</h4>
//             <p>A: Our refund policy is available on our website. Generally, we offer refunds within 30 days of purchase.</p>
//           </div>
//           <div className="faq-item">
//             <h4>Q: How do I track my order?</h4>
//             <p>A: You can track your order by logging into your account and visiting the 'Orders' section.</p>
//           </div>
//           {/* Add more FAQs as needed */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CustomerService;
