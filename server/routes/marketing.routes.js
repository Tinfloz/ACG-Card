import express from "express";
import { createContentTag, deleteContentTag, createMarketingContent, deleteMarketingContent, getContentByTag } from "../controllers/marketing.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create/tag").post(auth, createContentTag);
router.route("/delete/tag/:tagName").delete(auth, deleteContentTag);
router.route("/create/content/:tag").post(auth, createMarketingContent);
router.route("/delete/content/:id").delete(auth, deleteMarketingContent);
router.route("/get/content/:tag").get(auth, getContentByTag);

export default router;