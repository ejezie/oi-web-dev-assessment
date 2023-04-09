import Category from "../models/categoryModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// New coment => /api/v1/Category/new POST*****
export const createCategory = catchAsyncErrors(async (req, res, next) => {

  const { title } = req.body;

  const category = await Category.create({
    title,
  });

  if(!category){
    return next(new ErrorHandler('Category could not be created at the moment, try again', 500 ))
  }

  res.status(201).json({
    success: true,
    message: "Category successfully created",
    data: category,
  });
});

// Update Category => /api/v1/Category/:id PUT****
export const updateCategory = catchAsyncErrors(async (req, res, next) => {

  const { title } = req.body;

  const newCategory = {
    title,
  };

  const category = await Category.findByIdAndUpdate(req.params.id, newCategory, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    data: Category,
  });
});

// Get all Categories => /api/v1/admin/Categorys GET****
export const getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find()

  if (!categories) {
    return next(new ErrorHandler("Categories not found", 404));
  }

  res.status(200).json({
    success: true,
    categories,
  });
});

// Delete Category => /api/v1/Category/:id Delete****
export const deleteCategory = catchAsyncErrors(async (req, res, next) => {

  const category = await Category.findByIdAnd(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  category.remove();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
