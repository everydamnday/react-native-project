const express = require("express");
const passport = require("passport");
const { User, Post, Comment, Recomment } = require("../models");
const dotenv = require("dotenv");
const router = express.Router();
const bcrypt = require("bcrypt");

// 유저 라우터

// 회원가입 //POST: /user
// 기존 사용자 조회 => 비밀번호 암호화 => 유저테이블 생성 => 완료 응답
router.post("/signin", async (req, res, next) => {
  console.log(req.body);
  const { email, nickname, password, brand, region } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(403).send("이미 사용중인 유저입니다");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      nickname: nickname,
      password: hashedPassword,
      brand: brand,
      region: region,
    });
    user.password = null; // password를 제거한다.
    return res.status(201).send(user); // 회원가입 이후 자동로그인이 되도록 user를 보내준다.
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인 //POST: /user/login
// 패스포트 인증 => 서버 및 사용자 에러 로직 => 패스포트 로그인 => json 유저정보 응답
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // db 조회 error
    if (err) {
      console.error("db조회 에러", err);
      return next(err);
    }
    // db 조회 error의 reason
    if (info) {
      return res.status(401).send(info.reason);
    }
    // serialize의 실행과 그 에러(loginErr) 그리고 콜백 실행
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        include: [
          { model: Post, attributes: ["id"] }, // 유저가 쓴 포스트
          { model: Comment, attributes: ["id"] }, // 유저가 쓴 코멘트
          { model: Recomment, attributes: ["id"] }, // 유저가 쓴 리코멘트
          { model: Post, as: "Bookmarked", attributes: ["id"] }, // 유저가 북마크한 포스트
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

//로그아웃
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
