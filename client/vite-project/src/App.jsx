import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import VehicleSelection from './pages/VehicleSelectionPage.jsx';
import LoadingPage from '../src/components/Loader.jsx';
import Booking from './pages/BookingPage.jsx';
import Payment from './pages/PaymentPage.jsx';
import GoogleMapsLoader from './components/GoogleMapsLoader';
import SuccessPage from './components/SuccessPage.jsx';
import CancelPage from './components/CancelPage.jsx';
import ShowMap from './components/ShowMap.jsx';
const apiKey = import.meta.env.VITE_API_KEY;
import './App.css';

function App() {
 
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  
  // useEffect(() => {
  
  //   const timer = setTimeout(() => {
  //     setCheck(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  const handleMapsLoad = () => {
    setIsMapsLoaded(true);
  };

  // const apiKey = "AIzaSyAe0J9mB1B3KS1RfZbA8fYlhA_j0ZAWPx8"; // Replace with your actual API key
    // const apiKey=process.env.API_KEY;
  const libraries = ['places','geometry'];

  return (
    (
      <Router>
        <GoogleMapsLoader apiKey={apiKey} libraries={libraries} onLoad={handleMapsLoad} />
        {isMapsLoaded ? (
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/vehicle-selection" element={<VehicleSelection />} />
            <Route exact path="/success" element={<SuccessPage />} />
            <Route exact path="/cancel" element={<CancelPage />} />
            <Route path="/show-map" element={<ShowMap />} />

            <Route path="/booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        ) : (
          <LoadingPage /> // Show a loading page while Google Maps is loading
        )}
      </Router>
    )
  );
}

export default App;
