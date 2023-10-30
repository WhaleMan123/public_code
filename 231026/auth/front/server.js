const express = require("express");
const app = express();
const axios = require("axios");
const nunjucks = require("nunjucks");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const middleware = require("./src/auth/auth.middleware.js");

const REST_API_KEY = "45654acfea156e8a4db2925f2067c009";
const KAKAO_REDIRECT_URI = "http://localhost:8080/auth/kakao/callback";

app.set("view engine", "html");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(middleware.auth);
nunjucks.configure("views", {
  express: app,
});

app.get("/", (req, res, next) => {
  try {
    console.log("req.cookies : ", req.cookies);
    const token = req.cookies.token; // 쿠키에서 토큰을 얻어옴
    let user = null;

    if (token) {
      jwt.verify(token, "web7722", (err, decoded) => {
        if (err) {
          console.log("Invalid Token", err);
        } else {
          user = decoded;
        }
      });
    }

    res.render("index.html", { user }); // 디코딩한 결과를 템플릿에 전달
  } catch (e) {
    next(e);
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", {
    maxAge: 0, // 쿠키 유효시간을 0으로 설정
    domain: "localhost",
    path: "/",
  });
  res.redirect("/");
});

app.get("/auth/kakao/login", (req, res, next) => {
  try {
    const redirectURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    res.redirect(redirectURI);
  } catch (e) {
    console.log("app.get /auth/kakao/login : ", e.message);
    next(e);
  }
});

app.get("/auth/kakao/callback", async (req, res, next) => {
  try {
    // console.log("req.query : ", req.query);

    const { code } = req.query;
    const host = "https://kauth.kakao.com/oauth/token";
    const body = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`;
    const response = await axios.post(host, body, {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    });

    //
    // console.log(response);
    //

    const {
      data: { access_token: ACCESS_TOKEN, refresh_token: REFRESH_TOKEN },
    } = response;

    //
    console.log(
      `{ACCESS_TOKEN : ${ACCESS_TOKEN} || REFRESH_TOKEN : ${REFRESH_TOKEN}`
    );
    //
    const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    // console.log("app.get /auth/kakao/callbak userInfo.data : ", userInfo.data);

    // ------------------- userInfo 받아오기 완료 -----------------------

    // 받아온 userInfo 항목에서 필요한 항목만 뽑아서 우리 백엔드에다가 요청을 해야한다.
    // 그 후 백엔드는 그 userInfo에 대해서 확인 및 조회를 하고 프론트에다가 토큰을 전달한다.
    // 토큰을 받은 프론트는, 클라이언트(브라우저)에게 토큰을 쿠키 형태로 준다.
    // 쿠키가 있을 때의 메인화면과, 쿠키가 없을 때의 메인화면을 응답해주면 된다.
    // 쿠키가 있을 때는 사용자 이름과 닉네임, 프로필을 받아서 뿌려주면 된다.

    // ------------------- userInfo를 json 형태로 back으로 전달 시작-----------------------
    const {
      id: kakao_id,
      properties: {
        nickname: nickname,
        profile_image: profile_image,
        thumbnail_image: thumbnail_image,
      },
    } = userInfo.data;
    const toBackendData = {
      kakao_id,
      nickname,
      profile_image,
      thumbnail_image,
    };
    // console.log("toBackendData : ",toBackendData);
    const jwtToken = await axios.post(
      "http://localhost:8081/users/jwt",
      { toBackendData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("jwtToken.data : ", jwtToken.data);

    res.cookie("token", jwtToken.data, {
      maxAge: 60 * 60 * 1000,
      domain: "localhost",
      path: "/",
    });

    res.status(201);
    res.redirect("/");
  } catch (e) {
    console.log("app.get /auth/kakao/callback : ", e.message);
  }
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(8080, () => {
  console.log("Front Server started at PORT: 8080");
});
