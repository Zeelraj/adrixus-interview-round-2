const User = require("../models/User");
const BigPromise = require("./bigPromise");
const jwt = require("jsonwebtoken");

/**
 *
 * @description Login Middleware
 * This will check if user is valid and logged in or not
 *
 */
exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      user: null,
      message: "Login First to access this page...",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      user: null,
      message: "Login First to access this page...",
    });
  }

  const user = await User.findById(decoded.id);

  if (!user.active) {
    return res.status(401).json({
      success: false,
      isAuthenticated: false,
      isActive: false,
      user: null,
      message: "Contact to Support For more Details...",
    });
  }

  user.password = undefined;

  req.user = user;

  next();
});
