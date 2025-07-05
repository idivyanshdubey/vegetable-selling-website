import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Find from './Find.js';
import HomeSlider from './HomeSlider';

const Header = () => {
  const navigate = useNavigate();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Load wishlist and cart counts from localStorage
  useEffect(() => {
    const loadCounts = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setWishlistCount(wishlist.length);
      setCartCount(cart.length);
    };

    loadCounts();
    // Listen for storage changes
    window.addEventListener('storage', loadCounts);
    return () => window.removeEventListener('storage', loadCounts);
  }, []);

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToAbout = () => {
    navigate('/aboutUs');
  };

  const navigateToProducts = () => {
    navigate('/card');
  };

  const navigateToContact = () => {
    navigate('/contact');
  };

  const navigateToWishlist = () => {
    navigate('/wishlist');
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  const navigateToProfile = () => {
    navigate('/myprofile');
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-light nav1">
        <div className="container-fluid d-flex align-items-center">
          <button
            className="mx-auto"
            id="changeButton"
            onClick={Find}
            style={{ background: 'none', border: 'none', color: '#26732a', cursor: 'pointer' }}
          >
            <span id="locationText">
              Detect Location <i className="fas fa-map-marker-alt" />
            </span>
          </button>
          <div className="me-4">
            <button 
              className="btn btn-success" 
              style={{ padding: '5px 10px' }}
              onClick={() => navigate('/signup')}
            >
              Sign In
            </button>
          </div>
          <div className="header_right me-4">
            <div className="navbar-text">
              <i className="fas fa-phone-alt" /> <span className="phone_no">+91 8368959173</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2" style={{ marginBottom: 0 }}>
        <div className="container-fluid">
          <a className="navbar-brand" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
            <span className="logo-text">
              OrgoMart <i className="fas fa-seedling fa-sm logo-image" />
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={navigateToAbout} style={{ cursor: 'pointer' }}>
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={navigateToProducts} style={{ cursor: 'pointer' }}>
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={navigateToContact} style={{ cursor: 'pointer' }}>
                  Contact
                </a>
              </li>
            </ul>
            <form className="d-flex mx-auto">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav mx-right">
              <li className="nav-item me-2">
                <a
                  className="nav-link"
                  onClick={navigateToProfile}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-user fa-lg" />
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" onClick={navigateToWishlist} style={{ cursor: 'pointer' }}>
                  <div className="position-relative">
                    <i className="fas fa-heart fa-lg" />
                    <span className="wishlist-num">{wishlistCount}</span>
                  </div>
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" onClick={navigateToCart} style={{ cursor: 'pointer' }}>
                  <div className="position-relative">
                    <i className="fas fa-shopping-cart fa-lg" />
                    <span className="cart-num">{cartCount}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Home Slider */}
      <HomeSlider />
    </div>
  );
};

export default Header;