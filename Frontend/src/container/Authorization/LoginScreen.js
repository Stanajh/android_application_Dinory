import AsyncStorage from '@react-native-community/async-storage';
import React, {Component, useState, createRef} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {loginInstance} from '../../api/accounts/login';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
export default function Login({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.3718;
  const layoutHeight = windowHeight * 0.708;
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const nameInputRef = createRef();
  const passwordInputRef = createRef();
  const LoginHandler = () => {
    let loginForm = new FormData();
    loginForm.append('username', userName);
    loginForm.append('password', userPassword);
    navigation.navigate('PinScreen');
    // loginInstance(
    //   loginForm,
    //   (res) => {
    //     // AsyncStorage.setItem('jwt', res.data.token);
    //     console.log(res.data.token);
    //     alert('PASS');
    //     navigate('PinScreen');
    //   },
    //   (error) => {
    //     alert('ERROR');
    //     console.log(error);
    //   },
    // );
  };
  return (
    <ScrollView>
      <ImageBackground
        source={require('../../assets/images/background5.png')}
        style={styles.container}>
        <View style={styles.start}>
          <View>
            <ArrowButton
              onHandlePress={() => navigation.goBack()}></ArrowButton>
          </View>
          <View style={styles.logo}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}></Image>
          </View>
        </View>
        <View style={styles.end}>
          <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
            <View style={styles.view}>
              <Text style={styles.text}>로그인</Text>
            </View>
            <View style={styles.body}>
              <View style={styles.view}>
                <TextInput
                  textContentType={'emailAddress'}
                  style={styles.textInput}
                  autoFocus={true}
                  placeholder={'이메일을 입력해주세요'}
                  onChangeText={(name) => setUserName(name)}
                  ref={nameInputRef}
                />
                <TextInput
                  secureTextEntry={true}
                  style={styles.textInput}
                  placeholder={'비밀번호를 입력해주세요'}
                  onChangeText={(pwd) => setUserPassword(pwd)}
                  ref={passwordInputRef}
                />
              </View>
              <View style={styles.view}>
                <BasicButton
                  text="로그인"
                  customFontSize={24}
                  paddingHorizon={24}
                  paddingVertical={11}
                  btnWidth={336}
                  btnHeight={58}
                  borderRadius={14}
                  onHandlePress={() => LoginHandler()}></BasicButton>
              </View>
            </View>
          </Layout>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  textInput: {
    backgroundColor: '#E8E8E8',
    margin: 15,
    width: 336,
    height: 58,
    fontSize: 18,
    borderRadius: 10,
    padding: 16,
  },
  start: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  body: {
    flex: 4,
  },
  end: {
    flex: 4,
  },
});
