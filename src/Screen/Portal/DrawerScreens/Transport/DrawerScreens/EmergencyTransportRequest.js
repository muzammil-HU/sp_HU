import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../../../Constants/COLORS';
import ScreenHead from '../../../../../components/reuseable/ScreenHead';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useRoute} from '@react-navigation/native';
import TransportRequestForm from '../../../../../components/TransportRequestForm';
import TransportRequestList from '../../../../../components/TransportRequestList';
import {useSelector} from 'react-redux';
import CustomTabBar from '../../../../../components/header/CustomTabBar';
import TabBar from '../../../../../components/header/TabBar';

const EmergencyTransportRequest = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const route = useRoute();
  const Tab = createMaterialTopTabNavigator();

  const Tabsheads = [
    {head: 'Transport Request List', comp: TransportRequestList},
    {head: 'Transport Request Form', comp: TransportRequestForm},
  ];

  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });

  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScreenHead
        heading={'Emergency Transport Request'}
        NoteVisibility={false}
      />
      <Tab.Navigator
        screenOptions={{
          activeBackgroundColor: COLORS.themeColor,
          inactiveBackgroundColor: COLORS.white,
        }}
        tabBar={props => <TabBar {...props} />}>
        {Tabsheads.map((head, index) => {
          return (
            <Tab.Screen key={index} name={head.head} component={head.comp} />
          );
        })}
      </Tab.Navigator>
    </View>
  );
};

export default EmergencyTransportRequest;

const styles = StyleSheet.create({});
