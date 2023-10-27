const express = require("express");
const router = express.Router();
const userController = require("./user.controller.js");

router.post("/jwt", userController.postKakaoUserinfo);

module.exports = router;
