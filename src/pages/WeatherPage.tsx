import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, Marker, TileLayer, useMapEvents  } from "react-leaflet";
import "./WeatherPage.css"

const WeatherPage: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [map, setMap] = useState<any>(null);

  const API_KEY = '9ba451e35be80b7ba5f266f6cad6dbfa';
  const BASE_URL_DATA = 'https://api.openweathermap.org/data/2.5/weather?';
  const UNITS = 'metric';
  
  const getWeatherDataByCity = async (city: string) => {
    const response = await axios.get(`${BASE_URL_DATA}q=${city}&appid=${API_KEY}&units=${UNITS}`);
    return response.data;
  };

  const getWeatherDataByCoordinates = async (lat: string, lon: string) => {
    const response = await axios.get(`${BASE_URL_DATA}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`);
    return response.data;
  };
  
  function MapEvent () {
    useMapEvents({
      async click(e: any) {
        const data: any = await getWeatherDataByCoordinates(e.latlng.lat, e.latlng.lng)
        const map = await getMapByCoordinates(e.latlng.lat, e.latlng.lng);
        setWeatherData(data);
        setMap(map);
      }
    });
  
    return null;
  }
  
  const getMapByCoordinates = async (lat: string, lon: string) => {
    return (
      <MapContainer center={[Number(lat), Number(lon)]} zoom={13} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={[Number(lat), Number(lon)]}/>
        <MapEvent/>
      </MapContainer>
    );
  };

  const handleSearch = async () => {
    try {
      setMap(null);
      const data: any = await getWeatherDataByCity(city);
      const map = await getMapByCoordinates(data.coord.lat, data.coord.lon);
      setWeatherData(data);
      setMap(map);
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
        className="weather-search-bar" 
        value={city} 
        onKeyDown={enterKey} 
        onChange={(e) => setCity(e.target.value)}/>
        <button className="weather-search-button" onClick={handleSearch}>Get weather</button>
      </div>
      {weatherData && map && (
        <div>
          <p>Weather in {weatherData.name} ({weatherData.coord.lat} N, {weatherData.coord.lon} E):</p>
          <div className='weather-body'>
            <div className='weather-body-description'>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Sky: {weatherData.weather[0].description}</p>
              <p>Wind speed: {weatherData.wind.speed} meter/sec</p>
              <p>Wind direction: {weatherData.wind.deg}°</p>
            </div>
            <div className='weather-body-image'>
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}/>
            </div>
          </div>
          <div className='weather-map'>
            {map}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;