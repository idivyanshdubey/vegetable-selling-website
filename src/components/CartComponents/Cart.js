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
      <div
        id="sidebar"
        className={classActive ? "active" : ""}
        style={{ backgroundColor: "white" }}
      >
        <div className="sidebar-content mt-3 me-4 ">
          <div className="toggle-btn" onClick={toggleButton}>
            <i
              className="fas fa-shopping-cart fa-lg"
              style={{ color: "rgb(205, 236, 205)" }}
            />
          </div>

          <div className="text-center">
            <h3>
              <i style={{ color: "green" }} className="fas fa-shopping-cart" />
              <span
                style={{
                  marginLeft: "10px",
                  color: "green",
                  fontWeight: "550",
                }}
              >
                Cart
              </span>
            </h3>
            <hr />
            <div className="cart-list" style={{ backgroundColor: "white" }}>
              {products.length === 0 ? (
                <div className="empty-cart">
                  <p>
                    There are no items in Cart, Please add items to checkout!!!
                  </p>
                </div>
              ) : (
                products.map((product) => {
                  return (
                    <CartItem
                      key={product.id}
                      product={product}
                      changeQuantity={changeQuantity}
                    />
                  );
                })
              )}
            </div>
            <hr />
            <div className="checkout-div">
              <div className="checkout">
                <div className="subtotal-div" style={{ color: "green" }}>
                  <p style={{ color: "green" }} className="subtotal">
                    SUBTOTAL
                  </p>
                  <p
                    style={{ color: "green", fontWeight: "600" }}
                    className="subtotal-price"
                  >
                    Rs {sum.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <a href="./checkout">
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "rgb(44 125 48)",
                        padding: 8,
                        paddingLeft: 11,
                        paddingRight: 11,
                        color: "white",
                        fontSize: "15px",
                        width: "400px",
                      }}
                    >
                      Proceed to Pay
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
