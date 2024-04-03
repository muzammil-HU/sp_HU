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
  // console.log(grading_criteria, 'grading_criteria');
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
  useEffect(() => {
    // data = {
    //   token: TokenState,
    //   student_id: studentId,
    // };
    // curriculumData(setLoad, dispatch, data);
    // const CurriculumData1 = async data => {
    //   setLoad(true);
    //   setRefresh(true);
    //   try {
    //     const api = await clientapi.post(`/student/course/curriculum`, data);
    //     // console.log(api?.data?.curriculum, 'api.data');
    //     setCourses(api?.data?.curriculum);
    //     setLoad(false);
    //   } catch (error) {
    //     // setLoad(true);
    //     console.log(error, 'api error');
    //     setLoad(false);
    //   }
    // };
    // CurriculumData1(data);
    // console.log(courses, 'courses7899');
  }, []);
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
