// user 사가

import {all, fork, put, call, delay, takeLatest} from 'redux-saga/effects';
import {
  ADD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from '../reducers/user';
import axios from 'axios';

// 유저 사가
export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchBookMark)]);
}

/////////////////////////////////////    LogIn    /////////////////////////////////////
// 액션 리스너
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, login);
}
// 액션 핸들러
function* login(action) {
  console.log('login saga의 실행');
  try {
    // yield call(loginAPI, action.data);
    yield delay(500);
    yield put({type: LOG_IN_SUCCESS, data: action.data}); // action.data = { email, password }
  } catch (e) {
    yield put({type: LOG_IN_FAILURE, error: e});
  }
}
// API
const loginAPI = data => {
  // data = { email, password }
  return axios.post('/user/login', data);
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
    // yield call(logoutAPI, action.data);
    yield delay(500);
    yield put({type: LOG_OUT_SUCCESS, data: action.data}); // action.data = { email, password }
  } catch (e) {
    yield put({type: LOG_OUT_FAILURE, error: e});
  }
}
// API
const logoutAPI = () => {
  return axios.post('/user/logout');
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
