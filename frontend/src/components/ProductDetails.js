import React, { useState } from 'react';

const ProductDetails = ({ product, onBack, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    if (!product) return null; // Show nothing if no product is selected

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddToCart = () => {
        // onAddToCart(product, quantity);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', position: 'relative' }}>
      {/* Back Arrow Button */}
      <button 
        onClick={onBack} 
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px'
        }}
      >
        ←
      </button>
            <h2>{product.name}</h2>
            <img
                src={product.imageUrl1}
                alt={product.name}
                style={{ width: '30%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />

            <p><strong>Description:</strong></p>
            <p>{product.description}</p>

            <p><strong>Price:</strong> ${product.price}</p>

            {/* Quantity selector */}
            <div style={{ marginTop: '15px', alignItems: 'center', gap: '10px' }}>
                <label htmlFor="quantity"><strong>Quantity:</strong></label>
                <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={handleQuantityChange}
                    style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            {/* Add to Cart button */}
            <button
                onClick={handleAddToCart}
                style={{
                    marginTop: '15px',
                    padding: '10px 20px',
                    backgroundColor: '#092f6e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetails;
