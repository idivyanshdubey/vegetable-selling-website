import React from 'react';
import './Testimonial.css';
import testimonial1 from '../assets/testimonial-1.png';
import customer2 from '../assets/customer2.jpg';
import quotes from '../assets/quotes.svg';

function Testimonial() {
  const handlePrevClick = () => {
    const prevButton = document.querySelector('#testimonialCarousel .carousel-control-prev');
    if (prevButton) {
      prevButton.click();
    }
  };

  const handleNextClick = () => {
    const nextButton = document.querySelector('#testimonialCarousel .carousel-control-next');
    if (nextButton) {
      nextButton.click();
    }
  };

  return (
    <section className="testimonial_section">
      <div className="container">
        <div className="row justify-content-center">
          <h2
            className="section-title text-center mb-3 my-5"
            style={{ color: 'rgb(2, 2, 100)', fontSize: '36px' }}
          >
            <b>Our Happy Customers</b>
          </h2>
          <div className="text-center pb-5" style={{ maxWidth: 400 }}>
            <p className="section-subtitle" style={{ color: 'rgb(2, 2, 100)' }}>
              Always give people more than what they expect to get. The well-satisfied customer is
              the well-satisfied we are as a team.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-md-10">
            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide-to={0}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                />
              </div>

              {/* Carousel Items */}
              <div className="carousel-inner">
                {/* Slide 1 */}
                <div className="carousel-item active">
                  <div className="d-sm-flex row">
                    <div className="profile-box col-sm-5">
                      <img src={testimonial1} className="img-fluid" alt="Customer 1" />
                    </div>
                    <div className="card col-sm-7">
                      <div className="desc-box">
                        <p className="fast-italic">
                          Not only was customer support very fast, but the design is very
                          professional. Will definitely look for new products in the future from
                          this author.
                        </p>
                        <div>
                          <h4>Customer 1</h4>
                          <p className="m-0 text-white">Happy Customers</p>
                        </div>
                        <img src={quotes} className="float-end" alt="Quotes" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="carousel-item">
                  <div className="d-sm-flex row">
                    <div className="profile-box col-sm-5">
                      <img src={customer2} className="img-fluid" alt="Customer 2" />
                    </div>
                    <div className="card col-sm-7">
                      <div className="desc-box">
                        <p className="fast-italic">
                          Not only was customer support very fast, but the design is very
                          professional. Will definitely look for new products in the future from
                          this author.
                        </p>
                        <div className="my-4">
                          <h4>Customer 2</h4>
                          <p className="m-0 text-white">Happy Customers</p>
                        </div>
                        <img src={quotes} className="float-end" alt="Quotes" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>

              {/* Custom Navigation Buttons */}
              <div className="testimonial-nav-buttons">
                <button className="testimonial-nav-btn prev" onClick={handlePrevClick}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <button className="testimonial-nav-btn next" onClick={handleNextClick}>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;