import React, { useState } from 'react';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import visa from "../assets/visa.png"
import mastercard from "../assets/mastercard.png"
import Gpay from "../assets/Gpay.png"
import Apay from "../assets/Apay.png"
import Paypal from "../assets/paypal.png"

// Replace with your own publishable key
const stripePromise = loadStripe('pk_test_51PwHSsEG3HGCzHQObRXv9wyFoyemECwDoHjbRbTVZDGr2VU3iUEz7CWWnPxJEfYkoQYGbKbvXe3xM0NhwspRidQ300FpKdo9CS');

const CardSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-medium mb-4 text-gray-700 font-sans">Payment Details</h2>
      
      {/* Card logos at the top */}
      <div className="flex space-x-4 justify-center mb-4 flex-wrap">
        <img src={visa} alt="Visa" className="w-12" />
        <img src={mastercard} alt="MasterCard" className="w-12" />
        <img src={Paypal} alt='paypal' className='w-12'></img>
       
      </div>

      <div className="mb-5">
        <label htmlFor="card-number-input" className="block text-gray-600 text-xl mb-2 font-sans">Card Number</label>
        <div id="card-number-input" className="border border-gray-300 rounded-lg p-3">
          <CardNumberElement
            options={{
              style: {
                base: {
                  color: '#333',
                  fontSize: '16px',
                  '::placeholder': {
                    color: '#999',
                  },
                },
                invalid: {
                  color: '#e74c3c',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex space-x-4 mb-5">
        <div className="w-1/2">
          <label htmlFor="card-expiry-input" className="block text-gray-600 text-xl font-sans  mb-2">Expiry Date</label>
          <div id="card-expiry-input" className="border border-gray-300 rounded-lg p-3">
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    color: '#333',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#999',
                    },
                  },
                  invalid: {
                    color: '#e74c3c',
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className="w-1/2">
          <label htmlFor="card-cvc-input" className="block text-gray-600 text-xl font-sans mb-2">CVC</label>
          <div id="card-cvc-input" className="border border-gray-300 rounded-lg p-3">
            <CardCvcElement
              options={{
                style: {
                  base: {
                    color: '#333',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#999',
                    },
                  },
                  invalid: {
                    color: '#e74c3c',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentForm = ({ totalPrice,finalObject }) => {
    const MySwal = withReactContent(Swal);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processing2, setProcessing2] = useState("Pay With Cash");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { token, error } = await stripe.createToken(elements.getElement(CardNumberElement));

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    // const response = await fetch('http://localhost:3000/api/charge', {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/charge`, {
      method: 'POST',  credentials: 'include',  // This ensures cookies are sent
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokens: token.id, amount: totalPrice * 100,finalObject }) // Convert pounds to pence
    });

    const data = await response.json();
    if (data.success) {
      MySwal.fire({
        title: 'Booking Confirmed!',
        text: 'Your payment was successful, and your car has been successfully booked. A confirmation email with all the details has been sent to you.',
        icon: 'success',
        confirmButtonText: 'Great!'
      });
    } else {
      setError(data.error);
    }
    setProcessing(false);
  };
  async  function handlePayWithCash(){
   try{
    setProcessing2("Processing...")
    // const response = await fetch('http://localhost:3000/api/payOnCash', {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payOnCash`, {
      method: 'POST',  credentials: 'include',  // This ensures cookies are sent
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPrice ,finalObject }) // Convert pounds to pence
    });

    const data = await response.json();
    setProcessing2("Pay With Cash")
    
    if (data.success) {
      MySwal.fire({
        title: 'Booking Confirmed!',
        text: 'Your car has been successfully booked. A confirmation email with all the details has been sent to you.',
        icon: 'success',
        confirmButtonText: 'Great!'
      });
    } else {
      MySwal.fire({
        title: 'Something Went Wrong!',
        text: 'Something Went Wrong.Try again later',
        icon: 'error',
        confirmButtonText: 'Ok!'
      });
    }
   }
   catch(err){
    setProcessing2("Pay With Cash")
    
    MySwal.fire({
      title: 'Something Went Wrong!',
      text: 'Try again later',
      icon: 'error',
      confirmButtonText: 'Ok!'
    });
  
   }
   
    
  }
  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg"> 
    <h1 className="text-2xl font-sans font-semibold mb-6 text-gray-800">Complete Your Payment</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardSection />
      <div className="text-lg font-medium mb-4 font-sans">
        <p>Total Amount: <span className="text-blue-600">{totalPrice.toFixed(2)} £</span></p>
      </div>
      <button 
        type="submit" 
        disabled={processing} 
        className={`w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
  
      {/* Additional payment method */}
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-gray-700 mb-4 font-sans">Or you can pay with cash:</p>
        <button
          type="button"
          className="w-full py-3 px-6 bg-green-500 font-sans text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        onClick={handlePayWithCash}
       >
         {processing2}
        </button>
      </div>
    </form>
  </div>
  
  
    //   <div className="max-w-lg mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg"> 
  //   <h1 className="text-2xl font-semibold mb-6 text-gray-800">Complete Your Payment</h1>
  //   <form onSubmit={handleSubmit} className="space-y-6">
  //     <CardSection />
  //     <div className="text-lg font-medium mb-4">
  //       <p>Total Amount: <span className="text-blue-600">{totalPrice.toFixed(2)} £</span></p>
  //     </div>
  //     <button 
  //       type="submit" 
  //       disabled={processing} 
  //       className={`w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
  //     >
  //       {processing ? 'Processing...' : 'Pay Now'}
  //     </button>
  //     {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
  
  //     {/* Pay with Cash Button */}
  //     <div className="mt-4 text-center">
  //       <button
  //         type="button"
  //         className="w-full py-3 px-6 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
  //       >
  //         Pay with Cash
  //       </button>
  //     </div>
  //   </form>
  // </div>

  
  
    // <div className="max-w-lg mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg">
    //   <h1 className="text-2xl font-semibold mb-6 text-gray-800">Complete Your Payment</h1>
    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     <CardSection />
    //     <div className="text-lg font-medium mb-4">
    //       <p>Total Amount: <span className="text-blue-600">{totalPrice.toFixed(2)} £</span></p>
    //     </div>
    //     <button 
    //       type="submit" 
    //       disabled={processing} 
    //       className={`w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
    //     >
    //       {processing ? 'Processing...' : 'Pay Now'}
    //     </button>
    //     {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
    //   </form>
    // </div>
  );
};

const PaymentPage = ({ totalPrice, finalObject }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm totalPrice={totalPrice} finalObject={finalObject} />
  </Elements>
);

export default PaymentPage;



