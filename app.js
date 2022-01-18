const express = require("express");
const multer = require("multer");
const port = process.env.PORT || 3000;

const app = express();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.get("/", (req, res, next) => {
  res.send("hii i am here ");
});

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("single file has been uploaded");
});

app.post("/multiple", upload.array("images", 5), (req, res) => {
  console.log(req.files);
  res.send("multeple file has uploaded successfully");
});

app.listen(port, () => {
  console.log("app is hosting on http://localhost:" + port);
});
