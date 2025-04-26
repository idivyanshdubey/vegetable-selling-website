import React from 'react';
import './BestProduct.css';

import p1 from '../assets/product-1.jpg'
import p2 from '../assets/product-2.jpg'
import p3 from '../assets/product-3.jpg'
import p4 from '../assets/product-4.jpg'
  function BestProduct(){
  return(
  <div className="landing_product_section" style={{margin: '5rem'}}>
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="section-title text-center mb-3" style={{color:'rgb(2, 2, 100)',fontSize:'36px'}}><b>Our Best Seller Product</b></h2>
        <div className="text-center pb-5" style={{maxWidth: 380}}>
          <p className="section-subtitle" style={{color:'rgb(2, 2, 100)'}}>
            These are out best selling products . Try these like other customers did and share your experience with us .
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-3   col-md-6 mb-5 ">
          <div className="card product-box">
            <div className="product-img">
              <img src={p1} className="image-fluid" />
            </div>
            <div className=" d-flex align-items-center justify-content-between">
              <h3>Musk Melons</h3>
              <span>Rs 100/Kg</span>
            </div>
            <div className="product-detail ">
              <a hred="#" className="btn main-btn" style={{padding: '0.4rem 1.5rem', fontSize: '1.1rem'}}>View Product</a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3  col-md-6  mb-5">
          <div className="card product-box">
            <div className="product-img">
              <img src={p2} className="image-fluid" />
            </div>
            <div className=" d-flex align-items-center justify-content-between">
              <h3>Oranges</h3>
              <span>Rs 70/Kg</span>
            </div>
            <div className="product-detail ">
              <a hred="#" className="btn main-btn" style={{padding: '0.4rem 1.5rem', fontSize: '1.1rem'}}>View Product</a>
            </div>
          </div>
        </div>
        <div className="col-sm-12  col-md-6  col-lg-3 mb-5">
          <div className="card product-box">
            <div className="product-img">
              <img src={p3} className="image-fluid" />
            </div>
            <div className=" d-flex align-items-center justify-content-between">
              <h3>Apples</h3>
              <span>Rs 80/Kg</span>
            </div>
            <div className="product-detail ">
              <a hred="#" className="btn main-btn" style={{padding: '0.4rem 1.5rem', fontSize: '1.1rem'}}>View Product</a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3  col-md-6  mb-5">
          <div className="card product-box">
            <div className="product-img">
              <img src={p4} className="image-fluid" />
            </div>
            <div className=" d-flex align-items-center justify-content-between">
              <h3>Dragon Fruits</h3>
              <span>Rs 150/Kg</span>
            </div>
            <div className="product-detail">
              <a hred="product.html" className="btn main-btn" style={{padding: '0.4rem 1.5rem', fontSize: '1.1rem'}}>View Product</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    );
}
export default BestProduct;