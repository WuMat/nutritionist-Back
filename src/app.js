import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

// import placeRouter from "./api/routes/places";
// import userRouter from "./api/routes/user";

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

// app.use("/api", placeRouter);
// app.use("/api/user", userRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "unexpected error";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

export default app;
