const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kakao_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Users",
  }
);

module.exports = User;
