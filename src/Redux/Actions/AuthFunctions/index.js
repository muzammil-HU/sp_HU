import {showMessage} from 'react-native-flash-message';
import clientapi from '../../../api/clientapi';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../Reducers/AuthReducer/AuthReducer';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dimensions} from 'react-native';
import {COLORS} from '../../../Constants/COLORS';

const windowwidth = Dimensions.get('window').width;

const LoginUserApi = async (data, dispatch, setLoad) => {
  try {
    const response = await clientapi.post(`/auth/login`, data);

    if (response?.data?.success === true) {
      dispatch(LoginUser(true));
      dispatch(TokenId(response?.data?.token));
      dispatch(UserDetail(response?.data?.user));
      showMessage({
        message: 'Logged in Successfully',
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
        message: `Inactive Student`,
        type: 'danger',
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
    // console.log('LoginUser error', error);
    showMessage({
      message: `Incorrect studentId or password`,
      type: 'danger',
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
};

const LogOutUserApi = async (data, dispatch, setLoad) => {
  try {
    const response = await clientapi.post(`/auth/logout`, data);

    if (response?.data?.success === true) {
      dispatch(LogOut([]));
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
    console.log('Logout error', error);
    showMessage({
      message: `500 Server Error`,
      type: 'danger',
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
};

export {LoginUserApi, LogOutUserApi};
