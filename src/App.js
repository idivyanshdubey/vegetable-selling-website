import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home.js';
import AboutUs from './page/About.js';
import Contact from './page/Contact.js';
import Signup from './page/Signup.js';
import Login from './page/Login.js'; // Import Login component
import Card from './components/Card.js';
import CheckOut from './page/CheckOut.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} /> {/* Add Login route */}
        <Route path="card" element={<Card />} />
        <Route path="checkout" element={<CheckOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;