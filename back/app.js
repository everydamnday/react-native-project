const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passport = require("passport");
const passportConfig = require("./passport");
require("dotenv").config();

const app = express();

//db연동
db.sequelize
  .sync() // 덮어쓰기 옵션(같은 이름의 테이블이 있으면 삭제 후 재생성한다. - 개발모드)
  .then(() => {
    console.log("✅ DB connection success!");
  })
  .catch(() => {
    console.error;
  });

//패스포트 설정파일
passportConfig();

app.use(morgan("dev")); // 네트워크 로그 찍어줌.
app.use(express.json()); // json 형식의 데이터를 해석해서 req.body 넣어줌
app.use(express.urlencoded({ extended: true })); // onsubmit된 데이터를 해석해서 req.body에 넣어줌
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: true, credentials: true })); // 브라우저의 동일 도메인/포트 응답 거부 방지
app.use(
  session({
    secret: process.env.COOKIE_SECRET, //
    resave: false, //
    saveUninitialized: true,
    // store: some_storage,
  })
); // req.session 을 설정해 준다. 이 값은 세션저장소(디폴트로 메모리)에 저장되며 서버가 리로드 되더라도 여전히 남아있게 된다.
// req.session = {cookie : {originalMaxAge: null, expires : null, httpOnly : true, path : "/"}}
app.use(passport.initialize());
app.use(passport.session()); // passport.session() 미들웨어를 통해 req.user에 해당 user객체가 붙는다.

//라우터
app.use("/post", postRouter);
app.use("/user", userRouter);

const PORT = 3065;
// 내 ip "172.30.1.29";
app.listen(PORT, () => {
  console.log(
    `/////////////////////////////////////////////////
  ✅ started server on http://localhost:${PORT} 😀
/////////////////////////////////////////////////`
  );
});
