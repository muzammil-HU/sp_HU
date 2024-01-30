import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {
  CONTENT_SPACING,
  CONTROL_BUTTON_SIZE,
  SAFE_AREA_PADDING,
} from '../../Constants/Constants';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import {useIsForeground} from '../hooks/useIsForeground';
import clientapi from '../../api/clientapi';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../reuseable/Modals/LoaderModal';

const showCodeAlert = (
  value,
  onDismissed,
  markAttendanceCallback,
  setIsScannerActive,
) => {
  const buttons = [
    {
      text: 'Try Again',
      style: 'cancel',
      onPress: () => {
        setIsScannerActive(true);
        onDismissed();
      },
    },
    {
      text: 'Mark Attendance',
      onPress: () => {
        markAttendanceCallback(value);
        onDismissed();
      },
    },
  ];
  Alert.alert('Scanned Code', value, buttons);
};

const CameraComp = ({navigation}) => {
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;
  const {hasPermission, requestPermission} = useCameraPermission();
  const [torch, setTorch] = useState(false);
  const isShowingAlert = useRef(false);
  const [isScannerActive, setIsScannerActive] = useState(true);
  const [shouldScan, setShouldScan] = useState(true);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    requestPermission();
  }, []);
  const TokenState = useSelector(state => {
    return state.AuthReducer.TokenId;
  });
  const MarkAttendence = async (value, dispatch) => {
    data = {
      token: TokenState,
      qr_code: value,
    };

    setLoad(true);
    try {
      const res = await clientapi.post('/student/attendance', data);
      console.log(res.data, 'datatat');
      if (res.data.success === true) {
        console.log(res.data.output.response.messages);
      } else {
        console.log(res.data.output.response.messages);
      }
    } catch (error) {
      console.log(error, 'error');
    }
    setLoad(false);
  };

  const onCodeScanned = codes => {
    if (shouldScan) {
      console.log(`Scanned ${codes.length} codes:`, codes);
      const value = codes[0]?.value;
      if (value == null) return;
      if (isShowingAlert.current) return;
      showCodeAlert(
        value,
        () => {
          isShowingAlert.current = false;
          setShouldScan(true);
        },
        MarkAttendence,
        setIsScannerActive,
      );
      isShowingAlert.current = true;
    } else {
      // console.log('Already Scanned');
    }

    setShouldScan(false);
    setIsScannerActive(false);
  };

  // );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  });

  return (
    <View style={styles.container}>
      {device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          torch={torch ? 'on' : 'off'}
          enableZoomGesture={true}
        />
      )}
      <View style={styles.rightButtonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTorch(!torch)}
          // disabledOpacity={0.4}
        >
          <IonIcon
            name={torch ? 'flash' : 'flash-off'}
            color="white"
            size={24}
          />
        </TouchableOpacity>
      </View>
      <Loader load={load} setLoad={setLoad} />
    </View>
  );
};
export default CameraComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: CONTROL_BUTTON_SIZE,
    height: CONTROL_BUTTON_SIZE,
    borderRadius: CONTROL_BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
});
