import React, { useMemo } from 'react';
import { ForecastData, ForecastItem } from '../types';
import { Calendar, Clock, Thermometer } from 'lucide-react';
import { getWeatherIcon, formatDate } from '../utils';

interface ForecastProps {
  forecast: ForecastData;
}

interface GroupedForecast {
  [key: string]: ForecastItem[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  // Group forecast items by day
  const groupedForecast = useMemo(() => {
    const grouped: GroupedForecast = {};
    
    forecast.list.forEach(item => {
      // Extract date part only from the forecast datetime
      const date = item.dt_txt.split(' ')[0];
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      
      grouped[date].push(item);
    });
    
    return grouped;
  }, [forecast]);

  // Get day name from date
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    
    // Reset time part for comparison
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear()) {
      return 'Today';
    } else if (date.getDate() === tomorrow.getDate() && 
               date.getMonth() === tomorrow.getMonth() && 
               date.getFullYear() === tomorrow.getFullYear()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  // Format time from datetime string
  const formatTimeFromDtTxt = (dtTxt: string) => {
    const time = dtTxt.split(' ')[1].substring(0, 5);
    const hour = parseInt(time.split(':')[0], 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:00 ${period}`;
  };

  // Calculate min and max temps for a day
  const getDailyMinMax = (items: ForecastItem[]) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    
    items.forEach(item => {
      min = Math.min(min, item.main.temp);
      max = Math.max(max, item.main.temp);
    });
    
    return { min: Math.round(min), max: Math.round(max) };
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white backdrop-blur-sm">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-900 p-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Calendar size={20} className="mr-2" />
          5-Day Forecast
        </h2>
      </div>
      
      <div className="p-4">
        {Object.keys(groupedForecast).map((date, index) => {
          const dayForecasts = groupedForecast[date];
          const { min, max } = getDailyMinMax(dayForecasts);
          
          return (
            <div key={date} className={`${index > 0 ? 'mt-6 pt-6 border-t border-gray-200 dark:border-gray-700' : ''}`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold flex items-center text-gray-800 dark:text-white">
                  {getDayName(date)}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 font-normal">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <Thermometer size={16} className="text-blue-500" />
                  <span className="text-blue-600 dark:text-blue-400">{min}°</span>
                  <span className="text-gray-400 dark:text-gray-500">|</span>
                  <span className="text-red-500">{max}°</span>
                </div>
              </div>
              
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-4 min-w-max">
                  {dayForecasts.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex-shrink-0 w-24 bg-blue-50 dark:bg-gray-700 rounded-lg p-3 transition-transform hover:scale-105"
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-2">
                        <Clock size={12} className="mr-1" />
                        {formatTimeFromDtTxt(item.dt_txt)}
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <img 
                          src={getWeatherIcon(item.weather[0].icon)} 
                          alt={item.weather[0].description}
                          className="w-10 h-10 my-1"
                        />
                        <div className="font-medium text-lg">{Math.round(item.main.temp)}°</div>
                        <div className="text-xs text-center text-gray-500 dark:text-gray-400 capitalize">
                          {item.weather[0].description}
                        </div>
                      </div>
                      
                      <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div>
                          <div>{item.wind.speed} m/s</div>
                          <div>{item.main.humidity}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;