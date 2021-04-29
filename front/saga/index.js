import {all, fork} from 'redux-saga/effects';
import postSaga from './posts';
import userSaga from './user';

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
