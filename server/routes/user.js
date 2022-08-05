const express = require("express");
const router = express.Router();

const { usersList } = require("../controllers/userController");
const { isLoggedIn } = require("../middleware/user");

// Basic Routes
router.route("/users").get(isLoggedIn, usersList);

module.exports = router;
