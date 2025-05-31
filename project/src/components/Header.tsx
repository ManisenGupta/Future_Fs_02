import React, { useState } from 'react';
import { Sun, Moon, MapPin, Search } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchCity, getLocationWeather, loading } = useWeather();
  const { isDark, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchCity(query.trim());
      setQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Weather Dashboard
            </h1>
          </div>
          
          <div className="flex-1 md:max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={getLocationWeather}
              disabled={loading}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Get weather for current location"
              title="Get weather for current location"
            >
              <MapPin size={20} />
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;