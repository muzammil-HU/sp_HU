import {showMessage} from 'react-native-flash-message';
import clientapi from '../../../api/clientapi';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dimensions, PermissionsAndroid} from 'react-native';
import {COLORS} from '../../../Constants/COLORS';
import WifiInfo from 'react-native-wifi-reborn';
import {
  WifiName,
  dayAttendence,
  class_schedule,
  course_content,
  registered_courses,
  days,
  makeup_classes,
  ipAddress,
  isConnected,
  ActiveTab,
} from '../../Reducers/GlobalStatesReducer/GlobalStatesReducer';
import NetInfo from '@react-native-community/netinfo';
const windowwidth = Dimensions.get('window').width;

const getwifiname = async (dispatch, setLoad) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message: 'This app needs location permission as this is required  ',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // const unsubscribe = NetInfo.addEventListener(state => {
      //   dispatch(isConnected(state.isConnected));
      //   dispatch(WifiName(state?.details?.ssid));
      // });
      const state = await NetInfo.fetch();
      dispatch(isConnected(state.isConnected));
      dispatch(WifiName(state?.details?.ssid));
      // dispatch(ipAddress(state?.details?.ipAddress));
      setLoad(false);
    } else {
      console.log('denied');
      setLoad(false);
    }
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
const getAttendenceData = async (
  setData,
  setLoad,
  setError,
  dispatch,
  params,
) => {
  try {
    const res = await clientapi.post(
      `/student/attendance/inquiry`,
      // `/test`,
      params,
    );
    if (res?.data?.success === true && res?.data?.data != []) {
      // setData(res?.data?.data);
      dispatch(dayAttendence(res?.data?.data));
      setLoad(false);
      console.log('data imported');
    } else {
      setError('No Data found');
    }
  } catch (err) {
    console.log('getAttendenceData error', err);
  }
};
const getclassSchedule = async (
  setData,
  setLoad,
  setError,
  dispatch,
  params,
) => {
  try {
    const res = await clientapi.post(`/student/class/schedule`, params);
    if (res?.data?.success === true && res?.data?.data != []) {
      dispatch(class_schedule(res?.data?.class_schedule));
      dispatch(makeup_classes(res?.data?.upcoming_classes));
      dispatch(course_content(res?.data?.course_content));
      dispatch(days(res?.data?.days));
      setLoad(false);
    } else {
      setError('No Data found');
      setLoad(false);
    }
  } catch (err) {
    console.log('getclassSchedule error', err);
    setLoad(false);
  }
};
const getregisteredCourses = async (setLoad, dispatch, params) => {
  try {
    const res = await clientapi.post(`/student/registered/courses`, params);
    // console.log(res?.data?.output, 'resdata');
    if (res?.data?.success === true) {
      // console.log('if');
      // console.log(res?.data?.registered_courses, 'registered_courses');
      dispatch(registered_courses(res?.data?.registered_courses));
      // console.log(registered_courses, 'registered_courses');
      setLoad(false);
    } else {
      // setError('No Data found');
      console.log('else');
      setLoad(false);
    }
  } catch (err) {
    console.log('getregisteredCourses error', err);
    setLoad(false);
  }
};
const ActivetabChange = (dispatch, data) => {
  // console.log(data, 'data');
  dispatch(ActiveTab(data));
};
export {
  getwifiname,
  getAttendenceData,
  getclassSchedule,
  ActivetabChange,
  getregisteredCourses,
};
