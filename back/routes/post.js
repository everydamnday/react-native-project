const express = require("express");
const { Post } = require("../models");
const router = express.Router();

// 포스트 라우터

// 게시글 작성
router.post("/add", async (req, res) => {
  const { title, content, upLoadedImages } = req.body;

  const post = await Post.create({});
  res.send({ title: title, content: content, upLoadedImages: upLoadedImages });
});

module.exports = router;
