import React from 'react';
import 'react-native-gesture-handler';
import configureStore from './store/configurestore';
import {Provider} from 'react-redux';
import RootComponent from './navigation/index';

const App = () => {
  return (
    <Provider store={configureStore()}>
      <RootComponent />
    </Provider>
  );
};

export default App;
