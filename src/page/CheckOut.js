
import React from 'react';
import StripeCheckout from "react-stripe-checkout"
import icon from '../assets/contacticon3.png';
 import Footer from '../components/Footer'   ;

function CheckOut(){
   const onToken=(token)=>{
        console.log(token);
   }
  
   
  return (


    <>


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
            <a className="nav-link" href="./contact">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./contact">Contact</a>
          </li>
        </ul>
       
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
          <li className="nav-item me-4">
          <a className="nav-link" href="#"><div ><i className="fas fa-shopping-cart fa-lg" /></div></a>
         </li>
        </ul>
      </div>
    </div>
  </nav>



  <div className="container mt-5 " style={{maxWidth:'600px'}}>
  
  <form class="row g-3">
  <div class="col-md-6">
    <label for="" class="form-label">First Name</label>
    <input type="text" class="form-control" id=""/>
  </div>
  <div class="col-md-6">
    <label for="" class="form-label">Last Name</label>
    <input type="text" class="form-control" id=""/>
  </div>
  
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4"/>
  </div>
  <div class="col-md-6">
    <label for="inputNumber" class="form-label">Phone Number</label>
    <input type="text" class="form-control" id="inputNumber"/>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity"/>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip"/>
  </div>
  <div class="col-12">
   
  </div>
  <div>
 
  </div>
  
</form>
 
<div class="col-12 text-center pb-4">
   <div>
           <StripeCheckout
            token={onToken}
            name="Enter the details"
            currency="Inr"
            amount="16000"
           stripekey="pk_test_51NhuPlSAwx3EEYDFKk7NWcYeVXUkHnzuKnCKRuM07Mwbt7jodu89fNFfeBiICrf9YEM7B7M1xqz5BEaaHf4QUzK000cZMyk4f1"/>
    </div>
  </div>

</div>
<br></br>
 
<Footer/>
  </>
  );
}
export default CheckOut;