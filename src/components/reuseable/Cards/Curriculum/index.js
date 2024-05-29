import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

const CurriculumCard = ({sem_courses}) => {
  const [expandedcourses, setExpandedCourses] = useState([]);
  const [currentSemester, setCurrentSemester] = useState([]);
  const currentSem = useSelector(state => {
    return state?.AuthReducer?.UserDetail?.semester;
  });

  const toggleSem = key => {
    setExpandedCourses(prevExpandedDays => {
      if (prevExpandedDays.includes(key)) {
        return prevExpandedDays.filter(d => d !== key);
      } else {
        return [...prevExpandedDays, key];
      }
    });
  };
  useEffect(() => {
    setExpandedCourses([currentSem]);
  }, [currentSem]);
  // useEffect(() => {
  //   //    // Automatically expand the current day when the screen is loaded
  //   //    if (currentSem) {
  //   //      setExpandedDays([currentSem]);
  //   //    }
  // }, [currentSem]);
  return (
    <>
      {sem_courses === 0 || sem_courses === undefined ? (
        <View style={{flex: 1, alignItems: 'center', paddingTop: '8%'}}>
          <Text style={{fontSize: windowWidth / 23, color: COLORS.themeColor}}>
            No Data to show
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: '1%',
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Object?.keys(sem_courses)
            ?.filter(
              key => key !== 'all_credit_hours' && key !== 'all_total_marks',
            )
            .map((key, index) => {
              const semester = sem_courses[key];
              return (
                <View key={key} style={styles.dayContainer}>
                  <TouchableOpacity
                    onPress={() => toggleSem(key)}
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: COLORS.themeColor,
                      marginVertical: '1%',
                      // paddingVertical: '3%',
                      borderRadius: 5,
                    }}>
                    <Text style={{width: '8%'}}></Text>
                    <Text style={styles.dayText}>{key}</Text>
                    <FontAwesome6
                      name={
                        expandedcourses.includes(key)
                          ? 'angle-up'
                          : 'angle-down'
                      }
                      size={windowWidth / 16}
                      color={COLORS.white}
                      style={{paddingRight: 10}}
                    />
                  </TouchableOpacity>
                  {expandedcourses.includes(key) && (
                    <View>
                      {/* {Object?.keys(semester) */}
                      {semester.courses.map((scheduleItem, scheduleIndex) => {
                        return (
                          <View
                            key={scheduleIndex}
                            style={[
                              styles.card,
                              {
                                justifyContent: 'center',
                                backgroundColor:
                                  scheduleIndex % 2 === 0
                                    ? COLORS.white
                                    : COLORS.greyshade,
                              },
                            ]}>
                            <View
                              style={{
                                flexDirection: 'column',
                                width: '45%',
                                justifyContent: 'flex-end',
                                // backgroundColor: 'red',
                                // paddingHorizontal: '5%',
                              }}>
                              <Text
                                style={[
                                  styles.textsty,
                                  {
                                    fontSize: windowWidth / 26,
                                    // textAlign: 'center',
                                    color: COLORS.black,
                                  },
                                ]}>
                                Course ID : {scheduleItem.course_id}
                              </Text>
                              <Text
                                style={[
                                  styles.textsty,
                                  {
                                    fontSize: windowWidth / 23,
                                    // textAlign: 'center',
                                    flexWrap: 'wrap',
                                    color: COLORS.TextthemeColor,
                                  },
                                ]}>
                                {scheduleItem.course_title}
                              </Text>
                              <Text
                                style={[
                                  styles.textsty,
                                  {
                                    fontSize: windowWidth / 26,
                                    // textAlign: 'center',
                                    color: COLORS.black,
                                  },
                                ]}>
                                Course Code : {scheduleItem.course_code}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                width: '55%',
                                justifyContent: 'space-between',
                                // paddingHorizontal: '5%',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '100%',
                                  justifyContent: 'space-evenly',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    width: '30%',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    // paddingHorizontal: '5%',
                                  }}>
                                  <Text
                                    style={[
                                      styles.textsty,
                                      {
                                        fontWeight: 'bold',
                                        color: COLORS.TextthemeColor,
                                      },
                                    ]}>
                                    Cr Hrs
                                  </Text>
                                  <Text
                                    style={[
                                      styles.textsty,
                                      {
                                        fontSize: windowWidth / 22,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                      },
                                    ]}>
                                    {scheduleItem.credit_hrs}
                                  </Text>
                                </View>
                                <Divider
                                  style={{
                                    backgroundColor: COLORS.TextthemeColor,
                                    paddingVertical: '15%',
                                    width: '2%',
                                  }}
                                />
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    width: '30%',
                                    alignItems: 'center',

                                    // justifyContent: 'space-between',
                                    // paddingHorizontal: '5%',
                                  }}>
                                  <Text
                                    style={[
                                      styles.textsty,
                                      {
                                        fontWeight: 'bold',
                                        color: COLORS.TextthemeColor,
                                      },
                                    ]}>
                                    Total Marks
                                  </Text>
                                  <Text
                                    style={[
                                      styles.textsty,
                                      {
                                        fontSize: windowWidth / 22,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                      },
                                    ]}>
                                    {scheduleItem.total_marks}
                                  </Text>
                                </View>
                                <Divider
                                  style={{
                                    backgroundColor: COLORS.TextthemeColor,
                                    paddingVertical: '15%',
                                    width: '2%',
                                  }}
                                />
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    width: '36%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // paddingHorizontal: '5%',
                                  }}>
                                  <Text
                                    style={[
                                      styles.textsty,
                                      {
                                        fontWeight: 'bold',
                                        color: COLORS.TextthemeColor,
                                      },
                                    ]}>
                                    Prerequisite
                                  </Text>
                                  <Text
                                    style={[
                                      styles.textsty,
                                      {
                                        fontSize: windowWidth / 22,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                      },
                                    ]}>
                                    {scheduleItem.prereq === null || undefined
                                      ? '-'
                                      : scheduleItem.prereq}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-evenly',
                          backgroundColor: COLORS.white,
                          alignItems: 'center',
                          paddingVertical: '10%',
                          // height: '6%',
                        }}>
                        {/* <View style={{flexDirection: 'column', width: '50%'}}> */}
                        <Text
                          style={{
                            color: COLORS.themeColor,
                            fontWeight: 'bold',
                            fontSize: windowWidth / 22,
                          }}>
                          Total Credit Hours : {semester.credit_hours}
                        </Text>
                        {/* </View> */}
                        {/* <View style={{flexDirection: 'column', width: '50%'}}> */}
                        <Divider
                          style={{
                            backgroundColor: COLORS.TextthemeColor,
                            height: '60%',
                            width: '1%',
                          }}
                        />
                        <Text
                          style={{
                            color: COLORS.themeColor,
                            fontWeight: 'bold',
                            fontSize: windowWidth / 22,
                          }}>
                          Total Marks : {semester.total_marks}
                        </Text>
                        {/* </View> */}
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
        </ScrollView>
      )}
    </>
  );
};

export default CurriculumCard;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  mainheading: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
  },
  dayText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 24,
    width: '100%',
    // height: '30%',
    overflow: 'hidden',
    flexWrap: 'wrap',
    paddingVertical: windowWidth / 25,
    marginVertical: windowWidth / 60,
    // marginBottom: '1%',
    // paddingHorizontal: 25,
  },
});

{
  /* <Text style={{color: COLORS.white}}>Course ID: {data.course_id}</Text>
          <Text style={{color: COLORS.white}}>
            Course Code: {data.offer_no}
          </Text> */
}
{
  /* <Text style={{color: COLORS.white}}> : {data.offer_no}</Text> */
}

// <View key={key} style={styles.dayContainer}>
//   <TouchableOpacity
//     onPress={() => toggleDay(day)}
//     style={{
//       flexDirection: 'row',
//       width: '100%',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: COLORS.themeColor,
//       marginVertical: '1%',
//     }}>
//     <Text style={{width: '8%'}}></Text>
//     <Text style={styles.dayText}>{day}</Text>
//     <FontAwesome6
//       name={
//         expandedDays.includes(day) ? 'angle-up' : 'angle-down'
//       }
//       size={windowWidth / 16}
//       color={COLORS.white}
//       style={{paddingRight: 10}}
//     />
//   </TouchableOpacity>
//   {expandedDays.includes(day) && (
//     <>
//       {Schedule.filter(item => item.day === day).map(
//         (scheduleItem, scheduleIndex) => {
//           return (
//             <View
//               key={scheduleIndex}
//               style={[
//                 styles.card,
//                 {
//                   justifyContent: 'center',
//                   backgroundColor:
//                     scheduleIndex % 2 === 0
//                       ? COLORS.greyshade
//                       : COLORS.white,
//                 },
//               ]}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   width: '100%',
//                   justifyContent: 'space-between',
//                   paddingHorizontal: '5%',
//                 }}>
//                 <Text
//                   style={[
//                     styles.textsty,
//                     {
//                       fontSize: windowWidth / 26,
//                       textAlign: 'center',
//                       color: COLORS.TextthemeColor,
//                     },
//                   ]}>
//                   Offer Type:{scheduleItem.offer_type}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.textsty,
//                     {
//                       fontSize: windowWidth / 26,
//                       textAlign: 'center',
//                       color: COLORS.TextthemeColor,
//                     },
//                   ]}>
//                   Room:{scheduleItem.room}
//                 </Text>
//               </View>
//               <Divider
//                 style={{
//                   backgroundColor: COLORS.TextthemeColor,
//                   height: '5%',
//                   width: '90%',
//                 }}
//               />
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   width: '100%',
//                   justifyContent: 'space-evenly',
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     width: '60%',
//                     justifyContent: 'flex-start',
//                     paddingLeft: '5%',
//                   }}>
//                   <Text
//                     style={[
//                       styles.textsty,
//                       {
//                         color: COLORS.TextthemeColor,
//                       },
//                     ]}>
//                     {scheduleItem.course_title}
//                   </Text>
//                   <Text
//                     style={[
//                       styles.textsty,
//                       {
//                         fontWeight: 400,
//                         fontSize: windowWidth / 28,
//                         color: COLORS.TextthemeColor,
//                       },
//                     ]}>
//                     {scheduleItem.lecturer}
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     width: '40%',
//                     justifyContent: 'flex-start',
//                   }}>
//                   <Text
//                     style={[
//                       styles.textsty,
//                       {
//                         textAlign: 'center',
//                         fontWeight: '400',
//                         fontSize: windowWidth / 23,
//                         color: COLORS.TextthemeColor,
//                       },
//                     ]}>
//                     Time
//                   </Text>
//                   <Text
//                     style={[
//                       styles.textsty,
//                       {
//                         textAlign: 'center',
//                         fontSize: windowWidth / 20,
//                         color: COLORS.TextthemeColor,
//                       },
//                     ]}>
//                     {scheduleItem.time}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           );
//         },
//       )}
//     </>
//   )}
// </View>

{
  /* <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                                paddingHorizontal: '5%',
                              }}>
                              <Text
                                style={[
                                  styles.textsty,
                                  {
                                    fontSize: windowWidth / 26,
                                    textAlign: 'center',
                                    color: COLORS.TextthemeColor,
                                  },
                                ]}>
                                Offer Type:{scheduleItem.offer_type}
                              </Text>
                              <Text
                                style={[
                                  styles.textsty,
                                  {
                                    fontSize: windowWidth / 26,
                                    textAlign: 'center',
                                    color: COLORS.TextthemeColor,
                                  },
                                ]}>
                                Room:{scheduleItem.room}
                              </Text>
                            </View>
                            <Divider
                              style={{
                                backgroundColor: COLORS.TextthemeColor,
                                height: '5%',
                                width: '90%',
                              }}
                            />
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-evenly',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  width: '60%',
                                  justifyContent: 'flex-start',
                                  paddingLeft: '5%',
                                }}>
                                <Text
                                  style={[
                                    styles.textsty,
                                    {
                                      color: COLORS.TextthemeColor,
                                    },
                                  ]}>
                                  {scheduleItem.course_title}
                                </Text>
                                <Text
                                  style={[
                                    styles.textsty,
                                    {
                                      fontWeight: 400,
                                      fontSize: windowWidth / 28,
                                      color: COLORS.TextthemeColor,
                                    },
                                  ]}>
                                  {scheduleItem.lecturer}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  width: '40%',
                                  justifyContent: 'flex-start',
                                }}>
                                <Text
                                  style={[
                                    styles.textsty,
                                    {
                                      textAlign: 'center',
                                      fontWeight: '400',
                                      fontSize: windowWidth / 23,
                                      color: COLORS.TextthemeColor,
                                    },
                                  ]}>
                                  Time
                                </Text>
                                <Text
                                  style={[
                                    styles.textsty,
                                    {
                                      textAlign: 'center',
                                      fontSize: windowWidth / 20,
                                      color: COLORS.TextthemeColor,
                                    },
                                  ]}>
                                  {scheduleItem.time}
                                </Text>
                              </View>
                            </View> */
}
