import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TopCard from '../../../components/reuseable/Cards/TopCards';

const Attendence = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2BA36F',
      }}>
      {/* <TopCard /> */}
      <Text>Attendence</Text>
      {/* <AntDesign name="pluscircle" size={50} color="black" /> */}
    </View>
  );
};

export default Attendence;

const styles = StyleSheet.create({});
