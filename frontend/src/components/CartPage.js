// import React, { useState } from 'react';

// const CartPage = ({ cartItems, categories, onUpdateQuantity, onRemoveItem, onPurchase }) => {
//   // Calculate the total price
//   const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div style={containerStyle}>
//       {/* Sidebar for Categories */}
//       <div style={sidebarStyle}>
//         <h3>Categories</h3>
//         <ul style={categoryListStyle}>
//           {categories.map((category, index) => (
//             <li key={index} style={categoryItemStyle}>{category}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content - Cart Items */}
//       <div style={mainContentStyle}>
//         <h2>Shopping Cart</h2>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div style={cartContainerStyle}>
//             {cartItems.map((item) => (
//               <div key={item.id} style={cartItemStyle}>
//                 <img src={item.imageUrl} alt={item.name} style={productImageStyle} />
//                 <div style={productInfoStyle}>
//                   <h4>{item.name}</h4>
//                   <p>Price: ${item.price.toFixed(2)}</p>
//                   <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
//                 </div>
//                 {/* Quantity Controls */}
//                 <div style={quantityControlStyle}>
//                   <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min="1"
//                     onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
//                     style={quantityInputStyle}
//                   />
//                   <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
//                 </div>
//                 {/* Remove Button */}
//                 <button onClick={() => onRemoveItem(item.id)} style={removeButtonStyle}>Remove</button>
//               </div>
//             ))}
//             {/* Total Price */}
//             <div style={totalPriceStyle}>
//               <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
//               <button onClick={onPurchase} style={purchaseButtonStyle}>Proceed to Purchase</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Inline styles for simplicity
// const containerStyle = { display: 'flex', padding: '20px' };
// const sidebarStyle = { width: '200px', marginRight: '20px', backgroundColor: '#f7f7f7', padding: '15px', borderRadius: '8px' };
// const categoryListStyle = { listStyleType: 'none', padding: 0 };
// const categoryItemStyle = { marginBottom: '10px', cursor: 'pointer', color: '#333' };
// const mainContentStyle = { flex: 1, padding: '15px', backgroundColor: '#fff', borderRadius: '8px' };
// const cartContainerStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
// const cartItemStyle = { display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' };
// const productImageStyle = { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '20px' };
// const productInfoStyle = { flex: '1' };
// const quantityControlStyle = { display: 'flex', alignItems: 'center', gap: '5px' };
// const quantityInputStyle = { width: '50px', textAlign: 'center' };
// const removeButtonStyle = { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' };
// const totalPriceStyle = { marginTop: '20px', textAlign: 'right' };
// const purchaseButtonStyle = { backgroundColor: '#2ecc71', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' };

// export default CartPage;







// import React from 'react';

// const CartPage = ({ cartItems = [], categories, onUpdateQuantity, onRemoveItem, onPurchase }) => {
//   // Calculate the total price
//   const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div style={containerStyle}>
//       {/* Sidebar for Categories */}
//       <div style={sidebarStyle}>
//         <h3>Categories</h3>
//         <ul style={categoryListStyle}>
//           {categories?.map((category, index) => (
//             <li key={index} style={categoryItemStyle}>{category}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content - Cart Items */}
//       <div style={mainContentStyle}>
//         <h2>Shopping Cart</h2>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div style={cartContainerStyle}>
//             {cartItems.map((item) => (
//               <div key={item.id} style={cartItemStyle}>
//                 <img src={item.imageUrl} alt={item.name} style={productImageStyle} />
//                 <div style={productInfoStyle}>
//                   <h4>{item.name}</h4>
//                   <p>Price: ${item.price.toFixed(2)}</p>
//                   <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
//                 </div>
//                 {/* Quantity Controls */}
//                 <div style={quantityControlStyle}>
//                   <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min="1"
//                     onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
//                     style={quantityInputStyle}
//                   />
//                   <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
//                 </div>
//                 {/* Remove Button */}
//                 <button onClick={() => onRemoveItem(item.id)} style={removeButtonStyle}>Remove</button>
//               </div>
//             ))}
//             {/* Total Price */}
//             <div style={totalPriceStyle}>
//               <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
//               <button onClick={onPurchase} style={purchaseButtonStyle}>Proceed to Purchase</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Inline styles for simplicity
// const containerStyle = { display: 'flex', padding: '20px' };
// const sidebarStyle = { width: '200px', marginRight: '20px', backgroundColor: '#f7f7f7', padding: '15px', borderRadius: '8px' };
// const categoryListStyle = { listStyleType: 'none', padding: 0 };
// const categoryItemStyle = { marginBottom: '10px', cursor: 'pointer', color: '#333' };
// const mainContentStyle = { flex: 1, padding: '15px', backgroundColor: '#fff', borderRadius: '8px' };
// const cartContainerStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
// const cartItemStyle = { display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' };
// const productImageStyle = { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '20px' };
// const productInfoStyle = { flex: '1' };
// const quantityControlStyle = { display: 'flex', alignItems: 'center', gap: '5px' };
// const quantityInputStyle = { width: '50px', textAlign: 'center' };
// const removeButtonStyle = { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' };
// const totalPriceStyle = { marginTop: '20px', textAlign: 'right' };
// const purchaseButtonStyle = { backgroundColor: '#2ecc71', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' };

// export default CartPage;









// import React from 'react';

// const CartPage = ({ cartItems }) => {
//   // Calculate total price
//   const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div style={{ display: 'flex', padding: '20px' }}>
//       {/* Sidebar for Categories */}
//       <div style={{ width: '200px', marginRight: '20px', backgroundColor: '#f7f7f7', padding: '15px', borderRadius: '8px' }}>
//         <h3>Categories</h3>
//         <ul>
//           <li>Category 1</li>
//           <li>Category 2</li>
//           <li>Category 3</li>
//         </ul>
//       </div>

//       {/* Main Content - Cart Items */}
//       <div style={{ flex: 1, padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
//         <h2>Shopping Cart</h2>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div>
//             {cartItems.map((item) => (
//               <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #ddd' }}>
//                 <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', marginRight: '20px' }} />
//                 <div style={{ flex: '1' }}>
//                   <h4>{item.name}</h4>
//                   <p>Price: ${item.price.toFixed(2)}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//             <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
//             <button style={{ backgroundColor: '#2ecc71', color: 'white', padding: '10px', borderRadius: '4px', border: 'none' }}>Proceed to Checkout</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;




// CartPage.js
import React from 'react';

const CartPage = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
