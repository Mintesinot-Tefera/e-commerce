// WelcomeBox.js
import React from 'react';
import Carousel from './Carousel';

const WelcomeBox = () => {
  return (
    <div style={welcomeBoxStyle}>
      <Carousel />
      <div style={messageBoxStyle}>
        <h1 style={headingStyle}>Find Everything You Need, Right at Your Fingertips!</h1>
      </div>
    </div>
  );
};

// Welcome Box Styles
const welcomeBoxStyle = {
  backgroundColor: '#f4f4f4',
  padding: '0px',
  textAlign: 'center',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  marginBottom: '20px',
};

// Message Box Styles
const messageBoxStyle = {
  marginTop: '20px',
};

// Heading Style
const headingStyle = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  color: '#092f6e',
  padding: "0px 0px 16px 0px"
};

export default WelcomeBox;
