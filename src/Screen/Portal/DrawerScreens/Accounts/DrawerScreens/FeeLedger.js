import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import ScreenHead from '../../../../../components/reuseable/ScreenHead';
import clientapi from '../../../../../api/clientapi';
import {useSelector} from 'react-redux';
import Loader from '../../../../../components/reuseable/Modals/LoaderModal';
import {useSharedValue} from 'react-native-reanimated';
import Ledger_Accordion from '../../../../../components/reuseable/Cards/Ledger_Accordian';

const FeeLedger = () => {
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  const [data, setData] = useState(null);
  const [fee_ledger, setFee_ledger] = useState(null);
  const [load, setLoad] = useState(false);
  const [dr_total, setDr_total] = useState(null);
  const [cr_total, setCr_total] = useState(null);

  const parentHeightValue = useSharedValue(0);
  // const [val, setVal] = null;
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
    const feeledger = async () => {
      const params = {
        token: TokenState,
        student_id: studentId,
      };
      try {
        setLoad(true);
        const api = await clientapi.post(`/student/ledger/fee`, params);
        // console.log(api.data, 'api');
        setData(api?.data?.due_payment[0].v_dues);
        setFee_ledger(api?.data?.merged_array);
        setCr_total(api?.data?.cr_total[0]?.v_dues);
        setDr_total(api?.data?.dr_total[0]?.v_dues);
        setLoad(false);
        // setVal(api?.data?.due_payment[0]?.v_dues);
        // console.log(api?.data?.merged_array);
      } catch (error) {
        setLoad(false);
        console.log(error, 'api error');
      }
    };
    feeledger();
  }, []);
  // console.log(val, 'vasedsa');
  return (
    <View style={styles.mainContainer}>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <>
          <ScreenHead
            heading={'Fee Ledger'}
            NoteVisibility={true}
            data={data}
            load={load}
            setLoad={setLoad}
          />
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: '3%',
            }}>
            {fee_ledger && fee_ledger.length > 0 ? (
              fee_ledger
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
            {fee_ledger && fee_ledger.length > 0 ? (
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

export default FeeLedger;

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

// const data = [
//   {
//     transDate: '01-Jan-2022',
//     transId: '108669',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'ENROLLMENT & REGISTRATION INCOME',
//     Narration: 'Package',
//     Dr: '2000',
//     Cr: '-',
//     Bal: '2000',
//   },
//   {
//     transDate: '01-Jan-2022',
//     transId: '108669',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'EXAMINATION CHARGE INCOME',
//     Narration: 'Package',
//     Dr: '5350',
//     Cr: '-',
//     Bal: '7350',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
//   {
//     transDate: '06-Feb-2022',
//     transId: '293585',
//     sem: 'I',
//     offer_type: 'spring-2024',
//     Account: 'TUITION FEE INCOME',
//     Narration: 'Received Issued Voucher No 11000422',
//     Dr: '2000',
//     Cr: '96300',
//     Bal: '-52900',
//   },
// ];
{
  /* <View
        style={{
          alignItems: 'center',
          borderBottomWidth: 0.2,
          backgroundColor: COLORS.white,
        }}>
        <Text style={styles.mainheading}>Fee Ledger</Text>
      </View> */
}
{
  /* <View style={{paddingHorizontal: '3%', paddingBottom: '2%'}}>
        <Text style={styles.Notetext}>
          You must check your Fee Ledger on regular basis to monitor your fee
          dues status.
        </Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.Notetext}>Your Current Dues are </Text>
          <Text
            style={[
              styles.Notetext,
              {
                backgroundColor: '#FB9678',
                paddingHorizontal: '4%',
                color: COLORS.black,
                fontWeight: 'bold',
              },
            ]}>
            Rs. 0/=
          </Text>
        </View>
        <Text
          style={[
            styles.Notetext,
            {
              // backgroundColor: '#FB9678',
              fontWeight: 'bold',
              color: COLORS.black,
            },
          ]}>
          Tap on the Transaction / Card to see the details.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: '2%',
            backgroundColor: COLORS.white,
            justifyContent: 'space-between',
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            paddingVertical: '2%',
            paddingHorizontal: '1%',
            borderWidth: 1,
            borderBlockColor: COLORS.themeColor,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '33%',
            }}>
            <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
              Transaction Date
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: 'center',
              width: '33%',
            }}>
            <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
              Semester
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '33%',
            }}>
            <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
              Offer Type
            </Text>
          </View>
        </View>
      </View> */
}
