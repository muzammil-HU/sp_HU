import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RegistrationChecksModal from '../../../../../components/reuseable/Modals/RegistrationChecks';
import {COLORS} from '../../../../../Constants/COLORS';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../../../../components/header/CustomTabBar';
import UnderConstruction from '../../../../../components/reuseable/ScreenUnderConstruction';

const RegisterNewCourses = () => {
  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(true);
  const data = [
    {
      SNo: 1,
      content: '- Student Account Balance must clear before registration.',
    },
    {
      SNo: 2,
      content:
        '- Registration No assigned to student from Registrar Office. i-e student all documents are ok and submitted in Admission Office.',
    },
    {
      SNo: 3,
      content:
        '- Student Degree Completion Period (7 years for Bachelor Degree) is not yet expired.',
    },
    {
      SNo: 4,
      content:
        '- Student CGPA must meet the required limit (e.g 1.6 or 1.80 etc)',
    },
    {
      SNo: 5,
      content:
        '- In case of 4 or more than 4 deficiency courses, student is not allowed to register new courses.',
    },
  ];
  const Tab = createMaterialTopTabNavigator();
  const timeline =
    "COURSES REGISTRATION IS OPEN '9' Days Left to Register New Courses";

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
      setVisible(true);
    }, 1000);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Tab.Navigator
        initialRouteName="Current Schedule"
        screenOptions={{
          activeBackgroundColor: COLORS.themeColor,
          inactiveBackgroundColor: COLORS.white,
          animationEnabled: true,
        }}
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Current Schedule">
          {props => (
            <UnderConstruction {...props} load={load} setLoad={setLoad} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Makeup Classes">
          {props => (
            <UnderConstruction {...props} load={load} setLoad={setLoad} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Course Content">
          {props => (
            <UnderConstruction {...props} load={load} setLoad={setLoad} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      <RegistrationChecksModal
        visible={visible}
        setVisible={setVisible}
        data={data}
        timeline={timeline}
      />
    </View>
  );
};

export default RegisterNewCourses;

const styles = StyleSheet.create({});
