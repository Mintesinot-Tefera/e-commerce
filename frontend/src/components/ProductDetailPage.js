// import React, { useState } from 'react';
// import ProductCard from './ProductCard';
// import ProductDetails from './ProductDetails';

// const ProductListWithDetails = ({ products, categories }) => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [filteredCategory, setFilteredCategory] = useState(null);

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleCategoryClick = (category) => {
//     setFilteredCategory(category);
//     setSelectedProduct(null); // Reset product details view on category selection
//   };

//   const handleBackToProducts = () => {
//     setSelectedProduct(null);
//   };

//   const filteredProducts = filteredCategory
//     ? products.filter(product => product.category === filteredCategory)
//     : products;

//   return (
//     <div style={{ display: 'flex' }}>
//       {/* Categories List */}
//       <aside style={{ width: '20%', padding: '20px', backgroundColor: '#f2f2f2' }}>
//         <h3>Categories</h3>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           <li onClick={() => handleCategoryClick(null)}>All</li>
//           {categories.map(category => (
//             <li key={category} onClick={() => handleCategoryClick(category)}>
//               {category}
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Main Content Area */}
//       <main style={{ width: '80%', padding: '20px' }}>
//         {selectedProduct ? (
//           <ProductDetails product={selectedProduct} onBack={handleBackToProducts} />
//         ) : (
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//             {filteredProducts.map(product => (
//               <div key={product.id} onClick={() => handleProductClick(product)}>
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ProductListWithDetails;









// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ProductDetailPage = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     // Replace with your API or data fetching logic
//     const fetchProduct = async () => {
//       const response = await fetch(`/api/products/${productId}`);
//       const data = await response.json();
//       setProduct(data);
//     };
//     fetchProduct();
//   }, [productId]);

//   if (!product) return <div>Loading...</div>;

//   const pageStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     color: '#333',
//   };

//   const productImageStyle = {
//     width: '100%',
//     maxWidth: '400px',
//     objectFit: 'cover',
//     borderRadius: '8px',
//     marginBottom: '20px',
//   };

//   const priceStyle = {
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     fontSize: '1.5rem',
//     margin: '10px 0',
//   };

//   const descriptionStyle = {
//     maxWidth: '600px',
//     textAlign: 'center',
//   };

//   return (
//     <div style={pageStyle}>
//       <img src={product.imageUrl} alt={product.name} style={productImageStyle} />
//       <h1>{product.name}</h1>
//       <p style={priceStyle}>${product.price.toFixed(2)}</p>
//       <p style={descriptionStyle}>{product.description}</p>
//     </div>
//   );
// };

// export default ProductDetailPage;
