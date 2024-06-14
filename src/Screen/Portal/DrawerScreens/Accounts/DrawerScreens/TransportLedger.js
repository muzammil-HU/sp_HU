import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import clientapi from '../../../../../api/clientapi';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import ScreenHead from '../../../../../components/reuseable/ScreenHead';
import Loader from '../../../../../components/reuseable/Modals/LoaderModal';
import Ledger_Accordion from '../../../../../components/reuseable/Cards/Ledger_Accordian';

const TransportLedger = () => {
  const [data, setData] = useState(null);
  const [transport_ledger, setTransport_ledger] = useState(null);
  const [load, setLoad] = useState(false);
  const [dr_total, setDr_total] = useState(null);
  const [cr_total, setCr_total] = useState(null);
  const parentHeightValue = useSharedValue(0);

  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const convertDate = date => {
    var inputDate = new Date(date);
    var formattedDate =
      inputDate.getDate() +
      '-' +
      months[inputDate.getMonth()] +
      '-' +
      inputDate.getFullYear();
    return formattedDate;
  };

  useEffect(() => {
    const transportledger = async () => {
      const params = {
        token: TokenState,
        student_id: studentId,
      };
      try {
        setLoad(true);
        const api = await clientapi.post(`/student/ledger/transport`, params);
        // console.log(api.data, 'api');
        setData(api?.data?.due_payment[0].v_dues);
        setTransport_ledger(api?.data?.transport_ledger);
        setCr_total(api?.data?.cr_total[0]?.v_dues);
        setDr_total(api?.data?.dr_total[0]?.v_dues);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        console.log(error, 'api error');
      }
    };
    transportledger();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <>
          <ScreenHead
            heading={'Transport Ledger'}
            NoteVisibility={true}
            data={data}
            load={load}
            setLoad={setLoad}
            ledger={transport_ledger}
          />
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: '3%',
            }}>
            {transport_ledger && transport_ledger.length > 0 ? (
              transport_ledger
                .sort(
                  (a, b) =>
                    new Date(a.transaction_date) - new Date(b.transaction_date),
                )
                .map((d, index) => {
                  return (
                    <Ledger_Accordion
                      value={d}
                      key={index}
                      parentHeighValue={parentHeightValue}
                    />
                  );
                })
            ) : (
              <Text>No data found</Text>
            )}
            {transport_ledger && transport_ledger.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: '20%',
                  borderTopWidth: 2,
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: windowWidth / 20,
                    fontWeight: 'bold',
                  }}>
                  Total Dr: {dr_total}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: windowWidth / 20,
                    fontWeight: 'bold',
                  }}>
                  Total Cr:{cr_total}
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default TransportLedger;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  mainheading: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
  },
  Notetext: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 28,
    // fontWeight: 'bold',
  },
});
