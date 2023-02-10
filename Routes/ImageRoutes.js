import express from "express";

const router = express.Router();
import isAuthenticatedUser from "../config/auth.js";

import {
  uploadImage,
  getAllImages,
  updateCount,
  getImage,
} from "../Controller/ImageController.js";

router.post("/upload", isAuthenticatedUser, uploadImage);
router.get("/images", isAuthenticatedUser, getAllImages);
router
  .route("/image/:id")
  .patch(isAuthenticatedUser, updateCount)
  .get(isAuthenticatedUser, getImage);

export default router;
