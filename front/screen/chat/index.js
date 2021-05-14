import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoom from './chatroom';
import MainChat from './chat';

const Stack = createStackNavigator();

const ChatTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainChat" component={MainChat} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

export default ChatTab;
