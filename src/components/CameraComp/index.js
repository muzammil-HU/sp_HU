import React, {useEffect, useRef, useState} from 'react';
import {Alert, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useIsForeground} from '../hooks/useIsForeground';
import clientapi from '../../api/clientapi';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../reuseable/Modals/LoaderModal';
import {showMessage} from 'react-native-flash-message';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS, windowWidth} from '../../Constants/COLORS';
import data from '../../data/data';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../Redux/Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';
// import {COLORS} from '../../../Constants/COLORS';

const showCodeAlert = (
  value,
  onDismissed,
  markAttendanceCallback,
  setIsScannerActive,
) => {
  console.log(value, 'val');
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

const CameraComp = () => {
  const navigation = useNavigation();
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
  const UID = useSelector(state => {
    return state?.AuthReducer.UniqueDeviceId;
  });

  const ipAddress = useSelector(state => {
    return state?.AuthReducer.ipAddress;
  });

  const MarkAttendence = async (value, dispatch) => {
    const data = {
      token: TokenState,
      qr_code: value,
      device_id: UID,
    };

    setLoad(true);
    try {
      const api = await clientapi.post('/student/attendance', data);
      if (
        api?.data?.success === false &&
        api?.data?.output?.response?.messages ===
          'Session expired Please Login Again'
      ) {
        dispatch(LoginUser(false));
        dispatch(TokenId(null));
        dispatch(UserDetail(null));
        dispatch(registered_courses(null));
        showMessage({
          message: 'Session expired Please Login Again',
          type: 'warning',
          position: 'top',
          // backgroundColor: COLORS.themeColor,
          color: COLORS.black,
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <FontAwesome6
              name="circle-exclamation"
              size={windowWidth / 16}
              color={COLORS.black}
              style={{paddingRight: 20}}
            />
          ),
        });
        setLoad(false);
      } else {
        if (api.data.output.response?.marked === true) {
          showMessage({
            message: api?.data?.output?.response?.messages,
            type: 'warning',
            duration: 10000,
            position: 'top',
            // backgroundColor: COLORS.themeColor,
            color: COLORS.white,
            style: {justifyContent: 'center', alignItems: 'center'},
            icon: () => (
              <FontAwesome6
                name="circle-exclamation"
                size={windowWidth / 16}
                color={COLORS.white}
                style={{paddingRight: 20}}
              />
            ),
          });
        } else {
          showMessage({
            message: api?.data?.output?.response?.messages,
            type: 'success',
            duration: 10000,
            position: 'top',
            backgroundColor: COLORS.themeColor,
            color: COLORS.white,
            style: {justifyContent: 'center', alignItems: 'center'},
            icon: () => (
              <FontAwesome6
                name="check-circle"
                size={windowWidth / 16}
                color={COLORS.white}
                style={{paddingRight: 20}}
              />
            ),
          });
        }
      }
      navigation.navigate('BtmHome');
    } catch (error) {
      console.log(error, 'error');
      showMessage({
        message: `500 Server Error`,
        type: 'danger',
        position: 'top',
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <Entypo
            name="circle-with-cross"
            size={windowWidth / 16}
            color={COLORS.white}
            style={{paddingRight: 20}}
          />
        ),
      });
    }
    setLoad(false);
  };

  const onCodeScanned = codes => {
    if (shouldScan) {
      // console.log(`Scanned ${codes.length} codes:`, codes);
      const value = codes[0]?.value;
      // console.log(value, 'valu');
      const codeValues = value.split('-');
      const offer_id = codeValues[0].trim();
      const offer_no = codeValues[1].trim();
      const course_id = codeValues[2].trim();
      const teacher_id = codeValues[3].trim();
      const time = codeValues[4].trim();
      const occurance = codeValues[6].trim();
      const session = codeValues[7].trim();

      const attendance_date = new Date().toISOString().split('T')[0];
      const entry_date = new Date()
        .toLocaleDateString('en-GB', {
          year: '2-digit',
          month: 'short',
          day: 'numeric',
        })
        .replace(/\./g, '-');

      const entry_time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      // Output the variables (optional)
      // console.log(
      //   offer_id,
      //   offer_no,
      //   course_id,
      //   teacher_id,
      //   time,
      //   occurance,
      //   session,
      //   attendance_date,
      //   entry_date,
      //   entry_time,
      // );

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
