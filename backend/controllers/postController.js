import Post from "../models/postModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// New post => /api/v1/post/new POST*****
export const createPost = catchAsyncErrors(async (req, res, next) => {
  const { title, content, author, category, tags } = req.body;

  const post = await Post.create({
    title,
    content,
    author,
    category,
    tags,
  });

  res.status(201).json({
    success: true,
    message: "Post successfully created",
    data: post,
  });
});

// All post => /api/v1/posts GET*****
export const allPosts = catchAsyncErrors(async (req, res, next) => {
  const posts = await Post.find()
    .populate("author")
    .populate("categories")
    .populate("tags")
    .populate("comments");

  res.status(200).json({
    success: true,
    data: posts,
  });
});

// All single post => /api/v1/post/:id  GET*****
export const getSinglePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id)
    .populate("author")
    .populate("categories")
    .populate("tags")
    .populate("comments");

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// Update post => /api/v1/post/:id PUT****
export const updatePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("author")
    .populate("categories")
    .populate("tags")
    .populate("comments");

    if(!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    res.status(200).json({
        success: true,
        data: post,
    })
});

// Delete post => /api/v1/post/:id PUT****
export const deletePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id, req.body)

    if(!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "delete post successfully",
    })
});