const userService = require("../services/user.service");
const userController = {
  async getUserProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await userService.getUser({ id: userId });

      if (!user) {
        throw new Error("User not found");
      }

      res.json({ success: true, user });
    } catch (error) {
      next(error);
    }
  },

  async updateUserProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const updatedUser = await userService.updateUser(userId, req.body);

      res.json({ success: true, user: updatedUser });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
