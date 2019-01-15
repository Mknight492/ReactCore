export interface WeatherObject {
  coord: coord;
  sys: {
    country: string;
    surise: number;
    sunset: number;
  };
  weather: [WeatherArray];
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  rain: object;
  clouds: object;
  dt: number;
  id: number;
  name: string;
  cod: number;
}

export interface coord {
  lat: number;
  lon: number;
}

export interface WeatherArray {
  id: number;
  main: string;
  description: string;
  icon: string;
}
