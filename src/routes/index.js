const router = require("express").Router();

// Import individual route files
const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");

// Use the routes
router.use("/auth", authRoutes); // Routes for authentication
router.use("/user", userRoutes); // Routes for user-related actions

module.exports = router;
