// 사용자 정보를 처리하는 비즈니스 로직을 수행한다. 필요하다면 user.repository.js를 통해
// 데이터베이스 작업을 하고 이를 통해 JWT를 생성한다.
const userRepository = require("./user.repository.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.processUserInfo = async (userInfo) => {
  try {
    // console.log("UserController processUserInfo userInfo : ", userInfo);

    const { toBackendData: userData } = userInfo;
    let user = await userRepository.findUser(userData.kakao_id);

    // 새로운 사용자라면 DB에 저장
    if (!user) {
      user = await userRepository.saveUser(userData);
    }

    // JWT 생성
    const jwtToken = jwt.sign(
      {
        kakao_id: user.kakao_id,
        nickname: user.nickname,
        profile_image: user.profile_image,
        createdAt: user.createdAt,
      },
      "web7722"
    );
    return jwtToken;

    // const findUserResult = await userRepository.findUser();
    // const result = "userServiceTest for JWT";
    // return result;
  } catch (error) {
    console.log("UserService processUserInfo", error);
    next(error);
  }
};
