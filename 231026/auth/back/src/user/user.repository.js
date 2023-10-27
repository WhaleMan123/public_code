// 데이터베이스 CRUD 작업을 수행한다.sequelize를 통해 작업을 수행
const User = require("./user.model.js");

exports.findUser = async (kakao_id) => {
  try {
    const user = await User.findOne({
      where: { kakao_id },
    });
    return user;
  } catch (error) {
    console.log("UserRepository findUser", error);
    next(error);
  }
};
exports.saveUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.log("UserRepository saveUser", error);
    next(error);
  }
};
exports.updateUser;
