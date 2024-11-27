// App.js
import React, { useState } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from "./components/CartPage";
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';

function App() {
  return (
    <div className="App">
      {/* <div>Hello</div>
      <HomePage /> */}

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        
        {/* <Route path="/cart" element={<CartPage cartItems={cartItems} />} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
