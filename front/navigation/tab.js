import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PostTab from '../screen/post/index';
import ChatTab from '../screen/chat/index';
import UserTab from '../screen/user/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tabs = createBottomTabNavigator();

const RootTab = () => {
  const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName;
      if (route.name === 'Post') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Chat') {
        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
      }
      if (route.name === 'User') {
        iconName = focused
          ? 'ellipsis-horizontal'
          : 'ellipsis-horizontal-outline';
      }
      return <Ionicons name={iconName} size={20} color={color} />;
    },
  });
  return (
    <Tabs.Navigator screenOptions={screenOptions}>
      <Tabs.Screen
        name="Post"
        component={PostTab}
        // options={{
        //   tabBarLabel: 'Home',
        //   tabBarIcon: ({color, size}) => <Ionicons name="home-outline" />,
        // }}
      />
      <Tabs.Screen
        name="Chat"
        component={ChatTab}
        // options={{
        //   tabBarLabel: 'Chat',
        //   tabBarIcon: ({color, size}) => (
        //     <Ionicons name="chatbubbles-outline" />
        //   ),
        // }}
      />
      <Tabs.Screen
        name="User"
        component={UserTab}
        // options={{
        //   tabBarLabel: 'Ellipsis',
        //   tabBarIcon: ({color, size}) => (
        //     <Ionicons name="ellipsis-horizontal-outline" />
        //   ),
        // }}
      />
    </Tabs.Navigator>
  );
};

export default RootTab;
