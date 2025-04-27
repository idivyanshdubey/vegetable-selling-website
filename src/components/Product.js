import React, { useState } from 'react';
import { useDispatchCart } from './ContextReducer';

const Product = (props) => {
  const dispatch = useDispatchCart();
  const options = props.options;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    if (!size) {
      alert("Please select a size before adding to the cart.");
      return;
    }
    await dispatch({ type: "ADD", id: props.title, price: props.price, qty: qty, size: size });
  };

  const finalPrice = qty * parseInt(options[size] || 0);

  return (
    <>
      <div className="card text-center pt-0 pb-3" style={{ border: '1px solid #f1e8e8', boxShadow: '5px 5px 15px grey' }}>
        <div style={{ height: '170px', width: 'auto' }}>
          <img
            src={props.image}
            className="card-img-top"
            width="80%"
            height="100%"
            alt={props.title}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-evenly align-items-center">
            <h5 className="card-title">{props.title}</h5>
            <p>Rs {props.price}/kg</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {/* Quantity Selector */}
            <select
              className="h-100 rounded"
              style={{ backgroundColor: 'rgb(44 125 48)', color: 'white' }}
              onChange={(e) => setQty(e.target.value)}
            >
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size Selector */}
            <select
              className="h-100 rounded"
              style={{ backgroundColor: 'rgb(44 125 48)', color: 'white' }}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="half">HALF</option>
              <option value="full">FULL</option>
            </select>

            {/* Final Price */}
            <div className="d-inline h-100 fs-5">
              Rs {finalPrice}
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: 'rgb(44 125 48)', padding: '2px 11px', color: 'white' }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;