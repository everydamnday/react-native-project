import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PostDetail from '../../component/postdetail';
import MainPost from './mainpost';
import Addpost from './addpost';
import Editpost from './editpost';

const Stack = createStackNavigator();

const PostTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Post" component={MainPost} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="Addpost" component={Addpost} />
      <Stack.Screen name="Editpost" component={Editpost} />
    </Stack.Navigator>
  );
};

export default PostTab;
