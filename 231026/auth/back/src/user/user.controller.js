// 요청을 받으면 입력 데이터의 유효성을 검증하고, user.service.js의 로직을 호출한다.

const userService = require("./user.service.js");

exports.postKakaoUserinfo = async (req, res, next) => {
  try {
    const userInfo = req.body;
    // console.log("UserController postKakaoUserinfo userInfo : ", userInfo);
    const jwtToken = await userService.processUserInfo(userInfo);
    console.log("userService postKakaoUserinfo jwtToken : ", jwtToken);
    res.json(jwtToken);
  } catch (error) {
    console.log("UserController postKakaoUserinfo", error);
    next(error);
  }
};
