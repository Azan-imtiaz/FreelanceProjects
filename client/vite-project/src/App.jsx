// src/App.js

import React from 'react';
import Header from '../src/components/Header';
import BookingForm from '../src/components/BookingForm';
import Footer from '../src/components/Footer';
import InfoBoxes from "../src/components/InfoBoxes";
import VehicleShowcase from "../src/components/VehicleShowcase";
import HowItWorks from "../src/components/HowItWorks";
function App() {
  return (
    <div className="App">
      <Header />
      <main className="container mx-auto p-4 pt-16">
        <BookingForm />
        <InfoBoxes />
        <VehicleShowcase />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
