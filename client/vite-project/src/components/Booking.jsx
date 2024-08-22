import React, { useState } from 'react';

const Booking = () => {
  const [formData, setFormData] = useState({
    person: '',
    luggage: '',
    handLuggage: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // history.push('/payment');
  };

  return (
    <div className="container mx-auto px-6 lg:px-8 py-8">
      <div className="steps mb-8">
        <div className="step">1. Select Vehicle</div>
        <div className="step active">2. Booking</div>
        <div className="step">3. Payment</div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <label htmlFor="person" className="block mb-2">Number of Persons</label>
        <input type="number" id="person" value={formData.person} onChange={handleChange} className="border p-2 rounded-lg mb-4" />

        <label htmlFor="luggage" className="block mb-2">Luggage</label>
        <input type="number" id="luggage" value={formData.luggage} onChange={handleChange} className="border p-2 rounded-lg mb-4" />

        <label htmlFor="handLuggage" className="block mb-2">Hand Luggage</label>
        <input type="number" id="handLuggage" value={formData.handLuggage} onChange={handleChange} className="border p-2 rounded-lg mb-4" />

        <label htmlFor="email" className="block mb-2">Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} className="border p-2 rounded-lg mb-4" />

        <div className="flex justify-between">
          <button type="button" onClick={() => history.goBack()} className="bg-purple-500 text-white px-4 py-2 rounded-lg">Go Back</button>
          <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded-lg">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
