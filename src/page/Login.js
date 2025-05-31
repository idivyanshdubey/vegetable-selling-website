// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const form = document.querySelector('.login-form');
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 600);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    setIsSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setFadeOut(true);

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        setTimeout(() => {
          navigate('/myprofile');
        }, 800);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setFormErrors({ form: error.response.data.error });
      } else {
        setFormErrors({ form: 'Login failed. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`login-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className={`login-form ${isSuccess ? 'success-pulse' : ''}`}>
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="heading">Welcome to OrgoMart</h2>
          <div className="logo-container">
            <i className="fas fa-seedling fa-2x" aria-hidden="true"></i>
          </div>

          {formErrors.form && (
            <div className="form-error-message" role="alert">{formErrors.form}</div>
          )}

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
                aria-invalid={!!formErrors.email}
                aria-describedby="email-error"
              />
              <i className="input-icon fas fa-envelope" aria-hidden="true"></i>
            </div>
            {formErrors.email && (
              <div id="email-error" className="error-message">{formErrors.email}</div>
            )}
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
                aria-invalid={!!formErrors.password}
                aria-describedby="password-error"
              />
              <button
                type="button"
                className={`input-icon password-toggle fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              />
            </div>
            {formErrors.password && (
              <div id="password-error" className="error-message">{formErrors.password}</div>
            )}
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
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
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
            <button type="button" className="social-btn google-btn" aria-label="Sign in with Google">
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
            </button>
            <button type="button" className="social-btn facebook-btn" aria-label="Sign in with Facebook">
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" />
            </button>
          </div>

          <p>
            New to OrgoMart? <Link to="/signup">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
