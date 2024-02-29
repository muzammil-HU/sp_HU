import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import AttendenceInquiryCards from '../../../../../components/reuseable/Cards/AttendenceInquiryCards';

const Curriculum = () => {
  const AttendenceState = useSelector(state => {
    return state.GlobalStatesReducer.dayAttendence;
  });
  // const data = [
  //   {
  //     "0",
  //     [
  //       {attend_percentage: null,
  //     attendance: [],
  //     course_id: '7911',
  //     course_title: 'Behavioral Science (Psychology & Ethics)',
  //     credit_hrs: '2',
  //     emp_id: null,
  //     lecturer: null,
  //     offer_id: '1869',
  //     offer_no: '53506',
  //         offer_type: 'Spring-2024',
  //       }
  //     ]
  //   },
  //   // {
  //   //   attend_percentage: null,
  //   //   attendance: [],
  //   //   course_id: '7909',
  //   //   course_title: 'Biostatistics-I',
  //   //   credit_hrs: '3',
  //   //   emp_id: '1001711',
  //   //   lecturer: 'Sadia Ali',
  //   //   offer_id: '1869',
  //   //   offer_no: '53505',
  //   //   offer_type: 'Spring-2024',
  //   // },
  // ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingtext}>Approved Batch Curriculum</Text>
        <Text style={styles.text}>
          Following is your batch approved curriculum / course plan. Different
          batches may have same or different batch plan
        </Text>
      </View>
      {/* <AttendenceInquiryCards AttendenceState={AttendenceState} /> */}
    </View>
  );
};

export default Curriculum;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headingContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // height: '6%',
    // backgroundColor: 'red',
  },
  headingtext: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
    textDecorationColor: COLORS.themeColor,
    textAlign: 'center',
  },
  text: {
    color: COLORS.TextthemeColor,
    textAlign: 'center',
    fontSize: windowWidth / 28,
    paddingHorizontal: 10,
  },
  ScrollContainer: {
    flexGrow: 1,
    overflow: 'scroll',
  },
  contentContainer: {
    flex: 1,
    // justifyContent: ,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
});
