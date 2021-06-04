const express = require("express");
const { Post, Image, Comment, User, Recomment } = require("../models");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const { query } = require("express");
const { Op } = require("sequelize");
require("dotenv").config();

// 포스트 라우터

// 게시글 불러오기
router.get(`/posts/:lastId`, async (req, res, next) => {
  try {
    const where = {};
    const { lastId } = req.params; // string
    if (parseInt(lastId, 10) !== 0) {
      where.id = { [Op.lt]: parseInt(lastId, 10) };
    }
    // 15개 포스트(0~14, DESC)가 있을 때,
    // 첫 요청: 14, 13, 12(lastId) : 첫요청은 where가 없다. 따라서 최신순에서 3개만 불러온다.
    // 둘째 요청: 11, 10, 9 ([Op.lt]: lastId =>  all < 12, limit 3)
    const posts = await Post.findAll({
      where,
      limit: 3,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: standard_include,
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 게시글 작성
router.post("/add", async (req, res, next) => {
  console.log("req.session", req.session);
  const { title, content, upLoadedImages } = req.body;
  // 포스트 생성하기
  try {
    // 포스트 저장
    const post = await Post.create({
      title,
      content,
      UserId: req.user.id,
    });
    // 첨부 이미지 저장
    if (upLoadedImages) {
      // console.log("서버로 들어온 이미지배열", upLoadedImages);
      // 늘 배열로 들어옴 1개일 때 = [{uri : 제로초.png}], 여러개 [{uri : 제로초.png},{uri : 제로초.png}]
      const images = await Promise.all(
        upLoadedImages.map((image) => Image.create({ uri: image.uri }))
      );
      await post.addImages(images); // 이미지가 배열이든 아니든 addImages나 addImage 둘다 된다.
    }
    // 보내줄 포스트 객체 조회
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: standard_include,
    });
    // console.log(fullPost);
    return res.status(200).send(fullPost);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//s3 설정
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID,
  region: "ap-northeast-2",
});

// 멀터 미들웨어 지정
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "sly-image-storage",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`); // 2021051900_이미지.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// 이미지 업로드
router.post("/images", upload.array("image"), async (req, res, next) => {
  res.json(req.files.map((v) => ({ uri: v.location }))); // multer-s3는 location에 있다.
  // res.json(req.files.map((v) => v.filename)); // 파일이름 배열 보내주기(일반멀터)
});

// 포스트 수정하기
// 수정내용, 이미지 업데이트 => 수정된 post와 image 조인 => 수정된 fullpost 객체 내보내기
router.post("/edit", async (req, res, next) => {
  const { postId, title, content, upLoadedImages } = req.body;
  const newAddedImages = upLoadedImages.filter((v) => v?.id === undefined);
  // 포스트 업데이트
  try {
    await Post.update(
      { title: title, content: content },
      { where: { id: postId } }
    );
    const post = await Post.findOne({ where: { id: postId } });
    if (newAddedImages) {
      const Images = await Promise.all(
        newAddedImages.map((image) => Image.create({ uri: image.uri }))
      );
      await post.addImages(Images); // addImages not addImage 왜냐하면 Images는 Image 인스턴스 배열이니까
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: standard_include,
    });
    return res.status(200).send(fullPost);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;

//이미지 저장을 위한 임시 메모리 스토리지 생성 XXXXXXXXXXXXXXXXXXXX => S3 로 대체됨
// try {
//   fs.accessSync("uploads");
// } catch (error) {
//   console.log("uploads 폴더가 없으므로 생성합니다.");
//   fs.mkdirSync("uploads");
// }

// 표준 Post테이블 조인 모델 : include
const standard_include = [
  { model: User, attributes: ["id", "nickname"] },
  {
    model: Comment,
    attributes: ["id", "content"],
    include: [
      { model: User, attributes: ["id", "nickname"] }, // 코멘트 작성자
      { model: Post, attributes: ["id"] }, // 코멘트가 달린 포스트
      { model: User, as: "CommentLiker", attributes: ["id"] }, // 코멘트를 좋아요 한 유저
      {
        model: Recomment,
        attributes: ["id", "content"],
        include: [
          { model: User, attributes: ["id", "nickname"] }, // 리코멘트 작성자
          { model: Comment, attributes: ["id"] }, // 리코멘트가 달린 코멘트
          { model: User, as: "RecommentLiker", attributes: ["id"] }, // 리코멘트를 좋아요 한 유저
        ],
      },
    ],
  },
  { model: User, as: "PostLiker", attributes: ["id"] }, // 포스트를 좋아요한 유저
  { model: Image, attributes: ["id", "uri"] }, // 포스트에 달린 이미지
];
