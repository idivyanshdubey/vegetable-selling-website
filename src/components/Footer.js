import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faFacebook, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="ftco-footer ftco-section">
      <div className="container">
        {/* About Us Section */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">About Us</h2>
              <p>
                Our website connects customers with sellers, providing fresh fruits and vegetables
                directly from local markets.
              </p>
              <div className="ftco-footer-social mt-4">
                <a href="https://www.facebook.com/" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://x.com/" aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.instagram.com/" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.linkedin.com/in/divyansh-dubey-48101025d/" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Site Links Section */}
          <div className="col-md-4">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Site Links</h2>
              <ul className="footer-links">
                <li>
                  <a href="./aboutUs">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="./contact">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="./card">
                    Products &amp; Prices
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="col-md-4">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Have a Question?</h2>
              <ul className="contact-info">
                <li className="address">
                  <span>Dehradun, Uttarakhand, India</span>
                </li>
                <li className="phone">
                  <a href="tel:+918126263458">
                    +91 8368959173
                  </a>
                </li>
                <li className="email">
                  <a href="mailto:divyanshhdubey10@gmail.com">
                    divyanshhdubey10@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom Section */}
        <div className="row">
          <div className="col-md-12 text-center">
            <p>© {new Date().getFullYear()} Vegetable Market. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
