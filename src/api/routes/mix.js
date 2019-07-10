import express from "express";

import { getImagesBottom } from "../controllers/mix/getImagesBottom";
import { getHomView } from "../controllers/mix/getHomView";

import { authorization } from "../middleware/authorization";

const router = express.Router();

router.post("/getImagesBottom", getImagesBottom);
router.post("/getHomView", getHomView);

export default router;
