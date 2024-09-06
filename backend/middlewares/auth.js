const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const appError = require("../utils/appError");
exports.isAuthinticated = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return next(new appError("you are not authorized", 403));
  }
  const decoded = jwt.verify(auth, process.env.JWT_SECRET);
  req.user = decoded;
  next();
  if (!decoded) {
    return next(new appError("Invalid token please log in again", 401));
  }
  next();
});
