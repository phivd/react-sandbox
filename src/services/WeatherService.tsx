import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const API_KEY = '9ba451e35be80b7ba5f266f6cad6dbfa';
const BASE_URL_DATA = 'https://api.openweathermap.org/data/2.5/weather?q=';
const UNITS = 'metric';

const getWeatherDataByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL_DATA}${city}&appid=${API_KEY}&units=${UNITS}`);
  return response.data;
};

const getWeatherMapByCoordinates= async (lat: string, lon: string) => {
  return (
    <MapContainer center={[Number(lat), Number(lon)]} zoom={13} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Marker position={[Number(lat), Number(lon)]}/>
    </MapContainer>
  );
};

export default {
  getWeatherDataByCity,
  getWeatherMapByCoordinates
};