import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';

const VoucherGuidlines = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{flexDirection: 'column', paddingLeft: '2%', paddingTop: '2%'}}>
        <Text style={styles.textsty}>
          How to generate and pay your voucher.
        </Text>
        <Text style={styles.textsty}></Text>
        <Text style={styles.textsty}>
          Step-1: If you have already an account voucher within due date period
          then goto Step-2 otherwise goto Step-3.
        </Text>
        <Text style={styles.textsty}>
          Step-2: If you have no pending voucher within due date then goto
          generate voucher either (Fee Voucher, Hostel Voucher or Transport
          Voucher).
        </Text>
        <Text style={styles.textsty}>Step-3: Print your account voucher.</Text>
        <Text style={styles.textsty}>
          Step-4: Just bring your account voucher to any branch of the bank
          mentioned on voucher.
        </Text>
        <Text style={styles.textsty}>
          Step-5: The bank will accept your payment, stamp your statement as
          proof of payment and transfer your payment to the University within 24
          hours.
        </Text>
      </View>
    </View>
  );
};

export default VoucherGuidlines;

const styles = StyleSheet.create({
  textsty: {
    color: COLORS.black,
    fontSize: windowWidth / 25,
  },
});
