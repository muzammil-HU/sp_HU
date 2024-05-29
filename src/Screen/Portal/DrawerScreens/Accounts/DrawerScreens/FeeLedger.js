import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import ScreenHead from '../../../../../components/reuseable/ScreenHead';

const FeeLedger = () => {
  const data = [
    {
      transDate: '01-Jan-2022',
      transId: '108669',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'ENROLLMENT & REGISTRATION INCOME',
      Narration: 'Package',
      Dr: '2000',
      Cr: '-',
      Bal: '2000',
    },
    {
      transDate: '01-Jan-2022',
      transId: '108669',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'EXAMINATION CHARGE INCOME',
      Narration: 'Package',
      Dr: '5350',
      Cr: '-',
      Bal: '7350',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
    {
      transDate: '06-Feb-2022',
      transId: '293585',
      sem: 'I',
      offer_type: 'spring-2024',
      Account: 'TUITION FEE INCOME',
      Narration: 'Received Issued Voucher No 11000422',
      Dr: '2000',
      Cr: '96300',
      Bal: '-52900',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      {/* <View
        style={{
          alignItems: 'center',
          borderBottomWidth: 0.2,
          backgroundColor: COLORS.white,
        }}>
        <Text style={styles.mainheading}>Fee Ledger</Text>
      </View> */}

      <ScreenHead heading={'Fee Ledger'} NoteVisibility={true} />
      {/* <View style={{paddingHorizontal: '3%', paddingBottom: '2%'}}>
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
      </View> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: '3%',
        }}>
        {data.map((d, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor: COLORS.themeColor,
                marginBottom: 5,
                borderRadius: 5,
                paddingVertical: '2%',
                paddingHorizontal: '1%',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '33%',
                }}>
                <Text style={{color: COLORS.white}}>{d.transDate}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  width: '33%',
                }}>
                <Text style={{color: COLORS.white}}>{d.sem}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '33%',
                }}>
                <Text style={{color: COLORS.white}}>{d.offer_type}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
