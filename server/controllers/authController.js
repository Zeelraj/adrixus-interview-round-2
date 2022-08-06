const User = require("../models/User");
const BigPromise = require("../middleware/bigPromise");
const cookieToken = require("../utils/cookieToken");
const { isValidContact, isValidEmail } = require("../utils/tools");
const { SYSTEM_TYPES } = require("../utils/constants");
const jwt = require("jsonwebtoken");

/**
 *
 * @description Register Route
 * This will create the New User
 *
 * @param {string} name - Name of the User.
 * @param {string} email - Email of the User. It must be unique.
 * @param {string} contact - Contact of the User. It must be unique.
 * @param {string} password - Password of the User's Account.
 *
 * @note
 * This will auto login user to it's account after registration.
 *
 */
exports.register = BigPromise(async (req, res) => {
  const { name, email, contact, password } = req.body;

  // const token = req.headers["x-access-token"] || req.cookies.token;
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (token && token !== "null" && token !== "undefined") {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      return res.status(302).json({
        success: true,
        message: "You are already logged in..!!",
      });
    }
  }

  if (!email || !name || !password || !contact) {
    return res.status(400).json({
      success: false,
      message: "Please, Enter All Required Fields..!!",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please, Enter Email in Correct Format..!!",
    });
  }

  if (!isValidContact(contact)) {
    return res.status(400).json({
      success: false,
      message:
        "Please, Enter Contact in Correct Format (without Country Code)..!!",
    });
  }

  const userExists = await User.findOne({ $or: [{ email }, { contact }] });

  if (userExists) {
    return res.status(403).json({
      success: false,
      message: "Email Address or Contact is already registered..!!",
    });
  }

  const userModel = new User({
    name,
    email,
    contact,
    password,
  });

  const user = await userModel.save();

  cookieToken(user, res, SYSTEM_TYPES.REGISTER);
});

/**
 *
 * @description Login Route
 * This will login the Existing User
 *
 * @param {string} id - Email or Contact of the User.
 * @param {string} password - Password of the User's Account.
 *
 * @note
 * User can login using Email or Contact.
 *
 */
exports.login = BigPromise(async (req, res) => {
  const { id, password } = req.body;

  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (token && token !== "null" && token !== "undefined") {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      return res.status(302).json({
        success: true,
        message: "You are already logged in..!!",
      });
    }
  }

  if (!id || !password) {
    return res.status(400).json({
      success: false,
      message: "Please, Provide Contact or Email and Password",
    });
  }

  const user = await User.findOne({ $or: [{ email: id }, { contact: id }] });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No User Found..!!",
    });
  }

  if (!user.active) {
    return res.status(403).json({
      success: false,
      message: "Sorry This account is closed, Please contact to Support..!!",
    });
  }

  const isValidPassword = await user.isValidatedPassword(password);

  if (!isValidPassword) {
    return res.status(400).json({
      success: false,
      message: "Password is not correct..!!",
    });
  }

  cookieToken(user, res, SYSTEM_TYPES.LOGIN);
});

/**
 *
 * @description Logout Route
 * This will remove the Token from the cookie and return the null for the token
 *
 * @note
 * Update the token with the null at the Frontend Part.
 *
 */
exports.logout = BigPromise(async (req, res) => {
  if (!req.user.id) {
    return res.status(401).json({
      success: false,
      user: null,
      message: "Login First to access this page...",
    });
  }

  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };

  res.status(200).cookie("token", null, options).json({
    success: true,
    token: null,
    message: "Logout Success",
  });
});

/**
 *
 * @description Authentication Route
 * This will return the user after the authentication
 *
 */
exports.userAuthentication = BigPromise(async (req, res) => {
  if (!req.user.id) {
    return res.status(401).json({
      success: false,
      user: null,
      message: "Login First to access this page...",
    });
  }

  const user = await User.findById(req.user.id);

  user.password = undefined;

  res.status(200).json({
    success: true,
    isAuthenticated: true,
    isActive: req.user.active,
    user,
  });
});
