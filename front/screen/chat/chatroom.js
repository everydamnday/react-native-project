import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
import useInput from '../../hooks/useInput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

const ChatRoomContainer = styled.View`
  flex: 1;
`;
const InputButton = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#778899',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#20232a',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('screen').width,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: wp('75%'),
    borderRadius: 50,
  },
  button: {
    // 버튼 위치 다시 잡자.
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('15%'),
    backgroundColor: '#1E90FF',
  },
});
const chatRoom = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

const ChatRoom = () => {
  const [message, onChangeMessage, setMessage] = useInput('');
  const onSubmitMessage = () => {};
  return (
    <ChatRoomContainer>
      <View style={chatRoom.container}>
        <View>
          <Text>ㅇ</Text>
        </View>
      </View>
      <View style={InputButton.container}>
        <TextInput
          placeholder="댓글을 적어주세요"
          value={message}
          multiline
          onScroll={() => Keyboard.dismiss()}
          onChange={onChangeMessage}
          style={InputButton.input}
        />
        <TouchableOpacity onPress={onSubmitMessage} style={InputButton.button}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            보내기
          </Text>
        </TouchableOpacity>
      </View>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
