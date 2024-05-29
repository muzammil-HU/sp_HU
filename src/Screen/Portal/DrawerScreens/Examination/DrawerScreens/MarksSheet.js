import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import {useSelector} from 'react-redux';
import clientapi from '../../../../../api/clientapi';
import {useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommonCard from '../../../../../components/reuseable/Cards/CommonCard';
import CustomTabBar from '../../../../../components/header/CustomTabBar';
import Loader from '../../../../../components/reuseable/Modals/LoaderModal';
import MarksheetCards from '../../../../../components/reuseable/Cards/MarksheetCards';
import UnderConstruction from '../../../../../components/reuseable/ScreenUnderConstruction';
import GradingCriteria from '../../Academics/DrawersScreens/GradingCriteria';
import Grading_Table from '../../../../../components/reuseable/Grading_Table';

const MarksSheet = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const route = useRoute();
  const Tab = createMaterialTopTabNavigator();

  const Tabsheads = [
    {head: 'Unofficial DMC', comp: MarksheetCards},
    {head: 'Semester GPA', comp: UnderConstruction},
    {head: 'Assessment Detail', comp: UnderConstruction},
    {head: 'Assessment Break Up', comp: UnderConstruction},
    {head: 'Assessment GPA', comp: UnderConstruction},
    {head: 'Grading Criteria', comp: Grading_Table},
    {head: 'Degree Completion Status', comp: UnderConstruction},
  ];

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
          // console.log(api.data, 'ghaxgahx');
          setData(api.data);
          setLoad(false);
        } catch (error) {
          console.log(error, 'api error');
          setLoad(false);
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '10%',
              backgroundColor: COLORS.white,
            }}>
            <Text style={styles.text}>MarksSheet</Text>
          </View>
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
                // initialRouteName={}
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
