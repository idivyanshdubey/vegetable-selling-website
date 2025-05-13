import React from "react";
import "./AboutWebsite.css";

function AboutWebsite() {
  return (
    <section className="landing_about_section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-6 col-sm-8">
            <div className="about-content">
              <h2>
                We aim at providing a platform where vegetable sellers meet
                buyers.
              </h2>
              <div className="about-details">
                <p className="fw-bold">
                  Our prime motive is to make our customers satisfied our our
                  service.
                </p>
                <p>
                  Organic is a low-cost online general store that gets items
                  crosswise over classifications like grocery, natural products
                  and vegetables, excellence and health, family unit care,
                  infant care, pet consideration, and meats and fish conveyed to
                  your doorstep. Our goal is to give our clients the best
                  shopping background as far as service, range, and value, which
                  assembles a solid business and conveys long haul an incentive
                  for our investors. We have built up a novel start to finish
                  working answer for online grocery retail dependent on
                  restrictive innovation and IP, appropriate for working our
                  very own business and those of our business accomplices.
                </p>
                <p>
                  Appropriate from new Fruits and Vegetables, rice and lentils,
                  spices and seasonings to packaged items, beverages, personal
                  consideration items we have everything. Browse a wide scope of
                  choices in each class, solely handpicked to enable you to
                  locate the best quality accessible at the least cost.
                </p>
                <a
                  href="/aboutUs"
                  className="btn main-btn"
                  style={{ padding: "0.4rem 1.5rem", fontSize: "0.9rem" }}
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutWebsite;
