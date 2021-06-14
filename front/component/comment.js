import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import useInput from '../hooks/useInput';
import ReComment from './recomment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheetSlide from './bottomsheet';
import EditComment from './editcommnet';
import {useDispatch} from 'react-redux';
import {likeComment} from '../reducers/posts';

const Commentstyle = StyleSheet.create({
  Container: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  commentContainer: {
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 0.3,
    borderColor: '#20232a',
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

const Comment = ({postId, comment, onPressReComment}) => {
  // const [recomment, onChangeReComment, setReComment] = useInput();
  const [editCommentPopUp, setEditCommentPopUp] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const popUpOpen = () => {
    setPopUp(prev => !prev);
  };
  const dispatch = useDispatch();
  // 코멘트 좋아요
  const onPressLike = data => () => {
    // id = post.id
    dispatch(likeComment(data));
  };

  return (
    <View style={Commentstyle.Container}>
      <View style={Commentstyle.commentContainer}>
        <View style={Commentstyle.topLine}>
          <Text style={Commentstyle.userinfo}>
            {comment.User.nickname} / {comment.User.brand} /{' '}
            {comment.User.region}
          </Text>
          <TouchableOpacity onPress={popUpOpen}>
            <Ionicons name="ellipsis-horizontal-outline" size={15} />
            {popUp && (
              <BottomSheetSlide
                postId={postId}
                commentId={comment.id}
                setEditCommentPopUp={setEditCommentPopUp}
                popUp={popUp}
                setPopUp={setPopUp}
              />
            )}
            {/* {popUp && <PopUpEllipsis postId={post.id} />} */}
          </TouchableOpacity>
        </View>
        <Text style={Commentstyle.content}>{comment.content}</Text>
        {editCommentPopUp && (
          <EditComment
            setEditCommentPopUp={setEditCommentPopUp}
            postId={postId}
            comment={comment}
          />
        )}
        <View style={Commentstyle.commentBottom}>
          <Text style={Commentstyle.createdAt}> {comment.createdAt} </Text>
          <Text>•</Text>
          <TouchableOpacity
            onPress={onPressLike({postId, commentId: comment.id})}>
            <Text style={Commentstyle.like}>
              <Ionicons name="thumbs-up-outline" size={15} />
              {comment.like}
            </Text>
          </TouchableOpacity>
          <Text>•</Text>
          <TouchableOpacity onPress={onPressReComment(comment)}>
            <Text style={Commentstyle.reComment}>
              <Ionicons name="chatbox-ellipses-outline" size={15} />
              {comment.Recomments.length}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {comment.Recomments[0] &&
        comment.Recomments.map(recomment => (
          <ReComment
            key={recomment.id}
            postId={postId}
            commentId={comment.id}
            recomment={recomment}
          />
        ))}
    </View>
  );
};
export default Comment;
