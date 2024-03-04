import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, windowWidth} from '../../Constants/COLORS';

const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.themeColor,
      }}>
      <Text style={{color: 'white', fontSize: windowWidth / 30}}>
        ForgotPassword
      </Text>
      <Button
        title="back to login screen"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
