import User from '../models/userModel.js'
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../utils/errorHandler.js'
import sendJwtToken from '../utils/sendJwtToken.js'

// Create a new user => /api/v1/register/ *****
export const register = catchAsyncErrors( async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email: email });

  if(!user){

    const newUser = await User.create({
        name,
        email,
        password,
    });
    sendJwtToken(newUser, 200, res)

  }else{
    return next(new ErrorHandler("User already exists", 400))
  }

})

// Login existing user => /api/v1/login *****
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // Check email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please fill in email and password", 400));
  }
  // Find user in database
  const user = await User.findOne({ email }).select("+password");

  //check user exists
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const PasswordMatch = await user.isPasswordMatch(password);

  if (user && PasswordMatch) {
    sendJwtToken(user, 200, res);
  } else {
    res.status(401);
    return next(new ErrorHandler("Invalid email or password", 401));
  }
});

// Logout user => api/v1/logout ****
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// All users => /api/v1/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
});