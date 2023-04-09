import express from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  updateTag,
} from "../controllers/tagController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.get("/tags", getAllTags);

router.post("/tag/new", isAuthenticatedUser, createTag);
router.put("/tag/:id", isAuthenticatedUser, updateTag);
router.delete("/tag/:id", isAuthenticatedUser, deleteTag);



export default router;
