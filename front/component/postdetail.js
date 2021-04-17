import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Comment from './comment';
import PostImages from './postimages';

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
  shere: {
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
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: '#20232a',
  },
  input: {
    padding: 10,
  },
});

const Detail = ({route, navigation}) => {
  const post = route.params;
  const [comment, setComment] = useState('');
  const onChangeComment = useCallback(
    e => {
      setComment(e.target.value);
    },
    [comment],
  );
  return (
    <>
      <ScrollView>
        <DetailPostContainer>
          <View style={TopOfDetailPost.container}>
            <View style={TopOfDetailPost.wrapper}>
              <Text style={TopOfDetailPost.title}>{post.title}.</Text>
              <Text style={TopOfDetailPost.userinfo}>
                {post.User.brand} / {post.User.location}{' '}
              </Text>
              <Text style={TopOfDetailPost.createdAt}>{post.createdAt}</Text>
            </View>
          </View>
          <View style={BottomOfDetailPost.container}>
            <Text style={BottomOfDetailPost.content}>{post.content}</Text>
            {post.images[0] && (
              <View style={BottomOfDetailPost.imageContainer}>
                <PostImages
                  style={BottomOfDetailPost.images}
                  images={post.images}
                />
              </View>
            )}
            <View style={BottomOfDetailPost.bottom_bottom}>
              <Text style={BottomOfDetailPost.like}>👍 {post.like} 좋아요</Text>
              <Text>|</Text>
              <Text style={BottomOfDetailPost.comments}>
                💬 {post.comments.length} 댓글쓰기{' '}
              </Text>
              <Text>|</Text>
              <Text style={BottomOfDetailPost.shere}>👁‍🗨 공유하기</Text>
            </View>
          </View>
        </DetailPostContainer>
        <ADcontainer />
        <CommentContainer>
          <View style={CommentFilter.container}>
            <Text>⧻시간순</Text>
            <Text>↓마지막 댓글로 이동</Text>
          </View>
          {post.comments.map(comment => (
            <TouchableOpacity key={comment.id}>
              <Comment key={comment.id} comment={comment} />
            </TouchableOpacity>
          ))}
        </CommentContainer>
      </ScrollView>
      <View style={TextInputContainer.container}>
        <TextInput
          placeholder="댓글을 적어주세요"
          value={comment}
          onChange={onChangeComment}
          style={TextInputContainer.input}></TextInput>
      </View>
    </>
  );
};

export default Detail;
