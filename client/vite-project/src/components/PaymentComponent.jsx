import React, { useState } from 'react';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



// Replace with your own publishable key
const stripePromise = loadStripe('pk_test_51PwHSsEG3HGCzHQObRXv9wyFoyemECwDoHjbRbTVZDGr2VU3iUEz7CWWnPxJEfYkoQYGbKbvXe3xM0NhwspRidQ300FpKdo9CS');

const CardSection = () => {

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-medium mb-4 text-gray-700">Payment Details</h2>
      
      <div className="mb-5">
        <label htmlFor="card-number-input" className="block text-gray-600 text-sm mb-2">Card Number</label>
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
          <label htmlFor="card-expiry-input" className="block text-gray-600 text-sm mb-2">Expiry Date</label>
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
          <label htmlFor="card-cvc-input" className="block text-gray-600 text-sm mb-2">CVC</label>
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

    const response = await fetch('http://localhost:3000/api/charge', {
      method: 'POST',  credentials: 'include',  // This ensures cookies are sent
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokens: token.id, amount: totalPrice * 100,finalObject }) // Convert pounds to pence
});


 const data = await response.json();
    if (data.success) {
    //   alert('Payment successful!');
    MySwal.fire({
        title: 'Booking Confirmed!',
        text: 'Your payment was successful, and your car has been successfully booked. A confirmation email with all the details has been sent to you.',
        icon: 'success',
        confirmButtonText: 'Great!'
      });
    } else {
        // MySwal.fire({
        //     title: 'Success!',
        //     text: 'Payment Not Success',
        //     icon: 'success',
        //     confirmButtonText: 'OK'
        //   });
      setError(data.error);
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Complete Your Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardSection />
        <div className="text-lg font-medium mb-4">
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
      </form>
    </div>
  );
};

const PaymentPage = ({ totalPrice,finalObject}) => (
  <Elements stripe={stripePromise}>
    <PaymentForm totalPrice={totalPrice} finalObject={finalObject} />
  </Elements>
);

export default PaymentPage;



// import React, { useState } from 'react';
// import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Replace with your own publishable key
// const stripePromise = loadStripe('pk_test_51PwHSsEG3HGCzHQObRXv9wyFoyemECwDoHjbRbTVZDGr2VU3iUEz7CWWnPxJEfYkoQYGbKbvXe3xM0NhwspRidQ300FpKdo9CS');

// const CardSection = () => (
//   <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
//     <label htmlFor="card-number" className="block text-gray-700 font-semibold mb-2">Card Number</label>
//     <div id="card-number" className="border border-gray-300 rounded p-2 mb-4">
//       <CardNumberElement options={{ 
//         style: {
//           base: {
//             color: '#424770',
//             fontSize: '16px',
//             '::placeholder': {
//               color: '#aab7c4',
//             },
//           },
//           invalid: {
//             color: '#9e2146',
//           },
//         },
//       }} />
//     </div>
    
//     <div className="flex space-x-4 mb-4">
//       <div className="w-1/2">
//         <label htmlFor="card-expiry" className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
//         <div id="card-expiry" className="border border-gray-300 rounded p-2">
//           <CardExpiryElement options={{
//             style: {
//               base: {
//                 color: '#424770',
//                 fontSize: '16px',
//                 '::placeholder': {
//                   color: '#aab7c4',
//                 },
//               },
//               invalid: {
//                 color: '#9e2146',
//               },
//             },
//           }} />
//         </div>
//       </div>
      
//       <div className="w-1/2">
//         <label htmlFor="card-cvc" className="block text-gray-700 font-semibold mb-2">CVC</label>
//         <div id="card-cvc" className="border border-gray-300 rounded p-2">
//           <CardCvcElement options={{
//             style: {
//               base: {
//                 color: '#424770',
//                 fontSize: '16px',
//                 '::placeholder': {
//                   color: '#aab7c4',
//                 },
//               },
//               invalid: {
//                 color: '#9e2146',
//               },
//             },
//           }} />
//         </div>
//       </div>
//     </div>

//     <div id="card-errors" className="text-red-500"></div>
//   </div>
// );

// const PaymentForm = ({ totalPrice }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setProcessing(true);

//     const { token, error } = await stripe.createToken(elements.getElement(CardNumberElement));

//     if (error) {
//       setError(error.message);
//       setProcessing(false);
//       return;
//     }

//     const response = await fetch('http://localhost:3000/api/charge', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: token.id, amount: totalPrice * 100 }) // Convert pounds to pence
//     });

//     const data = await response.json();
//     if (data.success) {
//       alert('Payment successful!');
//     } else {
//       setError(data.error);
//     }
//     setProcessing(false);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h3 className="text-2xl font-semibold mb-6 text-purple-800">Payment Details</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <CardSection />
//         <div className="text-xl font-bold mb-4">
//           <p>Total: <span className="text-purple-700">{totalPrice.toFixed(2)} £</span></p>
//         </div>
//         <button 
//           type="submit" 
//           disabled={processing} 
//           className={`w-full py-3 px-6 bg-purple-600 text-white rounded-lg shadow-md ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
//         >
//           {processing ? 'Processing...' : 'Pay Now'}
//         </button>
//         {error && <div className="text-red-500 mt-2">{error}</div>}
//       </form>
//     </div>
//   );
// };

// const PaymentPage = ({ totalPrice }) => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm totalPrice={totalPrice} />
//   </Elements>
// );

// export default PaymentPage;







// import React, { useState } from 'react';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Replace with your own publishable key
// const stripePromise = loadStripe('pk_test_51PwHSsEG3HGCzHQObRXv9wyFoyemECwDoHjbRbTVZDGr2VU3iUEz7CWWnPxJEfYkoQYGbKbvXe3xM0NhwspRidQ300FpKdo9CS');

// const CardSection = () => (
//   <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
//     <label htmlFor="card-element" className="block text-gray-700 font-semibold mb-2">Credit or debit card</label>
//     <div id="card-element" className="border border-gray-300 rounded p-2">
//       <CardElement options={{ 
//         style: {
//           base: {
//             color: '#424770',
//             fontSize: '16px',
//             '::placeholder': {
//               color: '#aab7c4',
//             },
//           },
//           invalid: {
//             color: '#9e2146',
//           },
//         },
//       }} />
//     </div>
//     <div className="flex justify-between items-center mt-2">
  
//       <div id="card-errors" className="text-red-500"></div>
//     </div>
//   </div>
// );

// const PaymentForm = ({ totalPrice }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setProcessing(true);

//     const { token, error } = await stripe.createToken(elements.getElement(CardElement));

//     if (error) {
//       setError(error.message);
//       setProcessing(false);
//       return;
//     }

//     const response = await fetch('http://localhost:3000/api/charge', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: token.id, amount: totalPrice * 100 }) // Convert pounds to pence
//     });

//     const data = await response.json();
//     if (data.success) {
//       alert('Payment successful!');
//     } else {
//       setError(data.error);
//     }
//     setProcessing(false);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h3 className="text-2xl font-semibold mb-6 text-purple-800">Payment Details</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <CardSection />
//         <div className="text-xl font-bold mb-4">
//           <p>Total: <span className="text-purple-700">{totalPrice.toFixed(2)} £</span></p>
//         </div>
//         <button 
//           type="submit" 
//           disabled={processing} 
//           className={`w-full py-3 px-6 bg-purple-600 text-white rounded-lg shadow-md ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
//         >
//           {processing ? 'Processing...' : 'Pay Now'}
//         </button>
//         {error && <div className="text-red-500 mt-2">{error}</div>}
//       </form>
//     </div>
//   );
// };

// const PaymentPage = ({ totalPrice }) => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm totalPrice={totalPrice} />
//   </Elements>
// );

// export default PaymentPage;



