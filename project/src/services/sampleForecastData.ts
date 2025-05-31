import { ForecastData } from '../types';

const sampleForecastData: ForecastData = {
  list: [
    {
      dt: 1661868000,
      main: {
        temp: 16.2,
        feels_like: 15.8,
        temp_min: 15.0,
        temp_max: 16.2,
        pressure: 1011,
        humidity: 74
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d"
        }
      ],
      wind: {
        speed: 3.9,
        deg: 230
      },
      dt_txt: "2023-10-08 12:00:00"
    },
    {
      dt: 1661878800,
      main: {
        temp: 17.8,
        feels_like: 17.3,
        temp_min: 17.0,
        temp_max: 17.8,
        pressure: 1010,
        humidity: 68
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }
      ],
      wind: {
        speed: 3.5,
        deg: 225
      },
      dt_txt: "2023-10-08 15:00:00"
    },
    {
      dt: 1661889600,
      main: {
        temp: 15.9,
        feels_like: 15.4,
        temp_min: 14.9,
        temp_max: 15.9,
        pressure: 1010,
        humidity: 76
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02n"
        }
      ],
      wind: {
        speed: 2.9,
        deg: 215
      },
      dt_txt: "2023-10-08 18:00:00"
    },
    {
      dt: 1661900400,
      main: {
        temp: 14.1,
        feels_like: 13.7,
        temp_min: 13.5,
        temp_max: 14.1,
        pressure: 1009,
        humidity: 83
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10n"
        }
      ],
      wind: {
        speed: 2.5,
        deg: 200
      },
      dt_txt: "2023-10-08 21:00:00"
    },
    {
      dt: 1661911200,
      main: {
        temp: 13.5,
        feels_like: 13.1,
        temp_min: 13.0,
        temp_max: 13.5,
        pressure: 1008,
        humidity: 87
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10n"
        }
      ],
      wind: {
        speed: 2.3,
        deg: 195
      },
      dt_txt: "2023-10-09 00:00:00"
    }
  ],
  city: {
    id: 2643743,
    name: "London",
    country: "GB"
  }
};

export default sampleForecastData;