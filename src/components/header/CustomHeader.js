import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {COLORS} from '../../Constants/COLORS';
import ProfileTopCard from './ProfileTopCard';

const CHeader = () => {
  const WindowWidth = Dimensions.get('window').width;
  const WindowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  const AuthState = useSelector(state => {
    return state?.AuthReducer.UserDetail;
  });
  // console.log(AuthState, 'UserDetail');
  return (
    <View
      style={{
        height: WindowHeight / 4,
        width: '100%',
        elevation: 10,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: COLORS.themeColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
        }}>
        <ProfileTopCard />
      </View>
    </View>
  );
};

export default CHeader;

const styles = StyleSheet.create({});
