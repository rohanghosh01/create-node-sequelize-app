const userService = require("../services/user.service");
const jwtUtil = require("../utils/jwtUtil");
const bcrypt = require("bcrypt");

const createError = (message, errorType, statusCode) => ({
  success: false,
  message,
  error: errorType,
  statusCode,
});

const authController = {
  async register(req, res, next) {
    try {
      const { email, password, ...rest } = req.body;

      // Check if user already exists
      const existingUser = await userService.getUser({ email });
      if (existingUser) {
        throw createError("Email already exists", "validation_error", 409);
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create the user
      const user = await userService.createUser({
        email,
        passwordHash,
        lastLogin: new Date(),
        ...rest,
      });

      // Generate token
      const token = jwtUtil.generateToken({ id: user.id, email: user.email });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: { ...user.toJSON(), passwordHash: undefined },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await userService.getUser({ email });
      if (!user) {
        throw createError("User not found", "user_not_found", 404);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        throw createError("Invalid password", "invalid_password", 400);
      }

      // Check if user is verified
      if (!user.isVerified) {
        throw createError("User not verified", "unverified_user", 400);
      }

      // Check if user is active
      if (user.status !== "active") {
        throw createError(
          `User is ${user.status}! Contact the administrator`,
          "inactive_user",
          400
        );
      }

      // Generate token and update last login
      const token = jwtUtil.generateToken({ id: user.id, email: user.email });
      await userService.updateUser(user.id, { lastLogin: new Date() });

      // Prepare the response user object
      const { passwordHash, deletedAt, updatedAt, ...result } = user;

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
