const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const router = require("./src/index.js");
const sequelize = require("./config/database.js");
// const middleware = require("./src/auth/auth.middleware.js");
// app.use(middleware.auth);
// console.log("sequelize moduel : ", require("./config/database.js"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

const initializeServer = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Sync the database Succeeded");

    app.listen(8081, () => {
      console.log("Backend Server started at PORT: 8081");
    });
  } catch (error) {
    console.error("Unable to sync the database or start server", error);
  }
};

initializeServer();
