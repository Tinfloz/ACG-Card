import express from "express";
import { subscribeToTags, unsubscribeTags, getContentByTagsAndUsers, getEventsByTagAndUsers } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/subscribe/tags/:tagName").post(auth, subscribeToTags);
router.route("/unsubscribe/tags/:tagName").post(auth, unsubscribeTags);
router.route("/get/content/:userName").get(getContentByTagsAndUsers);
router.route("/get/event/:userName").get(getEventsByTagAndUsers)

export default router;