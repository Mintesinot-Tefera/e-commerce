// App.js
import React, { useState, createContext } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';


export const CartContext = createContext();

function App() {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // const addToCart = (product, quantity = 1) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === product.id);
  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
  //       );
  //     }

  //     return [...prevCart, { ...product, quantity }];
  //   });
  // };


  const addToCart = (product, quantity = 1) => {


    const isLoggedIn = sessionStorage.getItem('authToken'); // Check if the user is logged in

    if (!isLoggedIn) {
      // Store product and quantity in sessionStorage for later use
      sessionStorage.setItem('pendingCartItem', JSON.stringify({ product, quantity }));
      // Redirect to the login page
      navigate('/signin');
      return;
    }

    // Update the cart
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };




  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      <div className="App">
        {/* <div>Hello</div>
      <HomePage /> */}


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/success" element={<HomePage />} />

          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          {/* <Route path="/cart" element={<Cart cartItems={cartItems} onUpdateQuantity={updateQuantity} onCheckout={handleCheckout}/>} /> */}

          {/* <Route path="/cart" element={<CartPage cartItems={cartItems} />} /> */}
        </Routes>

      </div>
    </CartContext.Provider>
  );
}

export default App;
