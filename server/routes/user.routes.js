import express from "express";
import { subscribeToTags, unsubscribeTags } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/subscribe/tags/").put(auth, subscribeToTags);
router.route("/unsubscribe/tags/").put(auth, unsubscribeTags);


export default router;