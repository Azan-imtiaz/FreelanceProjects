import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import VehicleSelection from '../components/VehicleSelection';
import Footer from '../components/Footer';
import InfoBoxes from "../components/InfoBoxes";
import VehicleShowcase from "../components/VehicleShowcase";
import HowItWorks from "../components/HowItWorks";
import SectionBreak from '../components/SectionBreak';
import CustomerService from '../components/CustomerService';
import Reviews from '../components/Feadback';


const VehicleSelectionPage = () => {
  return (
    <div className="App ">
            <Header />
            
             <main className="custom-scrollbar  container mx-auto  p-[0.5px] lg:p-4 pt-16 mt-8 ">
               <VehicleSelection />
               <SectionBreak /> 
               <InfoBoxes />
               <SectionBreak /> 
               <VehicleShowcase />
               <SectionBreak /> 
               <HowItWorks />
               
               <SectionBreak />
               <CustomerService/>
               <SectionBreak />
               <Reviews />

             </main>
             <Footer />
           </div>
   )
}

export default VehicleSelectionPage
