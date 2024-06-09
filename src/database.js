import "dotenv/config";
import mongoose from "mongoose";
import { MONGODB_URI } from "./constants/index.js";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connect to database successfully!"))
  .catch((err) => {
    console.error(err.stack);
    console.log(`Error: ${err.message}`);
    console.log("Could not connect to database!");
    process.exit(1);
  });
