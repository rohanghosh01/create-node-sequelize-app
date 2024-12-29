"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example:
      // this.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "banned"),
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "user",
      timestamps: true, // Adds createdAt and updatedAt
      paranoid: true, // Adds deletedAt for soft deletes
    }
  );
  return user;
};
