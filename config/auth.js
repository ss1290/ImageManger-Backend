import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
let isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Error("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

export default isAuthenticatedUser;
