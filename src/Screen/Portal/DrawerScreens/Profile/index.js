import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../Constants/COLORS';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.themeColor}}>Profile</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
