import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {logOutRequest} from '../reducers/user';

const UserInfoContainer = styled.View`
  flex-direction: column;
  padding: 25px;
  background-color: #d3d3d3;
  color: white;
`;
const Userinfo = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
  },
  nickname: {
    fontSize: 40,
    fontWeight: '700',
  },
  logout: {
    padding: 5,
    alignSelf: 'center',
    backgroundColor: '#FF6347',
  },
  logout_text: {
    color: 'white',
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

const UserInfo = ({me}) => {
  const dispatch = useDispatch();
  // 로그아웃
  const onPressLogOut = () => {
    dispatch(logOutRequest());
  };

  return (
    <UserInfoContainer>
      <View style={Userinfo.profile}>
        <Text style={Userinfo.nickname}>{me.nickname}</Text>
        <TouchableOpacity style={Userinfo.logout} onPress={onPressLogOut}>
          <Text style={Userinfo.logout_text}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View style={Userinfo.item}>
        <Text style={Userinfo.following}>팔로잉 0</Text>
        <Text style={Userinfo.follower}>팔로워 17</Text>
        <Text style={Userinfo.like}>좋아요 30</Text>
      </View>
    </UserInfoContainer>
  );
};

export default UserInfo;
