import {StyleSheet, View, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../../Screen/Portal/BottomTabScreens/Profile';
// import AttendenceInquiry from '../../../Screen/Portal/BottomTabScreens/AttendenceInquiry';
import QrScan from '../../../Screen/Portal/BottomTabScreens/QrScan';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BottomHome from '../../../Screen/Portal/BottomTabScreens/Home';
import Settings from '../../../Screen/StackScreens/Settings';
import DeviceInfo, {
  getIpAddress,
  getMacAddress,
  getUniqueId,
  useIsEmulator,
} from 'react-native-device-info';
import wifiReborn, {getCurrentWifiSSID} from 'react-native-wifi-reborn';
import {showMessage} from 'react-native-flash-message';
import {COLORS, windowHeight, windowWidth} from '../../../Constants/COLORS';
import CameraComp from '../../../components/CameraComp';
import UnderConstruction from '../../../components/reuseable/ScreenUnderConstruction';
const BottomBar = ({state, descriptors, navigation}) => {
  const theme = useColorScheme();
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: windowHeight / 15,
      backgroundColor: COLORS.themeColor,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  };

  return (
    <Tab.Navigator initialRouteName="BtmHome" screenOptions={screenOptions}>
      <Tab.Screen
        name="BtmHome"
        component={BottomHome}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? 15 : 0,
                  elevation: 20,
                  borderRadius: 50,
                  // backgroundColor: COLORS.red,
                  width: '100%',
                }}>
                <AntDesign
                  name="home"
                  size={windowHeight / 20}
                  color={focused ? COLORS.white : '#16247d'}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Attendence"
        component={UnderConstruction}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? 15 : 0,
                  elevation: 20,
                  borderRadius: 50,
                  width: '100%',
                }}>
                <FontAwesome
                  name="calendar-check-o"
                  size={windowHeight / 20}
                  color={focused ? COLORS.white : '#16247d'}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="QR Scanner"
        component={QrScan}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#16247d' : COLORS.white,
                  height: windowHeight / 12,
                  // width: '100%',
                  position: 'absolute',
                  bottom: focused ? 25 : 15,
                  elevation: 20,
                  borderRadius: 20,
                  width: '100%',
                }}>
                <FontAwesome5
                  name="qrcode"
                  size={windowHeight / 20}
                  color={focused ? COLORS.white : '#16247d'}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? 15 : 0,
                  elevation: 20,
                  borderRadius: 50,
                  width: '100%',
                }}>
                <FontAwesome6
                  name="circle-user"
                  size={windowHeight / 20}
                  color={focused ? COLORS.white : '#16247d'}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="test"
        component={UnderConstruction}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? 15 : 0,
                  elevation: 20,
                  borderRadius: 50,
                  width: '100%',
                }}>
                <Feather
                  name="settings"
                  size={windowHeight / 20}
                  color={focused ? COLORS.white : '#16247d'}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
