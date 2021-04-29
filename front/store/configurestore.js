import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
// import {composeWithDevTools} from 'remote-redux-devtools';
import rootReducer from '../reducers';
import rootSaga from '../saga';

export default configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  // 미들웨어의 선택적 적용(개발에만 쓸 미들웨어)
  const enhancer =
    process.env.NODE_ENV === 'production' // 프로덕션 = 배포모드
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer); //스토어 생성
  sagaMiddleware.run(rootSaga);
  return store;
};
