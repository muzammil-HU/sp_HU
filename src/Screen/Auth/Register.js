import {StyleSheet, Text, View, PermissionsAndroid, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {getUniqueId, getManufacturer} from 'react-native-device-info';
import DeviceInfo, {
  getIpAddress,
  getMacAddress,
  getUniqueId,
  useIsEmulator,
} from 'react-native-device-info';
import {useNavigation} from '@react-navigation/native';
import wifiReborn from 'react-native-wifi-reborn';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../Constants/COLORS';

const Register = () => {
  const isemulator = useIsEmulator();
  // const mac = getMacAddress();
  const navigation = useNavigation();
  const [macAddress, setMacAddress] = useState();
  const [netinfo, setNetInfo] = useState();
  const [wifiSSID, setWifiSSID] = useState('');
  var Aslocalstorage;
  const permission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permision is required',
        message: 'This app requires location',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('GRANTED');
    } else {
      console.log('DENIED');
    }
  };
  const getWifiList = async () => {
    const ssid = await wifiReborn.getCurrentWifiSSID();
    // console.log(ssid, 'ssid');
    setWifiSSID(ssid);
  };
  getWifiList();
  useEffect(() => {
    // const macAddress = MacAddressModule.getMacAddress();
    // console.log('MAC Address Native:', macAddress);
    permission();
    const retrieveMacAddress = async () => {
      try {
        const macAddress = await getIpAddress();
        // console.log('UniqueId:', macAddress);
        setMacAddress(macAddress);
      } catch (error) {
        console.error('Error retrieving MAC address:', error);
      }
    };

    retrieveMacAddress();
  }, [Aslocalstorage]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      if (value !== null) {
        setNetInfo(value);
        // console.log('Async storage', netinfo);
        // console.log('Async storage', netinfo);
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: '5%',
      }}>
      {/* <Text>{mac}</Text> */}
      <Text style={{color: 'black'}}>Home</Text>
      <Text style={{color: 'black'}}>{JSON.stringify(macAddress)}hello</Text>
      <Text style={{color: 'black'}}>{macAddress}hello</Text>
      <Text style={{color: 'black'}}>wifiSSID: {wifiSSID}</Text>
      <Text style={{color: 'black'}}>Local Storage: {Aslocalstorage}</Text>
      <Button
        onPress={() => {
          showMessage({
            message: 'Simple message',
            type: 'info',
          });
        }}
        title="Request Details"
        color="#841584"
      />

      <Text style={{color: 'black'}}>{netinfo}</Text>
      {/* <TopCard />
      <ProfileCard /> */}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
