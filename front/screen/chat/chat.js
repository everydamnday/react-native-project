import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ChatItemBox from '../../component/chat/chatitembox';

const MainChatContainer = styled.View`
  flex: 1;
  margin-top: 5;
  flex-direction: column;
`;

const MainChat = () => {
  return (
    <MainChatContainer>
      <ChatItemBox />
      <ChatItemBox />
      <ChatItemBox />
    </MainChatContainer>
  );
};

export default MainChat;
