import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import suv from "../assets/suv.jpg";
import { FaCheckCircle, FaCar, FaClipboardList, FaCreditCard, FaArrowLeft, FaArrowRight, FaUser,
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
  const location = useLocation();
  const data = location.state?.formData;
console.log(data.to)
  
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
  
  
  
  <div className="max-w-7xl mx-auto lg:p-16 md:p-16 p-4 bg-gray-50 rounded-lg shadow-lg">
    
   
    
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
  <div className="bg-gray-50 rounded-lg shadow-lg p-6 lg:p-8 mt-8 mx-auto w-full lg:max-w-4xl md:max-w-2xl sm:max-w-md transition-transform transform hover:scale-100">
    <h2 className="text-3xl font-extrabold mb-6 text-purple-800">Booking Details</h2>
    <form className="space-y-6">
      {/* Total Persons */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2">Total Persons</label>
        <input
          type="number"
          name="persons"
          min="1"
          value={formData.persons}
          onChange={handleChange}
          placeholder="Enter number of persons"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
        />
      </div>

      {/* Luggage Information */}
      <div className="flex flex-col mb-4">
        <div className="flex justify-between mb-4">
          <label className="text-sm font-semibold text-gray-700">Hand Luggage</label>
          <input
            type="number"
            name="handLuggage"
            min="0"
            value={formData.handLuggage}
            onChange={handleChange}
            placeholder="0"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 w-1/2"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-sm font-semibold text-gray-700">Checked Luggage</label>
          <input
            type="number"
            name="checkedLuggage"
            min="0"
            value={formData.checkedLuggage}
            onChange={handleChange}
            placeholder="0"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 w-1/2"
          />
        </div>
      </div>

      {/* Add-ons */}
      <div className="flex flex-col mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-2">Add-Ons</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleAddOnChange('childSeat')}
            className={`py-3 px-4 rounded-md border ${formData.childSeat ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none`}
          >
            Child Seat (+£5)
          </button>
          <button
            type="button"
            onClick={() => handleAddOnChange('meetAndGreet')}
            className={`py-3 px-4 rounded-md border ${formData.meetAndGreet ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none`}
          >
            Meet & Greet (+£10)
          </button>
        </div>
      </div>

      {/* Flight Details */}
      <div className="flex flex-col mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-2">Flight Number</label>
        <input
          type="text"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          placeholder="Enter your flight number"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
        />
      </div>
      <div className="flex flex-col mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-2">Arrival From</label>
        <input
          type="text"
          name="arrivalFrom"
          value={formData.arrivalFrom}
          onChange={handleChange}
          placeholder="Enter arrival city"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        {activeStep > 1 && (
          <button
            type="button"
            onClick={goBack}
            className="bg-purple-100 text-purple-700 px-6 py-3 rounded-lg flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        )}
        <button
          type="button"
          onClick={goNext}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center"
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
{/* Trip Details Sidebar */}
{/* Trip Details Sidebar */}
<div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-lg shadow-lg p-4 lg:p-6 mt-6 mx-auto border border-gray-300 w-full lg:max-w-2xl md:max-w-lg sm:max-w-md">
  <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-purple-800 border-b border-purple-300 pb-2">Trip Details</h3>

  <div className="space-y-4">
    <div className="flex items-start py-2 border-b border-gray-200">
      <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z" />
      </svg>
      <div className="flex-1">
        <p className="text-gray-600 font-medium mb-1"><strong>Pickup:</strong></p>
        <p className="text-gray-800">{data.from}</p>
      </div>
    </div>

    <div className="flex items-start py-2 border-b border-gray-200">
      <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z" />
      </svg>
      <div className="flex-1">
        <p className="text-gray-600 font-medium mb-1"><strong>Dropoff:</strong></p>
        <p className="text-gray-800">{data.to}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
      <div>
        <p className="text-gray-600 font-medium"><strong>Pickup Date:</strong></p>
        <p className="text-gray-800">{data.pickupDate}</p>
      </div>
      <div>
        <p className="text-gray-600 font-medium"><strong>Pickup Time:</strong></p>
        <p className="text-gray-800">{data.pickupTime}</p>
      </div>
    </div>

    {data.returnDate && data.returnTime && (
      <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
        <div>
          <p className="text-gray-600 font-medium"><strong>Return Date:</strong></p>
          <p className="text-gray-800">{data.returnDate}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium"><strong>Return Time:</strong></p>
          <p className="text-gray-800">{data.returnTime}</p>
        </div>
      </div>
    )}
{false && false && (
    <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
      <div>
        <p className="text-gray-600 font-medium"><strong>Luggage:</strong></p>
        <p className="text-gray-800">2 Large Bags</p>
      </div>
      <div>
        <p className="text-gray-600 font-medium"><strong>Hand Luggage:</strong></p>
        <p className="text-gray-800">1 Carry-On Bag</p>
      </div>
    </div>)}

    <div className="py-2 border-b border-gray-200">
      <p className="text-gray-600 font-medium"><strong>Distance:</strong> {data.distance} ({data.
estimatedTime
})</p>
    </div>

    <div className="py-2  ">
      <p className="text-gray-600 font-medium"><strong>Persons:</strong> 3</p>
    </div>

    <div className="py-2 border-t border-gray-300">
      <p className="text-gray-800 text-xl font-extrabold"><strong>Total:</strong> <span className="text-purple-700 font-extrabold text-2xl">£{calculatePrice()}</span></p>
    </div>
  </div>
</div>

    </div>
  );
};

export default VehicleBookingSteps;
