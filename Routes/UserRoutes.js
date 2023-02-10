import express from "express";

const router = express.Router();
import isAuthenticatedUser from "../config/auth.js";
import {
  registerUser,
  loginUser,
  getUserDetails,
} from "../Controller/UserController.js";

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/me", isAuthenticatedUser, getUserDetails);

export default router;
