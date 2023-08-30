import express from "express";
import { signIn, signUp, setRole } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/set/role").put(auth, setRole);

export default router;