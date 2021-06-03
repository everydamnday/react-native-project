const passport = require("passport");
const { User } = require("../models");
const user = require("../models/user");
const local = require("./local");
// const local = require('./local');

module.exports = () => {
  // 초기 로그인 할 때 실행
  passport.serializeUser((user, done) => {
    // local전략의 검증을 통과한 user 객체가 들어온다.
    done(null, user.id); // 그리고 이를 req.session.passport.user = user.id로 저장한다.
  });

  // 로그인 이후 매 요청마다 실행
  // 1 - express.session() 미들웨어가 실행되면서
  //     req.headers.cookie.connect.sid에서 암호화된 세션 id를 조회하고
  //     스토어에서 해당 세션 id를 찾는다. req.session 객체를 초기화 하고 다.
  // 2 - passport.initialize()는 req.session.passport.user를 조회하고
  //     req.__passport.user에 할당한다.
  // 3 - passport.session() req.__passport.user에 할당된 값을
  //     아래 id 인자로 전달하여 deserializeUser를 실행한다.
  //     그리고 복원된 user를 req.user에 최종적으로 할당한다.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user가 생긴다.
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};

// passport.initialize() 미들웨어는 req.session.passport 프로퍼티를 체크하고 user의 값이 여전히 있는지 확인한다.
// passport.session() 미들웨어는 req.session.passport.user에서 발견된 user 프로퍼티를 req.user 오브젝트에 다시 할당한다.
// 이 과정에서 passport.deserializeUser() 함수가 사용된다
