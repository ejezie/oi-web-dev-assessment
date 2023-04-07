import express from 'express';
import { allPosts, createPost, deletePost, getSinglePost, updatePost } from '../controllers/postController.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';


const router = express.Router();

router.get("/posts", allPosts)

router.get("/post/:id", getSinglePost)

router.post("/post/new", isAuthenticatedUser, createPost)
router.put("/post/:id", isAuthenticatedUser, updatePost)
router.delete("/post/:id", isAuthenticatedUser, deletePost)

export default router