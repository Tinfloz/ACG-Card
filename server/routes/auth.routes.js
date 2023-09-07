import express from "express";
import { signIn, signUp, setRole, changeUserBioAndPhoto } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/set/role").put(auth, setRole);
router.route("/change/profile").put(auth, changeUserBioAndPhoto);

export default router;