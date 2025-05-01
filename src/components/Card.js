import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Card.css';
import Sizes from './CartComponents/Sizes';
import Products from './CartComponents/Products';
import Cart from './CartComponents/Cart';
import filterList from './CartComponents/filterList';
import Footer from './Footer.js';

const Card = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false); // Add state for cart visibility

  // Initialize products and cart
  useEffect(() => {
    try {
      // Load products
      const initialProducts = filterList([], null);
      setProducts(initialProducts);
      
      // Load cart from localStorage
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error initializing data:", err);
      setError("Failed to load products. Please refresh the page.");
      setIsLoading(false);
    }
  }, []);

  // Memoized cart total for performance
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // Memoized cart item count
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Size filter handler with useCallback for performance
  const setSize = useCallback((size) => {
    setSelectedSizes(prevSizes => {
      const sizes = [...prevSizes];
      
      if (sizes.includes(size)) {
        const index = sizes.indexOf(size);
        sizes.splice(index, 1);
      } else {
        sizes.push(size);
      }
      
      // Update products based on new sizes
      setProducts(filterList(sizes, 'size'));
      
      return sizes;
    });
  }, []);

  // Sort products with useCallback
  const sortProducts = useCallback((method) => {
    setProducts(prevProducts => {
      // Create a new array to avoid mutating state directly
      const sortedProducts = [...prevProducts];
      
      if (method === "Lowest to Highest") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (method === "Highest to Lowest") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      
      return sortedProducts;
    });
  }, []);

  // Add to cart with useCallback
  const addToCart = useCallback((item) => {
    setCart(prevCart => {
      const productList = [...prevCart];
      const existingItemIndex = productList.findIndex(product => product.id === item.id);
      
      if (existingItemIndex === -1) {
        // Item not in cart, add it with quantity 1
        productList.push({ ...item, quantity: 1 });
      } else {
        // Item already in cart, increment quantity
        productList[existingItemIndex].quantity++;
      }
      
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(productList));
      
      return productList;
    });
    
    // Open the cart automatically when an item is added
    setIsCartOpen(true);
  }, []);

  // Change quantity with useCallback
  const changeQuantity = useCallback((item, action) => {
    setCart(prevCart => {
      const productList = [...prevCart];
      const index = productList.findIndex(product => product.id === item.id);
      
      if (index !== -1) {
        if (action === '+') {
          productList[index].quantity++;
        } else {
          if (productList[index].quantity > 1) {
            productList[index].quantity--;
          } else {
            productList.splice(index, 1);
          }
        }
        
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(productList));
      }
      
      return productList;
    });
  }, []);

  // Toggle cart visibility
  const toggleCart = useCallback(() => {
    setIsCartOpen(prevState => !prevState);
  }, []);

  // Handle errors
  if (error) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'rgb(214, 240, 214)' }}>
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2" style={{ marginBottom: 0 }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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

            <ul className="navbar-nav mx-right">
              <li className="nav-item dropdown me-2">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
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
                <a className="nav-link" href="#">
                  <i className="fas fa-heart fa-lg" />
                </a>
              </li>
              <li className="nav-item me-4">
                <Cart
                  products={cart}
                  changeQuantity={changeQuantity}
                  isOpen={isCartOpen}
                  toggleCart={toggleCart}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="Card1">
        {isLoading ? (
          <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading products...</p>
          </div>
        ) : (
          <>
            <Sizes selectedSizes={selectedSizes} setSize={setSize} />
            <Products
              products={products}
              sortProducts={sortProducts}
              addToCart={addToCart}
            />
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Card;
