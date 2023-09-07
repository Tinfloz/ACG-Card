import express from "express";
import { getAllUserContent, getAllUserTagsByLocation, getAllUserEvent, subscribeToTags, unsubscribeTags, setPriorityForTagsByCountry, getCountriesForPriority } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/subscribe/tags/").put(auth, subscribeToTags);
router.route("/unsubscribe/tags/").put(auth, unsubscribeTags);
router.route("/get/user/content").get(auth, getAllUserContent);
router.route("/get/user/event").get(auth, getAllUserEvent);
router.route("/get/t/:location").get(auth, getAllUserTagsByLocation);
router.route("/set/priority/:location").put(auth, setPriorityForTagsByCountry);
router.route("/get/countries").get(auth, getCountriesForPriority);

export default router;