import { validationResult } from "express-validator/check";
import bcrypt from "bcryptjs";

import User from "../../models/user";

export const createUser = async (req, res, next) => {
  console.log("wchodzi");
  const data = { ...req.body };
  const errors = validationResult(req);
  console.log("ERRORY PRZED", errors);
  console.log("data", data);
  try {
    if (!errors.isEmpty()) {
      console.log("RROR");
      const error = new Error("Validation failed");
      error.statusCode = 404;
      error.data = errors.array();
      throw error;
    }
    const hashPassword = await bcrypt.hash(data.password, 12);
    const user = new User({
      name: data.name,
      password: hashPassword
    });
    await user.save();
    return res.status(200).json({ message: "User Created", userId: user._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
