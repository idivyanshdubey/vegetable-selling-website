import React from "react";
import Header from './components/Header.js';
import HomeSlider from './components/HomeSlider.js';
import Features from './components/Features.js';
import Footer from'./components/Footer.js';
import Category from'./components/Category.js';
import AboutWebsite from'./components/AboutWebsite.js';
import Testimonial from'./components/Testimonial.js';
import BestProduct from'./components/BestProduct.js';
import Card from'./components/Card.js';
import './components/Header.css';
import Find from './components/Find.js';

function Home(){
  return (
    <>
     
     <div>
  <nav className="navbar navbar-light  nav1">
    <div className="container-fluid d-flex align items center">
      <button className="mx-auto" id="changeButton" onClick={Find} ><span id="locationText">Detect Location   <i className="fas fa-map-marker-alt" /></span> </button>
      <div className="me-4 ">
        <button type="button" className="btn " style={{backgroundColor:'#26732a',padding:2,paddingLeft:7,paddingRight:8}}><a href="./signup">Sign up</a></button>
      </div>
      <div className="header_right me-4">
        <div className="navbar-text">
          <span><i className="fas fa-phone-alt " /></span>
          <span className="phone_no">+91 8126263458</span>
        </div>
      </div>
    </div>
  </nav>
  <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2" style={{marginBottom:0}}>
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
            <a className="nav-link" href="#"><i className="fas fa-shopping-cart fa-lg" /></a>
          </li>
        </ul>
      </div>
    </div>
  
  </nav>


  
  <HomeSlider/>

 
     <Features/>
     <Category/>
    < BestProduct/>
    
     <Testimonial/>
     <AboutWebsite/>
    
      <Footer/>
      </div>
    </>
  );
}
export default Home;