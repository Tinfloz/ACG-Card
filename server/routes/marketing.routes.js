import express from "express";
import { createContentTag, deleteContentTag, createMarketingContent, deleteMarketingContent, getContentByTag, createNewEvent, deleteEvent, getAllEventsByTag, getAllTags } from "../controllers/marketing.controller.js";
import { auth, isMarketing } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create/tag").post(auth, isMarketing, createContentTag);
router.route("/delete/tag/:tagName").delete(auth, isMarketing, deleteContentTag);
router.route("/get/tags").get(auth, getAllTags);
router.route("/create/content/:tag").post(auth, isMarketing, createMarketingContent);
router.route("/delete/content/:id").delete(auth, isMarketing, deleteMarketingContent);
router.route("/get/content/:tag").get(auth, isMarketing, getContentByTag);
router.route("/create/event").post(auth, isMarketing, createNewEvent);
router.route("/get/events/:tag").get(auth, isMarketing, getAllEventsByTag);
router.route("/delete/event/:id").delete(auth, isMarketing, deleteEvent);

export default router;