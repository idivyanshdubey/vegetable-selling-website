import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Ensure your CSS file is correctly linked

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate form
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await axios.post('http://localhost:5000/api/login', formData);
        console.log('Login successful!', response.data);
        setIsSuccess(true);
      } catch (error) {
        console.error('Login failed:', error.response?.data || 'Unknown error');
        setFormErrors({ email: 'Invalid email or password' });
      }

      setIsSubmitting(false);
    } else {
      // Add shake animation to form on error
      const form = document.querySelector('.login-form');
      form.classList.add('shake');
      setTimeout(() => {
        form.classList.remove('shake');
      }, 600);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-form ${isSuccess ? 'success-pulse' : ''}`}>
        <form onSubmit={handleSubmit}>
          <h2 className="heading">Welcome to OrgoMart</h2>
          <div className="logo-container">
            <i className="fas fa-seedling fa-2x"></i>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : formData.email ? 'valid' : ''}
              />
              <i className="input-icon fas fa-envelope"></i>
            </div>
            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={formErrors.password ? 'error' : formData.password ? 'valid' : ''}
              />
              <i
                className={`input-icon password-toggle fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {formErrors.password && <div className="error-message">{formErrors.password}</div>}
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">
              <span className="checkbox-custom"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? '' : isSuccess ? 'Success!' : 'Sign In'}
          </button>

          <div className="divider">or continue with</div>

          <div className="social-login">
            <button type="button" className="social-btn google-btn">
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
            </button>
            <button type="button" className="social-btn facebook-btn">
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" />
            </button>
          </div>

          <p>
            New to OrgoMart? <a href="/signup">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;