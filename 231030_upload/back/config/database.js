const Sequelize = require("sequelize");
const sequelize = new Sequelize("231030_login_upload", "root", "!Web7722", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

module.exports = sequelize;
