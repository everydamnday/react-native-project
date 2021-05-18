import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootTab from './tab';
import {useSelector} from 'react-redux';
import LogInTab from './logintab';

const RootComponent = () => {
  const me = useSelector(state => state.user.me);
  return (
    <>
      <NavigationContainer>
        {me ? <RootTab /> : <LogInTab />}
      </NavigationContainer>
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default RootComponent;
