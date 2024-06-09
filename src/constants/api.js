import "dotenv/config";

export const CLIENT_URL = process.env.CLIENT_URL;

export const PORT = process.env.PORT;

export const CORS_OPTION = {
  origin: CLIENT_URL,
};

export const API_PREFIX = "/api";


