import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/commentController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/comment/new", isAuthenticatedUser, createComment);
router.put("/comment/:id", isAuthenticatedUser, updateComment);
router.delete("/comment/:id", isAuthenticatedUser, deleteComment);

router.get(
  "/admin/comments",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllComments
);

export default router;
