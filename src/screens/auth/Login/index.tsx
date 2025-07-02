import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Pressable,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {Colors} from '../../../themes/Colors';
import {Icons} from '../../../themes/Icons';
import TextInput from '../../../components/TextInput';
import CheckBox from '../../../components/CheckBox';
import {useAppDispatch, useAppSelector} from '../../../redux/store/Store';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../utils/helper/Loader';
import showMessage from '../../../utils/helper/showMessage';
import {signInRequest} from '../../../redux/reducer/AuthReducer';
import {navigate} from '../../../navigators/RootNavigation';
import {CustomStatusBar} from '../../../utils/helper/CustomStatusBar';

const Touchable = Animated.createAnimatedComponent(Pressable);

const index = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideYAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const transformX = useRef(new Animated.Value(-200)).current;
  const colorValue = useRef(new Animated.Value(0)).current;
  const colorValueRegister = useRef(new Animated.Value(0)).current;

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {loading} = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showFocus, setShowFocus] = useState<string | null>(null);
  const [isSequre, setIsSequre] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);

  const validate = () => {
    if (!email.trim()) {
      showMessage('Email is required');
      return false;
    }

    if (!password.trim()) {
      showMessage('Password is required');
      return false;
    }

    if (!show) {
      showMessage('You must agree to the terms and conditions.');
      return false;
    }

    return true;
  };

  async function handleLogin() {
    if (validate()) {
      try {
        dispatch(
          signInRequest({
            email: email.toLowerCase(),
            password: password,
          }),
        );
      } catch (error) {
        console.log('Error in handleSignIn:', error);
      }
    }
  }

  useEffect(() => {
    fadeAnim.setValue(0);
    slideYAnim.setValue(100);
    scaleAnim.setValue(0.8);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideYAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(transformX, {
        toValue: 0,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const changeColor = (value: number) => {
    Animated.timing(colorValue, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.blue, Colors.grey],
  });

  const backgroundColorRegister = colorValueRegister.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.dark, Colors.lightBlue],
  });

  const scaleRegister = colorValueRegister.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  const scale = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  const changeRegisterBtnColor = (value: number) => {
    Animated.timing(colorValueRegister, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <ImageBackground
        source={Icons.bgTheme}
        resizeMode="cover"
        style={{...StyleSheet.absoluteFillObject}}>
        <Loader visible={loading && isFocused} />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
          <StatusBar backgroundColor={Colors.main} barStyle={'light-content'} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.main}
            contentContainerStyle={styles.contentContainerStyle}>
            <Animated.Text
              style={[
                styles.title,
                {
                  opacity: fadeAnim,
                  transform: [{translateY: slideYAnim}, {scale: scaleAnim}],
                },
              ]}>
              Login Account
            </Animated.Text>

            <Animated.Text
              style={[
                styles.subTitle,
                {
                  opacity: fadeAnim,
                  transform: [{translateY: slideYAnim}, {scale: scaleAnim}],
                },
              ]}>
              Lorem Ipsum, giving information on its origins, as well as a
              random Lipsum generator.
            </Animated.Text>
            <TextInput
              value={email}
              onChangeText={v => setEmail(v)}
              placeholder="Email Address"
              onFocus={() => setShowFocus('email')}
              onBlur={() => setShowFocus(null)}
              focused={showFocus === 'email'}
              icon={{uri: Icons.email}}
            />

            <TextInput
              value={password}
              onChangeText={v => setPassword(v)}
              placeholder="Password"
              icon={isSequre ? {uri: Icons.invisible} : {uri: Icons.visible}}
              disable={false}
              onFocus={() => setShowFocus('password')}
              onBlur={() => setShowFocus(null)}
              focused={showFocus === 'password'}
              onPress={() => setIsSequre(!isSequre)}
              secureTextEntry={isSequre}
            />

            <View style={styles.v1}>
              <CheckBox
                box={show ? {uri: Icons.showCheck} : {uri: Icons.emptyCheck}}
                disable={false}
                onPress={() => setShow(!show)}
              />
              <Text style={[styles.text, {marginLeft: 8}]}>Save Password</Text>
              <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={styles.text}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <Touchable
              onPress={() => {
                handleLogin();
              }}
              onPressIn={() => changeColor(1)}
              onPressOut={() => changeColor(0)}
              style={[
                styles.fullWidthButton,
                {backgroundColor, transform: [{scale}]},
              ]}>
              <Text style={styles.btnText}>Login Account</Text>
            </Touchable>

            <Text style={styles.text}>Don't have an account?</Text>
            <Touchable
              onPress={() => navigate('SignUp')}
              onPressIn={() => changeRegisterBtnColor(1)}
              onPressOut={() => changeRegisterBtnColor(0)}
              style={[
                styles.navigateButton,
                {
                  backgroundColor: backgroundColorRegister,
                  transform: [{scale: scaleRegister}],
                },
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Register Here
              </Text>
            </Touchable>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default index;
