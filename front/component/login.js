import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';

const LoginContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
`;

const LocalLoginContainer = StyleSheet.create({
  container: {
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
    backgroundColor: 'blue',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 3,
  },
  signin: {
    backgroundColor: 'blue',
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
    margin: 20,
    marginTop: -20,
    fontWeight: '700',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  naver: {
    backgroundColor: 'green',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
  kakao: {
    backgroundColor: 'yellow',
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onLogIn = useCallback(() => {
    console.log('로그인');
  }, []);
  const onSignIn = useCallback(() => {
    console.log('회원가입');
  }, []);
  const onAuthLogin = useCallback(() => {
    console.log('소셜인증');
  }, []);
  return (
    <LoginContainer>
      <View style={LocalLoginContainer.container}>
        <TextInput
          name="email"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
          style={LocalLoginContainer.email}
          autoFocus={true}
        />
        <TextInput
          name="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
          style={LocalLoginContainer.password}
          secureTextEntry={true}
          autoFocus={true}
        />
        <TouchableOpacity onClick={onLogIn} style={LocalLoginContainer.login}>
          <Text style={LocalLoginContainer.text}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onClick={onSignIn} style={LocalLoginContainer.signin}>
          <Text style={LocalLoginContainer.text}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={AuthLoginContainer.container}>
        <TouchableOpacity
          onClick={onAuthLogin}
          style={AuthLoginContainer.naver}>
          <Text style={AuthLoginContainer.text}>네이버 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onClick={onAuthLogin}
          style={AuthLoginContainer.kakao}>
          <Text style={AuthLoginContainer.text}>카카오 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onClick={onAuthLogin}
          style={AuthLoginContainer.signin}>
          <Text>회원가입하기</Text>
        </TouchableOpacity>
      </View>
    </LoginContainer>
  );
};

export default Login;
