const express = require("express");
const router = express.Router();

// 유저 라우터

//회원가입
router.post("/", (req, res) => {
  const { title, content, upLoadedImages } = req.body;
  res.send({ title: title, content: content, upLoadedImages: upLoadedImages });
});

// 로그인
router.post("/", (req, res) => {
  const { title, content, upLoadedImages } = req.body;
  res.send({ title: title, content: content, upLoadedImages: upLoadedImages });
});

module.exports = router;
