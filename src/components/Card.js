
import React, {useState, useEffect} from 'react';

import './Card.css';
import Sizes from './CartComponents/Sizes';
import Products from './CartComponents/Products';
import Cart from './CartComponents/Cart';
import filterList from './CartComponents/filterList'
import Footer from './Footer.js'
const Card = () => {

  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(filterList([], null));
    if(JSON.parse(localStorage.getItem("cart"))) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [])

  const setSize = (size) => {
    const sizes = [...selectedSizes];
    
    if(sizes.includes(size)) {
      const index = sizes.indexOf(size);
      sizes.splice(index, 1);
    }
    else {
      sizes.push(size);
    }
    setSelectedSizes(sizes);
    setProducts(filterList(sizes, 'size'));
  }

  const sortProducts = (method) => {
    const array = products;

    if(method === "Lowest to Highest") {
        array.sort(function(a, b){
          return a.price-b.price
      })
    }
    else if(method === "Highest to Lowest") {
        array.sort(function(a, b){
          return b.price-a.price
      })
    }
    setProducts(array);
  }

  const addToCart = (item) => {
    const productList = [...cart];
    if(!productList.includes(item)) {
      productList.push(item);
    }
    const index = productList.indexOf(item);
    productList[index].quantity++;
    setCart(productList);
    localStorage.setItem("cart", JSON.stringify(productList));
  }

  const changeQuantity = (item, e) => {
    const productList = [...cart];
    const index = productList.indexOf(item);
    if(e === '+') {
      productList[index].quantity++;
    }
    else {
      if(productList[index].quantity > 1) {
        productList[index].quantity--;
      }
      else {
        productList.splice(index, 1);
      }
    } 
    setCart(productList);
    localStorage.setItem("cart", JSON.stringify(productList));
  }
  
  return (
    <div style={{backgroundColor:'rgb(214, 240, 214)'}}>
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
          <li className="nav-item me-5">
            <a className="nav-link" href="#">  <i className="fas fa-heart fa-lg" /></a>
          </li>
          <li className="nav-item me-4 ">
           <Cart products={cart} changeQuantity={changeQuantity} />

          </li>
         
        </ul>
      </div>
    </div>
  </nav>
    <div className="Card1">
        
      <Sizes selectedSizes={selectedSizes} setSize={setSize} />
      <Products products={products} sortProducts={sortProducts} addToCart={addToCart} />
     
    </div>
    <Footer/>
  </div>
  );
}

export default Card;
