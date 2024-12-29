const jwtUtil = require("../utils/jwtUtil");
const userService = require("../services/user.service");
const tokenMiddleware = async (req, res, next) => {
  try {
    const tokenData = req.headers["authorization"];
    if (!tokenData) {
      return res.status(401).json({
        success: false,
        error: "missing_token",
        message: "No token provided",
      });
    }

    if (!tokenData.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "invalid_token",
        message: "Invalid token format",
      });
    }

    const token = tokenData?.slice(7, tokenData.length);

    const validateData = jwtUtil.verifyToken(token);
    if (!validateData) {
      return res.status(401).json({
        success: false,
        error: "invalid_token",
        message: "Invalid token",
      });
    }
    const getUser = await userService.getUser({ id: validateData.id });
    if (!getUser) {
      return res.status(401).json({
        success: false,
        error: "invalid_token",
        message: "User not found",
      });
    }

    if (!getUser.isVerified) {
      return res.status(401).json({
        success: false,
        error: "unverified_user",
        message: "User not verified",
      });
    }

    if (getUser.status !== "active") {
      return res.status(401).json({
        success: false,
        error: "inactive_user",
        message: `User is ${getUser.status}! contact to administrator`,
      });
    }
    req.user = getUser;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "invalid_token",
      message: "Invalid token",
    });
  }
};

module.exports = tokenMiddleware;
