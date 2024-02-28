import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, windowWidth} from '../../../Constants/COLORS';
import CourseContentCards from '../../reuseable/Cards/CourseContentCards';
import {useSelector} from 'react-redux';
import Loader from '../../reuseable/Modals/LoaderModal';

const CourseContent = ({load, setLoad}) => {
  const course_content = useSelector(state => {
    return state?.GlobalStatesReducer.course_content;
  });
  useEffect(() => {}, []);
  return (
    <>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.mainheading}>Course Content</Text>
          </View>
          <CourseContentCards course_content={course_content} />
        </>
      )}
    </>
  );
};

export default CourseContent;

const styles = StyleSheet.create({
  mainheading: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
  },
});
