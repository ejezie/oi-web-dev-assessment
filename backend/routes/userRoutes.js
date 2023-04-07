import express from "express";
import { allUsers, loginUser, register } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", register);
router.get("/users", allUsers);

export default router;
