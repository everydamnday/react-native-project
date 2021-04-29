import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import useInput from '../hooks/useInput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {editCommentRequest, editReCommentRequest} from '../reducers/posts';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 초기 데이터 넣기
// 댓글에 따른 창 크기 조정
// 보내야 할 데이터( 누가 썼는지(서버쪽핸들), 바꾼 내용 )

const EditComment = ({
  comment,
  recomment,
  postId,
  commentId,
  setEditCommentPopUp,
  setEditReCommentPopUp,
}) => {
  const dispatch = useDispatch();
  const [text, onChangeContent, setContent] = useInput('');
  const [height, setHeight] = useState(50);

  // 초기 댓글 text 삽입
  useEffect(() => {
    if (setEditCommentPopUp) {
      setContent(comment.content);
    } else if (setEditReCommentPopUp) {
      setContent(recomment.content);
    }
  }, []);

  // 창 사이즈 조정
  const onChangeHeight = e => {
    setHeight(e.nativeEvent.contentSize.height);
  };

  // 수정하기 제출
  const onEditComment = () => {
    if (setEditCommentPopUp) {
      dispatch(
        editCommentRequest({postId, commentId: comment.id, content: text}),
      );
      setEditCommentPopUp(prev => !prev);
    } else if (setEditReCommentPopUp) {
      dispatch(
        editReCommentRequest({
          postId,
          commentId,
          recommentId: recomment.id,
          content: text,
        }),
      );
      setEditReCommentPopUp(prev => !prev);
    }
  };

  // 창 닫기
  const offEditComment = () => {
    if (setEditCommentPopUp) {
      setEditCommentPopUp(prev => !prev);
    } else if (setEditReCommentPopUp) {
      setEditReCommentPopUp(prev => !prev);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: wp('80%'),
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <TextInput
        value={text}
        placeholder={'댓글 수정'}
        multiline={true}
        onChange={onChangeContent}
        onContentSizeChange={onChangeHeight}
        style={{width: wp('70%'), padding: 3, borderWidth: 0.2}}
      />
      <View
        style={{
          borderWidth: 0.2,
          paddingVertical: 5,
          // alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1E90FF',
          width: wp('15%'),
          height: height,
        }}>
        <TouchableOpacity onPress={onEditComment}>
          <Text style={{fontSize: 11, color: 'white', textAlign: 'center'}}>
            수정하기
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={offEditComment}>
        <Ionicons name="close-circle" color={'red'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default EditComment;

const styles = StyleSheet.create({
  container: {},
});
// Math.max(35,
