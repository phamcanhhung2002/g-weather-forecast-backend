import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: "string",
    unique: true,
    required: true,
  },
  isVerified: {
    type: "boolean",
    default: false,
  },
  location: {
    type: "string",
    required: true,
  },
});

const Email = mongoose.model("Email", emailSchema);

export { Email };
