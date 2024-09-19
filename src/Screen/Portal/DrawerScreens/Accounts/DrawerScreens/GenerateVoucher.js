import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import {COLORS} from '../../../../../Constants/COLORS';
import CustomTabBar from '../../../../../components/header/CustomTabBar';
import CommonCard from '../../../../../components/reuseable/Cards/CommonCard';
import ScreenHead from '../../../../../components/reuseable/ScreenHead';
import UnderConstruction from '../../../../../components/reuseable/ScreenUnderConstruction';
import MarksheetCards from '../../../../../components/reuseable/Cards/MarksheetCards';
import Grading_Table from '../../../../../components/reuseable/Grading_Table';
import FeeVoucher from '../../../../../components/reuseable/Voucher/FeeVoucher';
import HostelVoucher from '../../../../../components/reuseable/Voucher/HostelVoucher';
import TransportVoucher from '../../../../../components/reuseable/Voucher/TransportVoucher';
import VoucherGuidlines from '../../../../../components/reuseable/Voucher/VoucherGuidlines';

const GenerateVoucher = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const route = useRoute();
  const Tab = createMaterialTopTabNavigator();

  const Tabsheads = [
    {
      head: 'Fee Voucher',
      comp: FeeVoucher,
      params: {type: 'Fee'},
    },
    {
      head: 'Hostel Voucher',
      comp: FeeVoucher,
      params: {type: 'Hostel'},
    },
    {
      head: 'Transport Voucher',
      comp: FeeVoucher,
      params: {type: 'Transport'},
    },
    {
      head: 'Voucher Guidlines',
      comp: VoucherGuidlines,
      params: {type: 'guidelines'},
    },
  ];

  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });

  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  return (
    <>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <ScreenHead
          heading={'Generate Voucher'}
          NoteVisibility={true}
          listHeader={false}
          Note={
            'Note! Student can not generate voucher if he/she has pending voucher in due date or not having any outstanding balance.'
          }
          notetextcolor={COLORS.red}
        />
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
                initialParams={head.params}
              />
            );
          })}
        </Tab.Navigator>
      </View>
    </>
  );
};

export default GenerateVoucher;

const styles = StyleSheet.create({});
