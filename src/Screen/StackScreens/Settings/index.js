import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../Constants/COLORS';

const Settings = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  text: {
    color: COLORS.black,
  },
});
