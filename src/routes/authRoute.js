const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../validations/authValidation");

// Define authentication routes
router.post("/login", validateLogin, login);

router.post("/register", validateRegistration, register);

module.exports = router;
