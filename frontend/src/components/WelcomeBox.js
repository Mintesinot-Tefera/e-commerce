// // WelcomeBox.js
// import React from 'react';

// const WelcomeBox = () => {
//   const boxStyle = {
//     backgroundColor: '#e0f7fa',
//     padding: '90px',
//     borderRadius: '12px',
//     textAlign: 'center',
//     margin: '20px 0',
//   };
// //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

//   const titleStyle = {
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     fontFamily: '"Comic Sans MS", cursive, sans-serif', // Unique font style
//     color: '#00796b',
//     marginBottom: '10px',
//   };

//   const subtitleStyle = {
//     fontSize: '1.2rem',
//     color: '#004d40',
//     fontFamily: '"Arial", sans-serif',
//     fontStyle: 'italic',
//   };

//   const graphicStyle = {
//     fontSize: '3rem',
//     color: '#004d40',
//     marginTop: '10px',
//   };

//   return (
//     <div style={boxStyle}>
//       <div style={titleStyle}>Find Everything You Need, Right at Your Fingertips!</div>
//       <div style={subtitleStyle}>Discover the best deals and exclusive items for every occasion.</div>
//       <div style={graphicStyle}>✨🛒✨</div>
//     </div>
//   );
// };

// export default WelcomeBox;






// // WelcomeBox.js
// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// const WelcomeBox = () => {
//   const carouselContainerStyle = {
//     padding: '60px',
//     height: '200px', // Set fixed height for the entire carousel container
//     margin: '20px 0',
//     justifyContent: 'center',
//   };

//   const boxStyle = {
//     backgroundColor: '#e0f7fa',
//     padding: '100px',
//     borderRadius: '12px',
//     textAlign: 'center',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//     height: '100%', // Ensure each slide fills the container height
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   };

//   const titleStyle = {
//     fontSize: '1.8rem',
//     fontWeight: 'bold',
//     fontFamily: '"Comic Sans MS", cursive, sans-serif',
//     color: '#00796b',
//     marginBottom: '5px',
//   };

//   const subtitleStyle = {
//     fontSize: '1rem',
//     color: '#004d40',
//     fontFamily: '"Arial", sans-serif',
//     fontStyle: 'italic',
//   };

//   const graphicStyle = {
//     fontSize: '2rem',
//     color: '#004d40',
//     marginTop: '5px',
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4200,
//   };

//   const slides = [
//     {
//       title: 'Find Everything You Need, Right at Your Fingertips!',
//       subtitle: 'Discover the best deals and exclusive items for every occasion.',
//     },
//     {
//       title: 'Unbeatable Prices, Just for You!',
//       subtitle: 'Explore amazing discounts across all categories.',
//     },
//     {
//       title: 'Quality Products, Every Day!',
//       subtitle: 'Shop trusted brands and high-quality items with us.',
//     },
//     {
//       title: 'New Arrivals Weekly!',
//       subtitle: 'Stay ahead with our latest selections and exclusive launches.',
//     },
//     {
//       title: 'Fast and Reliable Shipping!',
//       subtitle: 'Get your orders delivered swiftly to your doorstep.',
//     },
//     {
//       title: 'Easy Returns, No Hassle!',
//       subtitle: 'Shop worry-free with our customer-friendly return policy.',
//     },
//   ];

//   return (
//     <div style={carouselContainerStyle}>
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index} style={boxStyle}>
//             <div style={titleStyle}>{slide.title}</div>
//             <div style={subtitleStyle}>{slide.subtitle}</div>
//             <div style={graphicStyle}>✨🛒✨</div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default WelcomeBox;























// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// // Importing local images
// import image1 from './assets/image1.jpg';
// import image2 from './assets/image2.jpg';
// import image3 from './assets/image3.jpg';
// import image4 from './assets/image1.jpg';
// import image5 from './assets/image2.jpg';
// import image6 from './assets/image3.jpg';

// const WelcomeBox = () => {
//   const carouselContainerStyle = {
//     padding: '60px',
//     height: '300px', // Adjust height as needed
//     margin: '20px 0',
//     justifyContent: 'center',
//   };

//   const titleStyle = {
//     fontSize: '1.8rem',
//     fontWeight: 'bold',
//     fontFamily: '"Comic Sans MS", cursive, sans-serif',
//     color: '#00796b',
//     marginBottom: '10px',
//     textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
//   };

//   const subtitleStyle = {
//     fontSize: '1rem',
//     color: '#004d40',
//     fontFamily: '"Arial", sans-serif',
//     fontStyle: 'italic',
//     textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
//   };

//   const graphicStyle = {
//     fontSize: '2rem',
//     color: '#004d40',
//     marginTop: '10px',
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4200,
//   };

//   // Array of slides with titles, subtitles, and images
//   const slides = [
//     { title: 'Find Everything You Need, Right at Your Fingertips!', subtitle: 'Discover the best deals and exclusive items for every occasion.', image: image1 },
//     { title: 'Unbeatable Prices, Just for You!', subtitle: 'Explore amazing discounts across all categories.', image: image2 },
//     { title: 'Quality Products, Every Day!', subtitle: 'Shop trusted brands and high-quality items with us.', image: image3 },
//     { title: 'New Arrivals Weekly!', subtitle: 'Stay ahead with our latest selections and exclusive launches.', image: image4 },
//     { title: 'Fast and Reliable Shipping!', subtitle: 'Get your orders delivered swiftly to your doorstep.', image: image5 },
//     { title: 'Easy Returns, No Hassle!', subtitle: 'Shop worry-free with our customer-friendly return policy.', image: image6 },
//   ];

//   return (
//     <div style={carouselContainerStyle}>
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             style={{
//               ...boxStyle,
//               backgroundImage: `url(${slide.image})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'no-repeat',
//               opacity: 0.8, // Adjust opacity for transparency
//             }}
//           >
//             <div style={titleStyle}>{slide.title}</div>
//             <div style={subtitleStyle}>{slide.subtitle}</div>
//             <div style={graphicStyle}>✨🛒✨</div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// // Styling for each slide box
// const boxStyle = {
//   padding: '50px',
//   borderRadius: '12px',
//   textAlign: 'center',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   height: '100%', // Ensure each slide fills the container height
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   color: 'white',
// };

// export default WelcomeBox;
































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
