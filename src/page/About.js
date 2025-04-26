import React from 'react'
import './About.css';
import Footer from '../components/Footer.js';

const About = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2">
    <div className="container-fluid">
      <a className="navbar-brand" href="#"><span className="logo-text">OrgoMart<span className="logo-image"><i className="fas fa-seedling fa-sm" /></span></span></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav  mx-auto">
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
        <form className="d-flex mx-auto">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
        <ul className="navbar-nav  mx-right  ">
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
         
          <li className="nav-item me-2">
            <a className="nav-link" href="#">  <i className="fas fa-heart fa-lg" /></a>
          </li>
          <li className="nav-item me-2">
            <a className="nav-link" href="#"><div><i className="fas fa-shopping-cart fa-lg" /></div></a>
          </li>
        </ul>
       
      </div>
    </div>
  </nav>



      <section className="landing_about_section">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-xl-5 col-lg-6 col-sm-8">
          <div className="about-content">
            <h2>
              We aim at providing a platform where vegetable sellers meet buyers.
            </h2>
            <div className="about-details">
              <p className="fw-bold">
              Our prime motive is to make our customers satisfied our our service.
              </p>
              <p>Organic is a low-cost online general store that gets items crosswise over classifications like grocery, natural products and vegetables, excellence and health, family unit care, infant care, pet consideration, and meats and fish conveyed to your doorstep. Our goal is to give our clients the best shopping background as far as service, range, and value, which assembles a solid business and conveys long haul an incentive for our investors.

We have built up a novel start to finish working answer for online grocery retail dependent on restrictive innovation and IP, appropriate for working our very own business and those of our business accomplices.</p>
              <p>Appropriate from new Fruits and Vegetables, rice and lentils, spices and seasonings to packaged items, beverages, personal consideration items we have everything.

Browse a wide scope of choices in each class, solely handpicked to enable you to locate the best quality accessible at the least cost.</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section id="hero">
        <div class="container">
            
            <p>Welcome to our vegetable selling website. We are passionate about providing fresh and healthy produce to
                our customers.</p>
        </div>
    </section>

    <section id="mission">
        <div class="container">
            <h2>Our Mission</h2>
            <p>Our mission is to promote a healthy lifestyle by offering a wide range of organic vegetables that are
                locally sourced and free from harmful pesticides. We aim to educate and inspire people to make better
                food choices for themselves and the planet.</p>
        </div>
    </section>

    <section  id="reasons">
        <div class="container">
            <h2>Reasons to Choose Us</h2>
            <div class="reason">
                <i class="fas fa-leaf"></i>
                <h3>Fresh and Organic</h3>
                <p>We work directly with local farmers to ensure that our vegetables are fresh, organic, and of the
                    highest quality.</p>
            </div>
            <div class="reason">
                <i class="fas fa-truck"></i>
                <h3>Fast Delivery</h3>
                <p>We offer fast and reliable delivery services, ensuring that you receive your vegetables promptly and
                    in excellent condition.</p>
            </div>
            <div class="reason">
                <i class="fas fa-heart"></i>
                <h3>Customer Satisfaction</h3>
                <p>Your satisfaction is our top priority. We strive to provide exceptional customer service and address
                    any concerns promptly.</p>
            </div>
        </div>
      </section>

   <section>
  <div className="container">
    <p>If you have any questions, feedback, or inquiries, please feel free to reach out to us. We would love to
      hear from you!</p>
    <form id="contact-form">
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message" defaultValue={""} />
      <button type="submit">Send Message</button>
    </form>
  </div>
</section>

    
    <section id="contact">
      
      <p>If you have any questions or inquiries, please feel free to contact us:</p>
      <ul>
        <li>Email: info@ourvegetableshop.com</li>
        <li>Phone: +1 123-456-7890</li>
        <li>Address: 123 Main Street, dehradun,India</li>
      </ul>
      </section>
      <Footer/>
      
      </div>
  );
}

export default About;