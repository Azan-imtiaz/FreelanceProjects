



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import suv from "../assets/suv.jpg";
import {
  FaCheckCircle, FaCar, FaClipboardList, FaCreditCard, FaArrowLeft, FaArrowRight, FaUser,
} from 'react-icons/fa';

const VehicleBookingSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    persons: 1,
    handLuggage: 0,
    checkedLuggage: 0,
    childSeat: false,
    meetAndGreet: false,
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const navigate = useNavigate(); // Hook to handle navigation

  const steps = [
    { id: 1, name: 'Select Vehicle', icon: <FaCar /> },
    { id: 2, name: 'Booking', icon: <FaClipboardList /> },
    { id: 3, name: 'Payment', icon: <FaCreditCard /> },
  ];

  const vehicles = [
    { id: 1, name: 'Sedan', price: '£50', passengers: 4, image: `${suv}` },
    { id: 2, name: 'SUV', price: '£80', passengers: 6, image: `${suv}` },
    { id: 3, name: 'SUV', price: '£80', passengers: 6, image: `${suv}` },
    { id: 4, name: 'SUV', price: '£80', passengers: 6, image: `${suv}` },
    { id: 5, name: 'SUV', price: '£80', passengers: 6, image: `${suv}` },
    // Add more vehicles as needed
  ];

  const selectVehicle = (vehicleId) => {
    setActiveStep(2);
  };

  const goBack = () => {
    setActiveStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const goNext = () => {
    setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculatePrice = () => {
    let totalPrice = 0;
    if (formData.childSeat) totalPrice += 5;
    if (formData.meetAndGreet) totalPrice += 10;
    return totalPrice;
  };

  return (
  
  
  
  <div className="max-w-5xl mx-auto lg:p-16 md:p-16 p-4 bg-gray-50 rounded-lg shadow-lg">
    
   
    
      {/* Stepper */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <div key={step.id} className="flex-1 text-center">
            <div
              className={`rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-2
              ${activeStep === step.id ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-600'}`}
            >
              {activeStep > step.id ? <FaCheckCircle /> : step.icon}
            </div>
            <p className={`${activeStep === step.id ? 'font-bold text-purple-600' : 'text-gray-600'}`}>
              {step.name}
            </p>
          </div>
        ))}
      </div>

      {/* Vehicle Selection */}
      {activeStep === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Select Your Vehicle</h2>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="relative flex items-center p-4 border border-gray-300 rounded-lg mb-4 cursor-pointer"
                  onClick={() => selectVehicle(vehicle.id)}
                >
                  <img src={vehicle.image} alt={vehicle.name} className="w-24 lg:w-40 lg:h-36 h-16 object-cover rounded-lg mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-purple-800">{vehicle.name}</h3>
                    <p className="text-sm text-yellow-600">Price: <span className="text-yellow-600">{vehicle.price}</span></p>
                    <div className="flex items-center mt-2">
                      <FaUser className="mr-2" />
                      <span>Passengers: <span className="text-purple-800">{vehicle.passengers}</span></span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    Select
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Back Button */}
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center bg-purple-100 text-purple-700 mt-4 px-4 py-2 rounded-lg hover:bg-purple-200 focus:outline-none"
          >
            <FaArrowLeft className="mr-2" />
            Go Home
          </button>
        </div>
      )}

      {/* Booking Form */}
      {activeStep === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Booking Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Persons</label>
              <input
                type="number"
                name="persons"
                min="1"
                value={formData.persons}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hand Luggage</label>
                <input
                  type="number"
                  name="handLuggage"
                  min="0"
                  value={formData.handLuggage}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Checked Luggage</label>
                <input
                  type="number"
                  name="checkedLuggage"
                  min="0"
                  value={formData.checkedLuggage}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="childSeat"
                checked={formData.childSeat}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Child Seat (+£5)</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="meetAndGreet"
                checked={formData.meetAndGreet}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Meet & Greet (+£10)</label>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800">Total Price: <span className="text-yellow-600">£{calculatePrice()}</span></h3>
            </div>

            <div className="flex justify-between mt-4">
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 focus:outline-none"
                >
                  <FaArrowLeft className="mr-2" />
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={goNext}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none"
              >
                {activeStep < 3 ? (
                  <>
                    Next
                    <FaArrowRight className="ml-2" />
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payment Form */}

{activeStep === 3 && (
  <div>
    <h2 className="text-2xl font-bold mb-4 text-purple-700">Payment Details</h2>
    <form className="space-y-4">
      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="credit">Credit Card</option>
          <option value="paypal">PayPal</option>
          {/* Add more payment options if needed */}
        </select>
      </div>

      {/* Credit Card Details */}
      {formData.paymentMethod === 'credit' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVC</label>
              <input
                type="text"
                name="cardCVC"
                value={formData.cardCVC}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="123"
                required
              />
            </div>
          </div>
        </>
      )}

      {/* Billing Address */}
      {formData.paymentMethod === 'credit' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Billing Address</label>
            <input
              type="text"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="123 Main St, City, Country"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                name="billingPostalCode"
                value={formData.billingPostalCode}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Postal Code"
                required
              />
            </div>
          </div>
        </>
      )}

      {/* PayPal Details */}
      {formData.paymentMethod === 'paypal' && (
        <div>
          <p className="text-sm font-medium text-gray-700">You will be redirected to PayPal for payment.</p>
        </div>
      )}

      {/* Error Handling */}
      <div id="error-message" className="text-red-500 text-sm mt-2">
        {/* Show error messages if any */}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={goBack}
          className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 focus:outline-none"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
};

export default VehicleBookingSteps;
