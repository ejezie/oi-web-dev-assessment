import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/commentController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/api/v1/comment/new", isAuthenticatedUser, createComment);
router.put("/api/v1/comment/:id", isAuthenticatedUser, updateComment);
router.delete("/api/v1/comment/:id", isAuthenticatedUser, deleteComment);

router.get(
  "/api/v1/comment/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllComments
);

export default router;
