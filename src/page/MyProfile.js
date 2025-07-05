import React, { useState, useEffect } from "react";
import Footer from "../components/Footer.js";
import { useNavigate } from "react-router-dom";
import PaymentMethods from "../components/PaymentMethods.js";
import "./MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/profile/myprofile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        // Fetch orders from backend
        const ordersResponse = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData);
        } else {
          console.error("Failed to fetch orders");
          setOrders([]);
        }

        // Load wishlist from localStorage
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist));
        } else {
          setWishlistItems([]);
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/profile/myprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsEditing(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        const errData = await response.json();
        alert(
          `Failed to update profile: ${
            errData.message || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePaymentSuccess = (message) => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    // Refresh orders after successful payment
    fetchUserData();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "success";
      case "shipped":
        return "info";
      case "processing":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "fas fa-check-circle";
      case "shipped":
        return "fas fa-shipping-fast";
      case "processing":
        return "fas fa-clock";
      default:
        return "fas fa-question-circle";
    }
  };

  // Wishlist management functions
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
      <div className="profile-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile-page">
        {/* Top Navbar */}
        <nav className="navbar navbar-light nav1">
          <div className="container-fluid d-flex align-items-center">
            <button
              className="mx-auto"
              id="changeButton"
              style={{
                background: "none",
                border: "none",
                color: "#26732a",
                cursor: "pointer",
              }}
            >
              <span id="locationText">
                Detect Location <i className="fas fa-map-marker-alt" />
              </span>
            </button>
            <div className="me-4">
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "#26732a",
                  padding: 2,
                  paddingLeft: 7,
                  paddingRight: 8,
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <div className="header_right me-4">
              <div className="navbar-text">
                {userData.name && (
                  <>
                    <span className="me-2">{userData.name}</span>
                    <span className="mx-2">|</span>
                  </>
                )}
                <span>
                  <i className="fas fa-phone-alt" />
                </span>
                <span className="phone_no">+91 8368959173</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Navbar */}
        <nav
          className="navbar navbar-expand-lg sticky-top navbar-dark nav2"
          style={{ marginBottom: 0 }}
        >
          <div className="container-fluid">
            <a
              className="navbar-brand"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <span className="logo-text">
                OrgoMart{" "}
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate("/")}>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate("/aboutUs")}>
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate("/card")}>
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate("/contact")}>
                    Contact
                  </a>
                </li>
              </ul>
              <form
                className="d-flex mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
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
              <ul className="navbar-nav ms-auto">
                <li className="nav-item me-2">
                  <a
                    className="nav-link active"
                    onClick={() => navigate("/myprofile")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-user fa-lg" />
                  </a>
                </li>
                <li className="nav-item me-2">
                  <a className="nav-link" onClick={() => navigate('/wishlist')} style={{ cursor: 'pointer' }}>
                    <i className="fas fa-heart fa-lg" />
                  </a>
                </li>
                <li className="nav-item me-2">
                  <a className="nav-link" onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
                    <i className="fas fa-shopping-cart fa-lg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            Profile updated successfully!
          </div>
        )}

        {/* Main Content */}
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-circle">
                <i className="fas fa-user"></i>
              </div>
              <div className="profile-info">
                <h2>{userData.name || "User"}</h2>
                <p>{userData.email}</p>
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-number">{orders.length}</span>
                    <span className="stat-label">Orders</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">
                      {orders.filter(order => order.status === "delivered").length}
                    </span>
                    <span className="stat-label">Delivered</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">
                      ₹{orders.reduce((total, order) => total + order.totals.total, 0)}
                    </span>
                    <span className="stat-label">Total Spent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-sidebar">
              <div className="sidebar-menu">
                <button
                  className={`menu-item ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="fas fa-user"></i>
                  <span>Profile</span>
                </button>
                <button
                  className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  <i className="fas fa-shopping-bag"></i>
                  <span>Orders</span>
                  <span className="badge">{orders.length}</span>
                </button>
                <button
                  className={`menu-item ${activeTab === "wishlist" ? "active" : ""}`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  <i className="fas fa-heart"></i>
                  <span>Wishlist</span>
                </button>
                <button
                  className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <i className="fas fa-cog"></i>
                  <span>Settings</span>
                </button>
                <button
                  className="menu-item logout"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>

            <div className="profile-main">
              {activeTab === "profile" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3>Profile Information</h3>
                    {!isEditing && (
                      <button
                        className="btn-edit"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="fas fa-edit"></i>
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="profile-details">
                      <div className="detail-card">
                        <div className="detail-item">
                          <div className="detail-icon">
                            <i className="fas fa-user"></i>
                          </div>
                          <div className="detail-content">
                            <label>Full Name</label>
                            <p>{userData.name || "Not provided"}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-icon">
                            <i className="fas fa-envelope"></i>
                          </div>
                          <div className="detail-content">
                            <label>Email Address</label>
                            <p>{userData.email || "Not provided"}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-icon">
                            <i className="fas fa-phone"></i>
                          </div>
                          <div className="detail-content">
                            <label>Phone Number</label>
                            <p>{userData.phone || "Not provided"}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-icon">
                            <i className="fas fa-map-marker-alt"></i>
                          </div>
                          <div className="detail-content">
                            <label>Address</label>
                            <p>{userData.address || "Not provided"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="edit-form">
                      <div className="form-group">
                        <label htmlFor="name">
                          <i className="fas fa-user"></i>
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">
                          <i className="fas fa-envelope"></i>
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">
                          <i className="fas fa-phone"></i>
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">
                          <i className="fas fa-map-marker-alt"></i>
                          Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="btn-save">
                          <i className="fas fa-save"></i>
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => setIsEditing(false)}
                        >
                          <i className="fas fa-times"></i>
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {activeTab === "orders" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3>Order History</h3>
                    <p>Track your recent orders and their status</p>
                  </div>
                  
                  {orders.length === 0 ? (
                    <div className="empty-state">
                      <i className="fas fa-shopping-bag"></i>
                      <h4>No Orders Yet</h4>
                      <p>Start shopping to see your orders here</p>
                      <button onClick={() => navigate("/card")} className="btn-shop">
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="orders-grid">
                      {orders.map((order) => (
                        <div key={order.orderId} className="order-card">
                          <div className="order-header">
                            <div className="order-id">
                              <span>Order #{order.orderId}</span>
                            </div>
                            <div className={`order-status ${getStatusColor(order.status)}`}>
                              <i className={getStatusIcon(order.status)}></i>
                              {order.status}
                            </div>
                          </div>
                          <div className="order-details">
                            <div className="order-date">
                              <i className="fas fa-calendar"></i>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            <div className="order-items">
                              <i className="fas fa-box"></i>
                              {order.items.length} items
                            </div>
                            <div className="order-total">
                              <i className="fas fa-rupee-sign"></i>
                              ₹{order.totals.total}
                            </div>
                          </div>
                          <div className="order-items-list">
                            <h6>Items:</h6>
                            <ul>
                              {order.items.map((item, index) => (
                                <li key={index}>
                                  {item.title} x{item.quantity} - ₹{item.price * item.quantity}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="order-shipping">
                            <h6>Shipping Address:</h6>
                            <p>
                              {order.shipping.firstName} {order.shipping.lastName}<br />
                              {order.shipping.address}<br />
                              {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                            </p>
                          </div>
                          <div className="order-actions">
                            <button className="btn-view">View Details</button>
                            <button className="btn-track">Track Order</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3>My Wishlist</h3>
                    <p>Your saved items for later</p>
                    {wishlistItems.length > 0 && (
                      <div className="wishlist-actions">
                        <button className="btn-add-all" onClick={addAllToCart}>
                          <i className="fas fa-shopping-cart"></i>
                          Add All to Cart
                        </button>
                        <button className="btn-clear" onClick={clearWishlist}>
                          <i className="fas fa-trash"></i>
                          Clear Wishlist
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {wishlistItems.length === 0 ? (
                    <div className="empty-state">
                      <i className="fas fa-heart"></i>
                      <h4>Wishlist is Empty</h4>
                      <p>Start adding items to your wishlist</p>
                      <button onClick={() => navigate("/card")} className="btn-shop">
                        Browse Products
                      </button>
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
                            <p className="item-category">{item.category}</p>
                            <div className="item-price">
                              <span className="price">₹{item.price}/kg</span>
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
              )}

              {activeTab === "settings" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3>Account Settings</h3>
                    <p>Manage your account preferences</p>
                  </div>
                  <div className="settings-grid">
                    <div className="setting-card">
                      <div className="setting-icon">
                        <i className="fas fa-bell"></i>
                      </div>
                      <div className="setting-content">
                        <h5>Notifications</h5>
                        <p>Manage your notification preferences</p>
                        <button className="btn-setting">Configure</button>
                      </div>
                    </div>
                    <div className="setting-card">
                      <div className="setting-icon">
                        <i className="fas fa-shield-alt"></i>
                      </div>
                      <div className="setting-content">
                        <h5>Privacy & Security</h5>
                        <p>Update your privacy settings</p>
                        <button className="btn-setting">Manage</button>
                      </div>
                    </div>
                    <div className="setting-card">
                      <div className="setting-icon">
                        <i className="fas fa-credit-card"></i>
                      </div>
                      <div className="setting-content">
                        <h5>Payment Methods</h5>
                        <p>Manage your payment options</p>
                        <button 
                          className="btn-setting"
                          onClick={() => setShowPaymentMethods(true)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                    <div className="setting-card">
                      <div className="setting-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="setting-content">
                        <h5>Delivery Addresses</h5>
                        <p>Manage your delivery addresses</p>
                        <button className="btn-setting">Manage</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Payment Methods Modal */}
      {showPaymentMethods && (
        <PaymentMethods
          onClose={() => setShowPaymentMethods(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default MyProfile;
