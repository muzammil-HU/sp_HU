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
          your attendance percentage. Please click on the course to view the
          detail day wise Absent (A) and Present (P) Status.
        </Text>
      </View>
      <AttendenceInquiryCards AttendenceState={AttendenceState} />
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
