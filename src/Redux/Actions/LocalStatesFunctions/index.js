import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import clientapi from '../../../api/clientapi';
import {windowWidth} from '../../../Constants/COLORS';

const getAttendenceData = async (setData, setLoad, setError, params) => {
  try {
    const res = await clientapi.post(`/student/attendance/inquiry`, params);
    if (res?.data?.success === true && res?.data?.data != []) {
      setData(res?.data?.data);
      setLoad(false);
      console.log('data imported');
    } else {
      setError('No Data found');
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
// const getclassSchedule = async (
//   setData,
//   setLoad,
//   setError,
//   dispatch,
//   params,
// ) => {
//   try {
//     const res = await clientapi.post(`/student/class/schedule`, params);
//     if (res?.data?.success === true && res?.data?.data != []) {
//       setData(res?.data?.data);
//       setLoad(false);
//       console.log('data imported');
//     } else {
//       setError('No Data found');
//     }
//   } catch (err) {
//     console.log('getCategories error', err);
//   }
// };
export {getAttendenceData};

const styles = StyleSheet.create({});
