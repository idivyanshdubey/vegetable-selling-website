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
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/myprofile", {
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

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/myprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
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
    localStorage.removeItem("token"); // ✅ Clear token on logout
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
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
                {/* Show user name only here */}
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
                        {userData.name
                          ? `My Profile (${userData.name})`
                          : "My Profile"}
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
                      <i className="fas fa-cog me-2"></i> Settings
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
              <h2>My Profile</h2>
              {!isEditing ? (
                <div className="profile-details">
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userData.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {userData.address}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={userData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={userData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      className="form-control"
                      value={userData.address}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  <button type="submit" className="btn btn-success me-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}

              {/* Orders Section */}
              <div className="mt-5">
                <h3>My Orders</h3>
                {orders.length === 0 ? (
                  <p>No orders found.</p>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.date}</td>
                          <td>{order.items}</td>
                          <td>₹{order.total}</td>
                          <td>{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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
