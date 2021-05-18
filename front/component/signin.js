import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import useInput from '../hooks/useInput';
import styled from 'styled-components/native';
import {signInRequest} from '../reducers/user';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const SignInContainer = StyleSheet.create({
  container: {
    width: wp('70%'),
    fontSize: 30,
    margin: 20,
    fontWeight: '700',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputcontainer: {
    marginVertical: 5,
    marginBottom: 10,
  },
  email: {
    borderWidth: 0.3,
    margin: 1,
    padding: 5,
  },
  nickname: {
    borderWidth: 0.3,
    margin: 1,
    padding: 5,
  },
  password: {
    borderWidth: 0.3,
    margin: 1,
    padding: 5,
  },
  brand: {
    borderWidth: 0.3,
    margin: 1,
    padding: 5,
  },
  region: {
    borderWidth: 0.3,
    margin: 1,
    padding: 5,
  },
  login: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 3,
  },
  signin: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 3,
  },
  text: {
    padding: 5,
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  label: {
    marginBottom: 5,
  },
});

const SignIn = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [brand, onChangeBrand, setBrand] = useInput('');
  const [region, onChangeRegion, setRegion] = useInput('');

  const dispatch = useDispatch();
  const onSignIn = () => {
    const data = {email, nickname, password, brand, region};
    dispatch(signInRequest(data));
    setEmail('');
    setNickname('');
    setPassword('');
    setBrand('');
    setRegion('');
  };
  return (
    <Container>
      <Image
        style={{
          width: wp('60%'),
          height: hp('20%'),
        }}
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/en/8/87/Sly_Cooper_series.png',
        }}
      />
      <View style={SignInContainer.container}>
        <View style={SignInContainer.inputcontainer}>
          <Text style={SignInContainer.label}>이메일</Text>
          <TextInput
            name="email"
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
            style={SignInContainer.email}
          />
        </View>
        <View style={SignInContainer.inputcontainer}>
          <Text style={SignInContainer.label}>닉네임</Text>
          <TextInput
            name="nickname"
            placeholder="nickname"
            value={nickname}
            onChange={onChangeNickname}
            style={SignInContainer.nickname}
          />
        </View>
        <View style={SignInContainer.inputcontainer}>
          <Text style={SignInContainer.label}>비밀번호</Text>
          <TextInput
            name="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
            style={SignInContainer.password}
            secureTextEntry={true}
          />
        </View>
        <View style={SignInContainer.inputcontainer}>
          <Text style={SignInContainer.label}>브랜드</Text>
          <TextInput
            name="brand"
            placeholder="brand"
            value={brand}
            onChange={onChangeBrand}
            style={SignInContainer.brand}
          />
        </View>
        <View style={SignInContainer.inputcontainer}>
          <Text style={SignInContainer.label}>지역</Text>
          <TextInput
            name="region"
            placeholder="region"
            value={region}
            onChange={onChangeRegion}
            style={SignInContainer.region}
          />
        </View>
        <TouchableOpacity onPress={onSignIn} style={SignInContainer.signin}>
          <Text style={SignInContainer.text}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SignIn;
