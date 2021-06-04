// user 리듀서
import produce from 'immer';
import shortId from 'shortid';
import faker, {date} from 'faker/locale/ko';

// 액션변수
////////////////////////////////////////////////    액션 변수   //////////////////////////////////////////////
// 유저 가져오기
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
// 회원가입
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 카카오 로그인
export const KAKAO_LOG_IN_REQUEST = 'KAKAO_LOG_IN_REQUEST';
export const KAKAO_LOG_IN_SUCCESS = 'KAKAO_LOG_IN_SUCCESS';
export const KAKAO_LOG_IN_FAILURE = 'KAKAO_LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 북마크
export const ADD_BOOKMARK_REQUEST = 'ADD_BOOKMARK_REQUEST';
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS';
export const ADD_BOOKMARK_FAILURE = 'ADD_BOOKMARK_FAILURE';
// 내 포스트 REMOVE_POST_TO_ME
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';

/////////////////////////////////////////////////     초기값    ///////////////////////////////////////////
const initialState = {
  me: null,
  logInData: {},
  signUpData: {},
  getUserLoading: false, // 유저 가져오기
  getUserDone: false,
  getUserError: null,
  signInLoading: false, // 회원가입
  signInDone: false,
  signInError: null,
  logInLoading: false, // 로그인, 카카오 로그인
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃
  logOutDone: false,
  logOutError: null,
  addBookMarkLoading: false, // 북마크
  addBookMarkDone: false,
  addBookMarkError: null,
};

//////////////////////////////////////////////  액션 크리에이터  //////////////////////////////////////////////

// 유저 가져오기
export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});
// 회원가입
export const signInRequest = data => ({
  type: SIGN_IN_REQUEST,
  data: data,
});
// 로그인
export const logInRequest = data => ({
  type: LOG_IN_REQUEST,
  data: data,
});
// 카카오 로그인
export const kakaoLoginRequest = () => ({
  type: KAKAO_LOG_IN_REQUEST,
});
// 로그아웃
export const logOutRequest = () => ({
  type: LOG_OUT_REQUEST,
});
// 북마크
export const addBookMarkRequest = data => ({
  type: ADD_BOOKMARK_REQUEST,
  data,
}); // data = post.id
// 내 포스트 addPostToMe
export const addPostToMe = data => ({
  type: ADD_POST_TO_ME,
  data,
});

///////////////////////////////////////  더미생성기  //////////////////////////////////
const dummyUser = data => {
  return {
    id: data.id,
    nickname: data.nickname,
    brand: data.brand,
    region: data.region,
    email: data.email,
    // password: data.password,
    createdAt: data.createdAt,
    PostsId: data.Posts,
    CommentId: data.Comment,
    RecommentId: data.Recomment,
    bookmarkId: data.Bookmarked,
  };
};

///////////////////////////////////////  리듀서  ////////////////////////////////////
const user = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      /////////////////////////////////// GET_USER ///////////////////////////////////
      case GET_USER_REQUEST:
        draft.getUserLoading = true;
        draft.getUserDone = false;
        draft.getUserError = null;
        break;
      case GET_USER_SUCCESS:
        draft.getUserLoading = false;
        draft.getUserDone = true;
        // draft.me = action.data;
        draft.me = dummyUser(action.data);
        break;
      case GET_USER_FAILURE:
        draft.getUserLoading = false;
        draft.getUserError = action.error;
        break;

      /////////////////////////////////// SIGN_IN ///////////////////////////////////
      case SIGN_IN_REQUEST:
        draft.signInLoading = true;
        draft.signInDone = false;
        draft.signInError = null;
        break;
      case SIGN_IN_SUCCESS:
        draft.signInLoading = false;
        draft.signInDone = true;
        // draft.me = action.data;
        draft.me = dummyUser(action.data);
        break;
      case SIGN_IN_FAILURE:
        draft.signInLoading = false;
        draft.signInError = action.error;
        break;

      /////////////////////////////////// LOG_IN ///////////////////////////////////
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      /////////////////////////////////// KAKAO_LOG_IN ///////////////////////////////////
      case KAKAO_LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case KAKAO_LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case KAKAO_LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      /////////////////////////////////// LOG_OUT //////////////////////////////////
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      ///////////////////////////////// ADD_BOOKMARK ////////////////////////////////
      case ADD_BOOKMARK_REQUEST:
        draft.addBookMarkLoading = true;
        draft.addBookMarkDone = false;
        draft.addBookMarkError = null;
        break;
      case ADD_BOOKMARK_SUCCESS:
        draft.addBookMarkLoading = false;
        draft.addBookMarkDone = true;
        draft.me.bookmarkId.push(action.data);
        break;
      case ADD_BOOKMARK_FAILURE:
        draft.addBookMarkLoading = false;
        draft.addBookMarkError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.me.PostsId.push(action.data);
        break;
      case REMOVE_POST_TO_ME:
        draft.me.PostsId = draft.me.PostsId.filter(v => v !== action.data);
        break;
      default:
        break;
    }
  });
};

export default user;
