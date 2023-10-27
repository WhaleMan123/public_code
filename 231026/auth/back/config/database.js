const Sequelize = require("sequelize");

const sequelize = new Sequelize("kakao_login", "root", "!Web7722", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

module.exports = sequelize;
