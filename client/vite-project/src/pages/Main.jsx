import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import InfoBoxes from "../components/InfoBoxes";
import VehicleShowcase from "../components/VehicleShowcase";
import HowItWorks from "../components/HowItWorks";


const Main = () => {
  return (
    <div className="App">
            <Header />
             <main className="custom-scrollbar container mx-auto  p-[0.5px] lg:p-4 pt-16 mt-8">
               <BookingForm />
               <InfoBoxes />
               <VehicleShowcase />
               <HowItWorks />
             </main>
             <Footer />
           </div>
  )
}

export default Main
