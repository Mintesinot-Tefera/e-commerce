import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';

const ProductCard =
  ({ product, onAddToCart }) => {


    const [isAdded, setIsAdded] = useState(false);

    const productCardStyle = {
      backgroundColor: '#e6f7e9',
      width: '180px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '12px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: '20px',
      height: '300px', // Ensuring a fixed height for uniformity


      //////////
      // cursor: 'pointer',
      // textDecoration: 'none', // Remove underline from the link
      // color: 'inherit', // Inherit text color
      ////////
    };

    // Updated image style with transition for hover effect
    const productImageStyle = {
      width: '100%',
      height: '110px', // Fixed height for images
      objectFit: 'cover', // Ensures image maintains aspect ratio within the fixed height
      borderRadius: '4px',
      marginBottom: '10px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Added transition for zoom effect
    };

    const productInfoStyle = {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '13px',
    };

    const priceStyle = {
      fontWeight: 'bold',
      color: '#2c3e50',
      margin: '10px 0',
      fontSize: '14px',
    };

    const addToCartButtonStyle = {
      // padding: '10px 20px',
      padding: '8px',
      // marginTop: '10px',
      backgroundColor: isAdded ? '#08730a' : '#092f6e', // Green when added, blue otherwise
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      // transition: 'background-color 0.3s ease', // Smooth transition effect
      
      transition: 'all 0.3s ease',
      transform: isAdded ? 'scale(1.1)' : 'scale(1)',
    
    };


    const handleAddToCart = (e) => {
      e.stopPropagation(); // Prevents the click event from bubbling
      onAddToCart(product);
      setIsAdded(true);

      // Reset the effect after a short delay (e.g., 1 second)
      setTimeout(() => setIsAdded(false), 1000);
    };




    const handleMouseOver = (e) => {
      e.target.style.backgroundColor = '#05014a';
    };

    const handleMouseOut = (e) => {
      e.target.style.backgroundColor = '#092f6e';
    };

    // Hover effect for image
    const handleImageMouseOver = (e) => {
      e.target.style.transform = 'scale(1.1)'; // Zoom-in effect
      e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Adds shadow effect
    };

    const handleImageMouseOut = (e) => {
      e.target.style.transform = 'scale(1)'; // Reset zoom
      e.target.style.boxShadow = 'none'; // Remove shadow
    };

    return (

      // <Link to={`/product/${product.id}`} style={productCardStyle}>

      <div style={productCardStyle}>
        <img
          src={product.imageUrl1}
          alt={product.name}
          style={productImageStyle}
          onMouseOver={handleImageMouseOver} // Trigger hover effect on image
          onMouseOut={handleImageMouseOut} // Reset hover effect on image
        />
        <div style={productInfoStyle}>
          <h4>{product.name}</h4>
          {product.description && <p>{product.description}</p>}
          <p style={priceStyle}>${product.price.toFixed(2)}</p>
        </div>
        <button
          style={addToCartButtonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleAddToCart}
        >
          {/* Add to Cart */}

          {isAdded ? 'Added!' : 'Add to Cart'}
        </button>


      </div>

      // </Link>
    );
  };

export default ProductCard;

