import axios from 'axios';

const API_KEY = '9ba451e35be80b7ba5f266f6cad6dbfa';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const UNITS = 'metric';

const getWeatherByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}${city}&appid=${API_KEY}&units=${UNITS}`);
  return response.data;
};

export default {
  getWeatherByCity,
};