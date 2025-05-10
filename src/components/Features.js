import React from 'react';
import './Features.css';
import uiChat from '../assets/ui-chat.svg';
import truck from '../assets/truck-loaded.svg';
import wheat from '../assets/wheat.svg';
import cash from '../assets/cash-payment.png';
const Features=()=>{

  return(
  
    <div>
      <h1 className="heading">Our <span>Features</span></h1>
      <div className="feature_section">
        <div className="container">
          <div className="row">
            <div className="col-6 col-lg-3 mb-5">
              <div className="card feature-box">
                <div className="text-center">
                  <div className="feature-icon-border">
                    <div className="feature-icon">
                      <img src={uiChat} width="40px" height="40px" />
                    </div>
                  </div>
                  <div className="feature-text">
                    <h3>24/7 Support</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3 mb-5">
              <div className="card feature-box">
                <div className="text-center">
                  <div className="feature-icon-border">
                    <div className="feature-icon">
                      <img src={truck} width="40px" height="40px" />
                    </div>
                  </div>
                  <div className="feature-text">
                    <h3>Fast Delivery</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3 mb-5">
              <div className="card feature-box">
                <div className="text-center">
                  <div className="feature-icon-border">
                    <div className="feature-icon">
                      <img src={wheat} width="40px" height="40px" />
                    </div>
                  </div>
                  <div className="feature-text">
                    <h3>Fresh &amp; Healthy</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3 mb-5">
              <div className="card feature-box">
                <div className="text-center">
                  <div className="feature-icon-border">
                    <div className="feature-icon">
                      <img src={cash} width="40px" height="40px" />
                    </div>
                  </div>
                  <div className="feature-text">
                    <h3>Easy payments</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 }
  export  default Features;

