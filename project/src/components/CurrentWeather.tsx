import React from 'react';
import { WeatherData } from '../types';
import { useWeather } from '../context/WeatherContext';
import { Star, Wind, Droplets, Eye, Thermometer, ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getWeatherIcon, formatDate, formatTime } from '../utils';

interface CurrentWeatherProps {
  weather: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useWeather();
  const { isDark } = useTheme();
  
  const isFavorite = favorites.some(city => city.id === weather.id);
  
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(weather.id);
    } else {
      addToFavorites({
        id: weather.id,
        name: weather.name,
        country: weather.sys.country
      });
    }
  };

  const weatherIcon = getWeatherIcon(weather.weather[0].icon);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white backdrop-blur-sm">
      <div className="relative bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-900 p-6 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">{weather.name}</h2>
            <span className="text-sm bg-black/20 px-2 py-0.5 rounded text-white">
              {weather.sys.country}
            </span>
          </div>
          <p className="text-white/90">{formatDate(weather.dt, weather.timezone)}</p>
        </div>
        <button
          onClick={handleFavoriteToggle}
          className={`p-2 rounded-full ${isFavorite ? 'text-yellow-300 hover:text-yellow-200' : 'text-white/70 hover:text-white'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star fill={isFavorite ? 'currentColor' : 'none'} size={24} />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={weatherIcon} 
              alt={weather.weather[0].description} 
              className="w-20 h-20"
            />
            <div>
              <div className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</div>
              <div className="text-gray-500 dark:text-gray-400 capitalize">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-start mt-4 md:mt-0">
            <div className="text-gray-500 dark:text-gray-400">
              Feels like: <span className="text-gray-700 dark:text-gray-300 font-medium">
                {Math.round(weather.main.feels_like)}°C
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <ArrowUp size={16} className="text-red-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {Math.round(weather.main.temp_max)}°C
              </span>
              <ArrowDown size={16} className="text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {Math.round(weather.main.temp_min)}°C
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
            <Wind className="text-blue-500" size={20} />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Wind</div>
              <div className="font-medium">{weather.wind.speed} m/s</div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
            <Droplets className="text-blue-500" size={20} />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Humidity</div>
              <div className="font-medium">{weather.main.humidity}%</div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
            <Eye className="text-blue-500" size={20} />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Visibility</div>
              <div className="font-medium">{(weather.visibility / 1000).toFixed(1)} km</div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
            <Thermometer className="text-blue-500" size={20} />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Pressure</div>
              <div className="font-medium">{weather.main.pressure} hPa</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col items-center">
            <span>Sunrise</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {formatTime(weather.sys.sunrise, weather.timezone)}
            </span>
          </div>
          <div className="w-full max-w-xs mx-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-400 rounded-full"
              style={{
                width: `${calculateDayProgress(weather.sys.sunrise, weather.sys.sunset, weather.dt, weather.timezone)}%`
              }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <span>Sunset</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {formatTime(weather.sys.sunset, weather.timezone)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function calculateDayProgress(sunrise: number, sunset: number, current: number, timezone: number): number {
  const now = current;
  if (now < sunrise) return 0;
  if (now > sunset) return 100;
  
  const dayLength = sunset - sunrise;
  const dayProgress = now - sunrise;
  return Math.round((dayProgress / dayLength) * 100);
}

export default CurrentWeather;