import express from 'express';
import { allPosts, createPost } from '../controllers/postController.js';


const router = express.Router();

router.post("/post/new", createPost)
router.get("/posts", allPosts)

export default router