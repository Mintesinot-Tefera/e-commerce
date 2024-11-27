// // Footer.js
// import React from 'react';

// const Footer = () => {
//   const footerStyle = {
//     backgroundColor: '#2c3e50',
//     color: 'white',
//     padding: '10px',
//     textAlign: 'center',
//     position: 'fixed',
//     left: '0',
//     bottom: '0',
//     width: '100%',
//     fontSize: '0.9rem',
//   };

//   return <footer style={footerStyle}>© 2023 My E-commerce Store. All rights reserved.</footer>;
// };

// export default Footer;



// Footer.js
import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'left',
  };

  const footerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    borderTop: '1px solid #555',
    paddingTop: '20px',
  };

  const footerColumnStyle = {
    flex: 1,
    padding: '10px',
    borderLeft: '1px solid #555',
  };

  const footerContactStyle = {
    ...footerColumnStyle,
    flex: 1.5, // Wider first column
    borderLeft: 'none',
  };

  const headingStyle = {
    fontSize: '1.2rem',
    color: '#e0e0e0',
    marginBottom: '10px',
  };

  const textStyle = {
    fontSize: '0.9rem',
    margin: '5px 0',
    color: '#ccc',
    cursor: 'pointer',
  };

  const socialMediaStyle = {
    marginTop: '15px',
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        {/* Contact Information Column */}
        <div style={footerContactStyle}>
          <h3 style={headingStyle}>Contact Us</h3>
          <p style={textStyle}>123 E-commerce St.</p>
          <p style={textStyle}>City, Country</p>
          <p style={textStyle}>Email: support@example.com</p>
          <p style={textStyle}>Phone: +1 (555) 123-4567</p>
          <div style={socialMediaStyle}>
            <span style={textStyle}>Facebook | </span>
            <span style={textStyle}>Twitter | </span>
            <span style={textStyle}>Instagram</span>
          </div>
        </div>

        {/* FAQs Column */}
        <div style={footerColumnStyle}>
          <h3 style={headingStyle}>FAQs</h3>
          <p style={textStyle}>Shipping & Delivery</p>
          <p style={textStyle}>Returns & Exchanges</p>
          <p style={textStyle}>Payment Options</p>
          <p style={textStyle}>Track Your Order</p>
        </div>

        {/* Information Column */}
        <div style={footerColumnStyle}>
          <h3 style={headingStyle}>Information</h3>
          <p style={textStyle}>About Us</p>
          <p style={textStyle}>Careers</p>
          <p style={textStyle}>Press Releases</p>
          <p style={textStyle}>Blog</p>
        </div>

        {/* Policies Column */}
        <div style={footerColumnStyle}>
          <h3 style={headingStyle}>Our Policies</h3>
          <p style={textStyle}>Privacy Policy</p>
          <p style={textStyle}>Terms of Service</p>
          <p style={textStyle}>Refund Policy</p>
          <p style={textStyle}>Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
