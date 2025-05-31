export interface WeatherData {
  id: number;
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  dt_txt: string;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    country: string;
  };
}

export interface City {
  id: number;
  name: string;
  country: string;
}

export interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}