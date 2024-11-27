// AdvertisingCard.js
import React from 'react';

const AdvertisingCard = () => {
  const cardStyle = {
    backgroundColor: '#e0f7fa',
    color: '#333',
    // color: '#de1a04',
    // color: '#05a10a',
    padding: '8px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '0.7rem',
  };

  return (
    <div style={cardStyle}>
      <h2>Special Offer: Up to 50% Off on Selected Items!</h2>
      <p>Shop now and enjoy exclusive deals on our top products. Limited time only!</p>
    </div>
  );
};

export default AdvertisingCard;
