import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';

const CourseContentCards = ({load}) => {
  const course_content = useSelector(state => {
    return state?.GlobalStatesReducer?.course_content;
  });

  if (course_content.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: '8%'}}>
        <Text style={{fontSize: windowWidth / 23}}>No Data to show</Text>
      </View>
    );
  }
  // const groupedCourses = course_content.reduce(
  //   (acc, cc) => {
  //     const offerType = cc.offer_type;
  //     if (!acc[offerType]) {
  //       acc[offerType] = [];
  //     }
  //     acc[offerType].push(cc);
  //     return acc;
  //   },
  //   {load},
  // );

  return (
    <View style={{flex: 1, marginHorizontal: '3%'}}>
      <View
        style={{
          backgroundColor: COLORS.TextthemeColor,
          // marginHorizontal: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <Text style={{fontWeight: 'bold', color: COLORS.white}}>
          {course_content[0]?.offer_type}
        </Text>
      </View>
      <ScrollView
        // style={{flexGrow: 1, backgroundColor: 'red'}}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          // flex: 1,
          // backgroundColor: 'red',
        }}>
        {course_content && course_content.length > 0 ? (
          course_content.map((obj, index) => {
            // console.log(obj, 'obj');
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'column',
                  height: 100,
                  paddingHorizontal: '2%',
                  backgroundColor:
                    index % 2 === 0 ? COLORS.greyshade : COLORS.white,
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.text}>{obj.offer_no}</Text>
                </View>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {obj.course_title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    // backgroundColor: 'red',
                  }}>
                  <Text style={styles.text}>{obj.lecturer}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text>No courses available</Text>
        )}
      </ScrollView>
      {/* {Object.entries(groupedCourses).map(([offerType, courses]) => (
        <View key={offerType} style={{height: '100%'}}>
          <View
            style={{
              backgroundColor: COLORS.TextthemeColor,
              // marginHorizontal: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{fontWeight: 'bold', color: COLORS.white}}>
              {offerType}
            </Text>
          </View>
          <ScrollView
            // style={{flexGrow: 1, backgroundColor: 'red'}}
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: 'column',
              // flex: 1,
              // backgroundColor: 'red',
            }}>
            {courses && courses.length > 0 ? (
              courses.map((course, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'column',
                    height: 100,
                    paddingHorizontal: '2%',
                    // flexGrow: 1,
                    backgroundColor:
                      index % 2 === 0 ? COLORS.greyshade : COLORS.white,
                    borderRadius: 5,
                    justifyContent: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>{course.offer_no}</Text>
                  </View>
                  <Text style={[styles.text, {fontWeight: 'bold'}]}>
                    {course.course_title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      // backgroundColor: 'red',
                    }}>
                    <Text style={styles.text}>{course.lecturer}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>No courses available</Text>
            )}
          </ScrollView>
        </View>
      ))} */}
    </View>
  );
};

export default CourseContentCards;

const styles = StyleSheet.create({
  text: {
    color: COLORS.TextthemeColor,
    fontSize: windowWidth / 26,
  },
});
