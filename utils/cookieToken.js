const { SYSTEM_TYPES } = require("../utils/constants");

const cookieToken = (user, res, type) => {
  const token = user.getJwtToken();

  if (!user.active) {
    return res.status(401).json({
      success: false,
      isAuthenticated: false,
      isActive: false,
      user: null,
      message: "Contact to Support For more Details...",
    });
  }

  const options = {
    expires: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRY
    ),
    httpOnly: true,
  };

  user.password = undefined;

  if (type === SYSTEM_TYPES.REGISTER) {
    return res.status(200).cookie("token", token, options).json({
      success: true,
      isRegistered: true,
      isAuthenticated: true,
      isUser: true,
      token,
      user,
    });
  }

  res.status(200).cookie("token", token, options).json({
    success: true,
    isLoggedIn: true,
    isAuthenticated: true,
    isUser: true,
    token,
    user,
  });
};

module.exports = cookieToken;
