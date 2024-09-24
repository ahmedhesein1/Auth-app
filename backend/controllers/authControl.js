const bcrypt = require("bcrypt");
const appError = require("./../utils/appError");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("./../models/user");
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new appError("User is already existed", 401));
  }
  const userModel = await User.create({ name, email, password });
  await userModel.save();
  res.status(201).json({
    success: true,
    message: "signup succeded",
  });
  next(new appError("signup failed", 400));
});
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!user || !isPasswordEqual) {
    return next(new appError("invalid email or password", 403));
  }
  const JWT = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "90h",
    }
  );
  res.status(200).json({
    success: true,
    message: "login succeded",
    JWT,
    email,
    name: user.name,
  });
  next(new appError("login failed", 404));
};
