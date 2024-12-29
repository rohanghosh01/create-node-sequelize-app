const models = require("../models");
const { user } = models;

const userService = {
  async getUser(where) {
    try {
      const result = await user.findOne({ where, raw: true });
      return result;
    } catch (error) {
      throw {
        success: false,
        message: "Failed to get user",
        error,
      };
    }
  },
  async createUser(userData) {
    try {
      const result = await user.create(userData);
      return result;
    } catch (error) {
      throw {
        success: false,
        message: "Failed to create user",
        error,
      };
    }
  },
  async updateUser(id, userData) {
    try {
      const result = await user.update(userData, { where: { id } });
      if (result[0] === 0) {
        throw {
          success: false,
          message: "User not found",
        };
      }
      return result;
    } catch (error) {
      throw {
        success: false,
        message: "Failed to update user",
        error,
      };
    }
  },
};

module.exports = userService;
