import React from 'react';
import './HomeSlider.css';
import bannerImg from '../assets/Banner-1.jpg';
import basket from '../assets/basket.png';
import discount from '../assets/discount.png';
import tomato from '../assets/./tomato.png';
import pepper from '../assets/pepper.png';
import apple from '../assets/apple.png';
const HomeSlider=()=>
{
  return (
   
  
  <div className="slider_section1"style={{marginTop:0}}>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{objectFit:'contain !important'}}>


      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" style={{backgroundColor: 'black'}} />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} aria-label="Slide 4" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={4} aria-label="Slide 5" />
      </div>


      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={bannerImg} className="d-block h-100 w-100" alt="..." />
          <div className="carousel-caption ">
            <h1 style={{fontWeight: 600, color: 'rgb(30, 87, 30)', fontSize: '4rem', lineHeight: '1.4', fontFamily: 'Barlow Condensed,sans-serif'}}>Organic Mart</h1>
            <h3 style={{color: 'rgb(134, 126, 126)'}}>Get fresh and natural food</h3>
            <p style={{marginBottom: 40, marginTop: 10, color: 'rgb(30, 87, 30)', fontSize: 16, fontWeight: 600, maxWidth: '40rem'}}>All products on our website will reach you from your nearest vegetable markets.</p>
            <a href="#" className="button main-btn">Become a seller</a>
            <a href="http://localhost:8501/" className="button main-btn" target='_blank'>Check Prices</a>
          </div>
        </div>



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
            <p style={{fontWeight: 600, fontSize: '2rem', lineHeight: '1.4', fontFamily: 'cursive', color: 'white', display: 'inline-block', padding: '.2rem 2.5rem', clipPath: 'polygon(100% 0,93% 50%,100% 99%,0% 100%,7% 50%,0% 0%)', background: 'linear-gradient(to right,#792216,#e30a0a)', marginTop: 40}}>SALE</p>
          </div>
          <div className="left-text-4">
            <p>Buy your favuorite products at reasonable prices.</p>
          </div>
          <img src={basket} alt="Centered Image" className="centered-image" />
          <img src={discount} alt="Right Bottom Image" className="right-bottom-image" />
          <button className="button buy-button btn main-btn" style={{padding: '0.6rem 1.4rem'}}>Buy Products </button>
        </div>




        <div className="carousel-item c3">
          <div className="carousel-caption ">
            <h4 style={{color: 'rgb(134, 126, 126)'}}>Fresh And Organic Bell Peppers</h4>
            <h1 style={{fontWeight: 600, color: 'rgb(30, 87, 30)', fontSize: '2.8rem', lineHeight: '1.4', fontFamily: 'Barlow Condensed,sans-serif', marginBottom: 30}}>Upto 50% Off</h1>
            <a href="#" className="button btn main-btn carbtn ">Shop Now</a>
          </div>
          <div className="x">
            <img src={pepper} height="450px" width="430px" />
          </div>
        </div>



        <div className="carousel-item c3">
          <div className="carousel-caption ">
            <h4 style={{color: 'rgb(134, 126, 126)'}}>Fresh And Organic Apples</h4>
            <h1 style={{fontWeight: 600, color: 'rgb(30, 87, 30)', fontSize: '2.8rem', lineHeight: '1.4', fontFamily: 'Barlow Condensed,sans-serif', marginBottom: 30}}>Upto 30% Off</h1>
            <a href="#" className="button btn main-btn carbtn ">Shop Now</a>
          </div>
          <div className="x">
            <img src={apple} height="450px" width="430px" />
          </div>
        </div>



        
        <div className="carousel-item c3">
          <div className="row">
            <div className="col-12 col-lg-6 text-center align-self-center"style={{marginTop: 40}}>
              <h4 style={{color: 'rgb(134, 126, 126)'}}>Fresh And Organic Tomatoes</h4>
              <h1 style={{fontWeight: 600, color: 'rgb(30, 87, 30)', fontSize: '2.8rem', lineHeight: '1.4', fontFamily: 'Barlow Condensed,sans-serif', marginBottom: 30}}>Upto 35% Off</h1>
              <a href="#" className="button btn main-btn carbtn ">Shop Now</a>
            </div>
            <div className="col-12 col-lg-6 align-self-center">
              <img src={tomato} height="360px" width="430px" style={{marginTop: 60 , marginLeft:40}} />
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" style={{backgroundColor: 'black'}} />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" style={{backgroundColor: 'black'}} />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  );
 }

  export default HomeSlider;
