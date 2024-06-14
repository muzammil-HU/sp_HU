import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import {useSelector} from 'react-redux';
import {useSharedValue} from 'react-native-reanimated';
import clientapi from '../../../../../api/clientapi';
import Loader from '../../../../../components/reuseable/Modals/LoaderModal';
import ScreenHead from '../../../../../components/reuseable/ScreenHead';
import Ledger_Accordion from '../../../../../components/reuseable/Cards/Ledger_Accordian';

const HostelLedger = () => {
  const [data, setData] = useState(null);
  const [hostel_ledger, setHostel_ledger] = useState(null);
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
    const hostelledger = async () => {
      const params = {
        token: TokenState,
        student_id: studentId,
      };
      try {
        setLoad(true);
        const api = await clientapi.post(`/student/ledger/hostel`, params);
        // console.log(api.data, 'api');
        setData(api?.data?.due_payment[0].v_dues);
        setHostel_ledger(api?.data?.hostel_ledger);
        setCr_total(api?.data?.cr_total[0]?.v_dues);
        setDr_total(api?.data?.dr_total[0]?.v_dues);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        console.log(error, 'api error');
      }
    };
    hostelledger();
  }, []);
  // if (hostel_ledger) {
  //   hostel_ledger.map((e, index) => {
  //     if (e.offer_type) {
  //       console.log('there is offertype');
  //     } else {
  //       console.log('there is no offertype');
  //     }
  //   });
  // }
  return (
    <View style={styles.mainContainer}>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <>
          <ScreenHead
            heading={'Hostel Ledger'}
            NoteVisibility={true}
            data={data}
            load={load}
            setLoad={setLoad}
            ledger={hostel_ledger}
          />
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: '3%',
            }}>
            {hostel_ledger && hostel_ledger.length > 0 ? (
              hostel_ledger
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
            {hostel_ledger && hostel_ledger.length > 0 ? (
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

export default HostelLedger;

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
