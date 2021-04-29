import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootTab from './tab';
import Login from '../component/login';
import {useSelector} from 'react-redux';

const RootComponent = () => {
  const me = useSelector(state => state.user.me);
  return (
    <>
      <NavigationContainer>
        {true ? <RootTab /> : <Login />}
      </NavigationContainer>
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default RootComponent;
