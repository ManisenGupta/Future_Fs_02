import React from 'react';
import { useWeather } from '../context/WeatherContext';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Favorites from './Favorites';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

const Dashboard: React.FC = () => {
  const { currentWeather, forecast, loading, error } = useWeather();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        {currentWeather && <CurrentWeather weather={currentWeather} />}
        {forecast && <Forecast forecast={forecast} />}
      </div>
      <div className="lg:col-span-1">
        <Favorites />
      </div>
    </div>
  );
};

export default Dashboard;