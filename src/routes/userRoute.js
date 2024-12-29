const router = require("express").Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");

// Define user-related routes
router.get("/profile", tokenMiddleware, getUserProfile);

router.put("/", tokenMiddleware, updateUserProfile);

module.exports = router;
