import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import TextInput from '../../../components/TextInput';
import { getImageFromGallery } from '../../../utils/helper/ImageController';
import { useAppDispatch, useAppSelector } from '../../../redux/store/Store';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Colors } from '../../../themes/Colors';
import _ from 'lodash';
import showMessage from '../../../utils/helper/showMessage';
import { getUserProfileRequest } from '../../../redux/reducer/AuthReducer';
import { productCreateRequest } from '../../../redux/reducer/ProductReducer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootMainTabParamList } from '../../../types';
import { CustomStatusBar } from '../../../utils/helper/CustomStatusBar';
import Loader from '../../../utils/helper/Loader';

interface ProductInfoProps {
  visible: boolean;
  type: 'create' | 'update' | 'delete';
  id: string;
  title: string;
  description: string;
  uri: string;
  path: any;
}

const Touchable = Animated.createAnimatedComponent(Pressable);

const Home = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideYAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const transformX = useRef(new Animated.Value(-200)).current;
  const colorValue = useRef(new Animated.Value(0)).current;

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const navigation =
    useNavigation<BottomTabNavigationProp<RootMainTabParamList>>();
  const [showFocus, setShowFocus] = useState<string | null>(null);
  const { loading } = useAppSelector(state => state.auth);

  const [productInfo, setProductInfo] = useState<ProductInfoProps>({
    visible: false,
    type: 'create',
    id: '',
    title: '',
    description: '',
    uri: '',
    path: null,
  });

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

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserProfileRequest());
    }
  }, [isFocused]);

  const scale = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  function handleCreateProduct() {
    if (productInfo.uri === '') {
      showMessage('Please upload product image');
    } else if (productInfo?.title.trim() === '') {
      showMessage('Title is required');
    } else if (productInfo?.description.trim() === '') {
      showMessage('Description is required');
    } else {
      const formData = new FormData();
      formData.append('title', productInfo.title);
      formData.append('description', productInfo.description);

      if (productInfo?.path !== null) {
        formData.append('image', productInfo.path);
      }

      dispatch(productCreateRequest(formData));

      // Clear form
      setProductInfo(pre => ({
        ...pre,
        visible: false,
        description: '',
        title: '',
        path: null,
        uri: '',
      }));

      // Navigate to List tab
      navigation.navigate('List');
    }
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <ImageBackground
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmSlIj5eFSqDiC742ZerOKlWDxpzzH6cmO2a1HsjTEJGBwzXZ_W2ng06FngMjcURKDz00&usqp=CAU',
        }}
        resizeMode="cover"
        style={{ ...StyleSheet.absoluteFillObject }}
      >
        <Loader visible={loading && isFocused} />
        <Text style={styles.sheetText}>Create Product</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.centeredView}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.v}
                onPress={() => {
                  getImageFromGallery({
                    isCrop: false,
                    cropperCircleOverlay: false,
                    callback(res) {
                      if (res.path !== null && res.uri !== '') {
                        setProductInfo(pre => ({
                          ...pre,
                          uri: res?.uri,
                          path: res?.path,
                        }));
                      }
                    },
                  });

                  // getImageFromCamera({
                  //   isCrop: true,
                  //   cropperCircleOverlay: true,
                  //   callback(res) {
                  //     if (res.path !== null && res.uri !== '') {
                  //       setProductInfo(pre => ({
                  //         ...pre,
                  //         uri: res?.uri,
                  //         path: res?.path,
                  //       }));
                  //     }
                  //   },
                  // });
                }}
              >
                {productInfo?.uri !== '' ? (
                  <Image
                    source={{
                      uri: productInfo?.uri,
                    }}
                    style={styles.img}
                  />
                ) : (
                  <Text style={styles.txt}>{'Upload\nImage'}</Text>
                )}
                <View style={styles.add}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png',
                    }}
                    style={styles.plus}
                    tintColor={'lightblue'}
                  />
                </View>
              </TouchableOpacity>

              <TextInput
                value={productInfo.title}
                placeholder="Enter Title"
                onFocus={() => setShowFocus('title')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'title'}
                containerStyle={[
                  styles.textInputContainer,
                  {
                    backgroundColor:
                      showFocus === 'title' ? '#e0f7fa' : '#f2f2f2',
                    borderColor:
                      showFocus === 'title'
                        ? Colors.blueLight
                        : Colors.lightBlue,
                  },
                ]}
                onChangeText={v => {
                  setProductInfo(pre => ({
                    ...pre,
                    title: v,
                  }));
                }}
              />
              <TextInput
                value={productInfo.description}
                placeholder="Enter Description"
                onFocus={() => setShowFocus('description')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'description'}
                containerStyle={[
                  styles.textInputContainer,
                  {
                    backgroundColor:
                      showFocus === 'description' ? '#e0f7fa' : '#f2f2f2',
                    borderColor:
                      showFocus === 'description'
                        ? Colors.blueLight
                        : Colors.lightBlue,
                  },
                ]}
                onChangeText={v => {
                  setProductInfo(pre => ({
                    ...pre,
                    description: v,
                  }));
                }}
              />

              <Touchable
                onPressIn={() => changeColor(1)}
                onPressOut={() => changeColor(0)}
                style={[
                  styles.submitButton,
                  { backgroundColor, transform: [{ scale }] },
                ]}
                onPress={() => {
                  if (productInfo.type === 'create') {
                    handleCreateProduct();
                  }
                }}
              >
                <Text style={styles.submitText}>Add Product</Text>
              </Touchable>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default Home;
