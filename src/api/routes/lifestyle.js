import express from "express";
import { body } from "express-validator/check";
import multer from "multer";

import { createLifestyle } from "../controllers/lifestyle/create";
import { getAllLifestyle } from "../controllers/lifestyle/getAll";
import { getOneLifestyle } from "../controllers/lifestyle/getOne";

import { authorization } from "../middleware/authorization";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  console.log("wchodzi");
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1920 * 1080 * 5
  },
  fileFilter: fileFilter
}).array("image", 50);

const router = express.Router();
// const validation = [
//   body("title").isLength({ min: 5 }),
//   body("description").isLength({ min: 5 }),
//   body("ingredient").isLength({ min: 5 })
// ];

// router.post("/recipe", [...validation], createRecipe);
router.post("/create", upload, createLifestyle);
router.post("/getAll", getAllLifestyle);
router.post("/getOne", getOneLifestyle);

export default router;
