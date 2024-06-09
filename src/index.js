import express from "express";
import cors from "cors";
import { PORT, CORS_OPTION, API } from "./constants/index.js";
import { weatherRouter, emailSubcriptionRouter } from "./apis/index.js";
import "./database.js";
import { errorHandler } from "./middlewares/error.handler.js";

if (!PORT) {
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTION));

app.use(`${API.PREFIX}${API.WEATHER}`, weatherRouter);
app.use(`${API.PREFIX}`, emailSubcriptionRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
