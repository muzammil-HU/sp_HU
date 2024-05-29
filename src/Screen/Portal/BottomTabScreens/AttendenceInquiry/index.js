import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TopCard from '../../../../components/reuseable/Cards/TopCards';
import {COLORS} from '../../../../Constants/COLORS';

const AttendenceInquiry1 = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.themeColor,
      }}>
      <View style={styles.headingContainer}>
        <Text style={styles.text}>Attendence</Text>
      </View>
    </View>
  );
};

export default AttendenceInquiry1;

const styles = StyleSheet.create({
  text: {
    color: COLORS.themeColor,
  },
  headingContainer: {},
});
