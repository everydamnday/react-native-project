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
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Post /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// 포스트 불러오기
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
      limit: 5,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: standard_include_Post,
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 포스트 작성
// 포스트 내용 저장 => 이미지 저장 => full객체 응답
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
      include: standard_include_Post,
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
      include: standard_include_Post,
    });
    return res.status(200).send(fullPost);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 포스트 삭제하기
// db에서 삭제하기 => 삭제한 postId 내보내기
router.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
    await Post.destroy({ where: { id: postId } });
    return res.status(200).json({ postId: parseInt(postId, 10) });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 포스트 공유하기
// 공유한 포스트 저장 => 공유 대상 포스트를 찾아서 조인 =>
// 유효성 검사 : 존재하는 포스트? / 내 포스트?
router.post("/share", async (req, res, next) => {
  const { title, content, sharePostId } = req.body;
  try {
    const TargetPost = await Post.findOne({
      where: { id: sharePostId },
      include: [{ model: Post, as: "SharePost" }],
    });
    // 존재하지 않는 포스트인지?
    if (!TargetPost) {
      return res.status(403).send("존재하지 않는 게시글 입니다.");
    }
    // 내가 쓴 글이거나, 내가 쓴걸 공유한 글인지?
    if (
      req.user.id === TargetPost.UserId ||
      (TargetPost.SharePostId && req.user.id === TargetPost.SharePostId.UserId)
    ) {
      return res.status(403).send("내가 쓴 글은 공유할 수 없습니다.");
    }
    // 이미 리트윗 했는지? => 필요한가?
    // 이제 저장
    const sharePost = await Post.create({
      title,
      content,
      UserId: req.user.id,
      SharePostId: sharePostId,
    });
    const fullpost = await Post.findOne({
      where: { id: sharePost.id },
      include: standard_include_Post,
    });
    return res.status(200).send(fullpost);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 포스트 조회하기
// 포스트 see에 user.id를 추가 => 후에 디시리얼라이즈
router.get("/:postId/see", async (req, res, next) => {
  const { postId } = req.params;
  try {
    // post 행에 see에 본사람을 추가한다.
    // 방법 1 : 기존 see 배열을 payload에 추가할 수 있다.
    // 방법 2 : post.findOne({}) 으로 가져온 see 배열을 넣을 수 있다.
    // const post = await Post.findOne({ where: { id: parseInt(postId) } });
    // const SeenPost = await Post.update(
    //   { see: post.see.push({ id: req.user.id }) },
    //   { where: { id: postId } }
    // );
    const post = await Post.findOne({ where: { id: parseInt(postId) } });
    const result = await Post.update(
      { see: post.see + 1 },
      { where: { id: postId } }
    );
    console.log(result[0]);
    if (result[0] === 1) {
      const seenPost = await Post.findOne({
        where: { id: postId },
        include: standard_include_Post,
      });
      // console.log("보기", seenPost);
      return res.status(200).send(seenPost);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Comment //////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// 코멘트 생성하기
// 댓글을 생성 => 포스트를 찾아서 댓글과 연결 => full 객체를 만들어서 postId와 함께 보내주기
router.post("/:postId/comment", async (req, res, next) => {
  const { content, postId } = req.body;
  try {
    // 댓글이 달린 포스트
    const post = await Post.findOne({ where: { id: postId } });
    // 댓글 생성
    const comment = await Comment.create({
      content: content,
      see: 0,
      like: 0,
      UserId: req.user.id,
    });

    // 해당 포스트에 생성한 댓글을 연결시켜 주기
    await post.addComment(comment);

    // full 코멘트 만들어 보내주기
    const resComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        { model: User },
        { model: Recomment, attirbutes: ["id"] },
        { model: User, as: "CommentLiker", attirbutes: ["id"] },
      ],
    });
    return res.status(200).send({ postId: postId, resComment });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 코멘트 수정하기
// 코멘트를 찾아서 업데이트 => 코멘트 풀객체를 찾아서 postId와 함께 전달
router.post("/:postId/:commentId/edit", async (req, res, next) => {
  const { postId, commentId, content } = req.body;
  try {
    const result = await Comment.update(
      { content: content },
      { where: { id: commentId } }
    );
    if (result[0] === 1) {
      const revComment = await Comment.findOne({
        where: { id: commentId },
        include: standard_include_Comment,
      });
      return res.status(200).send({ postId: postId, comment: revComment });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 코멘트 삭제하기
// 해당 코멘트를 찾아서 삭제 => postId commentId를 보내준다.
router.delete("/:postId/:commentId/", async (req, res, next) => {
  const { postId, commentId } = req.params;
  console.log(postId, commentId);
  try {
    const result = await Comment.destroy({ where: { id: commentId } });
    if (result[0] === 1) {
      return res
        .status(200)
        .send({ postId: parseInt(postId), commentId: parseInt(commentId) });
    } else {
      return res.send(400).send("삭제에 실패했습니다");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 포스트 좋아요(현재는 like + 1 => 이후 모델 변경)
// 좋아요한 포스트 찾기 => like 업데이트 하기 => full post 찾아서 보내기
router.get("/:postId/like", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findOne({
      where: { id: postId },
    });
    const result = await Post.update(
      {
        like: post.like + 1,
      },
      { where: { id: postId } }
    );
    // 업데이트가 성공하면 result = [1] 이다.
    if (result[0] === 1) {
      const likePost = await Post.findOne({
        where: { id: postId },
        include: standard_include_Post,
      });
      return res.status(200).send(likePost);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 코멘트 좋아요(현재는 like + 1 => 이후 모델 변경)
// 좋아요한 코멘트 찾기 => 코멘트 like 업데이트 => full comment 객체 찾기 => postId와 함께 full 객체 보내기
router.get("/:postId/:commentId/like", async (req, res, next) => {
  const { postId, commentId } = req.params;
  try {
    const comment = await Comment.findOne({
      where: { id: commentId, PostId: postId },
    });

    const result = await Comment.update(
      {
        like: comment.like + 1,
      },
      { where: { id: commentId, PostId: postId } }
    );

    if (result[0] === 1) {
      const likeComment = await Comment.findOne({
        where: { id: commentId, PostId: postId },
        include: standard_include_Comment,
      });
      return res
        .status(200)
        .send({ comment: likeComment, postId: parseInt(postId) });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 리코멘트 좋아요(현재는 like + 1 => 이후 모델 변경)
// 좋아요한 리코멘트 찾기 => 리코멘트 like 업데이트 => full recomment 객체 찾기 => postId, commentId와 함께 full 객체 보내기
router.get("/:postId/:commentId/like", async (req, res, next) => {
  const { postId, commentId, recommentId } = req.params;
  try {
    const recomment = await Recomment.findOne({
      where: { id: recommentId, CommentId: commentId },
    });

    const result = await Recomment.update(
      {
        like: recomment.like + 1,
      },
      { where: { id: recommentId, CommentId: commentId } }
    );

    if (result[0] === 1) {
      const likeRecomment = await Comment.findOne({
        where: { id: recommentId, CommentId: commentId },
        // include: standard_include_Recomment, 추후 모델 변경 시 적용
      });
      return res
        .status(200)
        .send({ recomment: likeRecomment, commentId, postId });
    }
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

// 표준 Post테이블 조인 모델
const standard_include_Post = [
  { model: User, exclude: ["password"] },
  {
    model: Comment,
    // attributes: ["id", "content"],
    include: [
      { model: User, exclude: ["password"] }, // 코멘트 작성자
      { model: Post, attributes: ["id"] }, // 코멘트가 달린 포스트
      { model: User, as: "CommentLiker", attributes: ["id"] }, // 코멘트를 좋아요 한 유저
      {
        model: Recomment,
        // attributes: ["id", "content"],
        include: [
          { model: User, attributes: ["id", "nickname"] }, // 리코멘트 작성자
          { model: Comment, attributes: ["id"] }, // 리코멘트가 달린 코멘트
          { model: User, as: "RecommentLiker", attributes: ["id"] }, // 리코멘트를 좋아요 한 유저
        ],
      },
    ],
  },
  { model: User, as: "PostLiker", attributes: ["id"] }, // 포스트를 좋아요한 유저
  {
    model: Post,
    as: "SharePost",
    include: [
      { model: User, attributes: { exclude: ["password"] } },
      { model: Image, attributes: ["id", "uri"] },
    ],
  }, // 공유한 대상이 되는 포스트
  {
    model: User,
    as: "Bookmarker",
    attributes: ["id"],
    through: { attirbutes: [] }, // 중앙테이블 자동 불러오기 제거
  },
  { model: Image, attributes: ["id", "uri"] }, // 포스트에 달린 이미지
];
// 표준 User테이블 조인 모델
const standard_include_User = [
  { model: Post, attributes: ["id"] }, // 유저가 쓴 포스트
  { model: Comment, attributes: ["id"] }, // 유저가 쓴 코멘트
  { model: Recomment, attributes: ["id"] }, // 유저가 쓴 리코멘트
  { model: Post, as: "Bookmarked", attributes: ["id"] }, // 유저가 북마크한 포스트
];
// 표준 Comment테이블 조인 모델
const standard_include_Comment = [
  { model: User, exclude: ["password"] }, // 코멘트 작성자
  { model: Post, attributes: ["id"] }, // 코멘트가 달린 포스트
  { model: User, as: "CommentLiker", attributes: ["id"] }, // 코멘트를 좋아요 한 유저
  {
    model: Recomment,
    // attributes: ["id", "content"],
    include: [
      { model: User, attributes: ["id", "nickname"] }, // 리코멘트 작성자
      { model: Comment, attributes: ["id"] }, // 리코멘트가 달린 코멘트
      { model: User, as: "RecommentLiker", attributes: ["id"] }, // 리코멘트를 좋아요 한 유저
    ],
  },
];
// 표준 Recomment테이블 조인 모델
const standard_include_Recomment = [
  { model: User }, // 리코멘트 작성자
  { model: Comment, attributes: ["id"] }, // 리코멘트가 달린 코멘트
  { model: User, as: "RecommentLiker", attributes: ["id"] }, // 리코멘트를 좋아요 한 유저
];
