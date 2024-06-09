import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: "string",
    unique: true,
    index: true,
    required: true,
  },
  isVerified: {
    type: "boolean",
    default: false,
  },
  token: {
    type: "string",
  },
  location: {
    type: "string",
    required: true,
  },
});

const Email = mongoose.model("Email", emailSchema);

export { Email };
