import React from "react";
import "./HomeSlider.css";
import bannerImg from "../assets/Banner-1.jpg";
import basket from "../assets/basket.png";
import discount from "../assets/discount.png";
import tomato from "../assets/tomato.png";
import pepper from "../assets/pepper.png";
import apple from "../assets/apple.png";

const HomeSlider = () => {
  return (
    <div className="slider_section1" style={{ marginTop: 0 }}>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
              style={{ backgroundColor: "black" }}
            />
          ))}
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src={bannerImg}
              className="d-block h-100 w-100"
              alt="Organic Mart Banner"
            />
            <div className="carousel-caption">
              <h1
                style={{
                  fontWeight: 600,
                  color: "rgb(30, 87, 30)",
                  fontSize: "4rem",
                  lineHeight: "1.4",
                  fontFamily: "Barlow Condensed, sans-serif",
                }}
              >
                Organic Mart
              </h1>
              <h3 style={{ color: "rgb(134, 126, 126)" }}>
                Get fresh and natural food
              </h3>
              <p
                style={{
                  marginBottom: 40,
                  marginTop: 10,
                  color: "rgb(30, 87, 30)",
                  fontSize: 16,
                  fontWeight: 600,
                  maxWidth: "40rem",
                }}
              >
                All products on our website will reach you from your nearest
                vegetable markets.
              </p>
              <a href="/card" className="button main-btn">
                Become a seller
              </a>
              <a
                href="/card"
                className="button main-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Prices
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item c2">
            <div className="upper-half" />
            <div className="lower-half" />
            <div className="left-text">
              <p>Super</p>
            </div>
            <div className="left-text-2">
              <p>GROCERY</p>
            </div>
            <div className="left-text-3">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "2rem",
                  lineHeight: "1.4",
                  fontFamily: "cursive",
                  color: "white",
                  display: "inline-block",
                  padding: ".2rem 2.5rem",
                  clipPath:
                    "polygon(100% 0,93% 50%,100% 99%,0% 100%,7% 50%,0% 0%)",
                  background: "linear-gradient(to right,#792216,#e30a0a)",
                  marginTop: 40,
                }}
              >
                SALE
              </p>
            </div>
            <div className="left-text-4">
              <p>Buy your favorite products at reasonable prices.</p>
            </div>
            <img src={basket} alt="Basket" className="centered-image" />
            <img src={discount} alt="Discount" className="right-bottom-image" />
            <button
              className="button buy-button btn main-btn"
              style={{ padding: "0.6rem 1.4rem" }}
            >
              Buy Products
            </button>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item c3">
            <div className="carousel-caption">
              <h4 style={{ color: "rgb(134, 126, 126)" }}>
                Fresh And Organic Bell Peppers
              </h4>
              <h1
                style={{
                  fontWeight: 600,
                  color: "rgb(30, 87, 30)",
                  fontSize: "2.8rem",
                  lineHeight: "1.4",
                  fontFamily: "Barlow Condensed, sans-serif",
                  marginBottom: 30,
                }}
              >
                Upto 50% Off
              </h1>
              <a href="/card" className="button btn main-btn carbtn">
                Shop Now
              </a>
            </div>
            <div className="x">
              <img
                src={pepper}
                alt="Bell Peppers"
                height="450px"
                width="430px"
              />
            </div>
          </div>

          {/* Slide 4 */}
          <div className="carousel-item c3">
            <div className="carousel-caption">
              <h4 style={{ color: "rgb(134, 126, 126)" }}>
                Fresh And Organic Apples
              </h4>
              <h1
                style={{
                  fontWeight: 600,
                  color: "rgb(30, 87, 30)",
                  fontSize: "2.8rem",
                  lineHeight: "1.4",
                  fontFamily: "Barlow Condensed, sans-serif",
                  marginBottom: 30,
                }}
              >
                Upto 30% Off
              </h1>
              <a href="/card" className="button btn main-btn carbtn">
                Shop Now
              </a>
            </div>
            <div className="x">
              <img src={apple} alt="Apples" height="450px" width="430px" />
            </div>
          </div>

          {/* Slide 5 */}
          <div className="carousel-item c3">
            <div className="row">
              <div
                className="col-12 col-lg-6 text-center align-self-center"
                style={{ marginTop: 40 }}
              >
                <h4 style={{ color: "rgb(134, 126, 126)" }}>
                  Fresh And Organic Tomatoes
                </h4>
                <h1
                  style={{
                    fontWeight: 600,
                    color: "rgb(30, 87, 30)",
                    fontSize: "2.8rem",
                    lineHeight: "1.4",
                    fontFamily: "Barlow Condensed, sans-serif",
                    marginBottom: 30,
                  }}
                >
                  Upto 35% Off
                </h1>
                <a href="/card" className="button btn main-btn carbtn">
                  Shop Now
                </a>
              </div>
              <div className="col-12 col-lg-6 align-self-center">
                <img
                  src={tomato}
                  alt="Tomatoes"
                  height="360px"
                  width="430px"
                  style={{ marginTop: 60, marginLeft: 40 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
            style={{ backgroundColor: "black" }}
          />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            style={{ backgroundColor: "black" }}
          />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default HomeSlider;
