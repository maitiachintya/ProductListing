// import {StyleSheet} from 'react-native';

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f8ff',
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: '#4682b4',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 25,
//   },
//   loginText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   loginLink: {
//     fontSize: 14,
//     color: '#4682b4',
//     fontWeight: 'bold',
//   },
//   v: {
//     alignSelf: 'center',
//     marginTop: 30,
//     marginBottom: 20,
//     borderWidth: 2,
//     borderRadius: 100,
//     borderColor: 'lightgrey',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   img: {
//     height: 100,
//     width: 100,
//     borderRadius: 100,
//     resizeMode: 'cover',
//   },
//   add: {
//     backgroundColor: '#f0f8ff',
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     borderRadius: 30,
//     padding: 6,
//     shadowColor: 'grey',
//     elevation: 4,
//     shadowOffset: {
//       width: 4,
//       height: 6,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   plus: {
//     height: 15,
//     width: 15,
//   },
// });

import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import {
  horizontalScale,
  moderateScale,
  normalize,
  verticalScale,
} from '../../../utils/orientation';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    height: '100%',
    width: '100%',
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingTop: Platform.OS == 'ios' ? 45 : 55,
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingBottom: verticalScale(30),
  },
  title: {
    color: Colors.white,
    fontSize: moderateScale(26),
    fontFamily: Fonts.Poppins_SemiBold,
  },
  subTitle: {
    color: Colors.grey,
    fontSize: moderateScale(12),
    fontFamily: Fonts.Poppins_Regular,
    textAlign: 'center',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(28),
  },
  v: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
    borderWidth: moderateScale(2),
    borderRadius: normalize(100),
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: verticalScale(100),
    width: horizontalScale(100),
    borderRadius: moderateScale(100),
    resizeMode: 'cover',
  },
  add: {
    backgroundColor: '#f0f8ff',
    position: 'absolute',
    right: horizontalScale(0),
    bottom: verticalScale(0),
    borderRadius: moderateScale(30),
    padding: normalize(6),
    shadowColor: 'grey',
    elevation: moderateScale(4),
    shadowOffset: {
      width: horizontalScale(4),
      height: verticalScale(6),
    },
    shadowOpacity: moderateScale(0.2),
    shadowRadius: moderateScale(5),
  },
  plus: {
    height: verticalScale(15),
    width: horizontalScale(15),
  },
  v1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: verticalScale(10),
  },
  text: {
    color: Colors.white,
    fontSize: moderateScale(12),
    fontFamily: Fonts.Poppins_Regular,
    marginVertical: verticalScale(18),
  },
  phoneContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    backgroundColor: Colors.dark,
  },
  countryCode: {
    width: horizontalScale(10),
    padding: normalize(10),
    textAlign: 'center',
    borderRightWidth: horizontalScale(1),
    borderColor: '#ccc',
  },
  phoneWrapper: {
    flexDirection: 'row',
    marginTop: verticalScale(12),
    width: '100%',
  },
  touchFlag: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(15),
    backgroundColor: Colors.dark,
    borderRightWidth: horizontalScale(3),
    borderRightColor: Colors.main,
  },
  flagIconText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.white,
  },
  codeWrapper: {
    flex: 1,
    backgroundColor: 'green',
  },
  numberWrapper: {
    flex: 3,
    backgroundColor: 'blue',
  },
  countryInput: {
    width: '100%',
  },
  btnAccount: {
    marginTop: verticalScale(0),
    borderColor: Colors.grey,
    borderWidth: moderateScale(0.5),
  },
  btnText: {
    color: 'white',
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
  },
  fullWidthButton: {
    height: 58,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  navigateButton: {
    height: 58,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
