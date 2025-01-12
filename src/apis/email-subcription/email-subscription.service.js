import { HttpStatusCode } from "axios";
import { validationResult } from "express-validator";
import { Email } from "../../models/email.schema.js";
import { transporter } from "../../mailer.js";
import {
  MAILER,
  SECRET,
  API,
  HOST,
  TOKEN_EXPIRE_TIME,
} from "../../constants/api.js";
import jwt from "jsonwebtoken";

export const subscribe = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ errors: result.array() });
  }

  const { email, location } = req.body;

  const token = jwt.sign({ email }, SECRET, { expiresIn: TOKEN_EXPIRE_TIME });

  try {
    const newEmail = await Email.create({
      email,
      location,
    });

    await newEmail.save();

    transporter.sendMail({
      from: MAILER.USER,
      to: email,
      subject: "Confirm your email",
      context: {
        host: HOST,
        apiPrefix: API.PREFIX,
        token,
      },
      template: "confirm",
    });

    return res.json({
      message: "Verification email sent!",
    });
  } catch (err) {
    const errorResponse = err?.errorResponse;
    const errorCode = errorResponse?.code;
    const email = errorResponse?.keyValue?.email;

    if (errorCode === 11000) {
      return res.status(HttpStatusCode.Conflict).json({
        message: `Email ${email} is already subscribed!`,
      });
    }

    next(err);
  }
};

export const verify = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ errors: result.array() });
  }

  const { token } = req.params;

  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(HttpStatusCode.BadRequest).json({
          message: "Your verification link is expired!",
        });
      }

      return res.status(HttpStatusCode.BadRequest).json({
        message: "Invalid token!",
      });
    }

    const { email } = decoded;

    try {
      const verifiedEmail = await Email.findOneAndUpdate(
        {
          email,
        },
        {
          isVerified: true,
        }
      );

      await verifiedEmail.save();

      return res.json({
        message: "Email has been verified!",
      });
    } catch (err) {
      next(err);
    }
  });
};

export const unsubcribe = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ errors: result.array() });
  }

  const { email } = req.params;

  await Email.deleteOne({
    email,
  });

  return res.json({ message: "Email deleted." });
};
