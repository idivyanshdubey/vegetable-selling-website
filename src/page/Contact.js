import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import bannerImg from '../assets/Banner-1.jpg';
import smile from '../assets/smile (2).png';
import sad from '../assets/sad (1).png';
import angry from '../assets/angry (1).png';
import neutral from '../assets/neutral.png';
import Footer from '../components/Footer';
import './Contact.css';

const Contact = () => {
  const [activePanel, setActivePanel] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    feedback: '',
    mood: ''
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState({
    feedback: false,
    contact: false
  });

  // Toggle between feedback and contact panels
  const togglePanel = (panel) => {
    if (panel === 'feedback') {
      setActivePanel(true);
    } else {
      setActivePanel(false);
    }
  };

  // Handle feedback form input changes
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm({
      ...feedbackForm,
      [name]: value
    });
  };

  // Handle contact form input changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    setFeedbackForm({
      ...feedbackForm,
      mood: mood
    });
  };

  // Submit feedback form
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
    // Here you would typically send the data to your backend
    
    // Show success message
    setFormSubmitted({...formSubmitted, feedback: true});
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFeedbackForm({
        name: '',
        email: '',
        feedback: '',
        mood: ''
      });
      setFormSubmitted({...formSubmitted, feedback: false});
    }, 3000);
  };

  // Submit contact form
  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact message submitted:', contactForm);
    // Here you would typically send the data to your backend
    
    // Show success message
    setFormSubmitted({...formSubmitted, contact: true});
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setContactForm({
        name: '',
        email: '',
        message: ''
      });
      setFormSubmitted({...formSubmitted, contact: false});
    }, 3000);
  };

  // Apply animation classes when component mounts
  useEffect(() => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animateElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="contact-page">
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
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./aboutUs">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./card">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="./contact">
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
                  href="/"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user fa-lg" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/profile">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/orders">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/coupons">
                      Coupons
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="/wishlist">
                  <i className="fas fa-heart fa-lg" />
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="/cart">
                  <div>
                    <i className="fas fa-shopping-cart fa-lg" />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="contact-header animate-on-scroll">
        <div className="contact-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
          <div className="contact-banner-overlay">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you</p>
          </div>
        </div>
      </div>

      <div className="contact-intro animate-on-scroll">
        <h2>Get In Touch</h2>
        <p>Have questions about our products or services? We're here to help!</p>
      </div>

      <section className="contact">
        <div className={`container1 ${activePanel ? 'right-panel-active' : ''}`} id="main">
          <div className="sign-up">
            <form onSubmit={handleFeedbackSubmit}>
              <h1>Provide Feedback</h1>
              {formSubmitted.feedback ? (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <p>Thank you for your feedback!</p>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={feedbackForm.name}
                    onChange={handleFeedbackChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={feedbackForm.email}
                    onChange={handleFeedbackChange}
                  />
                  <textarea
                    name="feedback"
                    placeholder="Your experience"
                    required
                    value={feedbackForm.feedback}
                    onChange={handleFeedbackChange}
                  ></textarea>
                  <h3>How was your experience?</h3>
                  <div className="mood-selector">
                    <div className={`mood-option ${feedbackForm.mood === 'happy' ? 'selected' : ''}`} onClick={() => handleMoodSelect('happy')}>
                      <img src={smile} alt="Happy" />
                      <span>Happy</span>
                    </div>
                    <div className={`mood-option ${feedbackForm.mood === 'sad' ? 'selected' : ''}`} onClick={() => handleMoodSelect('sad')}>
                      <img src={sad} alt="Sad" />
                      <span>Sad</span>
                    </div>
                    <div className={`mood-option ${feedbackForm.mood === 'angry' ? 'selected' : ''}`} onClick={() => handleMoodSelect('angry')}>
                      <img src={angry} alt="Angry" />
                      <span>Angry</span>
                    </div>
                    <div className={`mood-option ${feedbackForm.mood === 'neutral' ? 'selected' : ''}`} onClick={() => handleMoodSelect('neutral')}>
                      <img src={neutral} alt="Neutral" />
                      <span>Neutral</span>
                    </div>
                  </div>
                  <button type="submit">Send Feedback</button>
                </>
              )}
            </form>
          </div>
          <div className="sign-in">
            <form onSubmit={handleContactSubmit}>
              <h1>Contact Us</h1>
              {formSubmitted.contact ? (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <p>Message sent successfully!</p>
                </div>
              ) : (
                <>
                  <div className="contact-info">
                    <div className="contact-item">
                      <i className="fas fa-phone-alt"></i>
                      <span>+91 8368959173</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-envelope"></i>
                      <span>divyanshhdubey10@gmail.com</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={contactForm.name}
                    onChange={handleContactChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={contactForm.email}
                    onChange={handleContactChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Write your message"
                    required
                    value={contactForm.message}
                    onChange={handleContactChange}
                  ></textarea>
                  <button type="submit">Send Message</button>
                </>
              )}
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-left">
                <h1>Welcome</h1>
                <p>Feel free to message or call us. We will respond as soon as possible.</p>
                <button id="signIn" onClick={() => togglePanel('contact')}>
                  Contact Us
                </button>
              </div>
              <div className="overlay-right">
                <h1>Hello Friends!</h1>
                <p>We value your opinion. Please share your feedback with us!</p>
                <button id="signUp" onClick={() => togglePanel('feedback')}>
                  Send Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-map animate-on-scroll">
        <h3>Find Us</h3>
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.2228747739086!2d77.0696420753907!3d28.593089925686378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b3b92b596d3%3A0xccbc91d57d76996!2sHARSUKH%20APARTMENT%2C%204%2C%20Rd%20Number%20224%2C%20Sector%207%20Dwarka%2C%20Dwarka%2C%20Delhi%2C%20110075!5e0!3m2!1sen!2sin!4v1745755301689!5m2!1sen!2sin" 
            height="450" 
            frameBorder="0" 
            style={{ border: 0, width: '100%' }} 
            allowFullScreen="" 
            aria-hidden="false" 
            tabIndex="0"
            title="OrgoMart Location"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Contact;