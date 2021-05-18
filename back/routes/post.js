const express = require("express");
const { Post, Image, Comment, User } = require("../models");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// 포스트 라우터

//이미지 저장을 위한 임시 스토리지 생성
try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

// 게시글 작성
router.post("/add", async (req, res, next) => {
  const { title, content, upLoadedImages } = req.body;
  // 포스트 생성하기(일단은 이미지를 배제한 채 저장)
  try {
    const post = await Post.create({
      title,
      content,
      UserId: req.user.id,
    });
    if (upLoadedImages) {
      if (Array.isArray(upLoadedImages)) {
        // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        const images = await Promise.all(
          upLoadedImages.map((image) => Image.create({ src: image }))
        );
        await post.addImage(images);
      } else {
        // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Image.create({ src: upLoadedImages });
        await post.addImage(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        { model: User, attributes: ["id", "nickname"] },
        { model: User, as: "PostLiker", attributes: ["id"] },
      ],
    });
    console.log(fullPost);
    return res.status(200).send(fullPost);
  } catch (error) {
    console.error(error);
    return next(error);
  }

  // 방금 저장한 포스트 전체를 보내주기(post-comment-recomment-image를 달아야 한다)
  // const fullPost = await Post.findOne({
  //   where: { id: post.id },
  // });
  // res.status(200).send(post);
});

// 멀터 미들웨어 지정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads"); // 저장할 위치는 upload 폴더다
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

console.log("upload객체", upload);

// 이미지 업로드
router.post("/images", upload.array("image"), async (req, res, next) => {
  console.log("이미지 업로드 접근");
  console.log(req.files);
  // req.files[0].filename);
  res.json(req.files.map((v) => v.filename)); // 파일이름 배열 보내주기
});

module.exports = router;
