import { WeatherData } from '../types';

const sampleWeatherData: WeatherData = {
  id: 2643743,
  name: "London",
  main: {
    temp: 15.7,
    feels_like: 15.2,
    temp_min: 14.1,
    temp_max: 17.2,
    pressure: 1012,
    humidity: 76
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d"
    }
  ],
  wind: {
    speed: 4.1,
    deg: 240
  },
  sys: {
    country: "GB",
    sunrise: 1661834187,
    sunset: 1661882248
  },
  dt: 1661862248,
  timezone: 3600,
  visibility: 10000,
  coord: {
    lat: 51.5074,
    lon: -0.1278
  }
};

export default sampleWeatherData;