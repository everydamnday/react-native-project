import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomSheet, ListItem} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {
  deleteCommentRequest,
  deletePostRequest,
  deleteReCommentRequest,
} from '../reducers/posts';
import {useNavigation} from '@react-navigation/core';

// 해당 컴포넌트는 어떤 포스트인지, 어떤 코멘트인지, 어떤 리코멘트인지를 구분한다.

const BottomSheetSlide = ({
  postId,
  commentId,
  recommentId,
  setEditReCommentPopUp,
  setEditCommentPopUp,
  popUp,
  setPopUp,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const PostList = [
    {
      title: '삭제하기',
      containerStyle: {borderRadius: 10, marginHorizontal: 3},
      titleStyle: {alignSelf: 'center'},
      onPress: () => {
        dispatch(deletePostRequest({postId})); // { postId : post.id }
        setPopUp(false);
        console.log('포스트 삭제');
      },
    },
    {
      title: '수정하기',
      containerStyle: {borderRadius: 10, marginTop: 3, marginHorizontal: 3},
      titleStyle: {alignSelf: 'center'},
      onPress: () => {
        navigation.navigate('Editpost', postId);
        setPopUp(false);
      },
    },
    {
      title: '공유하기',
      containerStyle: {borderRadius: 10, margin: 3},
      titleStyle: {alignSelf: 'center'},
      onPress: () => {
        navigation.navigate('Addpost', postId);
        setPopUp(false);
      },
    },
    {
      title: '닫기',
      containerStyle: {
        backgroundColor: '#FF6347',
        borderRadius: 10,
        margin: 3,
        marginTop: 7,
      },
      titleStyle: {color: 'white', alignSelf: 'center'},
      onPress: () => setPopUp(false),
    },
  ];
  const CommentList = [
    {
      title: '삭제하기',
      containerStyle: {borderRadius: 10, marginHorizontal: 3},
      titleStyle: {alignSelf: 'center'},
      onPress: () => {
        dispatch(deleteCommentRequest({postId: postId, commentId: commentId})); // { postId : post.id, commentId : comment.id }
        setPopUp(false);
        console.log('코멘트 삭제');
      },
    },
    {
      title: '수정하기',
      containerStyle: {borderRadius: 10, marginTop: 3, marginHorizontal: 3},
      titleStyle: {alignSelf: 'center'},
      onPress: () => {
        setEditCommentPopUp(prev => !prev);
        setPopUp(false);
        console.log('코멘트 수정');
      },
    },
    {
      title: '닫기',
      containerStyle: {
        backgroundColor: '#FF6347',
        borderRadius: 10,
        margin: 3,
        marginTop: 7,
      },
      titleStyle: {color: 'white', alignSelf: 'center'},
      onPress: () => setPopUp(false),
    },
  ];
  const ReCommentPostList = [
    {
      title: '삭제하기',
      containerStyle: {borderRadius: 10, marginHorizontal: 3},
      titleStyle: {alignSelf: 'center'},
      onPress: () => {
        dispatch(
          deleteReCommentRequest({
            postId: postId,
            commentId: commentId,
            recommentId: recommentId,
          }),
        ); // { postId : post.id, commentId : comment.id, recommentId : recomment.id }
        setPopUp(false);
        console.log('리코멘트 삭제');
      },
    },
    {
      title: '수정하기',
      containerStyle: {borderRadius: 10, marginTop: 3, marginHorizontal: 3},
      titleStyle: {alignSelf: 'center'},
      onPress: () => {
        setEditReCommentPopUp(prev => !prev);
        setPopUp(false);
        console.log('리코멘트 수정');
      },
    },
    {
      title: '닫기',
      containerStyle: {
        backgroundColor: '#FF6347',
        borderRadius: 10,
        margin: 3,
        marginTop: 7,
      },
      titleStyle: {color: 'white', alignSelf: 'center'},
      onPress: () => setPopUp(false),
    },
  ];

  let list = [];
  if (postId ? (commentId ? false : recommentId ? false : true) : false) {
    // 포스트만 있고 코멘트 없고 리코멘트 없는 경우 => 포스트 대상
    list = PostList;
  } else if (
    postId ? (commentId ? (recommentId ? false : true) : false) : false
  ) {
    // 포스트 있고 코멘트 있고 리코멘트 없는 경우 => 코멘트 대상
    list = CommentList;
  } else if (
    postId ? (commentId ? (recommentId ? true : false) : false) : false
  ) {
    // 리코멘트 있고 코멘트 있고 포스트도 있을 경우 => 리코멘트 대상
    list = ReCommentPostList;
  }
  return (
    <BottomSheet
      isVisible={popUp}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
      {list.map((l, i) => (
        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  );
};

export default BottomSheetSlide;

const styles = StyleSheet.create({});

//'rgba(0.5, 0.25, 0, 0.2)'
// rgba(0,0,0,0)
