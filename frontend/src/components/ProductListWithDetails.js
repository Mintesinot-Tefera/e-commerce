import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useContext } from 'react';
import { CartContext } from '../App';


const ProductListWithDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]); // State for products
  const [error, setError] = useState(null); // State for errors

  const { addToCart } = useContext(CartContext);


  const categories = [
    {
      name: 'Electronics',
      subcategories: [
        { name: 'Mobile Phones' },
        { name: 'Laptops' },
        { name: 'Cameras' },
        { name: 'Wearable Technology' },
        { name: 'Audio Devices' },
      ],
    },
    {
      name: 'Fashion',
      subcategories: [
        { name: 'Men\'s Clothing' },
        { name: 'Women\'s Clothing' },
        { name: 'Kids' },
        { name: 'Footwear' },
      ],
    },
    {
      name: 'Home Appliances',
      subcategories: [
        { name: 'Refrigerators' },
        { name: 'Washing Machines' },
        { name: 'Microwaves' },
      ],
    },
    {
      name: 'Beauty',
      subcategories: [
        { name: 'Skincare' },
        { name: 'Makeup' },
        { name: 'Hair Care' },
      ],
    },
    {
      name: 'Health & Wellness',
      subcategories: [
        { name: 'Vitamins & Supplements' },
        { name: 'Fitness Equipment' },
        { name: 'Personal Care' },
      ],
    },
    {
      name: 'Sports & Outdoors',
      subcategories: [
        { name: 'Sports Equipment' },
        { name: 'Outdoor Recreation' },
      ],
    },
    {
      name: 'Toys & Games',
      subcategories: [
        { name: 'Action Figures' },
        { name: 'Educational Toys' },
        { name: 'Board Games' },
      ],
    },
    {
      name: 'Books & Stationery',
      subcategories: [
        { name: 'Fiction' },
        { name: 'Non-Fiction' },
        { name: 'Office Supplies' },
      ],
    },

    {
      name: 'Automotive',
      subcategories: [
        { name: 'Car Accessories' },
        { name: 'Tools & Equipment' },
        { name: 'Motorcycle Gear' },
      ],
    },
    {
      name: 'Grocery & Food',
      subcategories: [
        { name: 'Snacks' },
        { name: 'Beverages' },
        { name: 'Organic Products' },
      ],
    },
    {
      name: 'Jewelry & Watches',
      subcategories: [
        { name: 'Necklaces' },
        { name: 'Bracelets' },
        { name: 'Watches' },
      ],
    },
    {
      name: 'Baby Products',
      subcategories: [
        { name: 'Baby Clothing' },
        { name: 'Diapers' },
        { name: 'Toys' },
      ],
    },
    {
      name: 'Office Supplies',
      subcategories: [
        { name: 'Printers' },
        { name: 'Paper Products' },
        { name: 'Writing Instruments' },
      ],
    },
    {
      name: 'Arts & Crafts',
      subcategories: [
        { name: 'Painting Supplies' },
        { name: 'Craft Kits' },
        { name: 'DIY Tools' },
      ],
    },

  ];


  // Function to fetch products based on a subcategory or fetch recent products
  const fetchProducts = async (subcategory = null) => {
    try {
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      let response;

      if (subcategory) {
        response = await axios.get(`${baseURL}/products`, {
          params: { subcategory },
        });
      } else {
        response = await axios.get(`${baseURL}/products/recents`);
      }

      setProducts(response.data); // Assuming the backend returns an array of products
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch recent products on component load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  //   const handleAddToCart = () => {
  //     // onAddToCart(product, quantity);
  // };

  const handleAddToCart = (product) => {
    // console.log("Added to cart:", product);
    // onAddToCart(product, quantity);

  };

  const handleSubcategoryClick = (subcategoryName) => {
    setSelectedProduct(null); // Reset product details view
    fetchProducts(subcategoryName); // Fetch products by subcategory
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '20%', padding: '20px', backgroundColor: '#e0f7fa' }}>
        <h3>Categories</h3>
        <Sidebar
          categories={categories}
          onSubcategoryClick={handleSubcategoryClick}
        />
      </aside>

      {/* Main Content Area */}
      <main style={{ width: '80%', padding: '20px' }}>
        {selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onBack={handleBackToProducts}
            onAddToCart={addToCart} />
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {products.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
    </div>
  );
};

export default ProductListWithDetails;
