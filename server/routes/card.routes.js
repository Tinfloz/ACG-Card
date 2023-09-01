import express from "express";
import { getContentByTagAndLocation } from "../controllers/card.controller.js";

const router = express.Router();

router.route("/get/card/content/:associate").post(getContentByTagAndLocation);

export default router;