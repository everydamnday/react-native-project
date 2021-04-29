// user 리듀서
import produce from 'immer';
import shortId from 'shortid';
import faker, {date} from 'faker/locale/ko';

// 액션변수
////////////////////////////////////////////////    액션 변수   //////////////////////////////////////////////
// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 북마크
export const ADD_BOOKMARK_REQUEST = 'ADD_BOOKMARK_REQUEST';
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS';
export const ADD_BOOKMARK_FAILURE = 'ADD_BOOKMARK_FAILURE';
// 내 포스트
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

/////////////////////////////////////////////////     초기값    ///////////////////////////////////////////
const initialState = {
  me: null,
  logInData: {},
  signUpData: {},
  logInLoading: false, // 로그인
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
// 로그인
export const logInRequest = data => ({
  type: LOG_IN_REQUEST,
  data: data,
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
    id: shortId.generate(),
    nickname: faker.name.findName(),
    brand: 'GS25',
    region: '산본',
    email: data.email,
    password: data.password,
    createdAt: faker.date.recent(),
    PostsId: [],
    bookmarkId: [],
  };
};

///////////////////////////////////////  리듀서  ////////////////////////////////////
const user = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
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
      default:
        break;
    }
  });
};

export default user;
