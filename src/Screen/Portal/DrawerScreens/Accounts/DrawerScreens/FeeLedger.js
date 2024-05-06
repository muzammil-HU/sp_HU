import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';

const FeeLedger = () => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          alignItems: 'center',
          borderBottomWidth: 0.2,
          // paddingVertical: '3%',
          backgroundColor: COLORS.white,
        }}>
        <Text style={styles.mainheading}>Fee Ledger</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: '3%',
        }}>
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
