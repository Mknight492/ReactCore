import { WeatherObject } from "models";

export const weatherMock1: WeatherObject = {
  base: "stations",
  clouds: { all: 12 },
  cod: 200,
  coord: { lon: 175.67, lat: -40.95 },
  dt: 1547685926,
  id: 2187238,
  main: {
    grnd_level: 989.63,
    humidity: 93,
    pressure: 989.63,
    sea_level: 1021.7,
    temp: 22.01,
    temp_max: 22.01,
    temp_min: 22.01
  },
  name: "Masterton District",
  sys: {
    message: 0.0171,
    country: "NZ",
    sunrise: 1547658281,
    sunset: 1547711348
  },
  weather: [
    { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
  ],
  wind: { speed: 0.62, deg: 233.5 }
};
