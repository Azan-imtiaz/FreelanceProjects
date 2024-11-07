import React from 'react';
import { FaCheckCircle, FaArrowRight,FaClock } from 'react-icons/fa';

// Import images from the assets folder
import economy from "../assets/ecm.jpg"
import standard from "../assets/standardLast.jpg"
import firstClass from "../assets/excecutive.jpg"

// import minibus1 from "../assets/minibus1.jpg"
import minibus2 from "../assets/suvLast.jpg"
import firstClassVan from "../assets/vanMain.jpg"
import suvs from "../assets/img6.jpg"
import standardVan from "../assets/img8.png"





function VehicleShowcase() {
  const vehicles = [
    {
      image: economy,
      head:"Economy",
      name: 'Vw Jetta, Toyota Prius or Similar',
      capacity: '3 Passengers',
      description: 'Licensed Vehicle & Professional Drivers',
    },
    {
      image:standard,
      head:"Standard",
      name: 'Kia Niro, Skoda, Mitsubishi, MG, Hyundai or Similar',
      capacity: '4 Passengers',
      description: 'Licensed Vehicle & Professional Drivers',
    },
    {
      image: firstClass,
      head:"Executive",
      name: 'Mercedes E Class, BMW 5 Series, Tesla, Jaguar or Similar',
      capacity: '3 Passengers',
      description: 'Licensed Vehicle & Professional Drivers',
    },
    {
      image: suvs,
      head:"MPV",
      name: 'Volkswagen XL, Ford Glaxay, VW Van or Similar',
      capacity: '5 Passengers',
      description: 'Licensed Vehicle & Professional Drivers',
    },
    {
      image:  minibus2,
      head:"Standard Van",
      name: 'Mercedes Vito, Ford Custom, Hyundai or Similar',
      capacity: '6 Passengers',
      description: 'Licensed Vehicle & Professional Drivers',
    },{
      image: firstClassVan ,
      head:"Luxuary Van",
      name: 'Mercedes V Class, Vito 8seats or Similar',
      capacity: '8 Passengers',
      description: 'Licensed Vehicle & Professional Drivers',
    },{
      image:standardVan,
      head:"Minibus",
      name: 'Vw Transporter, Renauld Traffic Sport or Similar',
      capacity: '14 Passengers',
      description: 'Licensed Vehicle & Professional Drivers',
    }
  ];

  return (
    <section className="bg-white py-8 lg:py-16  lg:pt-0">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-custom-purple text-center mb-6 font-sans">Our Fleet of Vehicles</h2>
        <p className="text-lg text-gray-700 text-center mb-8 font-sans">Explore our diverse range of vehicles, each maintained to the highest standards for your comfort and safety.</p>
        {/* <div className="flex overflow-x-auto space-x-6 pb-4 custom-scrollbar custom-border">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="min-w-[300px] bg-purple-100 p-1 rounded-lg shadow-lg transform transition-transform duration-300 ">
              <div className="w-full h-40 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${vehicle.image})` }}></div>
              <div className="p-4">
               
                <h3 className="text-2xl font-semibold text-black mb-2 font-sans">Economy</h3>
                <h3 className="text-xl font-semibold text-custom-purple mb-2 font-sans">{vehicle.name}</h3>
                <p className="text-gray-700 mb-2 font-sans">{vehicle.capacity}</p>
                <p className="text-gray-600 text-sm flex items-center font-sans">
                  <FaCheckCircle className="text-green-500 mr-2 font-sans" />
                  {vehicle.description}
                </p>
              </div>
            </div>
          ))}
        </div> */}
        <div className="flex overflow-x-auto space-x-6 pb-6 custom-scrollbar custom-border">
  {vehicles.map((vehicle, index) => (
    <div
      key={index}
      className="min-w-[300px] bg-white p-1 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div
        className="w-full h-44 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${vehicle.image})` }}
      ></div>
      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-wide">
          {vehicle.head}
        </h3>
        <h4 className="text-sm font-semibold text-custom-purple mb-2">
          {vehicle.name}
        </h4>
        <p className="text-gray-700 mb-2">{vehicle.capacity}</p>
        <p className="text-gray-600 text-sm flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" />
          {vehicle.description}
        </p>
        <p className="text-sm ">
        {/* <FaClock className="text-blue-500" /> */}
        Free Waiting Time: 60 mins for airport and 15 mins for other pickups
      </p>
      </div>
    </div>
  ))}
</div>

        {/* <div className="text-center mt-6">
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

export default VehicleShowcase;


// // Adjusted VehicleShowcase Component
// import React from 'react';
// import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

// // Import images from the assets folder
// import sedanImage from '../assets/sedan.jpg';
// import suvImage from '../assets/suv.jpg';
// import minivanImage from '../assets/minivan.jpg';
// import vanImage from '../assets/van.jpg';

// function VehicleShowcase() {
//   const vehicles = [
//     {
//       image: sedanImage,
//       name: 'Luxury Sedan',
//       capacity: '4 Passengers',
//       description: 'Licensed Vehicle & Professional Drivers',
//     },
//     {
//       image: suvImage,
//       name: 'Comfort SUV',
//       capacity: '6 Passengers',
//       description: 'Licensed Vehicle & Professional Drivers',
//     },
//     {
//       image: minivanImage,
//       name: 'Spacious Minivan',
//       capacity: '8 Passengers',
//       description: 'Licensed Vehicle & Professional Drivers',
//     },
//     {
//       image: vanImage,
//       name: 'Executive Van',
//       capacity: '12 Passengers',
//       description: 'Licensed Vehicle & Professional Drivers',
//     },
//   ];

//   return (
//     <section className="bg-white py-8 lg:py-16 lg:pt-0">
//       <div className="container mx-auto px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">Our Fleet of Vehicles</h2>
//         <p className="text-lg text-gray-700 text-center mb-8">Explore our diverse range of vehicles, each maintained to the highest standards for your comfort and safety.</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {vehicles.map((vehicle, index) => (
//             <div key={index} className="relative bg-purple-100 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//               <div className="w-full h-40 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${vehicle.image})` }}></div>
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-purple-800 mb-2">{vehicle.name}</h3>
//                 <p className="text-gray-700 mb-2">{vehicle.capacity}</p>
//                 <p className="text-gray-600 text-sm flex items-center">
//                   <FaCheckCircle className="text-green-500 mr-2" />
//                   {vehicle.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="text-center mt-6">
//           <a
//             href="/learn-more"
//             className="inline-flex items-center text-purple-700 font-semibold hover:text-purple-900"
//           >
//             Learn More
//             <FaArrowRight className="ml-2" />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default VehicleShowcase;
