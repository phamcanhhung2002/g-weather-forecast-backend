import "dotenv/config";

export const CLIENT_URL = process.env.CLIENT_URL;

export const PORT = process.env.PORT;

export const CORS_OPTION = {
  origin: CLIENT_URL,
};

export const API = {
  PREFIX: "/api",
  WEATHER: "/weather",
};

export const WEATHER_API = {
  BASE_URL: "http://api.weatherapi.com/v1",
  FORECAST: "/forecast.json",
  KEY: process.env.WEATHER_API_KEY,
};
