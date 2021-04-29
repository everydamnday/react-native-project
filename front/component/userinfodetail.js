import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const UserInfoDetailContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const TopOfInfo = StyleSheet.create({
  container: {
    margin: 20,
    fontSize: 30,
    fontWeight: '700',
  },
  nickname: {
    fontSize: 20,
  },
});

const UserInfoDetail = ({route, navigation}) => {
  const user = route.params;
  return (
    <UserInfoDetailContainer>
      <View style={TopOfInfo.container}>
        <Text style={TopOfInfo.nickname}>{user.nickname}님 안녕하세요!</Text>
      </View>
      <View style={TopOfInfo.container}>
        <Text style={TopOfInfo.nickname}>프로필 수정하는 곳</Text>
      </View>
    </UserInfoDetailContainer>
  );
};

export default UserInfoDetail;
