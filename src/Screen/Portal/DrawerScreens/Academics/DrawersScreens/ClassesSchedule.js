import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import CurrentSchedule from '../../../../../components/ClassesSchedule/CurrentSchedule';
import {useDispatch, useSelector} from 'react-redux';
import {getclassSchedule} from '../../../../../Redux/Actions/GlobalStatesFunctions';
import CurrentScheduleCards from '../../../../../components/reuseable/Cards/CurrentScheduleCards';
import MakeupClasses from '../../../../../components/ClassesSchedule/MakeUpClasses';
import CourseContent from '../../../../../components/ClassesSchedule/CourseContent';
import Loader from '../../../../../components/reuseable/Modals/LoaderModal';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../../../../components/header/CustomTabBar';
import {useRoute} from '@react-navigation/native';
import TabBar from '../../../../../components/header/TabBar';

const ClassesSchedule = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const TokenState = useSelector(state => {
    return state.AuthReducer.TokenId;
  });

  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  useEffect(() => {
    const params = {
      token: TokenState,
      student_id: studentId,
    };
    setLoad(true);
    getclassSchedule(setData, setLoad, setError, dispatch, params);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);

  const Tab = createMaterialTopTabNavigator();
  const route = useRoute();
  return (
    <>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}>
          <Tab.Navigator
            initialRouteName="Current Schedule"
            screenOptions={{
              activeBackgroundColor: COLORS.themeColor,
              inactiveBackgroundColor: COLORS.white,
            }}
            tabBar={props =>
              route.name !== 'Register New Course' || 'Classes Schedule' ? (
                <TabBar {...props} />
              ) : (
                <CustomTabBar {...props} />
              )
            }
            // route.name !== 'Register New Course' || 'Classes Schedule' ? (

            // ) : (
            //   <TabBar {...props} />
            // );
            // }}
          >
            {/* {Object.keys(courses)
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
              })} */}
            <Tab.Screen name="Current Schedule">
              {props => (
                <CurrentScheduleCards
                  {...props}
                  load={load}
                  setLoad={setLoad}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Makeup Classes">
              {props => (
                <MakeupClasses {...props} load={load} setLoad={setLoad} />
              )}
            </Tab.Screen>
            <Tab.Screen name="Course Content">
              {props => (
                <CourseContent {...props} load={load} setLoad={setLoad} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      )}
    </>
  );
};

export default ClassesSchedule;

const styles = StyleSheet.create({
  mainheading: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
  },
  headNote: {
    color: COLORS.TextthemeColor,
    textAlign: 'center',
    fontSize: windowWidth / 28,
    paddingHorizontal: 10,
  },
});

{
  /* <CurrentSchedule /> */
}
{
  /* <CurrentScheduleCards />
      <MakeupClasses />
      <CourseContent /> */
}
