import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import clientapi from '../../../api/clientapi';
import {windowWidth} from '../../../Constants/COLORS';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../Reducers/GlobalStatesReducer/GlobalStatesReducer';
import {showMessage} from 'react-native-flash-message';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const getAttendenceData = async (setData, setLoad, setError, params) => {
  try {
    const api = await clientapi.post(`/student/attendance/inquiry`, params);
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
      setData(api?.data?.data);
      setLoad(false);
      console.log('data imported');
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

export {getAttendenceData};

const styles = StyleSheet.create({});
