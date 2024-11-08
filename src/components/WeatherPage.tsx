import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, Marker, TileLayer, useMapEvents  } from "react-leaflet";
import "./WeatherPage.css"

const WeatherPage: React.FC = () => {
  sessionStorage.setItem('activePage', "WeatherPage");

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
    lon = String(Number(lon) % 360);
    if (Number(lon) < -180) {
      lon = String(Number(lon) + 360);
    } else if (Number(lon) > 180) {
      lon = String(Number(lon) - 360);
    }
    const response = await axios.get(`${BASE_URL_DATA}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`);
    return response.data;
  };
  
  function MapEvent () {
    useMapEvents({
      async click(e: any) {
        sessionStorage.setItem('cityLat', e.latlng.lat)
        sessionStorage.setItem('cityLon', e.latlng.lng)
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
      const city = sessionStorage.getItem('city');
      const cityLat = sessionStorage.getItem('cityLat');
      const cityLon = sessionStorage.getItem('cityLon');
      var data: any;
      if (cityLat && cityLon) {
        data = await getWeatherDataByCoordinates(cityLat, cityLon)
      } else if (city) {
        data = await getWeatherDataByCity(city);
      }
      setMap(null);
      const map = await getMapByCoordinates(data.coord.lat, data.coord.lon);
      setWeatherData(data);
      setMap(map);
    } catch {}
  };

  const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sessionStorage.removeItem('cityLat');
      sessionStorage.removeItem('cityLon');
      setMap(null);
      handleSearch()
    }
  };

  // Search last city in case of page reload
  useEffect(() => {handleSearch()}, []);

  return (
    <div>
      <div className='weather-search'>
        <input type="text" 
        placeholder="Enter the city" 
        className="weather-search-bar" 
        onKeyDown={enterKey} 
        onChange={(e) => sessionStorage.setItem('city', e.target.value)}/>
      </div>
      {weatherData && map && (
        <div>
          <p><center>Weather in {weatherData.name} ({weatherData.coord.lat} N, {weatherData.coord.lon} E):</center></p>
          <center>
          <div className='weather-body'>
            <div className='weather-body-description'>
              <table style={{minWidth:'40vh'}}>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <td>Temperature:</td>
                  <td><i>{weatherData.main.temp}°C</i></td>
                </tr>
                <tr>
                  <td>Sky:</td>
                  <td><i>{weatherData.weather[0].description}</i></td>
                </tr>
                <tr>
                  <td>Wind speed:</td>
                  <td><i>{weatherData.wind.speed} km/h</i></td>
                </tr>
                <tr>
                  <td>Wind direction:</td>
                  <td><i>{weatherData.wind.deg}°</i></td>
                </tr>
              </table>
            </div>
            <div className='weather-body-image'>
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}/>
            </div>
          </div>
          <div className='weather-map'>
            <p><i style={{fontSize: 'small'}}>Click on the map to change the weather location.</i>{map}</p>
          </div>
          </center>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;