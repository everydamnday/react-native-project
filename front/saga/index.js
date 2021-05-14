import axios from 'axios';
import {all, fork} from 'redux-saga/effects';
import postSaga from './posts';
import userSaga from './user';

// android
axios.defaults.baseURL = 'http://10.0.2.2:3065';
// ios
// axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
