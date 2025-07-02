import {StyleSheet} from 'react-native';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import {
  horizontalScale,
  moderateScale,
  normalize,
  verticalScale,
} from '../../../utils/orientation';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    backgroundColor: '#f0f4f8',
    borderBottomWidth: verticalScale(1),
    borderColor: '#e0e0e0',
    elevation: moderateScale(3),
    shadowColor: Colors.grey,
    shadowOffset: {
      width: horizontalScale(15),
      height: verticalScale(12),
    },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(4),
  },
  backButton: {
    marginRight: horizontalScale(10),
  },
  touchArrow: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: Colors.black,
  },
  headerTitle: {
    fontSize: normalize(18),
    fontFamily: Fonts.Poppins_Bold,
    color: '#1a1a1a',
  },
  scrollView: {
    padding: moderateScale(16),
  },
  card: {
    backgroundColor: 'rgba(240, 240, 240, 1)',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(8),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(10),
    elevation: 6,
  },
  image: {
    width: '100%',
    height: verticalScale(220),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    backgroundColor: '#dbeafe',
  },
  title: {
    fontSize: normalize(15),
    fontFamily: Fonts.Poppins_Bold,
    color: '#222831',
    marginBottom: verticalScale(12),
  },
  status: {
    fontSize: normalize(13),
    fontFamily: Fonts.Poppins_Medium,
    color: '#2d9cdb',
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
    color: '#34495e',
    marginBottom: verticalScale(6),
  },
  description: {
    fontSize: normalize(12),
    color: '#4a4a4a',
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(20),
  },
  meta: {
    fontSize: normalize(10),
    color: '#888',
    marginBottom: verticalScale(6),
  },
});
