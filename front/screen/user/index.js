import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserInfo from '../../component/userinfo';
import PostDetail from '../../component/postdetail';
import MainUser from './mainuser';
import UserInfoDetail from '../../component/userinfodetail';

const Stack = createStackNavigator();

const UserTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainUser" component={MainUser} />
      <Stack.Screen name="UserInfoDetail" component={UserInfoDetail} />
      <Stack.Screen name="UserPostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default UserTab;
