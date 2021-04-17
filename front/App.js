import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootTab from './navigation/tab';
import 'react-native-gesture-handler';
import Login from './component/login';

const App = () => {
  // const [user, setUser] = useState(false)
  return (
    <>
      <NavigationContainer>
        {true ? <RootTab /> : <Login />}
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>
  );
};

export default App;
