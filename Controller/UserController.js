import User from "../Models/UserModel.js";
import sendToken from "../config/jwtToken.js";
import catchAsyncErrors from "../config/catchAsyncErrors.js";

export const registerUser = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.create({
    email,
    password,
  });

  sendToken(user, 201, res);
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.cookies);
  const { email, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email, password });

  if (!user) {
    return next(new Error("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
