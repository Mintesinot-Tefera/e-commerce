// Carousel.js
import React, { useState, useEffect } from 'react';

// Import your local images here
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';
import image4 from './assets/image4.jpg';
import image5 from './assets/image5.jpg';
import image6 from './assets/image6.jpg';

const Carousel = () => {
  const images = [image1, image2, image3, image4, image5, image6]; // Array of images for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set the interval for automatic slide change (e.g., every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Adjust time interval as needed
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={carouselContainerStyle}>
      <div
        style={{
          ...carouselSlideStyle,
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: 0.9
        }}
      >
        {/* Text Overlay */}
        <div style={overlayTextStyle}>
          <h2>Quality Products, Every Day!</h2>
          <p>Explore our exclusive collection.</p>
        </div>
        {/* Navigation Buttons */}
        <button onClick={prevSlide} style={{ ...buttonStyle, left: '10px' }}>
          &lt;
        </button>
        <button onClick={nextSlide} style={{ ...buttonStyle, right: '10px' }}>
          &gt;
        </button>
      </div>
    </div>
  );
};

// Carousel Container Styles
const carouselContainerStyle = {
  position: 'relative',
  width: '100%',
  height: '300px', // Adjust height as needed
  overflow: 'hidden',
  margin: '20px 0',
  borderRadius: '12px',
};

// Carousel Slide Styles with Transparent Background Image
const carouselSlideStyle = {
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 0.5s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  color: 'white',
};

// Overlay Text Styles for adding transparent background over image
const overlayTextStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent dark overlay
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
};

// Button Styles for Navigation
const buttonStyle = {
  position: 'absolute',
  top: '50%',
  zIndex: 2,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  border: 'none',
  padding: '10px',
  fontSize: '20px',
  cursor: 'pointer',
  transform: 'translateY(-50%)',
  borderRadius: '4px',
};

export default Carousel;
