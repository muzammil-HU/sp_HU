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

const windowwidth = Dimensions.get('window').width;

const LoginUserApi = async (data, dispatch, setLoad) => {
  await clientapi
    .post(`/auth/login`, data)
    .then(e => {
      if (e?.data?.success === true) {
        dispatch(LoginUser(true));
        dispatch(TokenId(e?.data?.token));
        dispatch(UserDetail(e?.data?.user));
        showMessage({
          message: 'Logged in Sucessfully',
          type: 'success',
          backgroundColor: '#2BA36F',
          color: '#fff',
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <FontAwesome6
              name="check-circle"
              size={windowwidth / 16}
              color="#fff"
              style={{paddingRight: 20}}
            />
          ),
        });
      }
      if (e?.data?.errorResult == 'incorrect studentId or password') {
        showMessage({
          message: e?.data?.data?.errorResult,
          type: 'info',
          // backgroundColor: '#2BA36F',
          // color: '#fff',
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <MaterialIcons
              name="error"
              size={windowwidth / 16}
              color="#fff"
              style={{paddingRight: 20}}
            />
          ),
        });
        setLoad(false);
      }
      if (e?.data?.errorResult == 'no student found with this studentId!') {
        showMessage({
          message: e?.data?.errorResult,
          type: 'info',
          // backgroundColor: '#2BA36F',
          // color: '#fff',
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <MaterialIcons
              name="error"
              size={windowwidth / 16}
              color="#fff"
              style={{paddingRight: 20}}
            />
          ),
        });
        setLoad(false);
      }
    })
    .catch(err => {
      console.log('LoginUSer error', err);
      showMessage({
        message: `incorrect studentId or password`,
        type: 'danger',
        // backgroundColor: '#2BA36F',
        // color: '#fff',
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <Entypo
            name="circle-with-cross"
            size={windowwidth / 16}
            color="#fff"
            style={{paddingRight: 20}}
          />
        ),
      });
      setLoad(false);
    });
};

export {LoginUserApi};
