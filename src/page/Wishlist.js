import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = (itemId) => {
    try {
      const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
      setWishlistItems(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      // Update wishlist count in header
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const addToCart = (item) => {
    try {
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      
      // Check if item already exists in cart
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...item,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count in header
      window.dispatchEvent(new Event('storage'));
      
      // Show success message
      alert(`${item.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart');
    }
  };

  const addAllToCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      
      wishlistItems.forEach(item => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            ...item,
            quantity: 1
          });
        }
      });
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      
      alert('All items added to cart!');
    } catch (error) {
      console.error('Error adding all to cart:', error);
      alert('Error adding items to cart');
    }
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      setWishlistItems([]);
      localStorage.removeItem('wishlist');
      window.dispatchEvent(new Event('storage'));
    }
  };

  if (isLoading) {
    return (
      <div className="wishlist-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="wishlist-page">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2" style={{ marginBottom: 0 }}>
          <div className="container-fluid">
            <a className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <span className="logo-text">
                OrgoMart
                <span className="logo-image">
                  <i className="fas fa-seedling fa-sm" />
                </span>
              </span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate('/aboutUs')} style={{ cursor: 'pointer' }}>About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate('/card')} style={{ cursor: 'pointer' }}>Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Wishlist Content */}
        <div className="wishlist-container">
          <div className="wishlist-header">
            <div className="wishlist-title">
              <h1><i className="fas fa-heart"></i> My Wishlist</h1>
              <p>Your saved items for later</p>
            </div>
            <div className="wishlist-actions">
              {wishlistItems.length > 0 && (
                <>
                  <button className="btn-add-all" onClick={addAllToCart}>
                    <i className="fas fa-shopping-cart"></i>
                    Add All to Cart
                  </button>
                  <button className="btn-clear" onClick={clearWishlist}>
                    <i className="fas fa-trash"></i>
                    Clear Wishlist
                  </button>
                </>
              )}
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-content">
                <i className="fas fa-heart-broken"></i>
                <h3>Your wishlist is empty</h3>
                <p>Start adding items to your wishlist to see them here</p>
                <button onClick={() => navigate('/card')} className="btn-shop">
                  <i className="fas fa-shopping-bag"></i>
                  Browse Products
                </button>
              </div>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <div className="item-image">
                    <img 
                      src={item.image ? require(`../assets/${item.image}`) : item.url}
                      alt={item.title} 
                    />
                    <div className="item-overlay">
                      <button 
                        className="btn-remove"
                        onClick={() => removeFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="item-details">
                    <h4 className="item-title">{item.title}</h4>
                    <p className="item-category">{item.size}</p>
                    <div className="item-price">
                      <span className="price">₹{item.price}</span>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="btn-add-cart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fas fa-shopping-cart"></i>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Wishlist; 