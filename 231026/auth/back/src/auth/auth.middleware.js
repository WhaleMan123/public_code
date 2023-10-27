const JWT = require("../../lib/jwt.js");
const jwt = new JWT();
// const userService = require("../user/user.service");

exports.auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return next();
    const payload = jwt.verify(token, "web7722");
    const user = await userService.findOneByUserEmail(payload.email);
    req.user = user;
    // 위와 같이 보통 로그인 한 사용자의 정보를 담을 때 req.user에다가 담는다.
    next();
  } catch (error) {
    console.log("auth.middleware error" + error.message);
    next(error);
  }
};

// 위에 같이 DB 요청을 하거나 하면, 대부분 async/awiat, try/catch를 써서 비동기로 처리해야 한다.
// 이 auth.middleware.js라는 미들웨어는 server.js에서 매번 http request가 올 때마다 거치게 된다.
// 따라서 token이 존재한다면 verify를 실시하고 그 이후에 DB에서 회원정보를 찾아온 후 그것을
// req.user에다가 할당해주게 된다.
// 이 과정을 http request가 올 때마다 매번 시행한다.(라우터 전에 있는 미들웨어 이므로)
