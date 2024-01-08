import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const windowHeight = Dimensions.get('window').height;
  const windowwidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.themeColor,
      }}>
      <Text style={{color: 'white', fontSize: windowwidth / 30}}>
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
