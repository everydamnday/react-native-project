import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import useInput from '../hooks/useInput';
import {logInRequest, loginRequest, LOG_IN_REQUEST} from '../reducers/user';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const LoginContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const LocalLoginContainer = StyleSheet.create({
  container: {
    width: wp('80%'),
    fontSize: 30,
    margin: 20,
    fontWeight: '700',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  email: {
    borderWidth: 0.3,
    margin: 1,
    padding: 15,
  },
  password: {
    borderWidth: 0.3,
    margin: 1,
    padding: 15,
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
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
  text: {
    padding: 5,
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
});

const AuthLoginContainer = StyleSheet.create({
  container: {
    width: wp('80%'),
    marginTop: -20,
    fontWeight: '700',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  naver: {
    backgroundColor: '#32CD32',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
  kakao: {
    backgroundColor: '#FFD700',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 3,
  },
  text: {
    padding: 5,
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  signin: {
    fontSize: 15,
    alignItems: 'center',
    display: 'none',
  },
});

const Login = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const dispatch = useDispatch();

  // 로그인
  const onLogIn = () => {
    const data = {email, password};
    dispatch(logInRequest(data));
    setEmail('');
    setPassword('');
  };
  // 회원가입
  const navigation = useNavigation();
  const onSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, []);
  // 소셜인증
  const onAuthLogin = useCallback(() => {
    console.log('소셜인증');
  }, []);
  return (
    <LoginContainer>
      <View>
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
      </View>
      <View style={LocalLoginContainer.container}>
        <TextInput
          name="email"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
          style={LocalLoginContainer.email}
          autoFocus
        />
        <TextInput
          name="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
          style={LocalLoginContainer.password}
          secureTextEntry={true}
          autoFocus
        />
        <TouchableOpacity onPress={onLogIn} style={LocalLoginContainer.login}>
          <Text style={LocalLoginContainer.text}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignIn} style={LocalLoginContainer.signin}>
          <Text style={LocalLoginContainer.text}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={AuthLoginContainer.container}>
        <TouchableOpacity
          onPress={onAuthLogin}
          style={AuthLoginContainer.naver}>
          <Text style={AuthLoginContainer.text}>네이버 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAuthLogin}
          style={AuthLoginContainer.kakao}>
          <Text style={AuthLoginContainer.text}>카카오 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAuthLogin}
          style={AuthLoginContainer.signin}>
          <Text>회원가입하기</Text>
        </TouchableOpacity>
      </View>
    </LoginContainer>
  );
};

export default Login;
