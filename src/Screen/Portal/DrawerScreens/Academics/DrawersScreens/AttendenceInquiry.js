import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import AttendenceInquiryCards from '../../../../../components/reuseable/Cards/AttendenceInquiryCards';
import {getAttendenceData} from '../../../../../Redux/Actions/GlobalStatesFunctions';
import {useDispatch, useSelector} from 'react-redux';

const AttendenceInquiry = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const TokenState = useSelector(state => {
    return state.AuthReducer.TokenId;
  });
  const AttendenceState = useSelector(state => {
    return state.GlobalStatesReducer.dayAttendence;
  });
  // console.log(AttendenceState, 'AttendenceState');
  cards = [
    {
      course_id: '7896',
      offer_id: '1826',
      offer_type: 'Fall-2023',
      course_title: 'Anatomy-Iv (Neuro Anatomy) (Lab)',
      credit_hrs: '1',
      emp_id: '1004123',
      lecturer: 'Dr. Maria Mohiuddin',
      offer_no: '50940',
      attend_percentage: '81',
      attendance: [
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: null,
          day: null,
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-12-28 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-12-21 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-12-15 00:00:00',
          day: 'Friday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-12-07 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-12-01 00:00:00',
          day: 'Friday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-11-30 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-11-01 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-10-27 00:00:00',
          day: 'Friday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-10-26 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-10-12 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-10-05 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-09-29 00:00:00',
          day: 'Friday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-09-22 00:00:00',
          day: 'Friday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-09-15 00:00:00',
          day: 'Friday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7896',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Lab)',
          attendance_date: '2023-09-07 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
      ],
    },
    {
      course_id: '7895',
      offer_id: '1826',
      offer_type: 'Fall-2023',
      course_title: 'Anatomy-Iv (Neuro Anatomy) (Theory)',
      credit_hrs: '2',
      emp_id: '1004123',
      lecturer: 'Dr. Maria Mohiuddin',
      offer_no: '50939',
      attend_percentage: '90',
      attendance: [
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-27 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-27 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-25 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-20 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-20 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-18 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-13 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-13 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-12-11 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-11-29 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-11-27 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-11-20 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-11-01 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-30 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-25 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-23 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-18 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-16 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-11 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-09 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-04 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-10-02 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-27 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-25 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-25 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-20 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-18 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-18 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-14 00:00:00',
          day: 'Thursday ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-11 00:00:00',
          day: 'Monday   ',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7895',
          course_title: 'Anatomy-IV (Neuro Anatomy) (Theory)',
          attendance_date: '2023-09-06 00:00:00',
          day: 'Wednesday',
          emp_id: '1004123',
          lecturer: 'Dr. Maria Mohiuddin',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
      ],
    },
    {
      course_id: '7899',
      offer_id: '1826',
      offer_type: 'Fall-2023',
      course_title: 'Biochemistry-Ii (Lab)',
      credit_hrs: '1',
      emp_id: '1004833',
      lecturer: 'Sana Sadaf Siddiqui',
      offer_no: '50943',
      attend_percentage: '74',
      attendance: [
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-12-20 00:00:00',
          day: 'Wednesday',
          emp_id: '1004833',
          lecturer: 'Sana Sadaf Siddiqui',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-12-19 00:00:00',
          day: 'Tuesday  ',
          emp_id: '1004833',
          lecturer: 'Sana Sadaf Siddiqui',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-12-18 00:00:00',
          day: 'Monday   ',
          emp_id: '1004833',
          lecturer: 'Sana Sadaf Siddiqui',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-12-12 00:00:00',
          day: 'Tuesday  ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-12-11 00:00:00',
          day: 'Monday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-11-29 00:00:00',
          day: 'Wednesday',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-11-29 00:00:00',
          day: 'Wednesday',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '1',
          absent_hrs: null,
          total_hrs: '1',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-11-28 00:00:00',
          day: 'Tuesday  ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '1',
          total_hrs: '1',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-11-27 00:00:00',
          day: 'Monday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-10-30 00:00:00',
          day: 'Monday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-10-23 00:00:00',
          day: 'Monday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-10-23 00:00:00',
          day: 'Monday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-10-13 00:00:00',
          day: 'Friday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-10-13 00:00:00',
          day: 'Friday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-10-13 00:00:00',
          day: 'Friday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-10-13 00:00:00',
          day: 'Friday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-10-13 00:00:00',
          day: 'Friday   ',
          emp_id: '1002169',
          lecturer: 'Beenish Khalid',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-09-22 00:00:00',
          day: 'Friday   ',
          emp_id: '1004833',
          lecturer: 'Sana Sadaf Siddiqui',
          the_color: 'black',
          attendance_status: 'P',
          present_hrs: '2',
          absent_hrs: null,
          total_hrs: '2',
        },
        {
          course_id: '7899',
          course_title: 'Biochemistry-II (Lab)',
          attendance_date: '2023-09-15 00:00:00',
          day: 'Friday   ',
          emp_id: '1004833',
          lecturer: 'Sana Sadaf Siddiqui',
          the_color: 'red',
          attendance_status: 'A',
          present_hrs: null,
          absent_hrs: '2',
          total_hrs: '2',
        },
      ],
    },
  ];
  useEffect(() => {
    const params = {
      token: TokenState,
    };
    setLoad(true);
    getAttendenceData(setData, setLoad, setError, dispatch, params);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingtext}>Attendence Inquiry</Text>
        <Text style={styles.text}>
          You must check your attendance on daily bases for proper monitoring of
          your attendance percentage. Please click on the %age to view the
          detail day wise Absent (A) and Present (P) Status.
        </Text>
      </View>
      <AttendenceInquiryCards cards={cards} data={data} />
    </View>
  );
};

export default AttendenceInquiry;

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