import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentNav from './StudentNav';
import TopTab from './TopTab';
import {useSelector} from 'react-redux';
import MainStudentNav from './MainStudentNav';
import AuthNavigation from './AuthNavigation';

const MainNavigation = () => {
  // var localStorage;
  // useEffect(() => {
  //   async function auth() {
  //     localStorage = await AsyncStorage.getItem('auth');
  //   }
  //   auth();
  // }, [localStorage]);

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
