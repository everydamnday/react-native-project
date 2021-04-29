import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {removePostRequest} from '../reducers/posts';

const PopUpEllipsisContainer = styled.View`
  position: absolute;
  top: 35;
  right: 35;
  width: 50px;
  height: 70px;
  margin: 1px;
  border: 1px solid black;
  justify-content: center;
`;

const PopUpEllipsis = ({postId}) => {
  const dispatch = useDispatch();
  const deltePost = postId => {
    dispatch(removePostRequest(postId));
  };
  const sharePost = postId => {
    console.log(postId, '공유하기');
  };
  return (
    <PopUpEllipsisContainer>
      <View style={buttonContainer.container}>
        <TouchableOpacity onPress={deltePost}>
          <Text style={buttonContainer.delete}>삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sharePost}>
          <Text style={buttonContainer.share}>공유</Text>
        </TouchableOpacity>
      </View>
    </PopUpEllipsisContainer>
  );
};

export default PopUpEllipsis;

const buttonContainer = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {padding: 5, borderWidth: 0.3},
  share: {padding: 5, borderWidth: 0.3},
});
