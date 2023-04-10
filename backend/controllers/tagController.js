import Tag from "../models/tagModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// New coment => /api/v1/Tag/new POST*****
export const createTag = catchAsyncErrors(async (req, res, next) => {

  const { name } = req.body;

  const tag = await Tag.create({
    name,
  });

  if (!tag) {
    return next(
      new ErrorHandler("Tag could not be created at the moment, try again", 500)
    );
  }

  res.status(201).json({
    success: true,
    message: "Tag successfully created",
    data: tag,
  });
});

// Update Tag => /api/v1/Tag/:id PUT****
export const updateTag = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const newTag = {
    name,
  };

  const tag = await Tag.findByIdAndUpdate(req.params.id, newTag, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!tag) {
    return next(new ErrorHandler("Tag not found", 404));
  }

  res.status(200).json({
    success: true,
    data: tag,
  });
});

// Get all Categories => /api/v1/admin/Tags GET****
export const getAllTags = catchAsyncErrors(async (req, res, next) => {
  const tags = await Tag.find();

  if (!tags) {
    return next(new ErrorHandler("Tags not found", 404));
  }

  res.status(200).json({
    success: true,
    tags,
  });
});

// Delete Tag => /api/v1/Tag/:id Delete****
export const deleteTag = catchAsyncErrors(async (req, res, next) => {
  const tag = await Tag.findByIdAndRemove(req.params.id);

  if (!Tag) {
    return next(new ErrorHandler("Tag not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Tag deleted successfully",
  });
});
