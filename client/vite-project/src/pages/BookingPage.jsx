import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Booking from '../components/Booking';
import Footer from '../components/Footer';
import InfoBoxes from "../components/InfoBoxes";
import VehicleShowcase from "../components/VehicleShowcase";
import HowItWorks from "../components/HowItWorks";

const BookingPage = () => {
  return (
    <div className="App">
            <Header />
             <main className="custom-scrollbar container mx-auto  p-[0.5px] px-0  pt-16 mt-8">
               <Booking/>
               <InfoBoxes />
               <VehicleShowcase />
               <HowItWorks />
             </main>
             <Footer />
           </div>
  )
}

export default BookingPage
