import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, windowWidth} from '../../../Constants/COLORS';
import {useSelector} from 'react-redux';

const MakeupClasses = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState();
  const data = [
    {
      offer_type: 'Fall 2023',
      class_date: '2023-8-12',
      class_day: 'Tuesday',
      time: '8:30 - 9:30',
      room: 'ABC',
      course_title: 'Computer Engineering',
      lecturer: 'Dr Maria',
    },
    {
      offer_type: 'Fall 2023',
      class_date: '2023-8-13',
      class_day: 'Wednesday',
      time: '8:30 - 9:30',
      room: 'ABC',
      course_title: 'Computer Engineering1',
      lecturer: 'Dr Maria',
    },
    {
      offer_type: 'Fall 2023',
      class_date: '2023-8-14',
      class_day: 'Thursday',
      time: '8:30 - 9:30',
      room: 'ABC',
      course_title: 'Computer Engineering2',
      lecturer: 'Dr Maria',
    },
  ];
  const class_schedule = useSelector(state => {
    return state?.GlobalStatesReducer.class_schedule || [];
  });
  const makeup_classes = useSelector(state => {
    return state?.GlobalStatesReducer?.makeup_classes || [];
  });
  // console.log(makeup_classes.length, 'makeup_classes length');

  const ff = useSelector(state => {
    return state?.GlobalStatesReducer.class_schedule;
  });
  const Schedule = useSelector(state => {
    return state?.GlobalStatesReducer.class_schedule;
  });
  // console.log(typeof makeup_classes, 'makeup_classes');
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={styles.mainheading}>MakeUp Classes</Text>
        {makeup_classes.length === 0 ? (
          <View style={{paddingTop: '8%'}}>
            <Text style={{fontSize: windowWidth / 23}}>No Record found</Text>
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
      </View>
    </View>
  );
};
export default MakeupClasses;

const styles = StyleSheet.create({
  mainheading: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
  },
});
