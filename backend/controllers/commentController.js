import Comment from "../models/commentModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// New coment => /api/v1/comment/new POST*****
export const createComment = catchAsyncErrors(async (req, res, next) => {
  const postId = req.params.id;

  const { body } = req.body;

  const comment = await Comment.create({
    body,
    author: req.user._id,
    post: postId,
  });

  res.status(201).json({
    success: true,
    message: "Comment successfully created",
    data: comment,
  });
});

// Update comment => /api/v1/comment/:id PUT****
export const updateComment = catchAsyncErrors(async (req, res, next) => {
  const postId = req.params.id;

  const { body, commentId } = req.body;

  const newComment = {
    body,
    author: req.user._id,
    post: postId,
  };

  const comment = await Comment.findByIdAndUpdate(commentId, newComment, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!comment) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// Get all comments => /api/v1/admin/comments GET****
export const getAllComments = catchAsyncErrors(async (req, res, next) => {
    const comments = await Comment.find()

  if (!comments) {
    return next(new ErrorHandler("Comments not found", 404));
  }

  res.status(200).json({
    success: true,
    comments,
  });
});

// Delete comment => /api/v1/comment/:id Delete****
export const deleteComment = catchAsyncErrors(async (req, res, next) => {
  const { commentId } = req.body;

  const comment = await Comment.findByIdAnd(commentId);

  if (!comment) {
    return next(new ErrorHandler("Comment not found", 404));
  }

  if (comment.author.toString() !== req.user._id.toString()) {
    return next (new ErrorHandler ("You are not authorized to delete this comment", 403 ));
  }

  comment.remove();

  res.status(200).json({
    success: true,
    message: "comment deleted successfully",
  });
});
