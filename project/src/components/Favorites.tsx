import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Search, MapPin, Star } from 'lucide-react';

const Favorites: React.FC = () => {
  const { favorites, searchCity, loading } = useWeather();

  const handleSelectFavorite = (cityName: string) => {
    searchCity(cityName);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white h-full">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-900 p-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Star size={20} className="mr-2" />
          Favorite Locations
        </h2>
      </div>
      
      <div className="p-4">
        {favorites.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Star className="mx-auto mb-2 text-gray-400 dark:text-gray-600\" size={48} />
            <p>No favorite locations yet</p>
            <p className="text-sm mt-2">
              Use the <Star size={16} className="inline mb-0.5" /> icon to add cities to your favorites
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {favorites.map((city) => (
              <li key={city.id}>
                <button
                  onClick={() => handleSelectFavorite(city.name)}
                  disabled={loading}
                  className="w-full text-left px-4 py-3 rounded-lg flex items-center justify-between hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <MapPin size={18} className="text-blue-500 mr-2" />
                    <span>{city.name}, {city.country}</span>
                  </div>
                  <Search size={16} className="text-gray-400" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;