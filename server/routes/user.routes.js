import express from "express";
import { getAllUserContent, getAllUserEvent, subscribeToTags, unsubscribeTags } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/subscribe/tags/").put(auth, subscribeToTags);
router.route("/unsubscribe/tags/").put(auth, unsubscribeTags);
router.route("/get/user/content").get(auth, getAllUserContent);
router.route("/get/user/event").get(auth, getAllUserEvent);

export default router;