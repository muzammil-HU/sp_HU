import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../Constants/COLORS';

const GraduatingSurvey = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.themeColor}}>Graduating Survey</Text>
    </View>
  );
};

export default GraduatingSurvey;

const styles = StyleSheet.create({});
