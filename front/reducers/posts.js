//////////////////////////////////////////////    posts 리듀서    ////////////////////////////////////////
import shortId from 'shortid';
import faker from 'faker/locale/ko';
import produce from 'immer';
import {random} from 'faker/locale/ko';
import {isPlainObject} from 'immer/dist/internal';

// 날짜 만들기
const year = new Date().getFullYear();
const month = String(new Date().getMonth() + 1);
const day = new Date().getDate();
const date = `${year}-${month}-${day}`;

/////////////////////////////////////////////////     초기값    ///////////////////////////////////////////
const initialState = {
  mainPosts: [],
  upLoadedImages: [], // 이미지 업로드를 위한 임시상태
  loadPostLoading: false, // 포스트 생성
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false, // 포스트 생성
  addPostDone: false,
  addPostError: null,
  editPostLoading: false, // 포스트 수정
  editPostDone: false,
  editPostError: null,
  deletePostLoading: false, // 포스트 삭제
  deletePostDone: false,
  deletePostError: null,
  sharePostLoading: false, // 포스트 공유
  sharePostDone: false,
  sharePostError: null,
  addCommentLoading: false, // 코멘트 생성
  addCommentDone: false,
  addCommentError: null,
  editCommentLoading: false, // 코멘트 수정
  editCommentDone: false,
  editCommentError: null,
  deleteCommentLoading: false, // 코멘트 삭제
  deleteCommentDone: false,
  deleteCommentError: null,
  addReCommentLoading: false, // 리코멘트 생성
  addReCommentDone: false,
  addReCommentError: null,
  editReCommentLoading: false, // 리코멘트 수정
  editReCommentDone: false,
  editReCommentError: null,
  deleteReCommentLoading: false, // 리코멘트 삭제
  deleteReCommentDone: false,
  deleteReCommentError: null,
  likePostLoading: false, // 포스트 좋아요
  likePostDone: false,
  likePostError: null,
};

// 액션 변수
////////////////////////////////////////////////    액션 변수   //////////////////////////////////////////////
// 포스트 로드
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
// 포스트 생성
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
// 포스트 수정
export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';
// 포스트 삭제
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
// 포스트 공유하기
export const SHARE_POST_REQUEST = 'SHARE_POST_REQUEST';
export const SHARE_POST_SUCCESS = 'SHARE_POST_SUCCESS';
export const SHARE_POST_FAILURE = 'SHARE_POST_FAILURE';
// 코멘트 생성
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
// 코멘트 수정
export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';
// 코멘트 삭제
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';
// 리코멘트 생성
export const ADD_RECOMMENT_REQUEST = 'ADD_RECOMMENT_REQUEST';
export const ADD_RECOMMENT_SUCCESS = 'ADD_RECOMMENT_SUCCESS';
export const ADD_RECOMMENT_FAILURE = 'ADD_RECOMMENT_FAILURE';
// 리코멘트 수정
export const EDIT_RECOMMENT_REQUEST = 'EDIT_RECOMMENT_REQUEST';
export const EDIT_RECOMMENT_SUCCESS = 'EDIT_RECOMMENT_SUCCESS';
export const EDIT_RECOMMENT_FAILURE = 'EDIT_RECOMMENT_FAILURE';
// 리코멘트 삭제
export const DELETE_RECOMMENT_REQUEST = 'DELETE_RECOMMENT_REQUEST';
export const DELETE_RECOMMENT_SUCCESS = 'DELETE_RECOMMENT_SUCCESS';
export const DELETE_RECOMMENT_FAILURE = 'DELETE_RECOMMENT_FAILURE';
// 포스트 좋아요
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
// 이미지 업로드 & 제거
export const UPLOAD_IMAGE_ADD = 'UPLOAD_IMAGE_ADD';
export const UPLOAD_IMAGE_REMOVE = 'UPLOAD_IMAGE_REMOVE';

//////////////////////////////////////////////  액션 크리에이터  //////////////////////////////////////////////
// 포스트 로드(비동기)
export const loadPostRequest = data => ({
  type: LOAD_POST_REQUEST,
  data,
}); // data = 5;
// 포스트 생성(비동기)
export const addPostRequest = data => ({
  type: ADD_POST_REQUEST,
  data,
}); // data = { postId : post.id }
// 포스트 수정(비동기) editPostRequest
export const editPostRequest = data => ({
  type: EDIT_POST_REQUEST,
  data,
}); // data = {  postId, title, content, upLoadedImages }
// 포스트 삭제하기(비동기)
export const deletePostRequest = data => ({
  type: DELETE_POST_REQUEST,
  data,
}); // data = { postId : post.id }
// 포스트 공유하기(비동기)
export const sharePostRequest = data => ({
  type: SHARE_POST_REQUEST,
  data,
});

// 댓글 생성(비동기)
export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
}); // data = { content : comment, postId : post.id }
// 댓글 수정하기(비동기)editCommentRequest
export const editCommentRequest = data => ({
  type: EDIT_COMMENT_REQUEST,
  data,
}); // data = { commentId : comment.id }
// 댓글 삭제하기(비동기)
export const deleteCommentRequest = data => ({
  type: DELETE_COMMENT_REQUEST,
  data,
}); // data = { commentId : comment.id }

// 대댓글 생성(비동기)
export const addReComment = data => ({
  type: ADD_RECOMMENT_REQUEST,
  data,
}); // data = { content: comment, postId: post.id, commentId: targetCommentId }
// 대댓글 수정 editReCommentRequest
export const editReCommentRequest = data => ({
  type: EDIT_RECOMMENT_REQUEST,
  data,
});
// 대댓글 삭제(비동기)
export const deleteReCommentRequest = data => ({
  type: DELETE_RECOMMENT_REQUEST,
  data,
}); // data = { recommentId : recomment.id }

// 포스트 좋아요(비동기)
export const likePost = data => ({
  type: LIKE_POST_REQUEST,
  data,
}); // data = post.id
// 이미지 업로드(동기)
export const imageUpLoad = data => ({
  type: UPLOAD_IMAGE_ADD,
  data,
}); // data = uploadImage = [이미지 객체의 배열]
// 업로드 이미지 제거(동기)
export const imageRemove = () => ({
  type: UPLOAD_IMAGE_REMOVE,
});

/////////////////////////////////////////////////  더미생성기  ////////////////////////////////////////////
const dummyLoadPost = number => {
  return initialState.mainPosts.concat(
    Array(number)
      .fill()
      .map((v, i) => ({
        id: shortId.generate(),
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        Images: [
          {id: shortId.generate(), uri: faker.random.image()},
          {id: shortId.generate(), uri: faker.random.image()},
        ],
        User: {
          id: shortId.generate(),
          nickname: faker.name.findName(),
          brand: 'GS25',
          region: faker.address.city(),
        },
        see: 0,
        like: 0,
        Comments: [
          {
            id: shortId.generate(),
            content: faker.lorem.sentence(3),
            like: 0,
            see: 0,
            User: {
              id: shortId.generate(),
              nickname: faker.name.findName(),
              brand: 'Emart24',
              region: faker.address.city(),
            },
            createdAt: date,
            Recomments: [
              {
                id: shortId.generate(),
                content: faker.lorem.sentence(2),
                like: 0,
                User: {
                  id: shortId.generate(),
                  nickname: faker.name.findName(),
                  brand: '7ELEVEN',
                  region: faker.address.city(),
                },
                createdAt: date,
              },
            ],
          },
        ],
        createdAt: date,
        sharePostId: null,
      })),
  );
};
const dummyPost = data => ({
  id: shortId.generate(),
  title: data.title,
  content: data.content,
  Images: data.upLoadedImages,
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
    brand: 'GS25',
    region: '군포',
  },
  see: 0,
  like: 0,
  Comments: [
    {
      id: shortId.generate(),
      content: '댓글1',
      like: 0,
      see: 0,
      User: {
        id: shortId.generate(),
        nickname: 'IVY',
        brand: 'Emart24',
        region: '산본',
      },
      createdAt: date,
      Recomments: [
        {
          id: shortId.generate(),
          content: '예시용 리코멘트',
          like: 0,
          User: {
            id: shortId.generate(),
            nickname: '크로아상',
            brand: '7ELEVEN',
            region: '산본중앙로점',
          },
          createdAt: date,
        },
      ],
    },
  ],
  createdAt: date,
  sharePostId: data.sharePostId || null,
});
const dummyComment = data => ({
  id: shortId.generate(),
  content: data.content,
  like: 0,
  see: 0,
  User: {
    // 추후 서버에서 받은 request.user로 대체
    id: shortId.generate(),
    nickname: faker.name.findName(),
    brand: 'CU',
    region: '산본역사점',
  },
  createdAt: date,
  Recomments: [],
});
const dummyReComment = data => ({
  id: shortId.generate(),
  content: data.content,
  like: 0,
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
    brand: '7ELEVEN',
    region: '산본중앙로점',
  },
  createdAt: date,
});

//////////////////////////////////////////////////  리듀서  ////////////////////////////////////////////////
const posts = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = draft.mainPosts.concat(dummyLoadPost(action.data)); // 배열의 앞에다 넣는다.
        draft.fullPost = draft.mainPosts.length >= 30; // 30개 이상일 때 더 이상 불러오지 않음.
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostDone = false;
        draft.loadPostError = action.error;
        break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.upLoadedImages = [];
        draft.mainPosts.unshift(dummyPost(action.data)); // 배열의 앞에다 넣는다.
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostDone = false;
        draft.addPostError = action.error;
        break;

      case EDIT_POST_REQUEST:
        draft.editPostLoading = true;
        draft.editPostDone = false;
        draft.editPostError = null;
        break;
      case EDIT_POST_SUCCESS:
        draft.editPostLoading = false;
        draft.editPostDone = true;
        draft.upLoadedImages = [];
        const editPostIndex = draft.mainPosts.findIndex(
          p => p.id === action.data.postId,
        );
        draft.mainPosts[editPostIndex] = dummyPost(action.data);
        break;
      case EDIT_POST_FAILURE:
        draft.editPostLoading = false;
        draft.editPostDone = false;
        draft.editPostError = action.error;
        break;

      case DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;
      case DELETE_POST_SUCCESS:
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          p => p.id !== action.data.postId,
        );
        break;
      case DELETE_POST_FAILURE:
        draft.deletePostLoading = false;
        draft.deletePostDone = false;
        draft.deletePostError = action.error;
        break;

      case SHARE_POST_REQUEST:
        draft.sharePostLoading = true;
        draft.sharePostDone = false;
        draft.sharePostError = null;
        break;
      case SHARE_POST_SUCCESS:
        draft.sharePostLoading = false;
        draft.sharePostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data)); // 배열의 앞에다 넣는다.
        // 기존 리트윗보다 상세하게 만들 필요..
        // draft.mainPosts = draft.mainPosts.filter(p => p.id !== action.postId);
        break;
      case SHARE_POST_FAILURE:
        draft.sharePostLoading = false;
        draft.sharePostDone = false;
        draft.sharePostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        // 앞에 Post 생성 액션에 const id가 있으므로 여기는 {}로 별도의 환경을 만들어준다.
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        // post를 찾아서 넣기
        const post = draft.mainPosts.find(p => p.id === action.data.postId);
        post.Comments.push(dummyComment(action.data));
        // id를 찾아서 넣기(id 쓰면 {} 써야하니까 post로 씀)
        // const id = draft.mainPosts.findIndex(p => p.id === action.data.postId);
        // draft.mainPosts[id].Comments.push(dummyComment(action.data));
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentDone = false;
        draft.addCommentError = action.error;
        break;

      case EDIT_COMMENT_REQUEST:
        draft.editCommentLoading = true;
        draft.editCommentDone = false;
        draft.editCommentError = null;
        break;
      case EDIT_COMMENT_SUCCESS:
        draft.editCommentLoading = false;
        draft.editCommentDone = true;
        const targetPost = draft.mainPosts.find(
          p => p.id === action.data.postId,
        );
        const targetCommentId = targetPost.Comments.findIndex(
          c => c.id === action.data.commentId,
        );
        targetPost.Comments[targetCommentId] = dummyComment(action.data);
        break;
      case EDIT_COMMENT_FAILURE:
        draft.editCommentLoading = false;
        draft.editCommentDone = false;
        draft.editCommentError = action.error;
        break;

      case DELETE_COMMENT_REQUEST:
        draft.deleteCommentLoading = true;
        draft.deleteCommentDone = false;
        draft.deleteCommentError = null;
        break;
      case DELETE_COMMENT_SUCCESS: {
        draft.deleteCommentLoading = false;
        draft.deleteCommentDone = true;
        const postIndex = draft.mainPosts.findIndex(
          p => p.id === action.data.postId,
        );
        draft.mainPosts[postIndex].Comments = draft.mainPosts[
          postIndex
        ].Comments.filter(c => c.id !== action.data.commentId);
        break;
      }
      case DELETE_COMMENT_FAILURE:
        draft.deleteCommentLoading = false;
        draft.deleteCommentDone = false;
        draft.deleteCommentError = action.error;
        break;

      case ADD_RECOMMENT_REQUEST:
        draft.addReCommentLoading = true;
        draft.addReCommentDone = false;
        draft.addReCommentError = null;
        break;
      case ADD_RECOMMENT_SUCCESS: {
        draft.addReCommentLoading = false;
        draft.addReCommentDone = true;
        // post와 comment를 찾아서 넣기
        const post = draft.mainPosts.find(p => p.id === action.data.postId);
        const comment = post.Comments.find(c => c.id === action.data.commentId);
        comment.Recomments.push(dummyReComment(action.data));
        break;
      }
      case ADD_RECOMMENT_FAILURE:
        draft.addReCommentLoading = false;
        draft.addReCommentDone = false;
        draft.addReCommentError = action.error;
        break;

      case EDIT_RECOMMENT_REQUEST:
        draft.editReCommentLoading = true;
        draft.editReCommentDone = false;
        draft.editReCommentError = null;
        break;
      case EDIT_RECOMMENT_SUCCESS: {
        draft.editReCommentLoading = false;
        draft.editReCommentDone = true;
        const targetPost = draft.mainPosts.find(
          p => p.id === action.data.postId,
        );
        console.log(targetPost);
        const targetComment = targetPost.Comments.find(
          c => c.id === action.data.commentId,
        );
        console.log(targetComment);
        const targetReCommentId = targetComment.Recomments.findIndex(
          r => r.id === action.data.recommentId,
        );
        console.log(targetReCommentId);
        targetComment.Recomments[targetReCommentId] = dummyReComment(
          action.data,
        );
        break;
      }
      case EDIT_RECOMMENT_FAILURE:
        draft.editReCommentLoading = false;
        draft.editReCommentDone = false;
        draft.editReCommentError = action.error;
        break;

      case DELETE_RECOMMENT_REQUEST:
        draft.deleteReCommentLoading = true;
        draft.deleteReCommentDone = false;
        draft.deleteReCommentError = null;
        break;
      case DELETE_RECOMMENT_SUCCESS: {
        draft.deleteReCommentLoading = false;
        draft.deleteReCommentDone = true;
        const postIndex = draft.mainPosts.findIndex(
          p => p.id === action.data.postId,
        );
        const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
          c => c.id === action.data.commentId,
        );
        draft.mainPosts[postIndex].Comments[
          commentIndex
        ].Recomments = draft.mainPosts[postIndex].Comments[
          commentIndex
        ].Recomments.filter(r => r.id !== action.data.recommentId);
        break;
      }
      case DELETE_RECOMMENT_FAILURE:
        draft.deleteReCommentLoading = false;
        draft.deleteReCommentDone = false;
        draft.deleteReCommentError = action.error;
        break;

      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS:
        draft.likePostLoading = false;
        draft.likePostDone = true;
        // 특정 포스트를 찾아서 좋아요 숫자 + 1(숫자 증감만)
        const id = draft.mainPosts.findIndex(p => p.id === action.data);
        draft.mainPosts[id].like = draft.mainPosts[id].like + 1;
        break;
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostDone = false;
        draft.likePostError = action.error;
        break;

      case UPLOAD_IMAGE_ADD:
        if (Array.isArray(action.data)) {
          draft.upLoadedImages = draft.upLoadedImages.concat(action.data);
        } else {
          draft.upLoadedImages.push(action.data); // => [].push([이미지 객체의 배열]) // 마지막에 넣는다.
        }
        break;
      case UPLOAD_IMAGE_REMOVE:
        draft.upLoadedImages = []; //업로드한 이미지 초기화 => [] 빈배열.
        break;
      default:
        break;
    }
  });
};

export default posts;

// {
//   id: 1,
//   User: {
//     id: 1,
//     nickname: 'glo',
//     brand: 'GS25',
//     region: '군포중학교정문점',
//   },
//   title: 'neo boost가 찐임',
//   content: '딴거 다 해봤는데 이거만 한 게 없다',
//   Images: [
//     {
//       id: shortId.generate(),
//       uri:
//         'https://item.kakaocdn.net/do/394adaa8e1f450f37d96ed2904b87bb28f324a0b9c48f77dbce3a43bd11ce785',
//     },
//     {
//       id: shortId.generate(),
//       uri:
//         'https://pbs.twimg.com/tweet_video_thumb/Eb5h02xUYAEFEmW.jpg:small',
//     },
//   ],
//   like: 2,
//   see: 3,
//   createdAt: date,
//   Comments: [
//     {
//       id: shortId.generate(),
//       content: '글로 피는 놈도 있냐',
//       User: {
//         id: shortId.generate(),
//         nickname: '호가든',
//         brand: 'Emart24',
//         region: '군포중학교후문점',
//       },
//       like: 2,
//       see: 3,
//       createdAt: date,
//       Recomments: [
//         {
//           id: shortId.generate(),
//           content: '연초같은 타격감임',
//           createdAt: date,
//           User: {
//             id: shortId.generate(),
//             nickname: '피어슨13',
//             brand: 'Ministop',
//             region: '군포중학교점',
//           },
//           like: 3,
//         },
//       ],
//     },
//   ],
// },
