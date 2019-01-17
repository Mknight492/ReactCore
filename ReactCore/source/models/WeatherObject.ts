export interface WeatherObject {
  base: string | "";
  coord: coord;
  sys: {
    message?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: [WeatherArray];
  main: {
    grnd_level?: number;
    sea_level?: number;
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
  rain?: object;
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
