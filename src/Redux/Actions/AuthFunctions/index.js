import {showMessage} from 'react-native-flash-message';
import clientapi from '../../../api/clientapi';
import {
  LogOut,
  LoginUser,
  student_id,
  TokenId,
  UserDetail,
  UniqueDeviceId,
  UniqueName,
  CurrentUniqueDeviceId,
} from '../../Reducers/AuthReducer/AuthReducer';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dimensions} from 'react-native';
import {COLORS} from '../../../Constants/COLORS';
import Loader from '../../../components/reuseable/Modals/LoaderModal';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {registered_courses} from '../../Reducers/GlobalStatesReducer/GlobalStatesReducer';

const windowwidth = Dimensions.get('window').width;

const LoginUserApi = async (data, dispatch, setLoad) => {
  setLoad(true);
  try {
    const response = await clientapi.post(`/auth/login`, data);
    if (response?.data?.success === true) {
      dispatch(student_id(response?.data?.userdata.student_id));
      dispatch(TokenId(response?.data?.token));
      dispatch(CurrentUniqueDeviceId(response?.data?.device_id));
      dispatch(UserDetail(response?.data?.userdata));
      dispatch(LoginUser(true));
      showMessage({
        message: response?.data?.output?.response?.messages,
        type: 'success',
        position: 'top',
        backgroundColor: COLORS.themeColor,
        color: COLORS.white,
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <FontAwesome6
            name="check-circle"
            size={windowwidth / 16}
            color={COLORS.white}
            style={{paddingRight: 20}}
          />
        ),
      });
    } else if (response?.data?.success === false) {
      showMessage({
        message: response?.data?.output?.response?.messages,
        type: 'danger',
        position: 'top',
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <Entypo
            name="circle-with-cross"
            size={windowwidth / 16}
            color={COLORS.white}
            style={{paddingRight: 20}}
          />
        ),
      });
      setLoad(false);
    }
  } catch (error) {
    console.log('LoginUser error', error.response);
    showMessage({
      message: `500 Server Error`,
      type: 'danger',
      position: 'top',
      style: {justifyContent: 'center', alignItems: 'center'},
      icon: () => (
        <Entypo
          name="circle-with-cross"
          size={windowwidth / 16}
          color={COLORS.white}
          style={{paddingRight: 20}}
        />
      ),
    });
    setLoad(false);
  }
  setLoad(false);
};

const LogOutUserApi = async (data, dispatch, setLoad) => {
  setLoad(true);
  try {
    const response = await clientapi.post(`/auth/logout`, data);
    // console.log(response.data?.success, 'response');
    if (response?.data?.success === true) {
      // console.log('if');
      // dispatch(LogOut());
      dispatch(LoginUser(false));
      dispatch(TokenId(null));
      dispatch(UserDetail(null));
      dispatch(registered_courses(null));

      showMessage({
        message: response?.data?.output?.response?.messages,
        type: 'success',
        position: 'top',
        backgroundColor: COLORS.themeColor,
        color: COLORS.white,
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <FontAwesome6
            name="check-circle"
            size={windowwidth / 16}
            color={COLORS.white}
            style={{paddingRight: 20}}
          />
        ),
      });
    } else {
      // console.log('else');
      console.log(response?.data?.output?.response?.messages, 'else');
      dispatch(LoginUser(false));
      dispatch(TokenId(null));
      dispatch(UserDetail(null));
      showMessage({
        message: 'Logged Out Successfully',
        type: 'success',
        position: 'top',
        backgroundColor: COLORS.themeColor,
        color: COLORS.white,
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <FontAwesome6
            name="check-circle"
            size={windowwidth / 16}
            color={COLORS.white}
            style={{paddingRight: 20}}
          />
        ),
      });
    }
    setLoad(false);
  } catch (error) {
    // console.log('Logout error', error, error.response);
    dispatch(LoginUser(false));
    dispatch(TokenId(null));
    dispatch(UserDetail(null));
    // dispatch(LogOut([]));
    // showMessage({
    //   message: 'Logged Out Successfully',
    //   type: 'success',
    //   position: 'top',
    //   backgroundColor: COLORS.themeColor,
    //   color: COLORS.white,
    //   style: {justifyContent: 'center', alignItems: 'center'},
    //   icon: () => (
    //     <FontAwesome6
    //       name="check-circle"
    //       size={windowwidth / 16}
    //       color={COLORS.white}
    //       style={{paddingRight: 20}}
    //     />
    //   ),
    // });
    setLoad(false);
  }
};

export {LoginUserApi, LogOutUserApi};
