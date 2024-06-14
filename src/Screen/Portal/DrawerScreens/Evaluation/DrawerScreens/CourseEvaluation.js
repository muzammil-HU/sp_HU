import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import clientapi from '../../../../../api/clientapi';

const CourseEvaluation = () => {
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  const [courseEvaluation, setCourseEvaluation] = useState(null);
  const [load, setLoad] = useState(false);
  const [offer_type, setOffer_type] = useState(null);

  // const parentHeightValue = useSharedValue(0);
  useEffect(() => {
    const params = {
      token: TokenState,
      student_id: studentId,
    };
    const courseEvaluation = async () => {
      try {
        setLoad(true);
        const api = await clientapi.post(`/student/courseevaluation`, params);
        // console.log(api.data, 'api');
        setCourseEvaluation(api?.data?.course_evaluation);
        setOffer_type(api?.data?.offer_type);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        console.log(error, 'api error');
      }
    };
    courseEvaluation();
  }, []);
  console.log(courseEvaluation, 'cou');
  return (
    <View>
      <Text>CourseEvaluation</Text>
    </View>
  );
};

export default CourseEvaluation;

const styles = StyleSheet.create({});
