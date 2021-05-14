// post 사가
import {all, fork, put, call, delay, takeLatest} from 'redux-saga/effects';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_RECOMMENT_SUCCESS,
  ADD_RECOMMENT_FAILURE,
  ADD_RECOMMENT_REQUEST,
  DELETE_POST_REQUEST,
  SHARE_POST_REQUEST,
  SHARE_POST_FAILURE,
  SHARE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_RECOMMENT_REQUEST,
  DELETE_RECOMMENT_SUCCESS,
  DELETE_RECOMMENT_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_RECOMMENT_REQUEST,
  EDIT_RECOMMENT_SUCCESS,
  EDIT_RECOMMENT_FAILURE,
} from '../reducers/posts';
import axios from 'axios';
import {ADD_POST_TO_ME} from '../reducers/user';

//포스트 사가
export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchEditPost),
    fork(watchDeletePost),
    fork(watchSharePost),
    fork(watchLikePost),
    fork(watchAddComment),
    fork(watchEditComment),
    fork(watchDeleteComment),
    fork(watchAddReComment),
    fork(watchEditReComment),
    fork(watchDeleteReComment),
  ]);
}

/////////////////////////////////////     LoadPost      ///////////////////////////////////////////
//액션 리스너
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadpost);
}
//액션 핸들러
function* loadpost(action) {
  console.log('loadpost의 실행');
  try {
    // yield call(loadpostAPI, action.data);
    // yield delay(300);
    yield put({type: LOAD_POST_SUCCESS, data: action.data}); // data = 5
  } catch (e) {
    console.log(e);
    yield put({type: LOAD_POST_FAILURE, error: e.response.data});
  }
}

//API
const loadpostAPI = data => {
  // data = {title, content, Images}
  return axios.get('/posts');
};

/////////////////////////////////////     AddPost      ///////////////////////////////////////////
//액션 리스너
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addpost);
}
//액션 핸들러
function* addpost(action) {
  console.log('addpost의 실행');
  try {
    const res = yield call(addpostAPI, action.data);
    // yield delay(1000);
    console.log(res.data);
    yield put({type: ADD_POST_SUCCESS, data: res.data}); // data = {title, content, Images}
    // yield put({type : ADD_POST_TO_ME, data : res.data.id})
  } catch (e) {
    console.log(e);
    yield put({type: ADD_POST_FAILURE, error: e.response.data});
  }
}

//API
const addpostAPI = data => {
  // data = {title, content, Images}
  return axios.post('/post', data);
};

////////////////////////////////////     EditPost      ///////////////////////////////////////////
//액션 리스너
function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editpost);
}
//액션 핸들러
function* editpost(action) {
  console.log('editpost의 실행');
  try {
    // yield call(editpostAPI, action.data);
    // yield delay(1000);
    yield put({type: EDIT_POST_SUCCESS, data: action.data}); // data = {  postId, title, content, upLoadedImages }
  } catch (e) {
    console.log(e);
    yield put({type: EDIT_POST_FAILURE, error: e.response.data});
  }
}

//API
const editpostAPI = data => {
  // data = {  postId, title, content, upLoadedImages }
  return axios.post(`/post/${data.postId}/edit`, data);
};

/////////////////////////////////////     DeletePost      ///////////////////////////////////////////
//액션 리스너
function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletepost);
}
//액션 핸들러
function* deletepost(action) {
  console.log('deletepost의 실행');
  try {
    // yield call(deletepostAPI, action.data);
    // yield delay(1000);
    yield put({type: DELETE_POST_SUCCESS, data: action.data}); // data = { postId : post.id }
  } catch (e) {
    console.log(e);
    yield put({type: DELETE_POST_FAILURE, error: e});
  }
}

//API
const deletepostAPI = data => {
  // data = {title, content, Images}
  return axios.delete(`/post/${data.postId}`);
};

/////////////////////////////////////     SharePost      ///////////////////////////////////////////
//액션 리스너
function* watchSharePost() {
  yield takeLatest(SHARE_POST_REQUEST, sharepost);
}
//액션 핸들러
function* sharepost(action) {
  console.log('sharepost의 실행');
  try {
    // yield call(sharepostAPI, action.data);
    // yield delay(1000);
    yield put({type: SHARE_POST_SUCCESS, data: action.data}); // data = {title, content, sharePostId : postId}
  } catch (e) {
    console.log(e);
    yield put({type: SHARE_POST_FAILURE, error: e.response.data});
  }
}

//API
const sharepostAPI = data => {
  // data = {title, content, Images}
  return axios.post(`/post/${data.postId}/share`, data);
};

/////////////////////////////////////     AddComment      ///////////////////////////////////////////
//액션 리스너
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addcomment);
}
//액션 핸들러
function* addcomment(action) {
  console.log('addcomment 실행');
  try {
    // yield call(addcommentAPI, action.data);
    // yield delay(1000);
    yield put({type: ADD_COMMENT_SUCCESS, data: action.data}); // data = {content : comment, postId : post.id}
  } catch (e) {
    console.log(e);
    yield put({type: ADD_COMMENT_FAILURE, error: e.response});
  }
}

//API
const addcommentAPI = data => {
  // data = {content : comment, postId : post.id}
  return axios.post(`/post/${data.postId}/comment`, data);
};

////////////////////////////////////     EditComment      ///////////////////////////////////////////
//액션 리스너
function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT_REQUEST, editcomment);
}
//액션 핸들러
function* editcomment(action) {
  console.log('editcomment의 실행');
  try {
    // yield call(editcommentAPI, action.data);
    // yield delay(1000);
    yield put({type: EDIT_COMMENT_SUCCESS, data: action.data}); // data = {  postId, commentId: comment.id, content: text }
  } catch (e) {
    console.log(e);
    yield put({type: EDIT_COMMENT_FAILURE, error: e.response.data});
  }
}

//API
const editcommentAPI = data => {
  // data = {  postId, commentId: comment.id, content: text }
  return axios.post(`/post/${data.postId}/${data.commentId}/edit`, data);
};

//////////////////////////////////////     DeleteComment      ///////////////////////////////////////////
//액션 리스너
function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deletecomment);
}
//액션 핸들러
function* deletecomment(action) {
  console.log('deletecomment 실행');
  try {
    // yield call(deletecommentAPI, action.data);
    // yield delay(1000);
    yield put({type: DELETE_COMMENT_SUCCESS, data: action.data}); // data = {postId: postId, commentId: commentId}
  } catch (e) {
    console.log(e);
    yield put({type: DELETE_COMMENT_FAILURE, error: e.response.data});
  }
}

//API
const deletecommentAPI = data => {
  // data = {title, content, Images}
  return axios.delete(`/post/${data.postId}/${data.commentId}`);
};

/////////////////////////////////////     AddReComment      ///////////////////////////////////////////
//액션 리스너
function* watchAddReComment() {
  yield takeLatest(ADD_RECOMMENT_REQUEST, addrecomment);
}
//액션 핸들러
function* addrecomment(action) {
  console.log('addrecomment 실행');
  try {
    // yield call(addrecommentAPI, action.data);
    // yield delay(1000);
    yield put({type: ADD_RECOMMENT_SUCCESS, data: action.data}); // data = {content : comment, postId : post.id, commentId: targetCommentId}
  } catch (e) {
    console.log(e);
    yield put({type: ADD_RECOMMENT_FAILURE, error: e.response});
  }
}

//API
const addrecommentAPI = data => {
  // data = {content : comment, postId : post.id, commentId: targetCommentId}
  return axios.post(`/post/${data.postId}/${data.commentId}/recomment`, data);
};

////////////////////////////////////     EditReComment      ///////////////////////////////////////////
//액션 리스너
function* watchEditReComment() {
  yield takeLatest(EDIT_RECOMMENT_REQUEST, editrecomment);
}
//액션 핸들러
function* editrecomment(action) {
  console.log('editrecomment의 실행');
  try {
    // yield call(editrecommentAPI, action.data);
    // yield delay(1000);
    yield put({type: EDIT_RECOMMENT_SUCCESS, data: action.data}); // data = {  postId, commentId, recommentId: recomment.id, content: text }
  } catch (e) {
    console.log(e);
    yield put({type: EDIT_RECOMMENT_FAILURE, error: e.response.data});
  }
}

//API
const editrecommentAPI = data => {
  // data = {  postId, commentId, recommentId: recomment.id, content: text }
  return axios.post(
    `/post/${data.postId}/${data.commentId}/${data.recommentId}/edit`,
    data,
  );
};

//////////////////////////////////////     DeleteReComment      ///////////////////////////////////////////
//액션 리스너
function* watchDeleteReComment() {
  yield takeLatest(DELETE_RECOMMENT_REQUEST, deleterecomment);
}
//액션 핸들러
function* deleterecomment(action) {
  console.log('deleterecomment 실행');
  try {
    // yield call(deleterecommentAPI, action.data);
    // yield delay(1000);
    yield put({type: DELETE_RECOMMENT_SUCCESS, data: action.data}); // data = {postId: postId, commentId: commentId, recommentId: recommentId}
  } catch (e) {
    console.log(e);
    yield put({type: DELETE_RECOMMENT_FAILURE, error: e.response.data});
  }
}

//API
const deleterecommentAPI = data => {
  // data = {title, content, Images}
  return axios.delete(
    `/post/${data.postId}/${data.commentId}/${data.recommentId}`,
  );
};

/////////////////////////////////////     LikePost      ///////////////////////////////////////////
//액션 리스너
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likepost);
}
//액션 핸들러
function* likepost(action) {
  console.log('likepost의 실행');
  try {
    // yield call(likepostAPI, action.data);
    // yield delay(1000);
    yield put({type: LIKE_POST_SUCCESS, data: action.data}); // action.data = id
  } catch (e) {
    console.log(e);
    yield put({type: LIKE_POST_FAILURE, error: e.response.data});
  }
}

//API
const likepostAPI = data => {
  // data = action.data = post.id
  return axios.post(`/post/${data}/like`);
};
