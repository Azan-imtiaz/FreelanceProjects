import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import VehicleSelection from './pages/VehicleSelectionPage.jsx';
import LoadingPage from "../src/components/Loader.jsx";
import Booking from './pages/BookingPage.jsx';
import Payment from './pages/PaymentPage.jsx';
// import NotFound from './pages/NotFound'; // Import a 404 page component
import './App.css'; // Import the custom CSS for scrollbars

function App() {
  const [check, setCheck] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheck(false);
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    check ? (
      <LoadingPage />
    ) : (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/vehicle-selection" element={<VehicleSelection />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          {/* <Route path="*" element={<NotFound />} /> Fallback route for unmatched paths */}
        </Routes>
      </Router>
    )
  );
}

export default App;
