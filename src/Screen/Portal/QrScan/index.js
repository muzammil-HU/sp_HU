import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WifiInfo from 'react-native-wifi-reborn';
import {COLORS} from '../../../Constants/COLORS';
import {useSelector} from 'react-redux';

const QrScan = () => {
  const navigation = useNavigation();
  const [wifiName, setWifiName] = useState();
  const [deviceId, setDeviceId] = useState();
  const windowHeight = Dimensions.get('window').height;
  const windowwidth = Dimensions.get('window').width;
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const AuthState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
      ToastAndroid.show(codes[0].value, ToastAndroid.LONG);
      navigation.navigate('Attendence');
    },
  });
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
  useEffect(() => {
    // console.log(AuthState, 'AuthState');
    permission();
    const getwifiname = async () => {
      try {
        const wifi = await WifiInfo.getCurrentWifiSSID();
        setWifiName(wifi);
      } catch (error) {
        console.log(error, 'error');
        showMessage({
          message: '500 Server Error',
          type: 'danger',
          // backgroundColor: ,
          color: COLORS.white,
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <MaterialIcons
              name="error-outline"
              size={windowwidth / 16}
              color={COLORS.white}
              style={{paddingRight: 20}}
            />
          ),
        });
      }
    };
    getwifiname();
    if (wifiName !== 'HUWifi') {
      showMessage({
        message: '500 Server Error',
        type: 'danger',
        // backgroundColor: ,
        color: COLORS.white,
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <MaterialIcons
            name="error-outline"
            size={windowwidth / 16}
            color={COLORS.white}
            style={{paddingRight: 20}}
          />
        ),
      });
    }
    requestPermission();
  }, [navigation]);

  if (device == null)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Permission Denied</Text>
      </View>
    );
  // else {
  return (
    <>
      {wifiName === 'HUWifi' ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          enableZoomGesture={true}
        />
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="error-outline"
              size={windowwidth / 16}
              color="red"
              style={{paddingRight: 20}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>QR Scanner not Accessable</Text>
          </View>
        </View>
      )}
    </>
  );
  // }
};

export default QrScan;

const styles = StyleSheet.create({});
