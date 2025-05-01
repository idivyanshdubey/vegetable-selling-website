import React from 'react';
import './Category.css';

function Category() {
  return (
    <div className="category_section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mb-5">
            <div className="card category-box category-box1">
              <div className="text-left">
                <h1 style={{ color: '#0f6012', fontWeight: 700 }}>Fruits</h1>
                <p style={{ color: '#0f6012', fontSize: '20px' }}>
                  Looking for fresh meals? Have fruits!
                </p>
                <a href="/card" className="btn category-button">
                  Go to category &gt;
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-5">
            <div className="card category-box category-box2">
              <div className="text-left">
                <h1 style={{ color: '#0f6012', fontWeight: 700 }}>Vegetables</h1>
                <p style={{ color: '#0f6012', fontSize: '20px' }}>
                  Veggies are perfectly healthy for you.
                </p>
                <a href="/card" className="btn category-button">
                  Go to category &gt;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;