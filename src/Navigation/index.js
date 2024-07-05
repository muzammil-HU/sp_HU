import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentNav from './StudentNav';
import TopTab from './TopTab';
import {useDispatch, useSelector} from 'react-redux';
import MainStudentNav from './MainStudentNav';
import AuthNavigation from './AuthNavigation';
import {
  UniqueDeviceId,
  UniqueName,
  ipAddress,
} from '../Redux/Reducers/AuthReducer/AuthReducer';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import {
  WifiName,
  isConnected,
} from '../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';
import {NetworkInfo} from 'react-native-network-info';

const MainNavigation = () => {
  // var localStorage;
  // useEffect(() => {
  //   async function auth() {
  //     localStorage = await AsyncStorage.getItem('auth');
  //   }
  //   auth();
  // }, [localStorage]);
  const dispatch = useDispatch();
  // const [load,setLoad] = useState();
  useEffect(() => {
    const fetchUID = async () => {
      try {
        const uniqueId = await DeviceInfo.getUniqueId();
        dispatch(UniqueDeviceId(uniqueId));

        const uniqueName = await DeviceInfo.getDeviceName();
        dispatch(UniqueName(uniqueName));

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission is required for WiFi connections',
            message: 'This app needs location permission as this is required',
            buttonNegative: 'DENY',
            buttonPositive: 'ALLOW',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const netip = await NetworkInfo.getIPV4Address();
          // console.log(netip, 'nnnnn');
          // NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
          //   console.log(defaultGateway, 'jjkjkjk');
          // });
          const state = await NetInfo.fetch();
          dispatch(isConnected(state.isConnected));
          dispatch(WifiName(state?.details?.ssid));
          dispatch(ipAddress(netip));
        } else {
          showMessage({
            message: `500 Server Error`,
            type: 'danger',
            position: 'top',
            style: {justifyContent: 'center', alignItems: 'center'},
            icon: () => (
              <Entypo
                name="circle-with-cross"
                size={windowWidth / 16}
                color={COLORS.white}
                style={{paddingRight: 20}}
              />
            ),
          });
        }
      } catch (error) {
        showMessage({
          message: '500 Server Error',
          type: 'danger',
          color: COLORS.white,
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <MaterialIcons
              name="error-outline"
              size={windowwidth / 16}
              color={COLORS.white}
              style={{paddingRight: 20}}
            />
          ),
        });
      }
    };

    // Invoke the function
    fetchUID();
  }, []);
  const AuthState = useSelector(state => {
    return state?.AuthReducer.LoginUser;
  });

  return (
    // <NavigationContainer>
    //   {localStorage == null ? <AuthNavigation /> : <TopTab />}
    //   {/* <StudentNav /> */}
    // </NavigationContainer>
    <NavigationContainer>
      {AuthState ? <MainStudentNav /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default MainNavigation;
