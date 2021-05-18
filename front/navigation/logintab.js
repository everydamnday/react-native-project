import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../component/login';
import SignIn from '../component/signin';

const Stack = createStackNavigator();

const LogInTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default LogInTab;
