import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.js';
import icon from '../assets/contacticon3.png';
import '../page/Signup.css';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [fieldTouched, setFieldTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    google: false,
    facebook: false
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Mark field as touched
    if (!fieldTouched[id]) {
      setFieldTouched(prev => ({
        ...prev,
        [id]: true
      }));
    }

    // Clear success messages when user starts typing
    if (id === 'password' && showPasswordSuccess) {
      setShowPasswordSuccess(false);
    }

    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }

    // Real-time validation for password
    if (id === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    let error = '';
    
    if (!password) {
      error = 'Password is required.';
      setShowPasswordSuccess(false);
    } else if (password.length < 8) {
      error = 'Password must be at least 8 characters long.';
      setShowPasswordSuccess(false);
    } else if (password.length > 20) {
      error = 'Password must not exceed 20 characters.';
      setShowPasswordSuccess(false);
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      error = 'Password must include at least one letter and one number.';
      setShowPasswordSuccess(false);
    } else {
      // Password is valid, show success message
      setShowPasswordSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowPasswordSuccess(false);
      }, 3000);
    }

    setErrors(prev => ({
      ...prev,
      password: error
    }));
  };

  const getPasswordStrength = (password) => {
    if (!password) return 'weak';
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  };

  const getPasswordStrengthPercentage = (password) => {
    if (!password) return 0;
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return Math.min((score / 6) * 100, 100);
  };

  const getPasswordStrengthText = (password) => {
    const strength = getPasswordStrength(password);
    switch (strength) {
      case 'weak': return 'Weak';
      case 'medium': return 'Medium';
      case 'strong': return 'Strong';
      default: return '';
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    if (errors.terms) {
      setErrors(prev => ({ ...prev, terms: '' }));
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoadingStates(prev => ({ ...prev, [provider]: true }));
    
    // Simulate social login
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [provider]: false }));
      // Here you would integrate with actual OAuth providers
      console.log(`${provider} login clicked`);
    }, 2000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
  };

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification({
        show: false,
        message: '',
        type: 'success'
      });
    }, 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name (letters and spaces only).';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (formData.password.length > 20) {
      newErrors.password = 'Password must not exceed 20 characters.';
    } else if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(formData.password)) {
      newErrors.password = 'Password must include at least one letter and one number. Special characters are allowed.';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match. Please re-enter.';
    }

    // Terms and conditions validation
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the Terms of Service and Privacy Policy.';
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
      
      // Show success notification and redirect to login
      showNotification('Account created successfully! Redirecting to login... 🎉', 'success');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.error || error.response.data.message || 'An error occurred';
      setErrors({ form: errorMessage });
      showNotification(errorMessage, 'error');
    } else {
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
      showNotification('An unexpected error occurred. Please try again.', 'error');
    }
    scrollToTop();
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="signup-page">
      {/* Notification Component */}
      {notification.show && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            <span>{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification({ show: false, message: '', type: 'success' })}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
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
              <li className="nav-item"><a className="nav-link active" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</a></li>
              <li className="nav-item"><a className="nav-link" onClick={() => navigate('/aboutUs')} style={{ cursor: 'pointer' }}>About Us</a></li>
              <li className="nav-item"><a className="nav-link" onClick={() => navigate('/card')} style={{ cursor: 'pointer' }}>Products</a></li>
              <li className="nav-item"><a className="nav-link" onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</a></li>
            </ul>
            <form className="d-flex mx-auto">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            <ul className="navbar-nav mx-right">
              <li className="nav-item me-2">
                <a
                  className="nav-link"
                  onClick={() => navigate("/myprofile")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-user fa-lg" />
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" onClick={() => navigate('/wishlist')} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-heart fa-lg" />
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-shopping-cart fa-lg" />
                </a>
              </li>
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
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.password && fieldTouched.password && (
                <div className="invalid-feedback">
                  <i className="fas fa-exclamation-triangle"></i>
                  {errors.password}
                </div>
              )}
              {showPasswordSuccess && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  Password looks good!
                </div>
              )}
              {formData.password && fieldTouched.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className={`strength-fill ${getPasswordStrength(formData.password)}`}
                      style={{ width: `${getPasswordStrengthPercentage(formData.password)}%` }}
                    ></div>
                  </div>
                  <span className={`strength-text ${getPasswordStrength(formData.password)}`}>
                    {getPasswordStrengthText(formData.password)}
                  </span>
                </div>
              )}
              <small className="form-text text-muted">
                Password must be 8–20 characters long and include at least one letter and one number. Special characters are allowed.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && fieldTouched.confirmPassword && (
                <div className="invalid-feedback">
                  <i className="fas fa-exclamation-triangle"></i>
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termsCheck"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  I agree to the <a href="#" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && (
                <div className="invalid-feedback">
                  <i className="fas fa-exclamation-triangle"></i>
                  {errors.terms}
                </div>
              )}
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
                <button 
                  type="button" 
                  className={`social-btn facebook ${loadingStates.facebook ? 'loading' : ''}`}
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loadingStates.facebook || loadingStates.google}
                >
                  {loadingStates.facebook ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <i className="fab fa-facebook-f"></i>
                  )}
                </button>
                <button 
                  type="button" 
                  className={`social-btn google ${loadingStates.google ? 'loading' : ''}`}
                  onClick={() => handleSocialLogin('google')}
                  disabled={loadingStates.facebook || loadingStates.google}
                >
                  {loadingStates.google ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <i className="fab fa-google"></i>
                  )}
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
