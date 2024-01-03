import {Alert, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

const QrScan = () => {
  const navigation = useNavigation();
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
      ToastAndroid.show(codes[0].value, ToastAndroid.LONG);
      navigation.navigate('Attendence');
    },
  });
  useEffect(() => {
    requestPermission();
  }, []);
  if (device == null)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Permission Denied</Text>
      </View>
    );
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
      enableZoomGesture={true}
    />
  );
};

export default QrScan;

const styles = StyleSheet.create({});
