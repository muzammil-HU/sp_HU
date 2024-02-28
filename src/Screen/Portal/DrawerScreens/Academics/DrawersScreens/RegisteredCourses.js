import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import CommonCard from '../../../../../components/reuseable/Cards/CommonCard';
import clientapi from '../../../../../api/clientapi';
import {useSelector} from 'react-redux';
import {getregisteredCourses} from '../../../../../Redux/Actions/GlobalStatesFunctions';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ClassesSchedule from './ClassesSchedule';
import MakeupClasses from '../../../../../components/ClassesSchedule/MakeUpClasses';
import CourseContent from '../../../../../components/ClassesSchedule/CourseContent';
import CustomTabBar from '../../../../../components/header/CustomTabBar';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RegisteredCourses = () => {
  const [load, setLoad] = useState(false);
  const route = useRoute();
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  useEffect(() => {}, [route]);
  const Tab = createMaterialTopTabNavigator();

  const [error_message, setError_message] = useState('');
  const TokenId = useSelector(state => {
    return state.AuthReducer.TokenId;
  });

  const courses = useSelector(state => {
    return state?.GlobalStatesReducer?.registered_courses;
  });

  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10%',
            backgroundColor: COLORS.white,
          }}>
          <Text style={styles.text}>Registered Courses</Text>
        </View>
        {!courses || Object.keys(courses).length === 0 ? (
          <View style={{flex: 1, alignItems: 'center', paddingTop: '8%'}}>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>No Data Found</Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'column',
              // backgroundColor: 'red',
              width: '100%',
              height: '90%',
            }}>
            <Tab.Navigator
              initialRouteName="Current Schedule"
              screenOptions={{
                activeBackgroundColor: COLORS.themeColor,
                inactiveBackgroundColor: COLORS.white,
              }}
              tabBar={props => <CustomTabBar {...props} />}>
              {Object.keys(courses)
                .filter(
                  key => key !== 'total_all_c' && key !== 'total_all_amount',
                )
                .reverse()
                .map((offerType, index) => {
                  return (
                    <Tab.Screen
                      key={index}
                      name={courses[offerType].offer_type}
                      component={CommonCard}
                      initialParams={{courses: courses[offerType].courses}}
                    />
                  );
                })}
            </Tab.Navigator>
          </View>
        )}
      </View>
    </>
  );
};

export default RegisteredCourses;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: COLORS.TextthemeColor,
    fontSize: windowWidth / 15,
  },
});
