import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootTab from './tab';
import {useSelector, useDispatch} from 'react-redux';
import LogInTab from './logintab';
import {getUserRequest} from '../reducers/user';

const RootComponent = () => {
  const me = useSelector(state => state.user.me);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (me === null) {
  //     dispatch(getUserRequest());
  //   }
  // }, [me]);
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
