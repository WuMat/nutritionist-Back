import express from "express";
import { mails } from "../controllers/mails/mails";
const router = express.Router();

router.post("/send", mails);

export default router;
