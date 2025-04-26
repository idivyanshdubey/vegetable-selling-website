import React from 'react';
import Footer from '../components/Footer.js';
import icon from '../assets/contacticon3.png';

function Signup() {
  return(
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
  <br></br>
  <div className="container  " style={{maxWidth:'600px',backgroundColor:'#c6e9c6'}}>
  <div className="text-center pt-3 pb-0">
    <img src={icon} />
  </div>
  <div class="container text-center pt-3 ">
    <div className="pb-1">Already have an account ?  <a href="#"style={{color:'black'}}> <b>&nbsp;Log In</b> </a></div>
   
            
</div>
    <form className="p-4">
    <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="name" className="form-control d-inline" id="name" />
   
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
    <div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>
  </div>
  <div class='text-center pt-2'>
  <button type="submit" class="btn  "style={{backgroundColor:'rgb(44 125 48)',color:'white',width:'200px'}}>Sign Up</button>
  </div>
  <div class='text-center pt-3'>
    ----------------------------  Or sign up with --------------------------
    <div class="pt-3"><i class="fab fa-facebook fa-lg"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <i class="fab fa-google fa-lg"></i></div>
    
  </div>
  </form>
 


</div>
<br></br>

<Footer/>
</div>
  );
}
export default Signup;
