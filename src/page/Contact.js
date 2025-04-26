import React from 'react'
  import Header from '../components/Header.js';
 import bannerImg from '../assets/Banner-1.jpg';
 import smile from '../assets/smile (2).png';
 import sad from '../assets/sad (1).png';
 import angry from '../assets/angry (1).png';
 import neutral from '../assets/neutral.png';
 import Footer from '../components/Footer';
 import './Contact.css';
  const Contact = () => {
    const ContactFunc=()=>{

       // const signUpButton= document.getElementById('signUp');
       // const signInButton=document.getElementById('signIn');
        const main=document.getElementById('main');
        
       // signUpButton.addEventListener('click',() => {
         //   main.classList.add("right-panel-active");
       // });
       // signInButton.addEventListener('click',() => {
            main.classList.remove("right-panel-active");
       // });
        }
      
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
            <a className="nav-link" href="#">Products</a>
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


    
  
    <div >
      <h2 style={{fontWeight: 600, color: 'rgb(30, 87, 30)', lineHeight: '1.4', fontFamily: 'Barlow Condensed,sans-serif',marginBottom:0}}>Contact Us</h2>
      <h5 style={{color: 'rgb(134, 126, 126)',marginTop:0}}>Get In Touch</h5>
      </div>

  <section className="contact">
    <div className="container1" id="main">
      <div className="sign-up">
        <form action="#">
          <h1>Provide Feedback</h1>
          <input type="text" name="txt" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="feedback" placeholder="Your experience" required />
          <br />
          <h3>Choose one</h3>
          <div className="social-container">
            <div className="d-flex flex-row justify-content-evenly vertical-align-items">
              <div className="p-1"><img src={smile} width="40px" height="38px" /> </div>
              <div className="p-1"><img src={sad} width="40px" height="39px" /></div>
              <div className="p-1"> <img src={angry} width="39px" height="38px" /> </div>
              <div className="p-1"> <img src={neutral} width="38px" height="38px" /> </div> 
            </div>
          </div>
          <button>Send Feedback</button>
        </form>
      </div> 
      <div className="sign-in">
        <form action="#">
          <h1>Contact Us</h1>
          <div className="social-container">
            <i className="fas fa-phone-alt "><span style={{ fontFamily:'Barlow Condensed'}}> +91 8126263458</span></i><br />
            <i className="fas fa-envelope"><span style={{ fontFamily:'Barlow Condensed'}}> malvikakunw1212@gmail.com</span> </i> 
          </div>
          <input type="text" name="txt" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="message" placeholder="Write your message" required />
          <button>Send Message</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-left">
            <h1>Welcome </h1>
            <p>Feel free to message or call us . We will try to respond for the same at the earliest.</p>
            <button id="signIn"  onclick={ContactFunc}>Contact</button>
          </div>
          <div className="overlay-right">
            <h1>Hello Friends !!</h1>
            <p>Please click below to provide your feedback !!</p>
            <button id="signUp" onclick={ContactFunc}>Send Feedback</button>
          </div>
        </div>
      </div>
    </div> 
   <br/><br/>
  </section>
  <Footer/>
</div>

       
    
  );
 }
  export default Contact;

