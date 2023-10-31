const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const nunjucks = require("nunjucks");
const PORT = 5000;

app.set("view engine", "html");
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.static("uploads"));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "./uploads");
    },
    filename: (req, file, done) => {
      // front라는 서버의 하드디스크에 저장한다.
      // 만약 같은 이름의 파일이 업로드되게 되면 안 겹치게 바꿔서
      // 저장해야한다.
      const ext = path.extname(file.originalname); // .png;
      const filename =
        path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      // 확장자 제거한 원본 네임에다가 날짜를 더한 것. (이렇게 하면 이름과 날짜가 모두 중복될
      // 확률은 매우 희빅하기에)
      done(null, filename);
    },
  }),
});

nunjucks.configure("views", {
  express: app,
});

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.get("/single", (req, res) => {
  res.status(200).render("single");
});

app.get("/array", (req, res) => {
  res.status(200).render("array");
});

// app.post("/single", upload.single("profileImg"), async (req, res) => {
//   try {
//     console.log("req.body : ", req.body);
//     console.log("req.file : ", req.file);
//     // 파일 저장이 완료됐으므로, service 영역을 구현하면 된다.
//     // DB에다가,
//     // path는 필요 없고, originalname, filename을 담으면 될 것이다.
//     res.status(200);
//   } catch (error) {
//     console.log("Front server.js - app.post ERROR : ", error);
//   }
// });

app.post("/array", (req, res) => {
  res.render("array");
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT : ${PORT}`);
});

//
//
//
//
//
//
//
//
//

// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// app.post("upload", upload.single("image"), (req, res) => {
//   res.send("image uploaded");
// });
