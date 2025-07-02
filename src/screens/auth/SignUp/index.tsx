import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {Icons} from '../../../themes/Icons';
import {Colors} from '../../../themes/Colors';
import TextInput from '../../../components/TextInput';
import CheckBox from '../../../components/CheckBox';
import {getImageFromGallery} from '../../../utils/helper/ImageController';
import {useAppDispatch, useAppSelector} from '../../../redux/store/Store';
import showMessage from '../../../utils/helper/showMessage';
import {signUpRequest} from '../../../redux/reducer/AuthReducer';
import Loader from '../../../utils/helper/Loader';
import {navigate} from '../../../navigators/RootNavigation';
import {CustomStatusBar} from '../../../utils/helper/CustomStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';

const index = () => {
  const Touchable = Animated.createAnimatedComponent(Pressable);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideYAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const transformX = useRef(new Animated.Value(-200)).current;
  const colorValue = useRef(new Animated.Value(0)).current;
  const colorValueLogin = useRef(new Animated.Value(0)).current;

  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSequre, setIsSequre] = useState<boolean>(false);
  const [showFocus, setShowFocus] = useState<string | null>(null);
  const [isTerms, setIsTerms] = useState<boolean>(false);
  const [imageUri, setImgaeUri] = useState<{
    uri: string;
    path: any;
  }>({
    uri: 'https://cdn-icons-png.flaticon.com/128/847/847969.png',
    path: null,
  });

  const validate = () => {
    if (!firstName.trim()) {
      showMessage('FirstName is required');
      return false;
    }
    if (!lastName.trim()) {
      showMessage('LastName is required');
      return false;
    }

    if (!email.trim()) {
      showMessage('Email is required');
      return false;
    }

    if (!password.trim()) {
      showMessage('Password is required');
      return false;
    }

    if (password !== confirmPassword) {
      showMessage('Passwords do not match');
      return false;
    }

    if (!isTerms) {
      showMessage('You must agree to the terms and conditions.');
      return false;
    }

    return true;
  };

  const handleSignup = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append('email', email.toLocaleLowerCase());
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('password', password);

      if (imageUri.path !== null) {
        formData.append('profile_pic', imageUri.path);
      }

      dispatch(signUpRequest(formData));
    }
  };

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
    outputRange: [Colors.blue, Colors.green],
  });

  const changeLoginBtnColor = (value: number) => {
    Animated.timing(colorValueLogin, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColorLogin = colorValueLogin.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.dark, Colors.lightBlue],
  });

  const scaleLogin = colorValueLogin.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  const scale = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <ImageBackground
        source={Icons.bgTheme}
        resizeMode="cover"
        style={{...StyleSheet.absoluteFillObject}}>
        <Loader visible={loading} />
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
              Create Account
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

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.v}
              onPress={() => {
                getImageFromGallery({
                  isCrop: true,
                  cropperCircleOverlay: true,
                  callback(res) {
                    if (res.path !== null && res.uri !== '') {
                      setImgaeUri({
                        uri: res.uri,
                        path: res.path,
                      });
                    }
                  },
                });
              }}>
              <Image
                source={{
                  uri: imageUri.uri,
                }}
                style={styles.img}
              />
              <View style={styles.add}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png',
                  }}
                  style={styles.plus}
                  tintColor={'lightgrey'}
                />
              </View>
            </TouchableOpacity>

            <TextInput
              value={firstName}
              onChangeText={v => setFirstName(v)}
              placeholder="Full Name"
              onFocus={() => setShowFocus('name')}
              onBlur={() => setShowFocus(null)}
              focused={showFocus === 'name'}
              icon={{uri: Icons.profile}}
            />

            <TextInput
              value={lastName}
              onChangeText={v => setLastName(v)}
              placeholder="Last Name"
              onFocus={() => setShowFocus('name')}
              onBlur={() => setShowFocus(null)}
              focused={showFocus === 'name'}
              icon={{uri: Icons.profile}}
            />

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

            <TextInput
              value={confirmPassword}
              onChangeText={v => setConfirmPassword(v)}
              placeholder="Confirm Password"
              icon={isSequre ? {uri: Icons.invisible} : {uri: Icons.visible}}
              disable={false}
              onFocus={() => setShowFocus('confirmPassword')}
              onBlur={() => setShowFocus(null)}
              focused={showFocus === 'confirmPassword'}
              onPress={() => setIsSequre(!isSequre)}
              secureTextEntry={isSequre}
            />

            <View style={styles.v1}>
              <CheckBox
                box={isTerms ? {uri: Icons.showCheck} : {uri: Icons.emptyCheck}}
                disable={false}
                onPress={() => setIsTerms(!isTerms)}
              />
              <Text style={[styles.text, {marginLeft: 8}]}>
                Agree with Terms & Conditions
              </Text>
            </View>
            <Touchable
              onPress={() => {
                handleSignup();
              }}
              onPressIn={() => changeColor(1)}
              onPressOut={() => changeColor(0)}
              style={[
                styles.fullWidthButton,
                {backgroundColor, transform: [{scale}]},
              ]}>
              <Text style={styles.btnText}>Create Account</Text>
            </Touchable>
            <Touchable
              onPress={() => navigate('Login')}
              onPressIn={() => changeLoginBtnColor(1)}
              onPressOut={() => changeLoginBtnColor(0)}
              style={[
                styles.navigateButton,
                {
                  backgroundColor: backgroundColorLogin,
                  transform: [{scale: scaleLogin}],
                },
              ]}>
              <Text style={styles.btnText}>Back to Login</Text>
            </Touchable>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default index;
