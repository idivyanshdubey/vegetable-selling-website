 import React from 'react';
  const Footer=()=>{
  return (
   
  <footer className="ftco-footer ftco-section img" style={{backgroundColor: '#333', padding: 20, color: '#fff', textAlign: 'center'}}>
    <div className="overlay" />
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">About Us</h2>
            <p>Our website aims at providing customers fruits and vegetables directly from vegetables markets . Sellers meet buyers through this platform .</p>
            <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
              <li className="ftco-animate"><a href="#"><span className="icon-twitter" /></a></li>
              <li className="ftco-animate"><a href="#"><span className="icon-facebook" /></a></li>
              <li className="ftco-animate"><a href="#"><span className="icon-instagram" /></a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="ftco-footer-widget mb-4 ml-md-4">
            <h2 className="ftco-heading-2">Site Links</h2>
            <ul className="list-unstyled">
              <li><a href="./aboutUs" className="py-2 d-block">About Us</a></li>
              <li><a href="./contact" className="py-2 d-block">Feedback</a></li>
              <li><a href="#" className="py-2 d-block">Products &amp; Prices</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Have a Questions?</h2>
            <div className="block-23 mb-3">
              <ul>
                <li><span className="icon icon-map-marker" /><span className="text">Dehradun , Uttarakhand , India</span></li>
                <li><a href="#"><span className="icon icon-phone" /><span className="text">+91 8126263458</span></a></li>
                <li><a href="#"><span className="icon icon-envelope" /><span className="text">malvikakunw1212@gmail.com</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          © 2023 Vegetable Market. All rights reserved.
        </div>
      </div>
    </div>
  </footer>

  );
  }
  export default Footer;

