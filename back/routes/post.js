const express = require("express");
const router = express.Router();

// 포스트 라우터

// 게시글 작성
router.post("/", (req, res) => {
  const { title, content, upLoadedImages } = req.body;
  res.send({ title: title, content: content, upLoadedImages: upLoadedImages });
});

module.exports = router;
