import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {likePost} from '../reducers/posts';
import TrimText from '../utils';
import PostImage from './postimages';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import PopUpEllipsis from './popupellipsis';
import BottomSheetSlide from './bottomsheet';
import SharePost from './sharepost';
import {useSelector} from 'react-redux';
import {addBookMarkRequest} from '../reducers/user';

const PostContainer = styled.View`
  flex-direction: column;
  width: 100%;
  border: 0.2px grey;
  background-color: white;
  margin: 0.1px;
`;

const TopOfPost = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: '#20232a',
  },
  head: {
    width: window.innerWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    margin: 10,
  },
  ellipsis: {
    padding: 20,
  },
  content: {
    fontSize: 15,
    margin: 10,
  },
  more: {
    color: 'grey',
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: 'red',
    padding: 1,
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
  userinfo: {
    fontSize: 10,
    marginTop: 10,
    margin: 10,
  },
});

const BottomOfPost = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#20232a',
    padding: 5,
  },
  bottom_left: {
    flexDirection: 'row',
    flex: 2,
    borderColor: '#20232a',
  },
  bottom_right: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    borderLeftWidth: 0.3,
    marginHorizontal: 5,
    borderColor: '#20232a',
  },
  see: {
    fontSize: 13,
    marginLeft: 10,
  },
  like: {
    fontSize: 13,
    marginLeft: 18,
  },
  comments: {
    fontSize: 13,
    marginLeft: 18,
  },
  createdAt: {
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  bookMark: {
    marginRight: 10,
  },
});

// 아이콘 이름
// const onBookMark = 'bookmark';
// const offBookMark = 'bookmark-outline';
// const onLike = 'thumbs-up';
// const offLike = 'thumbs-up-outline';

const Post = ({post, tab}) => {
  // const me = useSelector(state => state.user.me); // 포스트에서 유저가 할 수 있는 일 구분
  const dispatch = useDispatch();

  // 디테일로 넘어가기
  const navigation = useNavigation();
  const gotoDetail = post => () => {
    if (tab === 'Post') {
      navigation.navigate('PostDetail', {post: post, tab: tab});
    } else if (tab === 'User') {
      navigation.navigate('UserPostDetail', {post, tab});
    }
  };
  // 엘립시스를 통한 bottomSheet 열기
  const [popUp, setPopUp] = useState(false);
  const popUpOpen = () => {
    setPopUp(prev => !prev);
  };

  // 북마크
  const onAddBookMark = () => {
    dispatch(addBookMarkRequest({bookMarkId: post.id}));
  };

  // 좋아요
  const onPressLike = id => () => {
    // id = post.id
    dispatch(likePost(id));
  };

  return (
    <PostContainer>
      <View style={TopOfPost.container}>
        <View style={TopOfPost.head}>
          <TouchableOpacity onPress={gotoDetail(post)}>
            <Text style={TopOfPost.title}>{post.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={popUpOpen}>
            <Ionicons
              style={TopOfPost.ellipsis}
              name="ellipsis-horizontal-outline"
              size={15}
            />
            {popUp && (
              <BottomSheetSlide
                postId={post.id}
                popUp={popUp}
                setPopUp={setPopUp}
              />
            )}
            {/* {popUp && <PopUpEllipsis postId={post.id} />} */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={gotoDetail(post)}>
          <View style={TopOfPost.content}>
            {post?.content?.length > 30 ? (
              <>
                <Text>{`${post.content.slice(0, 30)}`}</Text>
                <Text style={TopOfPost.more}>...더보기</Text>
              </>
            ) : (
              <Text>{post.content}</Text>
            )}
          </View>
        </TouchableOpacity>
        {post.Images?.[0] && (
          <View style={TopOfPost.imageContainer}>
            <PostImage style={TopOfPost.images} images={post.Images} />
          </View>
        )}
        {post?.SharePostId && (
          <SharePost sharePostId={post.SharePostId} tab={tab} />
        )}
        <Text style={TopOfPost.userinfo}>
          {post?.User?.nickname} / {post?.User?.brand} / {post?.User?.region}
        </Text>
      </View>
      <View style={BottomOfPost.container}>
        <View style={BottomOfPost.bottom_left}>
          <Text style={BottomOfPost.see}>
            <Ionicons name="eye-outline" size={13} /> ∙ {post?.see}
          </Text>
          <TouchableOpacity onPress={onPressLike(post.id)}>
            <Text style={BottomOfPost.like}>
              <Ionicons name="thumbs-up-outline" size={13} /> ∙ {post.like}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={gotoDetail(post)}>
            <Text style={BottomOfPost.comments}>
              <Ionicons name="chatbox-ellipses-outline" size={13} /> ∙
              {post?.Comments?.length}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={BottomOfPost.bottom_right}>
          <Text style={BottomOfPost.createdAt}>{post?.createdAt}</Text>
          <TouchableOpacity onPress={onAddBookMark}>
            <Ionicons name="bookmark-outline" size={15} />
          </TouchableOpacity>
        </View>
      </View>
    </PostContainer>
  );
};

export default Post;
