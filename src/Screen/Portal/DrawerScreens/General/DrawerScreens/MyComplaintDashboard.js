import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getclassSchedule} from '../../../../../Redux/Actions/GlobalStatesFunctions';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../../../components/reuseable/Modals/LoaderModal';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import TabBar from '../../../../../components/header/TabBar';
import CustomTabBar from '../../../../../components/header/CustomTabBar';
import CurrentScheduleCards from '../../../../../components/reuseable/Cards/CurrentScheduleCards';
import MakeupClasses from '../../../../../components/ClassesSchedule/MakeUpClasses';

const MyComplaintDashboard = () => {
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
            }>
            <Tab.Screen name="Closed Tickets">
              {props => (
                // <CurrentScheduleCards
                //   {...props}
                //   load={load}
                //   setLoad={setLoad}
                // />
                <View
                  {...props}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>hello</Text>
                </View>
              )}
            </Tab.Screen>
            <Tab.Screen name="Pending Tickets">
              {props => (
                <MakeupClasses {...props} load={load} setLoad={setLoad} />
              )}
            </Tab.Screen>
            <Tab.Screen name="New Tickets">
              {props => (
                <MakeupClasses {...props} load={load} setLoad={setLoad} />
              )}
            </Tab.Screen>
            {/* <Tab.Screen name="Course Content">
              {props => (
                <CourseContent {...props} load={load} setLoad={setLoad} />
              )}
            </Tab.Screen> */}
          </Tab.Navigator>
        </View>
      )}
    </>
  );
};

export default MyComplaintDashboard;

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
