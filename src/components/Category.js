import React from 'react';
import './Category.css';


function Category(){
  return(
  
  
  <div className="category_section" style={{paddingTop: '5rem'}}>
    <div className="container">
      <div className="row">
        <div className="container">
          <div className="row ">
            <div className="col-12 col-md-12 col-lg-6 mb-5">
              <div className="card category-box category-box1">
                <div className="text-left ">
                  <h1 style={{color: '#0f6012', fontWeight: 700}}>Fruits</h1>
                  <p style={{color: '#0f6012', fontSize: 20}}>
                    Looking for fresh meals , have fruits !!
                  </p>
                  <button className="button btn category-button"><a href="/card">Go to category {'>'}</a></button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-6 mb-5">
              <div className="card category-box category-box2">
                <div className="text-left ml-lg-2">
                  <h1 style={{color: '#0f6012', fontWeight: 700}}>Vegetables</h1>
                  <p style={{color: '#0f6012', fontSize: 20}}>Veges are perfectly healthy for you.</p>
                  <button className="button btn category-button"><a href="/card">Go to category {'>'}</a></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  );
 

  }  export default Category;

