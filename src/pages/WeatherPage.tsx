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

  return (
    <div>
      <input type="text" placeholder="Enter the city" value={city} onChange={(e) => setCity(e.target.value)}/>
      <button onClick={handleSearch}>Get weather</button>
      {weatherData && (
        <div>
          <p>Weather in {weatherData.name}:</p>
          <div className='Weather'>
            <p>Temperature: {weatherData.main.temp}°C</p>
            {/* TODO: autres informations meteo */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;