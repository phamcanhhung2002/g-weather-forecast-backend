import express from "express";
import cors from "cors";
import { PORT, CORS_OPTION, API } from "./constants/index.js";
import { weatherRouter } from "./apis/index.js";

if (!PORT) {
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTION));

app.use(`${API.PREFIX}${API.WEATHER}`, weatherRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
