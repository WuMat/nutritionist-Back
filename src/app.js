import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();

import recipeRouter from "./api/routes/recipes";
import userRouter from "./api/routes/user";
import lifestyleRouter from "./api/routes/lifestyle";

const DBNAME = process.env.DB_NAME;
const DBPASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb://${DBNAME}:${DBPASSWORD}@ds127376.mlab.com:27376/nutritionist`,
    { useNewUrlParser: true }
  )
  .then(result => console.log("database is connected"))
  .catch(err => console.log(err));

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/user", userRouter);
app.use("/api", recipeRouter);
app.use("/api", lifestyleRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "unexpected error";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

export default app;
