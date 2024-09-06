import {showMessage} from 'react-native-flash-message';
import clientapi from '../../../api/clientapi';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dimensions, PermissionsAndroid} from 'react-native';
import {COLORS, windowWidth} from '../../../Constants/COLORS';
import WifiInfo from 'react-native-wifi-reborn';
import {
  WifiName,
  dayAttendence,
  class_schedule,
  course_content,
  registered_courses,
  days,
  makeup_classes,
  isConnected,
  ActiveTab,
  curriculum,
  grading_criteria,
  Gateway,
} from '../../Reducers/GlobalStatesReducer/GlobalStatesReducer';
import NetInfo from '@react-native-community/netinfo';
import {NetworkInfo} from 'react-native-network-info';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../Reducers/AuthReducer/AuthReducer';

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
      const state = await NetInfo.fetch();
      dispatch(isConnected(state.isConnected));
      dispatch(WifiName(state?.details?.ssid));
      const gate = await NetworkInfo.getGatewayIPAddress();
      dispatch(Gateway(gate));
      setLoad(false);
    } else {
      setLoad(false);
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
  } catch (error) {
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
    setLoad(true);
    const api = await clientapi.post(
      `/student/attendance/inquiry`,
      // `/test`,
      params,
    );
    // console.log(api.data, 'daatt');
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
      // console.log(api?.data?.success, 'cf');
      dispatch(dayAttendence(api?.data?.data));
      setLoad(false);
    }
  } catch (err) {
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
};
const getclassSchedule = async (
  setData,
  setLoad,
  setError,
  dispatch,
  params,
) => {
  try {
    const api = await clientapi.post(`/student/class/schedule`, params);
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
      dispatch(class_schedule(api?.data?.class_schedule));
      dispatch(makeup_classes(api?.data?.upcoming_classes));
      dispatch(course_content(api?.data?.course_content));
      dispatch(days(api?.data?.days));
      setLoad(false);
    }
  } catch (err) {
    setLoad(false);
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
};
const getregisteredCourses = async (setLoad, dispatch, data) => {
  try {
    const api = await clientapi.post(`/student/registered/courses`, data);
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
      dispatch(registered_courses(api?.data?.registered_courses));
      setLoad(false);
    }
  } catch (err) {
    // console.log('getregisteredCourses error', err);
    setLoad(false);
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
};
const ActivetabChange = (dispatch, data) => {
  // console.log(data, 'data');
  dispatch(ActiveTab(data));
};
const curriculumData = async (setLoad, dispatch, data) => {
  setLoad(true);
  try {
    const api = await clientapi.post(`/student/course/curriculum`, data);
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
      dispatch(curriculum(api?.data?.curriculum));
      dispatch(grading_criteria(api?.data?.grading_criteria));
      setLoad(false);
    }
  } catch (error) {
    setLoad(false);
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
};
export {
  getwifiname,
  getAttendenceData,
  getclassSchedule,
  ActivetabChange,
  getregisteredCourses,
  curriculumData,
};
