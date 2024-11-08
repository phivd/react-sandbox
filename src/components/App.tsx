import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WeatherPage from './WeatherPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import "./App.css"

function App() {
  const [activeLink, setActiveLink] = useState('weather');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <BrowserRouter>
      <div className='App-header'>
        <nav>
          <Link to="/" 
          className={`App-link ${activeLink === 'weather' ? 'active' : ''}`}
          onClick={() => handleLinkClick('weather')}>Weather</Link>
          <Link to="/signup" 
          className={`App-link ${activeLink === 'signup' ? 'active' : ''}`}
          onClick={() => handleLinkClick('signup')}>Signup</Link>
          <Link to="/login" 
          className={`App-link ${activeLink === 'login' ? 'active' : ''}`}
          onClick={() => handleLinkClick('login')}>Login</Link>
        </nav>
      </div>
      <div className='App-body'>
        <Routes>
          <Route path="/" element={<WeatherPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
