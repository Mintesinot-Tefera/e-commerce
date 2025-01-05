// App.js
import React, { useState, createContext } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
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

        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            {/* <Route path="/cart" element={<Cart cartItems={cartItems} onUpdateQuantity={updateQuantity} onCheckout={handleCheckout}/>} /> */}

            {/* <Route path="/cart" element={<CartPage cartItems={cartItems} />} /> */}
          </Routes>
        </Router>
      </div>
    </CartContext.Provider>
  );
}

export default App;
