import axios from 'axios';
import {all, fork} from 'redux-saga/effects';
import postSaga from './posts';
import userSaga from './user';

// android
axios.defaults.baseURL = 'http://10.0.2.2:3065'; // 가상머신 에뮬레이터에서 내 pc의 localhost는 10.0.2.2가 된다. // 안드로이드 에뮬레이터는 가상머신을 띄운다.
// 에뮬레이터가 뜬 상황에서 localhost는 에뮬레이터가 뜬 가상머신을 의미한다.
// device에서 직접 테스트 시, 디바이스는 내 localhost로 요청하게 되는데 이때는 내 컴퓨터 ip 주소를 써야한다. 172. . . .~~

// ios
// axios.defaults.baseURL = 'http://localhost:3065'; // xcode 에뮬레이터는 가상 머신을 띄우되, 사용자의 localhost와 대응시켜준다.(고 봤다)

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
