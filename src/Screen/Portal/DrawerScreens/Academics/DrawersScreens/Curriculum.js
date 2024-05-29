import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import AttendenceInquiryCards from '../../../../../components/reuseable/Cards/AttendenceInquiryCards';
import CurriculumCard from '../../../../../components/reuseable/Cards/Curriculum';
import clientapi from '../../../../../api/clientapi';
import Loader from '../../../../../components/reuseable/Modals/LoaderModal';
import {curriculumData} from '../../../../../Redux/Actions/GlobalStatesFunctions';

const Curriculum = () => {
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);
  const currentSem = useSelector(state => {
    return state?.AuthReducer?.UserDetail;
  });
  const dispatch = useDispatch();
  const AttendenceState = useSelector(state => {
    return state.GlobalStatesReducer.dayAttendence;
  });
  const TokenState = useSelector(state => {
    return state.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  const courses = useSelector(state => {
    return state.GlobalStatesReducer.curriculum;
  });
  console.log(currentSem, 'currentSem');
  useEffect(() => {}, []);
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
      <CurriculumCard sem_courses={courses} />
      {load && <Loader load={load} setLoad={setLoad} />}
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
