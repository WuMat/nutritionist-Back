import express from "express";
import { body } from "express-validator/check";

import User from "../models/user";

import { createUser } from "../controllers/user/create";
import { loginUser } from "../controllers/user/login";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ name: value });
        if (user) {
          const error = new Error("User exist");
          throw error;
        }
      })
      .trim()
      .not()
      .isEmpty(),
    body("password")
      .trim()
      .isLength({ min: 5 })
  ],
  createUser
);

router.post(
  "/login",
  [
    body("name").trim(),
    body("password")
      .trim()
      .isLength({ min: 5 })
  ],
  loginUser
);

export default router;
