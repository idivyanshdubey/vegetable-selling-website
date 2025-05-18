import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import Footer from '../components/Footer';

function CheckOut() {
  const onToken = (token) => {
    console.log(token);
    // You can handle the token here (e.g., send to backend)
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2" style={{ marginBottom: 0 }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span className="logo-text">
              OrgoMart
              <span className="logo-image">
                <i className="fas fa-seedling fa-sm" />
              </span>
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./aboutUs">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./card">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./contact">Contact</a>
              </li>
            </ul>
            <ul className="navbar-nav mx-right">
              <li className="nav-item dropdown me-2">
                <a className="nav-link" href="/" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user fa-lg" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="/profile">My Profile</a></li>
                  <li><a className="dropdown-item" href="/orders">Orders</a></li>
                  <li><a className="dropdown-item" href="/coupons">Coupons</a></li>
                  <li><a className="dropdown-item" href="/logout">Logout</a></li>
                </ul>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="/wishlist"><i className="fas fa-heart fa-lg" /></a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link" href="/cart"><i className="fas fa-shopping-cart fa-lg" /></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Checkout Form */}
      <div className="container mt-5" style={{ maxWidth: '600px' }}>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="1234 Main St" />
          </div>
          <div className="col-12">
            <label className="form-label">Address 2</label>
            <input type="text" className="form-control" placeholder="Apartment, studio, or floor" />
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <select className="form-select">
              <option defaultValue="">Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Zip</label>
            <input type="text" className="form-control" />
          </div>
        </form>

        <div className="col-12 text-center pb-4 pt-4">
          <StripeCheckout
            token={onToken}
            name="OrgoMart Checkout"
            currency="INR"
            amount={16000}
            stripeKey="pk_test_51NhuPlSAwx3EEYDFKk7NWcYeVXUkHnzuKnCKRuM07Mwbt7jodu89fNFfeBiICrf9YEM7B7M1xqz5BEaaHf4QUzK000cZMyk4f1"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
export default CheckOut;