import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import Loader from '../../../../../components/reuseable/Modals/LoaderModal';
import {useSelector} from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Divider} from 'react-native-paper';
import clientapi from '../../../../../api/clientapi';

const ExaminationSchedule = () => {
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState();
  const [expandedDays, setExpandedDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);
  const [exam_Type, setExam_type] = useState();
  const [exam_Data, setExam_Data] = useState([]);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const convertDate = date => {
    var inputDate = new Date(date);
    var formattedDate =
      inputDate.getDate() +
      '-' +
      months[inputDate.getMonth()] +
      '-' +
      inputDate.getFullYear();
    return formattedDate;
  };
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', {weekday: 'long'});
    setCurrentDay(today);
    const params = {
      token: TokenState,
      student_id: studentId,
    };
    (async () => {
      const ExaminationScheduleData = async params => {
        // setLoad(true);
        try {
          const api = await clientapi.post(
            `/student/examination/schedule`,
            params,
          );
          // console.log(api?.data, '789czcaca');
          setExam_Data(api?.data.examination_schedule);
          setExam_type(api?.data.exam_sch);
        } catch (error) {
          console.log(error, 'api error');
          // setLoad(false);
        }
      };
      await ExaminationScheduleData(params);
    })();
  }, []);

  useEffect(() => {
    if (currentDay) {
      setExpandedDays([currentDay]);
    }
  }, [currentDay]);
  const ff = {
    1: 'Mid Term Examinations',
    2: 'Final Term Examination',
  };

  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  const toggleDay = day => {
    setExpandedDays(prevExpandedDays => {
      if (prevExpandedDays.includes(day)) {
        // If day is already expanded, remove it from the array
        return prevExpandedDays.filter(d => d !== day);
      } else {
        // If day is not expanded, add it to the array
        return [...prevExpandedDays, day];
      }
    });
  };
  const days = Object.values(ff);
  return (
    <>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.mainheading}>Examination Schedule</Text>
          </View>
          {exam_Data.length === 0 ? (
            <View style={{flex: 1, alignItems: 'center', paddingTop: '8%'}}>
              <Text
                style={{fontSize: windowWidth / 23, color: COLORS.themeColor}}>
                No Data to show
              </Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: '3%',
              }}>
              {Object.keys(ff).map(key => {
                const exam_type = ff[key];
                // console.log(exam_type);
                const daySchedule = exam_Data.filter(
                  item => item.exam_type === exam_type,
                );

                if (daySchedule.length > 0) {
                  return (
                    <View key={key} style={styles.dayContainer}>
                      <TouchableOpacity
                        onPress={() => toggleDay(exam_type)}
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: COLORS.themeColor,
                          marginVertical: '1%',
                        }}>
                        <Text style={{width: '8%'}}></Text>
                        <Text style={styles.dayText}>{exam_type}</Text>
                        <FontAwesome6
                          name={
                            expandedDays.includes(exam_type)
                              ? 'angle-up'
                              : 'angle-down'
                          }
                          size={windowWidth / 16}
                          color={COLORS.white}
                          style={{paddingRight: 10}}
                        />
                      </TouchableOpacity>
                      {expandedDays.includes(exam_type) && (
                        <>
                          {exam_Data
                            .filter(item => item.exam_type === exam_type)
                            .map((scheduleItem, scheduleIndex) => {
                              return (
                                <View
                                  key={scheduleIndex}
                                  style={[
                                    styles.card,
                                    {
                                      justifyContent: 'center',
                                      backgroundColor:
                                        scheduleIndex % 2 === 0
                                          ? COLORS.greyshade
                                          : COLORS.white,
                                    },
                                  ]}>
                                  <View
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
                                      {/* {scheduleItem.exam_date} */}
                                      {scheduleItem.exam_date === null
                                        ? '-'
                                        : convertDate(scheduleItem.exam_date)}
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
                                      {scheduleItem.exam_day === null
                                        ? '-'
                                        : scheduleItem.exam_day}
                                    </Text>
                                  </View>
                                  <View
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
                                      {scheduleItem.offer_no
                                        ? '-'
                                        : scheduleItem.offer_no}
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
                                      {scheduleItem.exam_room === null
                                        ? '-'
                                        : scheduleItem.exam_room}
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
                                        {scheduleItem.exam_time === null
                                          ? '-'
                                          : scheduleItem.exam_time}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              );
                            })}
                        </>
                      )}
                    </View>
                  );
                }
                return null;
              })}
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
};

export default ExaminationSchedule;

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
  cardcol1: {
    flexDirection: 'column',
    width: '50%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: '8%',
  },
  cardcol2: {
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'blue',
    flexWrap: 'wrap',
  },
  textsty: {
    fontSize: windowWidth / 20,
    fontWeight: '700',
    flexWrap: 'wrap',
    // textAlignVertical: 'center',
    // textAlign: 'center',
  },
  ids: {
    flexDirection: 'row',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '12%',
    backgroundColor: 'white',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    columnGap: 20,
  },
});
