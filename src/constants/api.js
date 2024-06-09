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

export const MONGODB_URI = process.env.MONGODB_URI;

export const MAILER = {
  HOST: process.env.MAIL_HOST,
  USER: process.env.MAIL_USER,
  PASS: process.env.MAIL_PASS,
};

export const SECRET = process.env.SECRET;

export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
