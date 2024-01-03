import {StyleSheet, View, useColorScheme} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../Screen/Profile';
import Attendence from '../../Screen/Portal/Attendence';
import QrScan from '../../components/QrScan';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BottomHome from '../../Screen/Portal/Home';
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
      height: 60,
      backgroundColor: '#2BA36F',
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
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? 15 : 0,
                  elevation: 20,
                  borderRadius: 50,
                }}>
                <AntDesign
                  name="home"
                  size={40}
                  color={focused ? '#fff' : '#16247d'}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Attendence"
        component={Attendence}
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
                }}>
                <FontAwesome
                  name="calendar-check-o"
                  size={40}
                  color={focused ? '#fff' : '#16247d'}
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
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#16247d' : '#fff',
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  bottom: focused ? 25 : 15,
                  elevation: 20,
                  borderRadius: 28,
                }}>
                <FontAwesome5
                  name="qrcode"
                  size={40}
                  color={focused ? '#fff' : '#16247d'}
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
                }}>
                <FontAwesome6
                  name="circle-user"
                  size={40}
                  color={focused ? '#fff' : '#16247d'}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="settings"
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
                }}>
                <Feather
                  name="settings"
                  size={40}
                  color={focused ? '#fff' : '#16247d'}
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
