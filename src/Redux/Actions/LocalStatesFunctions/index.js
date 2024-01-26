import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import clientapi from '../../../api/clientapi';

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
    console.log('getCategories error', err);
  }
};
export {getAttendenceData};

const styles = StyleSheet.create({});
