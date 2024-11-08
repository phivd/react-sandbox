import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WeatherPage from './WeatherPage';
import UserPage from './UserPage';
import "./App.css"

function App() {
  const [activeLink, setActiveLink] = useState<any>(null);

  const handleLinkClick = (link: string) => {
    sessionStorage.setItem('activePage', link);
    setActiveLink(link);
  };

  useEffect(() => {setActiveLink(sessionStorage.getItem('activePage'))});

  return (
    <BrowserRouter>
      <div className='App-header'>
        <nav>
          <Link to="/" 
          className={`App-link ${activeLink === 'WeatherPage' ? 'active' : ''}`}
          onClick={() => handleLinkClick('WeatherPage')}>Weather</Link>
          <Link to="/account" 
          className={`App-link ${activeLink === 'UserPage' ? 'active' : ''}`}
          onClick={() => handleLinkClick('UserPage')}>Account</Link>
        </nav>
      </div>
      <div className='App-body'>
        <Routes>
          <Route path="/" element={<WeatherPage/>} />
          <Route path="/account" element={<UserPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
