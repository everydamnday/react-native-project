const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        console.log("username은 들어옵니까?", email);
        try {
          // email 검사(db에서 해당 email을 조회)
          const user = await db.User.findOne({ where: { email } });
          console.log("local전략 내 db 조회", user);
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다" });
          }
          // pwd 검사(bcrypt로 대조)
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, {
              reason: "비밀번호가 일치하지 않습니다",
            });
          }
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
