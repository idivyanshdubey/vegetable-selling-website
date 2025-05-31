import React, { useState, useEffect } from 'react';
import './About.css';
import Footer from '../components/Footer.js';
import { Link } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle scroll animations
  useEffect(() => {
    handleScrollAnimations();
    
    // Show back-to-top button when scrolling down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setFormSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="about-page">
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span className="logo-text">
              OrgoMart
              <span className="logo-image"><i className="fas fa-seedling fa-sm" /></span>
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
              <li className="nav-item"><a className="nav-link" aria-current="page" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link active" href="./aboutUs">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="./card">Products</a></li>
              <li className="nav-item"><a className="nav-link" href="./contact">Contact</a></li>
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
                  <li><a className="dropdown-item" href="">My Profile</a></li>
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

      {/* Hero Banner */}
      <section className="landing_about_section animate-on-scroll">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6 col-sm-8">
              <div className="about-content">
                <h2 className="mb-4">We aim at providing a platform where vegetable sellers meet buyers.</h2>
                <div className="about-details">
                  <p className="fw-bold">Our prime motive is to make our customers satisfied with our service.</p>
                  <p>
                    OrgoMart is a low-cost online general store that gets items across categories like grocery, natural products and vegetables,
                    beauty and health, household care, baby care, pet care, meats and fish delivered to your doorstep. Our goal is to give our clients the best shopping experience in terms of service, range, and value.
                  </p>
                  <p>
                    From fresh Fruits and Vegetables, rice and lentils, spices and seasonings to packaged items, beverages, personal care products—we have everything.
                    Browse a wide range of options in each category, handpicked to ensure the best quality at the lowest cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="hero" className="animate-on-scroll">
        <div className="container">
          <h1 className="mb-4">Welcome to OrgoMart</h1>
          <p className="lead">We are passionate about providing fresh and healthy produce to our customers.</p>
          <div className="hero-cta mt-4">
            <a href="./card" className="btn btn-success me-3">Shop Now</a>
            <a href="/contact" className="btn btn-outline-success">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="animate-on-scroll">
        <div className="container">
          <h2>Our Mission</h2>
          <div className="row mt-5">
            <div className="col-md-6">
              <p className="mission-text">
                Our mission is to promote a healthy lifestyle by offering a wide range of organic vegetables
                that are locally sourced and free from harmful pesticides. We aim to inspire better food choices for individuals and the planet.
              </p>
            </div>
            <div className="col-md-6">
              <div className="mission-stats">
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <h3>1000+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="stat-item">
                  <i className="fas fa-store"></i>
                  <h3>50+</h3>
                  <p>Local Farmers</p>
                </div>
                <div className="stat-item">
                  <i className="fas fa-leaf"></i>
                  <h3>100+</h3>
                  <p>Organic Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons Section */}
      <section id="reasons">
        <div className="container">
          <h2>Reasons to Choose Us</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="reason animate-on-scroll">
                <i className="fas fa-leaf"></i>
                <div>
                  <h3>Fresh and Organic</h3>
                  <p>We work directly with local farmers to ensure that our vegetables are fresh and of the highest quality.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="reason animate-on-scroll">
                <i className="fas fa-truck"></i>
                <div>
                  <h3>Fast Delivery</h3>
                  <p>We provide fast and reliable delivery services to ensure your vegetables arrive promptly.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="reason animate-on-scroll">
                <i className="fas fa-heart"></i>
                <div>
                  <h3>Customer Satisfaction</h3>
                  <p>Your satisfaction is our priority. We strive to provide exceptional service and address concerns promptly.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="reason animate-on-scroll">
                <i className="fas fa-seedling"></i>
                <div>
                  <h3>Fresh Produce</h3>
                  <p>Our vegetables are harvested daily for maximum freshness and nutritional value.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="animate-on-scroll">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"The quality of vegetables is exceptional. I've been a regular customer for months now and have never been disappointed."</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Priya Sharma</h4>
                    <p>Regular Customer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Fast delivery and fresh products every time. Their customer service is also excellent. Highly recommended!"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Rahul Gupta</h4>
                    <p>New Customer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"I love that I can get organic vegetables delivered right to my doorstep. It has made healthy eating so much easier."</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Ananya Patel</h4>
                    <p>Monthly Subscriber</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-section" className="animate-on-scroll">
        <div className="container">
          <h2>Get In Touch</h2>
          <p className="text-center mb-5">If you have any questions, feedback, or inquiries, please reach out to us. We would love to hear from you!</p>
          
          <div className="row">
            <div className="col-md-6">
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? 'error' : ''}
                  />
                  {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? 'error' : ''}
                  />
                  {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                </div>
                
                <div className="form-group">
                  <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    className={formErrors.message ? 'error' : ''}
                  ></textarea>
                  {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                </div>
                
                <button type="submit" disabled={formSubmitted}>
                  {formSubmitted ? 'Message Sent!' : 'Send Message'}
                </button>
                
                {formSubmitted && (
                  <div className="success-message mt-3">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
            
            <div className="col-md-6">
              <div className="contact-info">
                <div>
                  <p>Contact us at:</p>
                  <p>Email: Support@orgomart.com</p>
                  <p>Phone: +91 1234567890</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
  // Remove this duplicate return block as it is unnecessary

}
export default About;