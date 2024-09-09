import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-public-key-here');

const SuccessPage = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      const stripe = await stripePromise;
      const session = await stripe.retrieveCheckoutSession(sessionId);

      // You can use session data here, like displaying confirmation details
      console.log(session);
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      {/* Display more session information here if needed */}
    </div>
  );
};

export default SuccessPage;
