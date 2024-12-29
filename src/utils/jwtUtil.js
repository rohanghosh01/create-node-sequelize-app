const jwt = require("jsonwebtoken");
const { JWT_EXPIRE_IN = "1h", JWT_SECRET } = process.env;
const jwtUtil = {
  generateToken(user) {
    // generate token here
    try {
      const token = jwt.sign(user, JWT_SECRET, {
        expiresIn: JWT_EXPIRE_IN,
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  },
  verifyToken(token) {
    // verify token here
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = jwtUtil;
