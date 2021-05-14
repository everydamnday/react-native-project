import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChatItemBox = ({chatId}) => {
  const navigation = useNavigation();
  const gotoChatRoom = () => {
    navigation.navigate('ChatRoom');
  };
  return (
    <TouchableOpacity onPress={gotoChatRoom}>
      <View style={style.chatContainer}>
        <View style={style.chatAvatar}>
          <Text style={{fontSize: 20, color: 'white'}}>Y</Text>
        </View>
        <View style={style.chatContent}>
          <Text style={style.contentTitle}>SLY</Text>
          <Text style={style.contentContent}>어쩌구 저쩌구 블라블라</Text>
        </View>
        <View style={style.chatInfo}>
          <Text style={style.infoDate}>{'4월 29일'}</Text>
          <View style={style.infoNew}>
            <Text style={{fontSize: 13, color: 'white', fontWeight: '500'}}>
              22
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItemBox;

const style = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: hp('8%'),
  },
  chatAvatar: {
    paddingHorizontal: 22,
    margin: 6,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  chatContent: {
    width: wp('55%'),
    justifyContent: 'flex-start',
  },
  contentTitle: {
    fontSize: 20,
    padding: 5,
  },
  contentContent: {
    fontSize: 11,
    paddingHorizontal: 5,
    color: 'rgba(0,0,0,0.7)',
  },
  chatInfo: {
    paddingHorizontal: 5,
  },
  infoDate: {
    fontSize: 11,
    padding: 5,
  },
  infoNew: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 3,
    backgroundColor: 'red',
    borderWidth: 0.1,
    borderRadius: 15,
  },
});
