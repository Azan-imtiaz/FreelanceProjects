import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import InfoBoxes from "../components/InfoBoxes";
import VehicleShowcase from "../components/VehicleShowcase";
import HowItWorks from "../components/HowItWorks";
import SectionBreak from '../components/SectionBreak';
import CustomerService from '../components/CustomerService';
import Reviews from '../components/Feadback';
import AboutUs from "../components/AboutUs";


const Main = () => {
  return (
    <div className="App">
            <Header />
             <main className="custom-scrollbar container mx-auto  p-[0.5px] lg:p-4 pt-12 mt-8 ">
               <BookingForm />
             
               <SectionBreak />
               <InfoBoxes />
               <SectionBreak />
               <VehicleShowcase />
               <SectionBreak />
               <HowItWorks />
               <SectionBreak />
              <AboutUs />
              <SectionBreak />
               <CustomerService/>
               
               <Reviews />
             </main>
             <Footer />
           </div>
  )
}

export default Main
