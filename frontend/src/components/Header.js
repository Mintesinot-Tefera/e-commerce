import React, { useState, useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import myLogo from './logo/logo.png';
import myLogo2 from './logo/logo1.png';
import myLogo3 from './logo/logo2.png';
import myLogo4 from './logo/logo3.png';
import myLogo5 from './logo/logo4.png';
import { CartContext } from '../App';


import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CartPage from './CartPage';
import Link from '@mui/joy/Link';




const Header =

  () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    // const [cartItems, setCartItems] = useState(3); // Sample cart items count

    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

  // Define the navigateToCart method
  const navigateToCart = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  
    const headerStyle = {
      position: 'fixed',       // Makes the header fixed
      top: 0,                 // Aligns it to the top
      left: 0,                // Aligns it to the left
      width: '100%',          // Makes the header span the full width
      zIndex: 1000,           // Keeps it above other elements 
      backgroundColor: '#004d4d',
      // backgroundColor: '#009900',
      color: '#fff',
      padding: '5px 20px 5px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const logoStyle = {
      height: '50px',
      marginRight: '10px',
    };

    const titleStyle = {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    };

    const searchContainerStyle = {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      padding: '0 20px',
      gap: '10px',
    };

    const searchInputStyle = {
      width: '100%',
      maxWidth: '300px',
      padding: '8px 15px',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      outline: 'none',
    };

    const categorySelectStyle = {
      padding: '8px 10px',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      backgroundColor: 'white',
      color: '#333',
    };

    // Placeholder categories; replace with actual categories as needed
    const categories = ["All", "Electronics", "Clothing", "Home", "Books", "Sports"];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
    };

    const buttonContainerStyle = {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      padding: '0 30px 0 0'
    };

    const buttonStyle = {
      backgroundColor: '#006666',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s',
    };

    const categoryStyle = {
      position: 'relative',
      display: 'inline-block',
      color: '#fff',
      cursor: 'pointer',
      // padding: '0 20px 0 0'
    };

    const dropdownStyle = {
      display: isDropdownVisible ? 'block' : 'none',
      position: 'absolute',
      top: '100%',
      left: '0',
      backgroundColor: '#004d4d',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '10px 0',
      borderRadius: '4px',
      zIndex: '100',
    };

    const cartContainerStyle = {
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    };

    const cartIconStyle = {
      fontSize: '1.5rem',
      color: '#fff',
    };

    const cartBadgeStyle = {
      position: 'absolute',
      top: '-5px',
      right: '-10px',
      backgroundColor: 'red',
      color: 'white',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
    };




    return (
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={myLogo5} alt="Logo" style={logoStyle} />
          {/* <div style={titleStyle}>YIGEBYU</div> */}
        </div>

        <div style={searchContainerStyle}>
          <select
            style={categorySelectStyle}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder={`Search ${selectedCategory.toLowerCase()}...`}
            style={searchInputStyle}
          />
        </div>

        <div style={buttonContainerStyle}>
          <div
            style={categoryStyle}
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            Categories
            <div style={dropdownStyle}>
              <a href="#electronics" style={{ display: 'block', padding: '8px 20px', color: '#fff' }}>Electronics</a>
              <a href="#clothing" style={{ display: 'block', padding: '8px 20px', color: '#fff' }}>Clothing</a>
              <a href="#groceries" style={{ display: 'block', padding: '8px 20px', color: '#fff' }}>Groceries</a>
            </div>
          </div>
          <Link href="/signin"> <button style={buttonStyle}> Login </button> </Link>

          <Link href="/signup"> <span style={{ color: '#fff', cursor: 'pointer' }}> Sign Up</span> </Link>

          <div style={cartContainerStyle}
          onClick={navigateToCart}

          >

            <FaShoppingCart style={cartIconStyle} />
            {cart.length > 0 && <span style={cartBadgeStyle}>{cart.length}</span>}
          </div>
         
         
          {/* <button onClick={navigateToCart} style={cartButtonStyle}>
        🛒 Cart
        {cart.length > 0 && <span style={badgeStyle}>{cart.length}</span>}
      </button> */}



        </div>
      </header>
    );
  };

export default Header;
