const BigPromise = require("../middleware/bigPromise");
const usersData = require("../usersData.json");

/**
 *
 * @description Users List Route
 * This will return the List of 100 Users from usersData.json
 *
 */
exports.usersList = BigPromise(async (req, res) => {
  res.status(200).json({
    success: true,
    count: usersData.length,
    users: usersData,
  });
});
