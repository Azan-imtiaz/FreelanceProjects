import React from 'react';

const Payment = () => {
 

  return (
    <div className="container mx-auto px-6 lg:px-8 py-8">
      <div className="steps mb-8">
        <div className="step">1. Select Vehicle</div>
        <div className="step">2. Booking</div>
        <div className="step active">3. Payment</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        {/* Add payment form or information here */}
        <p>Your payment information will be processed here.</p>
        <button onClick={() => history.push('/')} className="bg-purple-700 text-white px-4 py-2 rounded-lg mt-4">Complete Booking</button>
      </div>
    </div>
  );
};

export default Payment;
