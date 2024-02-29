import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../Constants/COLORS';

const ExaminationSchedule = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.themeColor}}>ExaminationSchedule</Text>
    </View>
  );
};

export default ExaminationSchedule;

const styles = StyleSheet.create({});
