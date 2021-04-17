import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const CommentList = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  commentContainer: {
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 0.3,
    borderColor: '#20232a',
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

const reCommentList = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
    paddingLeft: 20,
  },
  commentContainer: {
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 0.3,
    borderColor: '#20232a',
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
    flex: 1,
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

const Comment = ({comment}) => {
  return (
    <View style={CommentList.listContainer}>
      <View style={CommentList.commentContainer}>
        <Text style={CommentList.userinfo}>
          {comment.User.brand} / {comment.User.location}
        </Text>
        <Text style={CommentList.content}>{comment.content}</Text>
        <View style={CommentList.commentBottom}>
          <Text style={CommentList.createdAt}> {comment.createdAt} </Text>
          <Text>•</Text>
          <Text style={CommentList.like}>👍 좋아요 {comment.like}</Text>
          <Text>•</Text>
          <Text style={CommentList.reComment}>
            💬 대댓글 {comment.recomments.length}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Comment;
