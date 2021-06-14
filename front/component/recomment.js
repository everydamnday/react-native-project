import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {likeRecomment} from '../reducers/posts';
import BottomSheetSlide from './bottomsheet';
import EditComment from './editcommnet';

const ReCommentStyle = StyleSheet.create({
  Container: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    paddingLeft: 20,
  },
  commentContainer: {
    flexDirection: 'column',
    padding: 20,
    // borderBottomWidth: 0.3,
    // borderColor: '#20232a',
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userinfo: {
    fontSize: 13,
    marginBottom: 10,
  },
  content: {
    fontSize: 15,
    marginBottom: 15,
  },
  commentBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  createdAt: {
    marginRight: 10,
  },
  like: {
    marginLeft: 10,
    marginRight: 10,
  },
  reComment: {
    marginLeft: 10,
  },
});

const ReComment = ({postId, commentId, recomment}) => {
  const [editReCommentPopUp, setEditReCommentPopUp] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const popUpOpen = () => {
    setPopUp(prev => !prev);
  };
  const dispatch = useDispatch();
  const onPressLike = data => () => {
    dispatch(likeRecomment(data));
  };
  return (
    <View style={ReCommentStyle.Container}>
      <View style={ReCommentStyle.commentContainer}>
        <View style={ReCommentStyle.topLine}>
          <Text style={ReCommentStyle.userinfo}>
            {recomment.User.nickname} / {recomment.User.brand} /{' '}
            {recomment.User.region}
          </Text>
          <TouchableOpacity onPress={popUpOpen}>
            <Ionicons name="ellipsis-horizontal-outline" size={15} />
            {popUp && (
              <BottomSheetSlide
                postId={postId}
                commentId={commentId}
                recommentId={recomment.id}
                setEditReCommentPopUp={setEditReCommentPopUp}
                popUp={popUp}
                setPopUp={setPopUp}
              />
            )}
            {/* {popUp && <PopUpEllipsis postId={post.id} />} */}
          </TouchableOpacity>
        </View>
        <Text style={ReCommentStyle.content}>{recomment.content}</Text>
        {editReCommentPopUp && (
          <EditComment
            setEditReCommentPopUp={setEditReCommentPopUp}
            postId={postId}
            commentId={commentId}
            recomment={recomment}
          />
        )}
        <View style={ReCommentStyle.commentBottom}>
          <Text style={ReCommentStyle.createdAt}>
            {' '}
            {recomment.createdAt.slice(0, 10)}{' '}
          </Text>
          <Text>•</Text>
          <TouchableOpacity
            onPress={onPressLike({
              postId,
              commentId: commentId,
              recommentId: recomment.id,
            })}>
            <Text style={ReCommentStyle.like}>
              <Ionicons name="thumbs-up-outline" size={15} /> {recomment.like}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ReComment;
