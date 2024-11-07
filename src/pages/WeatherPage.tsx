import React, { useState } from 'react';
import WeatherService from '../services/WeatherService';
import "./WeatherPage.css"

const HomePage: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherMap, setWeatherMap] = useState<any>(null);

  const handleSearch = async () => {
    try {
      setWeatherMap(null);
      const data: any = await WeatherService.getWeatherDataByCity(city);
      const map = await WeatherService.getWeatherMapByCoordinates(data.coord.lat, data.coord.lon);
      setWeatherData(data);
      setWeatherMap(map);
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
      {weatherData && weatherMap && (
        <div>
          <p>Weather in {weatherData.name} ({weatherData.coord.lat} N, {weatherData.coord.lon} E):</p>
          <div className='weather-body'>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Sky: {weatherData.weather[0].description}</p>
            <p>Wind speed: {weatherData.wind.speed} meter/sec</p>
            <p>Wind direction: {weatherData.wind.deg}°</p>
          </div>
          <p>{weatherMap}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;