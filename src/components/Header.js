import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Header.css';
import Find from './Find.js';
import HomeSlider from './HomeSlider';

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const navigateToHome = () => {
    navigate('/'); // Navigate to the homepage
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
            <a href="./signup" className="btn btn-success" style={{ padding: '5px 10px' }}>
              Sign In
            </a>
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./aboutUs">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./products">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./contact">
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
              <li className="nav-item dropdown me-2">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user fa-lg" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Coupons
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="#">
                  <div className="position-relative">
                    <i className="fas fa-shopping-cart fa-lg" />
                    <span className="cart-num">0</span>
                  </div>
                </a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link" href="#">
                  <i className="fas fa-heart fa-lg" />
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