import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const UserInfoDetailContainer = styled.View`
  flex: 1;
`;

const TopOfInfo = StyleSheet.create({
  container: {
    margin: 20,
    fontSize: 30,
    fontWeight: '700',
  },
});

const UserInfoDetail = ({route, navigation}) => {
  const user = route.params;
  return (
    <UserInfoDetailContainer>
      <Text style={TopOfInfo.container}>{user.nickname}님 안녕하세요!</Text>
    </UserInfoDetailContainer>
  );
};

export default UserInfoDetail;
