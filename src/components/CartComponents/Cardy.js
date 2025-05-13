import React, { useState } from 'react';
import './Cardy.css';

const Cardy = ({ data, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(data);
  };

  return (
    <div 
      className="cardy-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cardy-card-content">
        <div className="cardy-image-container">
          <img
            src={
              data.image
                ? require(`../../assets/${data.image}`)
                : data.url
            }
            className="cardy-card-img-top"
            alt={data.title}
            title={data.title}
          />
          {isHovered && (
            <div className="cardy-quick-add">
              <button
                className="cardy-quick-add-btn"
                onClick={handleAddToCart}
              >
                Quick Add
              </button>
            </div>
          )}
        </div>
        
        <h3 className="cardy-card-title">{data.title}</h3>
        <p className="cardy-price">
          Price: <span>Rs {data.price}/kg</span>
        </p>
        
        <button
          className="cardy-add-to-cart"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Cardy;