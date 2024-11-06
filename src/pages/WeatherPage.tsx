import React, { useState } from 'react';
import WeatherService from '../services/WeatherService';
import "./WeatherPage.css"

const HomePage: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const data = await WeatherService.getWeatherByCity(city);
      setWeatherData(data);
    } catch {}
  };

  const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  };

  return (
    <div>
      <div className='weather-search'>
        <input type="text" 
        placeholder="Enter the city" 
        className="weather-search-input-field" 
        value={city} 
        onKeyDown={enterKey} 
        onChange={(e) => setCity(e.target.value)}/>
        <button className="weather-search-button" onClick={handleSearch}>Get weather</button>
      </div>
      {weatherData && (
        <div>
          <p>Weather in {weatherData.name}:</p>
          <div className='weather-body'>
            <p>Temperature: {weatherData.main.temp}°C</p>
            {/* TODO: autres informations meteo */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;