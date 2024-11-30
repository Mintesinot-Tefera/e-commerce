import React from 'react';
// import { Link } from 'react-router-dom';

const ProductCard = 
({ product, onAddToCart }) => {

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
    backgroundColor: '#092f6e',
    color: '#ffffff',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  };


  const handleAddToCart = () => {
    // onAddToCart(product, quantity);
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

        onClick={(e) => {
          e.stopPropagation(); // Prevents the click event from bubbling
          onAddToCart(product);
        }}
      >
        Add to Cart
      </button>


</div>

    // </Link>
  );
};

export default ProductCard;








// import React, { useState } from 'react';

// const ProductCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const productCardStyle = {
//     backgroundColor: '#e6f7e9',
//     width: '180px',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     padding: '12px',
//     textAlign: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     marginBottom: '20px',
//     height: '300px',
//   };

//   const productImageStyle = {
//     width: '100%',
//     height: '140px',
//     objectFit: 'cover',
//     borderRadius: '4px',
//     marginBottom: '10px',
//     transition: 'opacity 0.3s ease', // Smooth transition between images
//   };

//   const productInfoStyle = {
//     flex: '1',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   };

//   const priceStyle = {
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     margin: '10px 0',
//   };

//   const addToCartButtonStyle = {
//     backgroundColor: '#092f6e',
//     color: '#ffffff',
//     border: 'none',
//     padding: '8px',
//     cursor: 'pointer',
//     borderRadius: '4px',
//     transition: 'background-color 0.3s',
//     marginTop: '10px',
//   };

//   const handleMouseOver = (e) => {
//     e.target.style.backgroundColor = '#05014a';
//   };

//   const handleMouseOut = (e) => {
//     e.target.style.backgroundColor = '#092f6e';
//   };

//   return (
//     <div 
//       style={productCardStyle}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img
//         src={isHovered && product.imageUrl2 ? product.imageUrl2 : product.imageUrl}
//         alt={product.name}
//         style={productImageStyle}
//       />
//       <div style={productInfoStyle}>
//         <h3>{product.name}</h3>
//         {product.description && <p>{product.description}</p>}
//         <p style={priceStyle}>${product.price.toFixed(2)}</p>
//       </div>
//       <button
//         style={addToCartButtonStyle}
//         onMouseOver={handleMouseOver}
//         onMouseOut={handleMouseOut}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductCard;
