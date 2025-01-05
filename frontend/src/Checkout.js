import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51MsjC5BfmcVjdYhujzvYQcYO331Zsp9bb5FtM3alDgzxeKm2aaA1iAm1VXrUdaJr610iMovSFjzZiMPUru7GTtTY00wkeZlwwV'); // Public Key from Stripe Dashboard



const Checkout = ({ cartItems }) => {
  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });

      const { id } = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;
