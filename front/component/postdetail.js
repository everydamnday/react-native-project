import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions,
  Keyboard,
} from 'react-native';
import styled from 'styled-components/native';
import Comment from './comment';
import PostImages from './postimages';
import useInput from '../hooks/useInput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {addComment, addReComment, addSeeRequest} from '../reducers/posts';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SharePost from './sharepost';
import {likePost} from '../reducers/posts';

// const W = Dimensions.get('screen').width;

const DetailPostContainer = styled.View`
  flex-direction: column;
  background-color: white;
`;

const CommentContainer = styled.View`
  flex-direction: column;
  background-color: white;
`;

const TopOfDetailPost = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  wrapper: {
    margin: 15,
    borderBottomWidth: 0.5,
    borderColor: '#20232a',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 10,
  },
  userinfo: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 13,
  },
  createdAt: {
    marginBottom: 10,
    fontSize: 13,
  },
});

const BottomOfDetailPost = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderColor: '#20232a',
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    fontSize: 15,
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: 'red',
    // borderWidth: 0.3,
    padding: 1,
    // borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
    // width: 310,
    // height: 160,
  },
  images: {
    flex: 1,
    alignSelf: 'center',
  },
  bottom_bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  like: {
    marginLeft: 10,
  },
  comments: {
    marginLeft: 10,
  },
  share: {
    marginLeft: 10,
    marginRight: 10,
  },
});

const ADcontainer = styled.View`
  padding: 10px;
`;

const CommentFilter = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
  },
});

const TextInputContainer = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#20232a',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderColor: 'blue',
    // borderWidth: 3,
    width: Dimensions.get('screen').width,
  },
  input: {
    // borderColor: 'red',
    // borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'flex-end',
    height: '100%',
    width: '100%',
    // width: wp('85%'),
  },
  send: {
    position: 'absolute',
    right: 0,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // backgroundColor: '#1E90FF',
  },
  recommenter: {
    // borderColor: 'red',
    // borderWidth: 1,
    // position: 'absolute',
    // left: 0,
    // width: wp('10%'),
    justifyContent: 'center',
  },
});

const Detail = ({route, navigation}) => {
  // const post = route.params; //
  const post = useSelector(state =>
    state.posts.mainPosts.find(p => p.id === route.params.post.id),
  );
  //
  useEffect(() => {
    dispatch(addSeeRequest({postId: post.id}));
    // // 내가 본 게시물인지 체크하는 조건(post.see.User.id.includes(me.id))
    // if (post.see.includes[me.id]) {
    //   // 이미 본 게시물인 경우
    //   return null;
    // } else {
    //   // 처음 본 게시물인 경우
    //   return dispatch(addSeeRequest({postId: post.id}));
    // }
  }, []);

  // 포스트 좋아요
  const onPressLike = id => () => {
    // id = post.id
    dispatch(likePost(id));
  };

  // 댓글, 대댓글 전환
  const [reCommentInputOpen, setReCommentInputOpen] = useState(false);
  const [targetCommenter, setTargetCommenter] = useState(''); // 누구 댓글에 달거냐(view용)
  const [targetCommentId, setTargetCommentId] = useState(''); // 대댓글 달려는 댓글 id가 뭐냐(서버 전달용)
  const onPressReComment = comment => () => {
    setReCommentInputOpen(prev => !prev); // 대댓글 창으로 변경
    if (reCommentInputOpen) {
      // 없으면 댓글창
      setTargetCommenter('');
      setTargetCommentId('');
    } else {
      // 있으면 대댓글 창
      setTargetCommenter(comment.User.nickname);
      setTargetCommentId(comment.id);
    }
  };

  // 댓글, 대댓글 제출하기
  const [comment, onChangeComment, setComment] = useInput();
  const dispatch = useDispatch();
  const onSubmitComment = () => {
    if (targetCommenter) {
      // 대댓글일 경우
      dispatch(
        addReComment({
          content: comment,
          postId: post.id,
          commentId: targetCommentId,
        }),
      );
      setReCommentInputOpen(false); // 대댓글 창으로 변경
      setTargetCommenter(''); // 누구 댓글에 달거냐(view용)
      setTargetCommentId(''); // 대댓글 달려는 댓글 id가 뭐냐(서버 전달용)
    } else {
      // 댓글일 경우
      dispatch(addComment({content: comment, postId: post.id})); // 작성자(서버에서 가능), 게시물 번호, 댓글 내용
    }
    setComment('');
    Keyboard.dismiss();
  };
  return (
    <>
      <ScrollView>
        <DetailPostContainer>
          <View style={TopOfDetailPost.container}>
            <View style={TopOfDetailPost.wrapper}>
              <Text style={TopOfDetailPost.title}>{post.title}</Text>
              <Text style={TopOfDetailPost.userinfo}>
                {post.User.nickname} / {post.User.brand} / {post.User.region}
              </Text>
              <Text style={TopOfDetailPost.createdAt}>
                {post.createdAt.slice(0, 10)}
              </Text>
            </View>
          </View>
          <View style={BottomOfDetailPost.container}>
            <Text style={BottomOfDetailPost.content}>{post.content}</Text>
            {post.Images?.[0] && (
              <View style={BottomOfDetailPost.imageContainer}>
                <PostImages
                  style={BottomOfDetailPost.images}
                  images={post.Images}
                />
              </View>
            )}
            {post.SharePostId && (
              <SharePost
                sharePostId={post.SharePostId}
                tab={route.params.tab}
              />
            )}
            <View style={BottomOfDetailPost.bottom_bottom}>
              <Text style={BottomOfDetailPost.see}>
                <Ionicons name="eye-outline" size={15} /> ∙{' '}
                {post.see ? post.see : 0}
              </Text>
              <Text>|</Text>
              <TouchableOpacity onPress={onPressLike(post.id)}>
                <Text style={BottomOfDetailPost.like}>
                  <Ionicons name="thumbs-up-outline" size={15} /> ∙{' '}
                  {post.like ? post.like : 0}
                </Text>
              </TouchableOpacity>
              <Text>|</Text>
              <Text style={BottomOfDetailPost.comments}>
                <Ionicons name="chatbox-ellipses-outline" size={15} /> ∙{' '}
                {post.Comments.length}
              </Text>
            </View>
          </View>
        </DetailPostContainer>
        <ADcontainer />
        <CommentContainer>
          <View style={CommentFilter.container}>
            <Text>⧻시간순</Text>
            <Text>↓마지막 댓글로 이동</Text>
          </View>
          {post.Comments.map(comment => (
            <Comment
              key={comment.id}
              onPressReComment={onPressReComment}
              comment={comment}
              postId={post.id}
            />
          ))}
        </CommentContainer>
      </ScrollView>
      <View style={TextInputContainer.container}>
        {reCommentInputOpen && (
          <View style={TextInputContainer.recommenter}>
            <Text style={{fontSize: 12}}>{targetCommenter}</Text>
          </View>
        )}
        <TextInput
          placeholder="댓글을 적어주세요"
          value={comment}
          multiline
          // onScroll={() => Keyboard.dismiss()}
          onChange={onChangeComment}
          style={TextInputContainer.input}
          onSubmitEditing={onSubmitComment}
        />
        <TouchableOpacity
          onPress={onSubmitComment}
          style={TextInputContainer.send}>
          <Ionicons name="send" size={15} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Detail;
