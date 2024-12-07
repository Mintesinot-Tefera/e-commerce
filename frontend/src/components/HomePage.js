// HomePage.js
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import AdvertisingCard from './AdvertisingCard';
import WelcomeBox from './WelcomeBox';
import ProductListWithDetails from './ProductListWithDetails';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  
  const [showCart, setShowCart] = useState(false); // Cart visibility state
  const navigateToCart = () => setShowCart(true);
  const backToProducts = () => setShowCart(false);


  // const handleAddToCart = (product) => {
  //   setCartItems((prevCartItems) => {
  //     const existingItem = prevCartItems.find((item) => item.id === product.id);
  //     if (existingItem) {
  //       return prevCartItems.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     }
  //     return [...prevCartItems, { ...product, quantity: 1 }];
  //   });
  // };

  // const handleCartIconClick = () => {
  //   setShowCartPage((prevState) => !prevState);
  // };

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // const filteredProducts = selectedCategory === 'Recents' 
  //   ? allProducts 
  //   : allProducts.filter((product) => product.category === selectedCategory);

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  // };

  const homepageStyle = {
    padding: '20px 0 20px 0',
    textAlign: 'center',
    paddingBottom: '50px',
  };

  const productGridStyle = {
    padding: '10px 20px 0 100px',
    // paddingTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '10px',
  };

  const categorySelectorStyle = {
    marginTop: '20px',
    marginLeft: '50px',
    display: 'flex',
    justifyContent: 'left',
    gap: '15px',
    fontSize: '1rem',
  };

  const categoryButtonStyle = (category) => ({
    padding: '8px 16px',
    borderRadius: '5px',
    backgroundColor: selectedCategory === category ? '#3498db' : '#ddd',
    color: selectedCategory === category ? 'white' : '#333',
    cursor: 'pointer',
    border: 'none',
  });

  return (
    <div>
      <Header navigateToCart={navigateToCart} />
      <div style={homepageStyle}>
        <AdvertisingCard />
        <WelcomeBox />

        {/* Category Selector */}
        {/* <div style={categorySelectorStyle}>
          {categories.map((category) => (
            <button
              key={category}
              style={categoryButtonStyle(category)}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div> */}


        {/* <ProductListWithDetails products={allProducts} categories={categories} /> */}

        <ProductListWithDetails showCart={showCart} backToProducts={backToProducts}/>

        {/* <Sidebar categories={categories} /> */}



        {/* Product Grid */}
        {/* <div style={productGridStyle}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
