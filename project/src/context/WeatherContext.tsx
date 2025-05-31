import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWeatherByCity, getForecastByCity, getWeatherByCoords } from '../services/weatherService';
import { WeatherData, ForecastData, City } from '../types';

interface WeatherContextProps {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  favorites: City[];
  loading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
  addToFavorites: (city: City) => void;
  removeFromFavorites: (cityId: number) => void;
  getLocationWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextProps>({
  currentWeather: null,
  forecast: null,
  favorites: [],
  loading: false,
  error: null,
  searchCity: async () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  getLocationWeather: async () => {},
});

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [favorites, setFavorites] = useState<City[]>(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await getWeatherByCity(city);
      setCurrentWeather(weatherData);
      
      const forecastData = await getForecastByCity(city);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getLocationWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }
      
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const { latitude, longitude } = position.coords;
      const weatherData = await getWeatherByCoords(latitude, longitude);
      setCurrentWeather(weatherData);
      
      const forecastData = await getForecastByCity(weatherData.name);
      setForecast(forecastData);
    } catch (err) {
      setError('Unable to get your location. Please search for a city instead.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (city: City) => {
    if (!favorites.some(fav => fav.id === city.id)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFromFavorites = (cityId: number) => {
    setFavorites(favorites.filter(city => city.id !== cityId));
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        favorites,
        loading,
        error,
        searchCity,
        addToFavorites,
        removeFromFavorites,
        getLocationWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};