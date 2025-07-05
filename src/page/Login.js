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
  const [fieldTouched, setFieldTouched] = useState({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [socialLoading, setSocialLoading] = useState({ google: false, facebook: false });
  const [validationRules] = useState({
    email: {
      required: 'Email is required',
      pattern: 'Please enter a valid email address',
      minLength: 'Email must be at least 5 characters',
    },
    password: {
      required: 'Password is required',
      minLength: 'Password must be at least 6 characters',
      pattern: 'Password must contain at least one letter and one number',
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }



    // Real-time validation for touched fields
    if (fieldTouched[name]) {
      validateField(name, type === 'checkbox' ? checked : value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'email':
        if (!value.trim()) {
          error = validationRules.email.required;
        } else if (value.length < 5) {
          error = validationRules.email.minLength;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = validationRules.email.pattern;
        } else {
          // Email is valid
        }
        break;

      case 'password':
        if (!value) {
          error = validationRules.password.required;
        } else if (value.length < 6) {
          error = validationRules.password.minLength;
        } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) {
          error = validationRules.password.pattern;
        } else {
          // Password is valid
        }
        break;

      default:
        break;
    }

    setFormErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return !error;
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Mark all fields as touched
    setFieldTouched({
      email: true,
      password: true,
    });

    // Validate each field
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);

    // Check for any remaining errors
    const currentErrors = {};
    if (!emailValid) {
      currentErrors.email = formErrors.email || validationRules.email.required;
    }
    if (!passwordValid) {
      currentErrors.password = formErrors.password || validationRules.password.required;
    }

    setFormErrors(currentErrors);
    return emailValid && passwordValid && Object.keys(currentErrors).length === 0;
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

  const handleGoogleLogin = async () => {
    setSocialLoading(prev => ({ ...prev, google: true }));
    try {
      // For demo purposes, we'll simulate Google OAuth
      // In a real app, you would integrate with Google OAuth API
      console.log('Google login initiated');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, we'll create a mock user session
      const mockUser = {
        id: 'google_user_' + Date.now(),
        email: 'demo@google.com',
        name: 'Google User',
        provider: 'google'
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'google_token_' + Date.now());
      
      setIsSuccess(true);
      setFadeOut(true);
      
      setTimeout(() => {
        navigate('/myprofile');
      }, 800);
      
    } catch (error) {
      console.error('Google login failed:', error);
      setFormErrors({ form: 'Google login failed. Please try again.' });
    } finally {
      setSocialLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleFacebookLogin = async () => {
    setSocialLoading(prev => ({ ...prev, facebook: true }));
    try {
      // For demo purposes, we'll simulate Facebook OAuth
      // In a real app, you would integrate with Facebook OAuth API
      console.log('Facebook login initiated');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, we'll create a mock user session
      const mockUser = {
        id: 'facebook_user_' + Date.now(),
        email: 'demo@facebook.com',
        name: 'Facebook User',
        provider: 'facebook'
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'facebook_token_' + Date.now());
      
      setIsSuccess(true);
      setFadeOut(true);
      
      setTimeout(() => {
        navigate('/myprofile');
      }, 800);
      
    } catch (error) {
      console.error('Facebook login failed:', error);
      setFormErrors({ form: 'Facebook login failed. Please try again.' });
    } finally {
      setSocialLoading(prev => ({ ...prev, facebook: false }));
    }
  };

  return (
    <div className="login-page">
      <div className={`login-container ${fadeOut ? 'fade-out' : ''}`}>
        <div className={`login-form ${isSuccess ? 'success-pulse' : ''}`}>
          <div className="login-header">
            <div className="logo-container">
              <i className="fas fa-seedling fa-2x" aria-hidden="true"></i>
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to your OrgoMart account</p>
          </div>

          <div className="login-form-content">
            <form onSubmit={handleSubmit} noValidate>

          {formErrors.form && (
            <div className="form-error-message" role="alert">{formErrors.form}</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${formErrors.email ? 'error' : ''} ${formData.email && !formErrors.email ? 'valid' : ''} ${fieldTouched.email ? 'touched' : ''}`}
                aria-invalid={!!formErrors.email}
                aria-describedby="email-error"
                autoComplete="email"
              />
              <i className={`input-icon fas ${formErrors.email ? 'fa-exclamation-circle' : formData.email && !formErrors.email ? 'fa-check-circle' : 'fa-envelope'}`} aria-hidden="true"></i>
            </div>
            {formErrors.email && fieldTouched.email && (
              <div id="email-error" className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {formErrors.email}
              </div>
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
                onBlur={handleBlur}
                className={`${formErrors.password ? 'error' : ''} ${formData.password && !formErrors.password ? 'valid' : ''} ${fieldTouched.password ? 'touched' : ''}`}
                aria-invalid={!!formErrors.password}
                aria-describedby="password-error"
                autoComplete="current-password"
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
            {formErrors.password && fieldTouched.password && (
              <div id="password-error" className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {formErrors.password}
              </div>
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

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button 
              type="button" 
              className={`social-btn google-btn ${socialLoading.google ? 'loading' : ''}`}
              onClick={handleGoogleLogin}
              disabled={socialLoading.google || socialLoading.facebook}
              aria-label="Sign in with Google"
            >
              {socialLoading.google ? (
                <div className="social-loading-spinner"></div>
              ) : (
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
              )}
            </button>
            <button 
              type="button" 
              className={`social-btn facebook-btn ${socialLoading.facebook ? 'loading' : ''}`}
              onClick={handleFacebookLogin}
              disabled={socialLoading.google || socialLoading.facebook}
              aria-label="Sign in with Facebook"
            >
              {socialLoading.facebook ? (
                <div className="social-loading-spinner"></div>
              ) : (
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" />
              )}
            </button>
          </div>

          <p>
            New to OrgoMart? <Link to="/signup">Create Account</Link>
          </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
