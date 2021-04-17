import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';

const UserInfoContainer = styled.View`
  flex-direction: column;
  padding: 25px;
  background-color: white;
`;
const Userinfo = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  nickname: {
    fontSize: 40,
    fontWeight: '700',
  },
  item: {
    flexDirection: 'row',
    marginTop: 10,
  },
  following: {
    fontSize: 12,
  },
  follower: {
    marginLeft: 10,
    fontSize: 12,
  },
  like: {
    marginLeft: 10,
    fontSize: 12,
  },
});

const UserInfo = ({user}) => {
  return (
    <UserInfoContainer>
      <Text style={Userinfo.nickname}>{user.nickname}</Text>
      <View style={Userinfo.item}>
        <Text style={Userinfo.following}>팔로잉 0</Text>
        <Text style={Userinfo.follower}>팔로워 17</Text>
        <Text style={Userinfo.like}>좋아요 30</Text>
      </View>
    </UserInfoContainer>
  );
};

export default UserInfo;
