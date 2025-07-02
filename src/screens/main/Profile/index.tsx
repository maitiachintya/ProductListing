import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Pressable,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {URL} from '../../../utils/constant/index';
import {
  getUserProfileRequest,
  logoutRequest,
} from '../../../redux/reducer/AuthReducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store/Store';
import {styles} from './styles';
import {Colors} from '../../../themes/Colors';
import {Icons} from '../../../themes/Icons';

const ProfileScreen = () => {
  const Touchable = Animated.createAnimatedComponent(Pressable);

  const colorValue = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {user} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserProfileRequest());
    }
  }, [isFocused]);

  const changeColor = (value: number) => {
    Animated.timing(colorValue, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.red, Colors.deepRed],
  });

  const scale = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f1f5f9'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity>
          <Image
            source={{
              uri: URL.PROFILE_IMAGE_URL.concat(user?.profile_pic),
            }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Image
            source={{uri: Icons.dot}}
            style={styles.profileActiveDot}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={styles.name}>
          {user?.first_name} {user?.last_name}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Role :</Text>
          <Text style={styles.value}>{user?.role_data?.roleDisplayName}</Text>

          <Text style={styles.label}>Account Type :</Text>
          <Text style={styles.value}>{user?.register_type}</Text>

          <Text style={styles.label}>Status :</Text>
          <Text
            style={[
              styles.value,
              {color: user?.isActive ? '#22c55e' : '#ef4444'},
            ]}>
            {user?.isActive ? 'Active' : 'Inactive'}
          </Text>

          <Text style={styles.label}>Joined :</Text>
          <Text style={styles.value}>
            {new Date(user?.createdAt).toDateString()}
          </Text>
        </View>

        <Touchable
          onPress={() => {
            dispatch(logoutRequest());
          }}
          onPressIn={() => changeColor(1)}
          onPressOut={() => changeColor(0)}
          style={[
            styles.logoutButton,
            {backgroundColor, transform: [{scale}]},
          ]}>
          <Text style={styles.logoutText}>Logout</Text>
          <Image source={{uri: Icons.logout}} style={styles.logoutLogo} />
        </Touchable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
