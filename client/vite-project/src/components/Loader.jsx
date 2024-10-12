import React from 'react';
import { FaSpinner } from 'react-icons/fa';
// import logo from './logo.png'; 
import logo from '../assets/ICON.jpg'; 

function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <img src={logo} alt="ComfortTrip Logo" className="h-20 " /> {/* Adjust height as needed */}
        </div>
        <div className="flex items-center">
          <FaSpinner className="animate-spin text-6xl" />
        </div>
        <p className="mt-4">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingPage;



// import React from 'react';
// import { FaSpinner } from 'react-icons/fa';

// function LoadingPage() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-purple-700 text-white">
//       <div className="flex flex-col items-center">
//         <div className="text-4xl font-bold mb-4">
//           <span className="text-yellow-400">COMFORT</span>TRIP
//         </div>
//         <div className="flex items-center">
//           <FaSpinner className="animate-spin text-6xl" />
//         </div>
//         <p className="mt-4">Loading...</p>
//       </div>
//     </div>
//   );
// }

// export default LoadingPage;
