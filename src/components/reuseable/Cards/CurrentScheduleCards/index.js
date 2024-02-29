import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';
import AttendenceModal from '../../Modals/Attendence';
import {useSelector} from 'react-redux';
import {Divider} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const CurrentScheduleCards = ({load, setLoad}) => {
  const [visible, setVisible] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState();
  const [expandedDays, setExpandedDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);
  const ff = useSelector(state => {
    return state?.GlobalStatesReducer?.days;
  });
  const Schedule = useSelector(state => {
    return state?.GlobalStatesReducer.class_schedule;
  });
  useEffect(() => {
    // Set the current day when the component mounts
    const today = new Date().toLocaleDateString('en-US', {weekday: 'long'});
    setCurrentDay(today);
    // console.log(ff, 'FF');
  }, []);

  useEffect(() => {
    // Automatically expand the current day when the screen is loaded
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
      <View style={{alignItems: 'center'}}>
        <Text style={styles.mainheading}>Current Schedule</Text>
      </View>
      {Schedule.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', paddingTop: '8%'}}>
          <Text style={{fontSize: windowWidth / 23, color: COLORS.themeColor}}>
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
            const day = ff[key];
            const daySchedule = Schedule.filter(item => item.day === day);

            if (daySchedule.length > 0) {
              return (
                <View key={key} style={styles.dayContainer}>
                  <TouchableOpacity
                    onPress={() => toggleDay(day)}
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: COLORS.themeColor,
                      marginVertical: '1%',
                    }}>
                    <Text style={{width: '8%'}}></Text>
                    <Text style={styles.dayText}>{day}</Text>
                    <FontAwesome6
                      name={
                        expandedDays.includes(day) ? 'angle-up' : 'angle-down'
                      }
                      size={windowWidth / 16}
                      color={COLORS.white}
                      style={{paddingRight: 10}}
                    />
                  </TouchableOpacity>
                  {expandedDays.includes(day) && (
                    <>
                      {Schedule.filter(item => item.day === day).map(
                        (scheduleItem, scheduleIndex) => {
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
                              </View>
                            </View>
                          );
                        },
                      )}
                    </>
                  )}
                </View>
              );
            }
            return null;
          })}
        </ScrollView>
      )}
    </>
  );
};

export default CurrentScheduleCards;

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

{
  /* <View style={styles.cardcol1}>
                      <View
                        style={[
                          styles.ids,
                          {
                            borderRadius: 5,
                            // backgroundColor:
                            //   index % 2 === 0
                            //     ? COLORS.white
                            //     : COLORS.TextthemeColor,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.textsty,
                            {
                              fontSize: windowWidth / 26,
                              textAlign: 'center',
                              color: COLORS.TextthemeColor,
                              // index % 2 === 0
                              //   ? COLORS.TextthemeColor
                              //   : COLORS.white,
                            },
                          ]}>
                          Offer type: {}
                        </Text>
                        <Text
                          style={[
                            styles.textsty,
                            {
                              fontSize: windowWidth / 26,
                              textAlign: 'center',
                              color: COLORS.TextthemeColor,
                              // index % 2 === 0
                              //   ? COLORS.TextthemeColor
                              //   : COLORS.white,
                            },
                          ]}>
                          {scheduleItem.offer_type}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.textsty,
                          {
                            //   textAlign: 'center',
                            color: COLORS.TextthemeColor,
                            // index % 2 === 0
                            //   ? COLORS.white
                            //   : COLORS.TextthemeColor,
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
                            // index % 2 === 0
                            //   ? COLORS.white
                            //   : COLORS.TextthemeColor,
                          },
                        ]}>
                        {scheduleItem.lecturer}
                      </Text>
                    </View> */
}
{
  /* <View style={styles.cardcol2}>
                      <Text
                        style={[
                          styles.textsty,
                          {
                            textAlign: 'center',
                            // backgroundColor: 'red',
                            fontWeight: '400',
                            fontSize: windowWidth / 28,
                            color: COLORS.TextthemeColor,
                            // index % 2 === 0
                            //   ? COLORS.white
                            //   : COLORS.TextthemeColor,
                          },
                        ]}>
                        Time
                      </Text>
                      <Text
                        style={[
                          styles.textsty,
                          {
                            textAlign: 'center',
                            // paddingTop: windowWidth / 12,
                            fontSize: windowWidth / 15,
                            color: COLORS.TextthemeColor,
                            // index % 2 === 0
                            //   ? COLORS.white
                            //   : COLORS.TextthemeColor,
                          },
                        ]}>
                        {scheduleItem.time}
                      </Text>                      
                    </View> */
}
