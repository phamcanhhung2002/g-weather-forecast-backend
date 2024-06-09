import { HttpStatusCode } from "axios";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  console.log(`Error: ${err.message}`);

  return res
    .status(HttpStatusCode.InternalServerError)
    .json({ message: "Something went wrong!" });
};
