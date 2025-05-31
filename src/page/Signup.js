import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js';
import icon from '../assets/contacticon3.png';
import '../page/Signup.css';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (formData.password.length > 20) {
      newErrors.password = 'Password must not exceed 20 characters.';
    } else if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(formData.password)) {
      newErrors.password = 'Password must include at least one letter and one number. Special characters are allowed.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match. Please re-enter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);
  setErrors({});
  setSubmitSuccess(false);

  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (response.status === 201) {
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setErrors({ form: error.response.data.message });
    } else {
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    }
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="signup-page">
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span className="logo-text">
              OrgoMart
              <span className="logo-image">
                <i className="fas fa-seedling fa-sm" />
              </span>
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
              <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/aboutUs">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="/card">Products</a></li>
              <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
            </ul>
            <form className="d-flex mx-auto">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            <ul className="navbar-nav mx-right">
              <li className="nav-item dropdown me-2">
                <a className="nav-link" href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user fa-lg" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">My Profile</a></li>
                  <li><a className="dropdown-item" href="#">Orders</a></li>
                  <li><a className="dropdown-item" href="#">Coupons</a></li>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </li>
              <li className="nav-item me-2"><a className="nav-link" href="#"><i className="fas fa-heart fa-lg" /></a></li>
              <li className="nav-item me-2"><a className="nav-link" href="#"><i className="fas fa-shopping-cart fa-lg" /></a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="signup-container">
        <div className="signup-form-wrapper">
          <div className="signup-header">
            <img src={icon} alt="Signup Icon" className="signup-icon" />
            <h2>Create Your Account</h2>
            <p>Join OrgoMart for fresh organic products delivered to your doorstep</p>
          </div>

          {submitSuccess && (
            <div className="alert alert-success" role="alert">
              <i className="fas fa-check-circle"></i> Account created successfully!
            </div>
          )}

          {errors.form && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle"></i> {errors.form}
            </div>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              <small className="form-text text-muted">
                Password must be 8–20 characters long and include at least one letter and one number. Special characters are allowed.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termsCheck"
                  required
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>

            <div className="social-signup">
              <p>Or sign up with</p>
              <div className="social-buttons">
                <button type="button" className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="social-btn google">
                  <i className="fab fa-google"></i>
                </button>
              </div>
            </div>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
