// import React, { useState } from 'react';

// const ProductDetails = ({ product, onBack, onAddToCart }) => {
//     const [quantity, setQuantity] = useState(1);

//     if (!product) return null; // Show nothing if no product is selected

//     const handleQuantityChange = (e) => {
//         setQuantity(Number(e.target.value));
//     };

//     const handleAddToCart = () => {
//         onAddToCart(product, quantity);
//     };

//     return (
//         <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', position: 'relative' }}>
//       {/* Back Arrow Button */}
//       <button 
//         onClick={onBack} 
//         style={{
//           position: 'absolute',
//           top: '10px',
//           left: '10px',
//           backgroundColor: 'transparent',
//           border: 'none',
//           cursor: 'pointer',
//           fontSize: '20px'
//         }}
//       >
//         ←
//       </button>
//             <h2>{product.name}</h2>
//             <img
//                 src={product.imageUrl1}
//                 alt={product.name}
//                 style={{ width: '30%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }}
//             />

//             <p><strong>Description:</strong></p>
//             <p>{product.description}</p>

//             <p><strong>Price:</strong> ${product.price}</p>

//             {/* Quantity selector */}
//             <div style={{ marginTop: '15px', alignItems: 'center', gap: '10px' }}>
//                 <label htmlFor="quantity"><strong>Quantity:</strong></label>
//                 <input
//                     id="quantity"
//                     type="number"
//                     value={quantity}
//                     min="1"
//                     onChange={handleQuantityChange}
//                     style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 />
//             </div>

//             {/* Add to Cart button */}
//             <button
//                 onClick={handleAddToCart}
//                 style={{
//                     marginTop: '15px',
//                     padding: '10px 20px',
//                     backgroundColor: '#092f6e',
//                     color: '#ffffff',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer'
//                 }}
//             >
//                 Add to Cart
//             </button>
//         </div>
//     );
// };

// export default ProductDetails;



import React, { useState } from 'react';

const ProductDetails = ({ product, onBack, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false); // State for add-to-cart effect

    if (!product) return null;

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        setIsAdded(true);

        // Reset effect after a delay
        setTimeout(() => setIsAdded(false), 1000);
    };

    // Styles
    const containerStyle = {
        display: 'flex',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        gap: '50px',
    };

    const imageStyle = {
        flex: '1',
        maxWidth: '300px',
        maxHeight: '300px',
        objectFit: 'cover',
        borderRadius: '8px',
    };

    const detailsStyle = {
        flex: '2',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'flex-start'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: isAdded ? '#4CAF50' : '#092f6e', // Change color when added
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // Smooth transition
    };

    return (
        <div style={containerStyle}>
            {/* Back Button */}
            <div style={{
                display: 'flex',
                gap: '15px',
                flexDirection: 'column',
                alignItems: 'flex-start'

            }} >
                <button
                    onClick={onBack}
                    style={{
                        position: 'relative',
                        // top: '10px',
                        // left: '10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#092f6e',
                    }}
                >
                    ←
                </button>
                {/* Product Image */}
                <img
                    src={product.imageUrl1}
                    alt={product.name}
                    style={imageStyle}
                />

            </div>

            {/* Product Details */}
            <div style={detailsStyle}>
                <h2>{product.name}</h2>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>

                {/* Quantity Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label htmlFor="quantity"><strong>Quantity:</strong></label>
                    <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                        style={{
                            width: '60px',
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                        }}
                    />
                </div>

                {/* Add to Cart Button */}
                <button
                    style={buttonStyle}
                    onClick={handleAddToCart}
                >
                    {isAdded ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
