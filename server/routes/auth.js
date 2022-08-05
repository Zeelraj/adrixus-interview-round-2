const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  userAuthentication,
} = require("../controllers/authController");
const { isLoggedIn } = require("../middleware/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isLoggedIn, logout);
router.route("/auth").get(isLoggedIn, userAuthentication);

module.exports = router;
