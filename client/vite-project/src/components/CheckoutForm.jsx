import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('your-public-key-here');

const handleCheckout = async () => {
    const stripe = await stripePromise;
  
    // Make a request to your backend to create a checkout session
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: 1000, // Amount in pence (10.00 GBP)
        quantity: 1, // Quantity of items
      }),
    });
  
    const session = await response.json();
  
    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  
    if (error) {
      console.error("Error during checkout", error);
      // Handle the error accordingly
    }
  };

  export default handleCheckout;