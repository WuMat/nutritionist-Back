import express from "express";
import { body } from "express-validator/check";
import multer from "multer";

import { createRecipe } from "../controllers/recipes/create";
import { getAllRecipe } from "../controllers/recipes/getAll";
import { getOneRecipe } from "../controllers/recipes/getOne";
import { updateRecipe } from "../controllers/recipes/update";

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
  console.log("object");
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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
}).array("image", 5);

const router = express.Router();
// const validation = [
//   body("title").isLength({ min: 5 }),
//   body("description").isLength({ min: 5 }),
//   body("ingredient").isLength({ min: 5 })
// ];

// router.post("/recipe", [...validation], createRecipe);
router.post("/create", upload, createRecipe);
router.post("/getAll", getAllRecipe);
router.post("/getOne", getOneRecipe);
router.post("/update", updateRecipe);

export default router;
