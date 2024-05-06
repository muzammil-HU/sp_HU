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

const ExaminationSchedule = () => {
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState();
  const [expandedDays, setExpandedDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);
  const ff = {
    1: 'Mid Term Examinations',
    2: 'Final Term Examination',
  };

  const dd = useSelector(state => {
    return state?.GlobalStatesReducer?.days;
  });
  const data = [
    {
      base_offer_id: '1869',
      course_id: '7907',
      course_title: 'Therapeutic Exercises & Techniques (Theory)',
      date: '2024-04-25',
      day: 'Monday',
      exam_type: 'Mid Term Examinations',
      lecturer: 'Unzila Sadaq',
      offer_id: '1869',
      offer_no: '53503',
      room: '--',
      time: '08:30 - 09:30',
    },
    {
      base_offer_id: '7785',
      course_id: '5888',
      course_title: 'Therapeutic Exercises & Techniques (Theory)',
      date: '2024-04-25',
      day: 'Monday',
      exam_type: 'Mid Term Examinations',
      lecturer: 'Unzila Sadaq',
      offer_id: '1867',
      offer_no: '53547',
      room: '--',
      time: '08:30 - 09:30',
    },
    {
      base_offer_id: '1455',
      course_id: '5566',
      course_title: 'Therapeutic Exercises & Techniques (Theory)',
      date: '26/05/2024',
      day: 'Monday',
      exam_type: 'Final Term Examination',
      lecturer: 'Unzila Sadaq',
      offer_id: '1845',
      offer_no: '53515',
      room: '--',
      time: '08:30 - 09:30',
    },
  ];
  console.log(dd);
  const Schedule = useSelector(state => {
    return state?.GlobalStatesReducer.class_schedule;
  });
  console.log(Schedule);
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', {weekday: 'long'});
    setCurrentDay(today);
  }, []);

  useEffect(() => {
    if (currentDay) {
      setExpandedDays([currentDay]);
    }
  }, [currentDay]);
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
          {data.length === 0 ? (
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
                console.log(exam_type);
                const daySchedule = data.filter(
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
                          {data
                            .filter(item => item.exam_type === exam_type)
                            .map((scheduleItem, scheduleIndex) => {
                              console.log(scheduleItem, 'dsda');
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
                                      Offer No:{scheduleItem.offer_no}
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
                                      Exam day : {scheduleItem.day}
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
