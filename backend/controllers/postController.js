import Post from "../models/postModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// New post => /api/v1/post/new
export const createPost = catchAsyncErrors(async (req, res, next) => {
  const { title, content, author, category, tags } = req.body;

  const post = await Post.create({
    title,
    content,
    author,
    category,
    tags,
  });

  res.status(200).json({
    success: true,
    message: "Post successfully created",
    data: post,
  });
});

// All post => /api/v1/posts
export const allPosts = catchAsyncErrors(async (req, res, next) => {

  const posts = await Post.find();

  res.status(200).json({
    success: true,
    data: posts,
  });
});
