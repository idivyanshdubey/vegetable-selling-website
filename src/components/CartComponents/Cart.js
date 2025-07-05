import React, { Fragment, useState, useEffect } from "react";
import CartItem from "./CartItem";

const Cart = ({ products, changeQuantity, isOpen, toggleCart }) => {
  // Use isOpen prop if provided, otherwise use local state
  const [classActive, setClassActive] = useState(false);
  const [sum, setSum] = useState(0);

  // Update classActive when isOpen prop changes
  useEffect(() => {
    if (isOpen !== undefined) {
      setClassActive(isOpen);
    }
  }, [isOpen]);

  const toggleButton = () => {
    // If toggleCart prop is provided, use it, otherwise use local state
    if (toggleCart) {
      toggleCart();
    } else {
      setClassActive(!classActive);
    }
  };

  useEffect(() => {
    let total = 0;
    for (var i = 0; i < products.length; i++) {
      total += products[i].price * products[i].quantity;
    }
    setSum(total);
  }, [products]);

  const checkout = () => {
    alert(`Checkout - Subtotal: Rs ${sum.toFixed(2)}`);
  };

  return (
    <>
      {/* Cart Toggle Button for Navbar */}
      <div className="toggle-btn" onClick={toggleButton}>
        <i
          className="fas fa-shopping-cart fa-lg"
          style={{ color: "white" }}
        />
        {products.length > 0 && (
          <span className="cart-count" style={{
            position: 'absolute',
            top: '-3px',
            right: '-3px',
            background: '#ff4757',
            color: 'white',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>
            {products.length}
          </span>
        )}
      </div>

      {/* Cart Sidebar */}
      <div
        id="sidebar"
        className={classActive ? "active" : ""}
        style={{ backgroundColor: "white" }}
      >
        {/* Floating Close Button */}
        {classActive && (
          <button 
            onClick={toggleButton}
            style={{
              position: 'fixed',
              top: '25px',
              right: '520px',
              background: 'linear-gradient(135deg, #ff4757, #ff3742)',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
              boxShadow: '0 4px 20px rgba(255, 71, 87, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'slideInRight 0.5s ease-out'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.15) rotate(90deg)';
              e.target.style.boxShadow = '0 6px 25px rgba(255, 71, 87, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1) rotate(0deg)';
              e.target.style.boxShadow = '0 4px 20px rgba(255, 71, 87, 0.4)';
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
        <div className="sidebar-content mt-3 me-4 ">
          <div className="text-center">
            <h3 style={{ 
              margin: 0, 
              padding: '15px 0',
              background: 'linear-gradient(135deg, #2c7d30, #4caf50)',
              color: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 15px rgba(44, 125, 48, 0.3)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }}>
              <i className="fas fa-shopping-cart" style={{ marginRight: "10px" }} />
              <span style={{ fontWeight: "600" }}>
                Shopping Cart
              </span>
            </h3>
            <div className="cart-list" style={{ 
              backgroundColor: "white",
              borderRadius: '12px',
              margin: '20px 0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              overflow: 'hidden'
            }}>
              {products.length === 0 ? (
                <div className="empty-cart" style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: '#666'
                }}>
                  <i className="fas fa-shopping-cart" style={{
                    fontSize: '48px',
                    color: '#ddd',
                    marginBottom: '15px',
                    display: 'block'
                  }}></i>
                  <p style={{
                    fontSize: '16px',
                    margin: '0',
                    lineHeight: '1.5'
                  }}>
                    Your cart is empty
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#999',
                    margin: '10px 0 0 0'
                  }}>
                    Add some products to get started!
                  </p>
                </div>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {products.map((product, index) => {
                    return (
                      <div key={product.id} style={{
                        animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`
                      }}>
                        <CartItem
                          product={product}
                          changeQuantity={changeQuantity}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="checkout-div" style={{
              background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              borderRadius: '12px',
              padding: '20px',
              margin: '20px 0',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div className="checkout">
                <div className="subtotal-div" style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 0',
                  borderBottom: '2px solid #e9ecef',
                  marginBottom: '20px'
                }}>
                  <p style={{ 
                    color: "#2c7d30", 
                    fontWeight: "600",
                    fontSize: '18px',
                    margin: 0
                  }} className="subtotal">
                    Total Amount
                  </p>
                  <p
                    style={{ 
                      color: "#2c7d30", 
                      fontWeight: "700",
                      fontSize: '24px',
                      margin: 0
                    }}
                    className="subtotal-price"
                  >
                    ₹{sum.toFixed(2)}
                  </p>
                </div>
                <div className="text-center" style={{ position: 'relative' }}>
                  <a href="./checkout" style={{ textDecoration: 'none', display: 'block' }}>
                    <button
                      className="btn"
                      style={{
                        background: 'linear-gradient(135deg, #2c7d30, #4caf50)',
                        padding: '15px 30px',
                        color: "white",
                        fontSize: "16px",
                        fontWeight: '600',
                        width: "100%",
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 15px rgba(44, 125, 48, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(44, 125, 48, 0.5)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(44, 125, 48, 0.3)';
                      }}
                    >
                      <i className="fas fa-credit-card" style={{ marginRight: '8px' }}></i>
                      Proceed to Checkout
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
