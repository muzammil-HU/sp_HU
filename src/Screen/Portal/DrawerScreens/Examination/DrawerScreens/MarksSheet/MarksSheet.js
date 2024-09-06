import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../../../Constants/COLORS';
import {useDispatch, useSelector} from 'react-redux';
import clientapi from '../../../../../../api/clientapi';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommonCard from '../../../../../../components/reuseable/Cards/CommonCard';
import CustomTabBar from '../../../../../../components/header/CustomTabBar';
import Loader from '../../../../../../components/reuseable/Modals/LoaderModal';
import MarksheetCards from '../../../../../../components/reuseable/Cards/MarksheetCards';
import UnderConstruction from '../../../../../../components/reuseable/ScreenUnderConstruction';
import GradingCriteria from '../../../Academics/DrawersScreens/GradingCriteria';
import Grading_Table from '../../../../../../components/reuseable/Grading_Table';
import ScreenHead from '../../../../../../components/reuseable/ScreenHead';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {showMessage} from 'react-native-flash-message';
import DegreeCompStatus from './DegreeCompStatus';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../../../../../Redux/Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../../../../../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';

const MarksSheet = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const route = useRoute();
  const nav = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const dispatch = useDispatch();
  const Tabsheads = [
    {head: 'Unofficial DMC', comp: MarksheetCards},
    // {head: 'Semester GPA', comp: UnderConstruction},
    // {head: 'Assessment Detail', comp: UnderConstruction},
    // {head: 'Assessment Break Up', comp: UnderConstruction},
    // {head: 'Assessment GPA', comp: UnderConstruction},
    {head: 'Grading Criteria', comp: Grading_Table},
    {head: 'Degree Completion Status', comp: DegreeCompStatus},
  ];
  const AuthState = useSelector(state => {
    return state?.AuthReducer?.UserDetail;
  });
  // console.log(AuthState, 'AuthState');
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });

  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  useEffect(() => {
    const params = {
      token: TokenState,
      student_id: studentId,
    };
    (async () => {
      const MarksSheetData = async params => {
        try {
          setLoad(true);
          const api = await clientapi.post(`/student/marksheet`, params);
          if (
            api?.data?.success === false &&
            api?.data?.output?.response?.messages ===
              'Session expired Please Login Again'
          ) {
            dispatch(LoginUser(false));
            dispatch(TokenId(null));
            dispatch(UserDetail(null));
            dispatch(registered_courses(null));
            showMessage({
              message: 'Session expired Please Login Again',
              type: 'warning',
              position: 'top',
              // backgroundColor: COLORS.themeColor,
              color: COLORS.black,
              style: {justifyContent: 'center', alignItems: 'center'},
              icon: () => (
                <FontAwesome6
                  name="circle-exclamation"
                  size={windowWidth / 16}
                  color={COLORS.black}
                  style={{paddingRight: 20}}
                />
              ),
            });
            setLoad(false);
          } else {
            setData(api.data);
            setLoad(false);
          }
        } catch (error) {
          // console.log(error, 'api error');
          setLoad(false);
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
      };
      await MarksSheetData(params);
    })();
  }, []);
  const grading_criteria = useSelector(state => {
    return state.GlobalStatesReducer.grading_criteria;
  });
  return (
    <>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
          <ScreenHead heading={'MarksSheet'} NoteVisibility={false} />
          {!data ? (
            <View style={{flex: 1, alignItems: 'center', paddingTop: '8%'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                }}>
                <Text style={{textAlign: 'center', color: COLORS.themeColor}}>
                  No Data Found
                </Text>
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
                screenOptions={{
                  activeBackgroundColor: COLORS.themeColor,
                  inactiveBackgroundColor: COLORS.white,
                }}
                tabBar={props => <CustomTabBar {...props} />}>
                {Tabsheads.map((head, index) => {
                  return (
                    <Tab.Screen
                      key={index}
                      name={head.head}
                      component={head.comp}
                      initialParams={{
                        data: data,
                      }}
                    />
                  );
                })}
              </Tab.Navigator>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default MarksSheet;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: COLORS.TextthemeColor,
    fontSize: windowWidth / 15,
  },
});
