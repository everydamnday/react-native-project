import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import PostImage from './postimages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SharePostContainer = styled.View`
  flex-direction: column;
  align-self: center;
  width: 95%;
  border: 0.2px grey;
  background-color: white;
  margin: 5px;
`;

const TopOfSharePost = StyleSheet.create({
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
    // borderBottomWidth: 0.3,
  },
});

const SharePost = ({SharePost, tab}) => {
  // 탭별 디테일로 넘어가기
  const navigation = useNavigation();
  const gotoDetail = () => {
    if (tab === 'Post') {
      navigation.navigate('PostDetail', {post: SharePost, tab});
    } else if (tab === 'User') {
      navigation.navigate('UserPostDetail', {post: SharePost, tab});
    }
  };

  return (
    <SharePostContainer>
      <View style={TopOfSharePost.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={gotoDetail}>
            <Text style={TopOfSharePost.title}>{SharePost?.title}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={gotoDetail}>
          <View style={TopOfSharePost.content}>
            {SharePost?.content.length > 30 ? (
              <>
                <Text>{`${SharePost?.content.slice(0, 30)}`}</Text>
                <Text style={TopOfSharePost.more}>...더보기</Text>
              </>
            ) : (
              <Text>{SharePost?.content}</Text>
            )}
          </View>
        </TouchableOpacity>
        {SharePost?.Images?.[0] && (
          <View style={TopOfSharePost.imageContainer}>
            <PostImage
              style={TopOfSharePost.images}
              images={SharePost?.Images}
            />
          </View>
        )}
        <Text style={TopOfSharePost.userinfo}>
          {SharePost?.User.nickname} / {SharePost?.User.brand} /
          {SharePost?.User.region}
        </Text>
      </View>
    </SharePostContainer>
  );
};

export default SharePost;
