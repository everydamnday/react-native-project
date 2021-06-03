// user 사가
import {all, fork, put, call, delay, takeLatest} from 'redux-saga/effects';
import {
  ADD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  KAKAO_LOG_IN_SUCCESS,
  KAKAO_LOG_IN_FAILURE,
  KAKAO_LOG_IN_REQUEST,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../reducers/user';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import typecheck from 'type-check';

// 유저 사가
export default function* userSaga() {
  yield all([
    fork(watchGetUser),
    fork(watchSignIn),
    fork(watchLogIn),
    fork(watchKakaoLogIn),
    fork(watchLogOut),
    fork(watchBookMark),
  ]);
}
/////////////////////////////////////    GetUser    /////////////////////////////////////
// 액션 리스너
function* watchGetUser() {
  yield takeLatest(GET_USER_REQUEST, getuser);
}
// 어싱크 스토리지 조회(세션) 및 세션 생성
const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error(e);
  }
};

// 액션 핸들러
function* getuser(action) {
  console.log('getuser saga의 실행');
  try {
    const sid = yield getData('sid'); // 기존에 저장된 세션 Id가 있는지 확인하고 넣어주기
    console.log('sid', sid);
    // sid가 있으면 자동 로그인 요청
    if (sid) {
      // yield setCookie(sid);
      // axios.defaults.headers.Cookies(JSON.parse(sid));
      const res = yield call(getuserAPI, action.data); // 세션 Id가 유효하다면 user를 바로 보내줄 것이고, 아니면 로그인 창으로 보낼 것.
      yield put({type: GET_USER_SUCCESS, data: res.data}); // res.data = { email, nickname, password, brand, region } key-value를 갖는 객체.
    } else {
      //없으면
      yield put({type: GET_USER_SUCCESS, data: null});
    }
  } catch (e) {
    yield put({type: GET_USER_FAILURE, error: e});
  }
}
// API
const getuserAPI = () => {
  return axios.get('/user/user');
};

/////////////////////////////////////    SignIn    /////////////////////////////////////
// 액션 리스너
function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signin);
}
// 액션 핸들러
function* signin(action) {
  console.log('signin saga의 실행');
  try {
    const res = yield call(signinAPI, action.data);
    yield put({type: SIGN_IN_SUCCESS, data: res.data}); // res.data = { email, nickname, password, brand, region } key-value를 갖는 객체.
  } catch (e) {
    yield put({type: SIGN_IN_FAILURE, error: e});
  }
}
// API
const signinAPI = data => {
  // data = { email, password }
  return axios.post('/user/signin', data);
};

/////////////////////////////////////    LogIn    /////////////////////////////////////
// 액션 리스너
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

// 어싱크 스토리지 저장
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
//요청 헤더에 쿠키 넣기
const setCookie = cookie => {
  axios.defaults.headers.Cookie = JSON.parse(cookie);
};

// 액션 핸들러
function* login(action) {
  console.log('login saga의 실행');
  try {
    const res = yield call(loginAPI, action.data);
    // 세션 핸들링 // cookie가 json 객체로 들어온다. 따라서 볼 때는 JSON.stringify, 저장할 때는 js obj로 JSON.parse 해서 쓴다.
    // const [cookie] = yield res.headers['set-cookie']; // 세션 id를 추출한다.
    // yield setCookie(JSON.stringify(cookie)); // 세션 id를 요청헤더에 넣는다.
    // yield storeData('sid', JSON.stringify(cookie)); // 스토리지에 저장한다.
    yield put({type: LOG_IN_SUCCESS, data: res.data}); // res.data = { email, nickname, brand, region }
  } catch (e) {
    yield put({type: LOG_IN_FAILURE, error: e});
  }
}
// API
const loginAPI = data => {
  // data = { email, password }
  return axios.post('/user/login', data, {withCredentials: true});
};

/////////////////////////////////////    kakaoLogIn    /////////////////////////////////////
// 액션 리스너
function* watchKakaoLogIn() {
  yield takeLatest(KAKAO_LOG_IN_REQUEST, kakaologin);
}
// 액션 핸들러
function* kakaologin() {
  console.log('kakaologin saga의 실행');
  try {
    const res = yield call(kakaologinAPI);
    console.log(res);
    yield put({type: KAKAO_LOG_IN_SUCCESS, data: res.data}); // res.data = { email, nickname, brand, region }
  } catch (e) {
    yield put({type: KAKAO_LOG_IN_FAILURE, error: e});
  }
}
// API
const kakaologinAPI = () => {
  return axios.get('/user/kakao/login');
};

/////////////////////////////////////    LogOut    /////////////////////////////////////
// 액션 리스너
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}
// 액션 핸들러
function* logout(action) {
  console.log('logout saga의 실행');
  try {
    yield call(logoutAPI, action.data);
    // axios.defaults.headers.Cookie = '';
    // yield delay(500);
    yield put({type: LOG_OUT_SUCCESS, data: action.data}); // action.data = { email, password }
  } catch (e) {
    yield put({type: LOG_OUT_FAILURE, error: e});
  }
}
// API
const logoutAPI = () => {
  return axios.get('/user/logout');
};

/////////////////////////////////////    BookMark    /////////////////////////////////////
// 액션 리스너
function* watchBookMark() {
  yield takeLatest(ADD_BOOKMARK_REQUEST, bookmark);
}
// 액션 핸들러
function* bookmark(action) {
  console.log('bookmark saga의 실행');
  try {
    // yield call(bookmarkAPI, action.data);
    yield delay(500);
    yield put({type: ADD_BOOKMARK_SUCCESS, data: action.data}); // action.data = post.id
  } catch (e) {
    yield put({type: ADD_BOOKMARK_FAILURE, error: e});
  }
}
// API
const bookmarkAPI = data => {
  return axios.post('/user/bookmark', data);
};
