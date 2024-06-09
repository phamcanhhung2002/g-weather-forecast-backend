import express from "express";
import cors from "cors";

import { PORT, CORS_OPTION } from "./constants/index.js";

if (!PORT) {
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTION));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
