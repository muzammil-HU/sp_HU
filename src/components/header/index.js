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
import {COLORS} from '../../Constants/COLORS';

const Customheader = () => {
  const WindowWidth = Dimensions.get('window').width;
  const WindowHeight = Dimensions.get('window').height;

  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/Headerimg.png')}
      resizeMode="contain"
      style={{
        height: WindowHeight / 12,
        width: '100%',
        elevation: 10,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: COLORS.themeColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          // marginRight: 15,
          // backgroundColor: 'red',
          // height: 100,
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomStartRadius: 10,
          // borderBottomEndRadius: 10,
        }}
        onPress={() => navigation.openDrawer()}>
        <Image
          source={require('../../assets/DrawerIcon.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: 'rgba(43, 163, 111, 0.8)',
          width: '60%',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: '20%',
              height: '100%',
              justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/test.png')}
              resizeMode="stretch"
              style={{height: '75%', width: '85%', borderRadius: 50}}
            />
            {/* </View> */}
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '75%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontWeight: '800',
                color: COLORS.white,
                // fontSize: WindowWidth / 22,
              }}>
              Faiza Hameed
            </Text>
            <Text
              style={{
                fontWeight: '800',
                color: COLORS.white,
                // fontSize: WindowWidth / 22,
              }}>
              (277-2017)
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* // onPress={() => navigation.openDrawer()} */}
        <Image
          source={require('../../assets/NotificationIcon.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Customheader;

const styles = StyleSheet.create({});
