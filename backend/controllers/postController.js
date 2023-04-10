import Post from "../models/postModel.js";
import Tag from "../models/tagModel.js";
import Comment from "../models/commentModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import APIQueries from "../utils/apiQuries.js";

// New post => /api/v1/post/new POST*****
export const createPost = catchAsyncErrors(async (req, res, next) => {
  const { title, content, image } = req.body;
  const tagIds = req.query.tagIds;

  const tags = await Tag.find({ _id: { $in: tagIds } });

  const resultPostImage = await cloudinary.v2.uploader.upload(image, {
    folder: "posts",
    width: 150,
    crop: "scale",
  });

  const post = await Post.create({
    title,
    content,
    author: req.user.id,
    category: req.query.categoryId,
    tags,
    image: {
      public_id: resultPostImage.public_id,
      url: resultPostImage.secure_url,
    },
  });

  if (!post) {
    return next(new ErrorHandler("Post could not be created", 400));
  }

  res.status(201).json({
    success: true,
    message: "Post successfully created",
    data: post,
  });
});

// All post => /api/v1/posts GET*****
export const allPosts = catchAsyncErrors(async (req, res, next) => {
  const apiQueries = new APIQueries(Post.find(), req.query).search();

  const posts = await apiQueries.query
    .populate("author")
    .populate("comments")
    .populate("category", "title")
    .populate("tags", "name");

  res.status(200).json({
    success: true,
    data: posts,
  });
});

// Get single post => /api/v1/post/:id  GET*****
export const getSinglePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id)
    .populate("author")
    .populate("comments")
    .populate("category")
    .populate("tags");

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  const comments = await Comment.find({ post: id }).populate("author");

  res.status(200).json({
    success: true,
    data: post,
    comments,
  });
});

// Update post => /api/v1/post/:id PUT****
export const updatePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const tagIds = req.query.tagIds;

  const tags = await Tag.find({ _id: { $in: tagIds } });

  const { title, content, image } = req.body;

  const resultPostImage = await cloudinary.v2.uploader.upload(image, {
    folder: "posts",
    width: 150,
    crop: "scale",
  });

  const update = {
    title,
    content,
    category: req.query.categoryId,
    tags,
    image: {
      public_id: resultPostImage.public_id,
      url: resultPostImage.secure_url,
    },
  };

  const post = await Post.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
    .populate("author")
    .populate("comments")
    .populate("category")
    .populate("tags");

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// Delete post => /api/v1/post/:id PUT****
export const deletePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "delete post successfully",
  });
});
