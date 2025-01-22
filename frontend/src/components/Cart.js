import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51MsjC5BfmcVjdYhujzvYQcYO331Zsp9bb5FtM3alDgzxeKm2aaA1iAm1VXrUdaJr610iMovSFjzZiMPUru7GTtTY00wkeZlwwV'); // Public Key from Stripe Dashboard



const Cart = ({ cartItems, onUpdateQuantity, onCheckout }) => {


  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);


  const handleCheckout = async () => {
    console.log(cartItems);

    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }), // Pass cart data to the backend
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { id } = await response.json(); // Extract session ID from response

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe.js has not been loaded');
      }

      // Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };



  return (
    <div>
      <h2>My Cart</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={item.imageUrl1}
                alt={item.name}
                style={{ width: '80px', height: '80px', marginRight: '20px', borderRadius: '8px' }}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                  style={{ marginLeft: '10px', width: '60px' }}
                />
              </div>
            </div>
          ))}
          <h3>Total: ${calculateTotal()}</h3>
          <button onClick={handleCheckout}
            style={{ padding: '10px 20px', backgroundColor: '#092f6e', color: '#fff' }}>
            Checkout
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
