import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Camera,
  getCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getwifiname} from '../../../../Redux/Actions/GlobalStatesFunctions';
import CameraComp from '../../../../components/CameraComp';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import clientapi from '../../../../api/clientapi';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../../../Redux/Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../../../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';
const QrScan = () => {
  const SSID = useSelector(state => {
    return state?.GlobalStatesReducer.WifiName;
  });

  const Gateway = useSelector(state => {
    return state?.GlobalStatesReducer.Gateway;
  });

  const UID = useSelector(state => {
    return state?.AuthReducer.UniqueDeviceId;
  });

  const CurrentUID = useSelector(state => {
    return state?.AuthReducer?.CurrentUniqueDeviceId;
  });

  const ipAddress = useSelector(state => {
    return state?.AuthReducer.ipAddress;
  });

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [load, setLoad] = useState(true);

  const [isCamera, setIsCamera] = useState(false);

  // const [cameraMessage, setCameraMessage] = useState(false);

  const {hasPermission, requestPermission} = useCameraPermission();

  const devices = Camera.getAvailableCameraDevices();

  const device = getCameraDevice(devices, 'back', {
    physicalDevices: ['wide-angle-camera'],
  });

  const [HuGateway, setHuGateway] = useState('172.23.160.2');

  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });

  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  useFocusEffect(
    useCallback(() => {
      const params = {
        student_id: studentId,
        token: TokenState,
      };
      async function handleCheckPressed() {
        if (Platform.OS === 'android') {
          const checkEnabled = await isLocationEnabled();
          if (checkEnabled === false) {
            try {
              const enableResult = await promptForEnableLocationIfNeeded();
              console.log('enableResult', enableResult);
            } catch (error) {
              if (error instanceof Error) {
                showMessage({
                  message: `Location Disabled`,
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
            }
          }
        }
        getwifiname(dispatch, setLoad);
      }
      async function cameraValidation() {
        try {
          const api = await clientapi.post('/student/cameravalidate', params);
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
            setIsCamera(api?.data?.output?.response.success);
            setLoad(false);
          }
          // console.log(isCamera,  'huhu');
          // setCameraMessage(api?.data?.output?.response?.messages);
        } catch (error) {
          showMessage({
            message: '500 server error',
            type: 'danger',
            position: 'top',
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
      handleCheckPressed();
      getwifiname(dispatch, setLoad);
      cameraValidation();
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
      {isCamera === true && Gateway === HuGateway && CurrentUID === UID ? (
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
              size={windowWidth / 16}
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
            {isCamera === false && (
              <Text style={styles.text}>No Class Created for today!</Text>
            )}
            {Gateway !== HuGateway && (
              <Text style={styles.text}>
                Connect to university Wifi to access the Qr Scanner ({SSID})
              </Text>
            )}
            {CurrentUID !== UID && (
              <Text style={styles.text}>
                Login with Your Registered Device to mark your attendence
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default QrScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: COLORS.red,
    fontSize: windowWidth / 24,
    textAlign: 'center',
  },
});
