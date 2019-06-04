import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";

import User from "../../models/user";

export const loginUser = async (req, res, next) => {
  const data = { ...req.body };
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation Failed");
      error.statusCode = 404;
      throw error;
    }
    const user = await User.findOne({ name: data.name });
    if (!user) {
      const error = new Error("Cant find user");
      error.statusCode = 401;
      throw error;
    }
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        name: user.name,
        userId: user._id.toString()
      },
      process.env.TOKEN_SROKEN,
      { expiresIn: "2h" }
    );
    return res.status(200).json({ token: token, userId: user._id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
