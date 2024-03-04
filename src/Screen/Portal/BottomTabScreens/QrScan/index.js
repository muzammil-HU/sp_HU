import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Camera,
  getCameraDevice,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WifiInfo from 'react-native-wifi-reborn';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';
import {useDispatch, useSelector} from 'react-redux';
import {useAppState} from '@react-native-community/hooks';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import {getwifiname} from '../../../../Redux/Actions/GlobalStatesFunctions';
import CameraComp from '../../../../components/CameraComp';
import DeviceInfo from 'react-native-device-info';

const QrScan = () => {
  const SSID = useSelector(state => {
    return state?.GlobalStatesReducer.WifiName;
  });
  const UID = useSelector(state => {
    return state?.AuthReducer.UniqueDeviceId;
  });
  console.log(UID, 'uid');
  const CurrentUID = useSelector(state => {
    return state?.AuthReducer?.CurrentUniqueDeviceId;
  });
  console.log(CurrentUID, 'CurrentUID');
  const ipAddress = useSelector(state => {
    return state?.AuthReducer.ipAddress;
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const cameraRef = React.useRef(null);
  // const [deviceId, setDeviceId] = useState();
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const windowwidth = Dimensions.get('window').width;
  const {hasPermission, requestPermission} = useCameraPermission();
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, 'back', {
    physicalDevices: ['wide-angle-camera'],
  });
  // var LiveUID;
  const [WifiName, setWifiName] = useState('HUWIFI');
  const currentAppState = useAppState();
  const IsFocused = useIsFocused();
  const camActive = IsFocused && currentAppState === 'active';
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
      if (codes[0].value !== '') {
        Alert.alert('Scanned..!');
      }
      // ToastAndroid.show(codes[0].value, ToastAndroid.LONG);
      navigation.navigate('Attendence');
      showMessage({
        message: 'My message title',
        description: 'My message description',
        type: 'default',
        backgroundColor: 'purple',
        color: '#606060',
      });
      // console.log(first)
    },
  });
  const onError = useCallback(error => {
    console.error(error);
  }, []);
  const onInitialized = useCallback(async () => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // DeviceInfo.getUniqueId().then(uniqueId => {
      //   // console.log(uniqueId, 'uniqueId');
      //   setLiveUID(uniqueId);
      //   // dispatch(UniqueDeviceId(uniqueId));
      // });
      getwifiname(dispatch, setLoad);
      // console.log(SSID, 'SSID');
      // console.log(ipAddress, 'ipAddress');
      // console.log(UID, 'UID');
      // if (SSID !== WifiName) {
      //   console.log('Not Connected to HUWIFI');
      //   showMessage({
      //     message: '401 Internet Error',
      //     type: 'danger',
      //     // backgroundColor: ,
      //     color: COLORS.white,
      //     style: {justifyContent: 'center', alignItems: 'center'},
      //     icon: () => (
      //       <MaterialIcons
      //         name="error-outline"
      //         size={windowwidth / 16}
      //         color={COLORS.white}
      //         style={{paddingRight: 20}}
      //       />
      //     ),
      //   });
      // }
    }, []),
  );
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
    <View style={styles.container}>
      {/* {SSID === WifiName && CurrentUID === UID ? ( */}
      {CurrentUID === UID ? (
        <CameraComp />
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
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.text}>QR Scanner not Accessable</Text>
            {SSID !== WifiName && (
              <Text style={styles.text}>
                Connect to university Wifi to access the Qr Scanner
              </Text>
            )}
            {CurrentUID !== UID && (
              <Text style={styles.text}>
                Login with Your Registered Device to mark your attendence
              </Text>
            )}
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.text}>
              Connect to university Wifi to access the Qr Scanner
            </Text>
          </View> */}
        </View>
      )}
    </View>
  );
};

export default QrScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  text: {
    color: COLORS.red,
    fontSize: windowWidth / 24,
    textAlign: 'center',
  },
});
