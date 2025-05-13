import React, { useState, useEffect } from "react";
import Footer from "../components/Footer.js";
import { useNavigate } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/myprofile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
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

          // Mock orders data (replace with actual API call in production)
          setOrders([
            {
              id: "1001",
              date: "2023-05-15",
              items: 3,
              total: 450,
              status: "Delivered",
            },
            {
              id: "1002",
              date: "2023-06-02",
              items: 5,
              total: 780,
              status: "Processing",
            },
            {
              id: "1003",
              date: "2023-06-20",
              items: 2,
              total: 320,
              status: "Shipped",
            },
          ]);
        } else {
          console.error("Failed to fetch user data");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5000/api/updateprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
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
                <li className="nav-item dropdown me-2">
                  <a
                    className="nav-link active dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user fa-lg" />
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item active"
                        onClick={() => navigate("/myprofile")}
                      >
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Orders
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Coupons
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item me-2">
                  <a className="nav-link" href="#">
                    <i className="fas fa-heart fa-lg" />
                  </a>
                </li>
                <li className="nav-item me-2">
                  <a className="nav-link" href="#">
                    <i className="fas fa-shopping-cart fa-lg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-sidebar">
                <div className="profile-image-container">
                  <div className="profile-image">
                    <i className="fas fa-user-circle fa-5x"></i>
                  </div>
                  <h4 className="mt-3">{userData.name}</h4>
                  <p className="text-muted">{userData.email}</p>
                </div>
                <div className="profile-menu">
                  <ul className="list-group">
                    <li className="list-group-item active">
                      <i className="fas fa-user me-2"></i> My Profile
                    </li>
                    <li className="list-group-item">
                      <i className="fas fa-shopping-bag me-2"></i> My Orders
                    </li>
                    <li className="list-group-item">
                      <i className="fas fa-heart me-2"></i> Wishlist
                    </li>
                    <li className="list-group-item">
                      <i className="fas fa-ticket-alt me-2"></i> Coupons
                    </li>
                    <li className="list-group-item">
                      <i className="fas fa-map-marker-alt me-2"></i> Addresses
                    </li>
                    <li
                      className="list-group-item"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="profile-content">
                <div className="card">
                  <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Personal Information</h5>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </button>
                  </div>
                  <div className="card-body">
                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label">
                            Delivery Address
                          </label>
                          <textarea
                            className="form-control"
                            id="address"
                            name="address"
                            rows="3"
                            value={userData.address}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">
                          Save Changes
                        </button>
                      </form>
                    ) : (
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <strong>Name:</strong> {userData.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {userData.email}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Phone:</strong>{" "}
                            {userData.phone || "Not provided"}
                          </p>
                          <p>
                            <strong>Address:</strong>{" "}
                            {userData.address || "Not provided"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card mt-4">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Recent Orders</h5>
                  </div>
                  <div className="card-body">
                    {orders.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Date</th>
                              <th>Items</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order) => (
                              <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.items}</td>
                                <td>₹{order.total}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      order.status === "Delivered"
                                        ? "bg-success"
                                        : order.status === "Processing"
                                        ? "bg-warning"
                                        : "bg-info"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td>
                                  <button className="btn btn-sm btn-outline-success">
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <i className="fas fa-shopping-bag fa-3x mb-3 text-muted"></i>
                        <p>You haven't placed any orders yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyProfile;
