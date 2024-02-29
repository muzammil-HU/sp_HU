import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
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
} from '../Redux/Reducers/AuthReducer/AuthReducer';
import DeviceInfo from 'react-native-device-info';

const MainNavigation = () => {
  // var localStorage;
  // useEffect(() => {
  //   async function auth() {
  //     localStorage = await AsyncStorage.getItem('auth');
  //   }
  //   auth();
  // }, [localStorage]);
  const dispatch = useDispatch();
  useEffect(() => {
    const UID = async () => {
      const uniqueid = await DeviceInfo.getUniqueId().then(uniqueId => {
        dispatch(UniqueDeviceId(uniqueId));
      });
      // constb;
    };
    const DeviceName = async () => {
      const uniquename = await DeviceInfo.getDeviceName().then(uniqueName => {
        dispatch(UniqueName(uniqueName));
      });
    };
    UID();
    DeviceName();
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
