





// import React from 'react';
// import standardVan from "../assets/standardVan.jpg";

// function InfoBoxes() {
//   const services = [
//     {
//       title: 'Reliable Transfers',
//       description: `We offer dependable transfer services, ensuring timely arrival to your destination. 
//       Our drivers are highly trained professionals with years of experience. Whether you're heading to the airport or an important event, we've got you covered.`,
//       imageUrl: standardVan,
//     },
//     {
//       title: 'Comfortable Rides',
//       description: `Travel in style and comfort with our spacious, well-maintained vehicles. Each car is equipped with premium amenities to ensure your ride is as comfortable as possible.`,
//       imageUrl: standardVan,
//     },
//     {
//       title: '24/7 Support',
//       description: `No matter the time, our 24/7 support team is here for you. We pride ourselves on being responsive, ensuring all your queries or concerns are addressed immediately.`,
//       imageUrl: standardVan,
//     },
//     {
//       title: 'Easy Booking',
//       description: `With our user-friendly platform, booking a ride is just a few clicks away. Available across all devices, our system ensures flexibility for scheduling a pickup or planning ahead.`,
//       imageUrl: standardVan,
//     },
//   ];

//   return (
//     <section className="bg-gradient-to-r from-purple-50 via-white to-purple-50 py-8 lg:py-12">
//       <div className="container mx-auto px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-purple-700 text-center mb-12 tracking-wide">
//           Explore Our Premium Services
//         </h2>

//         <div className="space-y-12">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} 
//               lg:space-x-8 space-y-4 lg:space-y-0`}>
              
//               {/* Image Section */}
//               <div className="w-full lg:w-2/5 h-[220px] relative">
//                 <img
//                   src={service.imageUrl}
//                   alt={service.title}
//                   className="rounded-lg shadow-lg h-full w-full object-cover"
//                 />
//               </div>

//               {/* Description Section */}
//               <div className="w-full lg:w-3/5 text-center lg:text-left lg:px-6">
//                 <h3 className="text-xl font-semibold text-purple-800 mb-4 leading-snug">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 text-base leading-relaxed tracking-wide break-words">
//                   {service.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default InfoBoxes;


import React from 'react';
import standardVan from "../assets/standardVan.jpg";
 import EasyBooking from "../assets/EasyBooking.jpg";
 import support from "../assets/support.jpg";
//  import ReliableTransfer from "../assets/ReliableTransfer.jpg";

 import services2 from "../assets/bg.jpg";

 import comfort from "../assets/comfort.jpg";

function InfoBoxes() {
  const services = [
    {
      title: 'Reliable Transfers',
      description: `We offer dependable transfer services, ensuring timely arrival to your destination. Our drivers are 
      highly trained professionals with years of experience. Whether you're heading to the airport or an important event, 
      we've got you covered with smooth, on-time transfers and personalized service.`,
      imageUrl: services2,
    },
    {
      title: 'Comfortable Rides',
      description: `Travel in style and comfort with our spacious, well-maintained vehicles. Each car is equipped with premium 
      amenities to ensure your ride is as comfortable and relaxing as possible, from luxury interiors to advanced 
      climate control systems.`,
      imageUrl: comfort,
    },
    {
      title: '24/7 Support',
      description: `No matter the time, our 24/7 support team is here for you. We pride ourselves on being responsive and 
      reliable, ensuring all your queries or concerns are addressed immediately, making your experience stress-free.`,
      imageUrl: support,
    },
    {
      title: 'Easy Booking',
      description: `With our user-friendly platform, booking a ride is just a few clicks away. Available across all devices, 
      our booking system ensures flexibility, whether you're scheduling a last-minute pickup or planning ahead.`,
      imageUrl:  EasyBooking,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-purple-50 via-white to-purple-50 py-8 lg:py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-custom-purple font-sans text-center mb-12 tracking-wide">
          Explore Our Premium Services
        </h2>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center font-sans ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} 
              lg:space-x-8 space-y-4 lg:space-y-0`}>
              
              {/* Image Section */}
              <div className="w-full lg:w-2/5 h-[300px] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-lg"></div>
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="rounded-lg shadow-lg h-full w-full object-cover"
                />
              </div>

              {/* Description Section */}
              <div className="w-full lg:w-3/5 text-center lg:text-left lg:px-6">
                <h3 className="text-3xl  text-custom-purple mb-4 leading-snug font-sans">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed tracking-wide font-sans">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoBoxes;







// import React from 'react';
// import standardVan from "../assets/standardVan.jpg";

// function InfoBoxes() {
//   const services = [
//     {
//       title: 'Reliable Transfers',
//       description: `We offer dependable transfer services, ensuring timely arrival to your destination. Our drivers are 
//       highly trained professionals with years of experience. They prioritize your safety and comfort. Whether you're 
//       heading to the airport or an important event, we've got you covered with on-time transfers and smooth rides.`,
//       imageUrl: standardVan,
//     },
//     {
//       title: 'Comfortable Rides',
//       description: `Enjoy comfort with our spacious and well-maintained vehicles designed for your convenience. Each vehicle 
//       in our fleet is equipped with modern amenities to make your journey as enjoyable as possible. From luxury sedans 
//       to family-friendly vans, we cater to a variety of needs, ensuring a premium travel experience.`,
//       imageUrl: standardVan,
//     },
//     {
//       title: '24/7 Support',
//       description: `Our team is available round-the-clock to assist you during your journey. No matter the time of day, we’re 
//       here to ensure your travel plans go smoothly. Have questions or last-minute changes? Contact our support team 
//       anytime, and we’ll be ready to help you.`,
//       imageUrl: standardVan,
//     },
//     {
//       title: 'Easy Booking',
//       description: `Experience effortless booking with our user-friendly system, available on any device. We’ve simplified the 
//       process so you can book your ride in just a few clicks. Plan your travel ahead of time or schedule last-minute 
//       pickups — our system is built for flexibility.`,
//       imageUrl: standardVan,
//     },
//   ];

//   return (
//     <section className="bg-white py-12 lg:py-16">
//       <div className="container mx-auto px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-purple-700 text-center mb-10">Explore Our Services</h2>

//         <div className="space-y-14">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} 
//               lg:space-x-8 space-y-6 lg:space-y-0`}>
              
//               {/* Image */}
//               <div className="w-full lg:w-1/2 h-[400px] flex justify-center">
//                 <img
//                   src={service.imageUrl}
//                   alt={service.title}
//                   className="rounded-lg shadow-md h-full object-cover"
//                 />
//               </div>
              
//               {/* Description */}
//               <div className="w-full lg:w-1/2 text-center lg:text-left">
//                 <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">{service.title}</h3>
//                 <p className="text-gray-700 leading-relaxed">{service.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default InfoBoxes;






// import React from 'react';
// import { FaArrowRight } from 'react-icons/fa';

// function InfoBoxes() {
//   return (
//     <section className="bg-white py-12 lg:py-24">
//       <div className="container mx-auto px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">Explore Our Services</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//           {/* Box 1 */}
//           <div className="bg-purple-100 p-6 lg:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">Reliable Transfers</h3>
//             <p className="text-gray-700 text-sm lg:text-base">Enjoy our reliable and punctual transfer services, ensuring you reach your destination on time.</p>
//           </div>

//           {/* Box 2 */}
//           <div className="bg-purple-100 p-6 lg:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">Comfortable Rides</h3>
//             <p className="text-gray-700 text-sm lg:text-base">Travel in comfort with our well-maintained and spacious vehicles tailored for your convenience.</p>
//           </div>

//           {/* Box 3 */}
//           <div className="bg-purple-100 p-6 lg:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">24/7 Support</h3>
//             <p className="text-gray-700 text-sm lg:text-base">Our support team is available 24/7 to assist you with any inquiries or issues during your journey.</p>
//           </div>

//           {/* Box 4 */}
//           <div className="bg-purple-100 p-6 lg:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <h3 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-4">Easy Booking</h3>
//             <p className="text-gray-700 text-sm lg:text-base">Book your ride quickly and easily through our user-friendly booking system, available on all devices.</p>
//           </div>
//         </div>
//         {/* <div className="text-center mt-8">
//           <a
//             href="/learn-more"
//             className="inline-flex items-center text-purple-700 font-semibold hover:text-purple-900"
//           >
//             Learn More
//             <FaArrowRight className="ml-2" />
//           </a>
//         </div> */}
//       </div>
//     </section>
//   );
// }

// export default InfoBoxes;
