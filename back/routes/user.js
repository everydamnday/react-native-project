const express = require("express");
const passport = require("passport");
const { User, Post, Comment, Recomment } = require("../models");
const dotenv = require("dotenv");
const router = express.Router();
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
var onHeaders = require("on-headers");

// 유저 라우터

// 유져 가져오기 //GET /user
router.get("/user", async (req, res) => {
  console.log("req session", req.session.cookie, "req.user", req.user);
  if (req.user) {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
      include: [
        { model: Post, attributes: ["id"] }, // 유저가 쓴 포스트
        { model: Comment, attributes: ["id"] }, // 유저가 쓴 코멘트
        { model: Recomment, attributes: ["id"] }, // 유저가 쓴 리코멘트
        { model: Post, as: "Bookmarked", attributes: ["id"] }, // 유저가 북마크한 포스트
      ],
    });
    return res.send(fullUserWithoutPassword);
  } else {
    return res.send(null);
  }
});

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
      // 인증되었는지
      console.log("req.session", req.session);
      console.log("req.user", req.user);

      // onHeaders(res, function () {
      //   // knock yourself out
      //   console.log(res.getHeader("set-cookie"));
      // });
      // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3065");
      // res.setHeader("Access-Control-Allow-Credentials", "true");
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

//로그아웃
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  // req.session.save();
  res.send("ok");
});

// 리다이렉트 uri
const REST_API_KEY = "1cbd75064aeeece9584e750dee323a1d";
const REDIRECT_URI = "http://localhost:3060/users/kakao/permit";

// 카카오 로그인 과정
// GET http://localhost:4000/users/kakao/start => 로그인 스타트 => 서버 라우터
// GET https://kauth.kakao.com/oauth/authorize => 인가코드 요청 => 사용자 동의 => 리다이렉트
// GET http://localhost:4000/users/kakao/permit => 인가코드 발급 => 쿼리에 옴
// POST https://kauth.kakao.com/oauth/token => 엑세스, 리프레시 토큰 요청
// POST https://kapi.kakao.com/v2/user/me => 유저 정보 요청

//카카오톡 로그인1 시작 및 동의
router.get("/kakao/start", (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: ["profile", "account_email"],
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  // 사용자 동의 화면을 띄워주기 위한 response
  return res.send(finalUrl);
});

//카카오톡 로그인2 동의 후 사용자정보 얻기
router.get("/kakao/login", async (req, res) => {
  // 받아온 인가 코드
  const { code } = req.query;
  // 인가 코드로 액세스 토큰(하루), 리프레시 토큰(2주~1달짜리) 발급받기
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    // 발급받은 엑세스 토큰으로 사용자 정보 가져오기
    const getUserUrl = "https://kapi.kakao.com/v2/user/me";
    const userData = await (
      await fetch(getUserUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    // 사용자로 인증할만한 이메일입니까?
    const valid_email = userData.kakao_account.is_email_valid;
    const verified_email = userData.kakao_account.is_email_verified;
    if (!valid_email && !verified_email) {
      // 유효하지 않은 이메일이거나, 인증된 이메일이 아니라면 로그인 창으로 보내줌
      return res.redirect("/login");
    }
    const { thumbnail_image, nickname } = userData.properties;
    const { email } = userData.kakao_account;
    // 얻은 유저 정보를 db에 저장
    let user = await User.findOne({ email: email });
    if (!user) {
      user = await User.create({
        avatarUrl: thumbnail_image,
        name: nickname,
        username: nickname,
        email: email,
        password: "",
        socialOnly: true,
        brand: "",
        region: "",
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
});

module.exports = router;
