import axios from 'axios';
import { WeatherData, ForecastData } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error);
    throw error;
  }
};