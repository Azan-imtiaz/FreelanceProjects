

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






