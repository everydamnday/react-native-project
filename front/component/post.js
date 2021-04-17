import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import TrimText from '../utils';
import PostImage from './postimages';

const PostContainer = styled.View`
  flex-direction: column;
  width: 100%;
  border: 0.5px grey;
  background-color: white;
  margin: 0.1px;
`;

const TopOfPost = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: '#20232a',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    margin: 10,
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
    flex: 1,
    borderLeftWidth: 0.3,
    marginLeft: 10,
    // width: 100,
    borderColor: '#20232a',
  },
  see: {
    marginRight: 10,
  },
  like: {
    marginRight: 10,
  },
  comments: {
    marginRight: 10,
  },
  createdAt: {
    marginLeft: 10,
    marginRight: 10,
  },
  bookMark: {
    marginRight: 10,
  },
});

const Post = ({post}) => {
  // 포스트 디테일로 넘어가기
  const navigation = useNavigation();
  const gotoDetail = post => () => {
    navigation.navigate('PostDetail', post);
  };

  return (
    <PostContainer>
      <View style={TopOfPost.container}>
        <TouchableOpacity key={post.id} onPress={gotoDetail(post)}>
          <Text style={TopOfPost.title}>{post.title}</Text>
        </TouchableOpacity>
        <Text style={TopOfPost.content}>
          {post.content.length > 30 ? (
            <>
              <Text>{`${post.content.slice(0, 30)}`}</Text>
              <Text style={TopOfPost.more}>...더보기</Text>
            </>
          ) : (
            <Text>{post.content}</Text>
          )}
          {/* {TrimText(post.content, 30)} */}
        </Text>
        {post.images[0] && (
          <View style={TopOfPost.imageContainer}>
            <PostImage style={TopOfPost.images} images={post.images} />
          </View>
        )}
        <Text style={TopOfPost.userinfo}>
          {post.User.brand} ˙{post.User.location}
        </Text>
      </View>
      <View style={BottomOfPost.container}>
        <View style={BottomOfPost.bottom_left}>
          <Text style={BottomOfPost.see}>👁‍🗨 ˙ {post.see}</Text>
          <Text style={BottomOfPost.like}>👍 ˙ {post.like}</Text>
          <Text style={BottomOfPost.comments}>
            💬 ˙{post.comments.length}개
          </Text>
        </View>
        <View style={BottomOfPost.bottom_right}>
          <Text style={BottomOfPost.createdAt}>{post.createdAt}</Text>
          <Text style={BottomOfPost.bookMark}>🏷</Text>
        </View>
      </View>
    </PostContainer>
  );
};

export default Post;
