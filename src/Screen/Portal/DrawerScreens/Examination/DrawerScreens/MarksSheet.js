import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../Constants/COLORS';

const MarksSheet = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.themeColor}}>Marks Sheet</Text>
    </View>
  );
};

export default MarksSheet;

const styles = StyleSheet.create({});
