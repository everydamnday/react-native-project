const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");

//db연동
db.sequelize
  .sync({ force: true }) // 덮어쓰기 옵션(같은 이름의 테이블이 있으면 삭제 후 재생성한다. - 개발모드)
  .then(() => {
    console.log("✅ DB connection success!");
  })
  .catch(() => {
    console.error;
  });

app.use(morgan("dev")); // 네트워크 로그 찍어줌.
app.use(express.json()); // json 형식의 데이터를 해석해서 req.body 넣어줌
app.use(express.urlencoded({ extended: true })); // onsubmit된 데이터를 해석해서 req.body에 넣어줌
app.use(cors({ origin: true, credentials: true })); // 브라우저의 동일 도메인/포트 응답 거부 방지

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
