const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const PORT = 8000;
const User = require("./config/user.model.js");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "./uploads");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const filename =
        path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      done(null, filename);
    },
  }),
});

app.use(express.static("uploads"));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.post("/upload", upload.single("profileImg"), async (req, res) => {
  try {
    let data = req.body;
    let user = await User.findOne({
      where: { id: data.id },
    });
    console.log("1 : ", user);
    if (!user) {
      user = await User.create({
        id: data.id,
        name: data.name,
        password: data.password,
        image: req.file.path,
        original_filename: req.file.originalname,
      });
    }
    console.log("2 : ", user);

    const payload = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      image: user.dataValues.image,
    };
    const secretKey = "!Web7722";
    const token = jwt.sign(payload, secretKey);

    console.log("Generated Token : ", token);

    // res.redirect("http://localhost:5000/");
    res.json(token);
    // res.status(201).send("File uploaded successfully");
    // res.redirect가 되고 나서는 response가 종료된다. 따라서 밑에 res.status를 또 쓰면
    // 안 된다.
  } catch (error) {
    console.log("Back-end server.js - app.post Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

async function syncDatabaseAndStartServer() {
  try {
    await User.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Error syncing database or starting server:", error);
  }
}
syncDatabaseAndStartServer();
