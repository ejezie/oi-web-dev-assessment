import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.get("/categories", getAllCategories);

router.post("/category/new", isAuthenticatedUser, createCategory);
router.put("/category/:id", isAuthenticatedUser, updateCategory);
router.delete("/category/:id", isAuthenticatedUser, deleteCategory);



export default router;
