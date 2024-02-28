import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, windowWidth} from '../../../Constants/COLORS';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const CurrentSchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const columnheads = [
    'offer_type',
    'Time',
    'Room',
    'course_title',
    'lecturer',
  ];
  const Schedule = useSelector(state => {
    return state?.GlobalStatesReducer.class_schedule;
  });

  // const class_schedule = [
  //   {
  //     course_id: '7900',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50944',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Exercise Physiology (Theory)',
  //     emp_id: '1004945',
  //     lecturer: 'Saba Rizwan',
  //     print: 'Print',
  //     time: '08:30 - 09:30',
  //     day: 'Monday',
  //     room: '--',
  //     session_ids: '1',
  //   },
  //   {
  //     course_id: '7897',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50941',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Health & Wellness',
  //     emp_id: '1005125',
  //     lecturer: 'Javeria Shamim',
  //     print: 'Print',
  //     time: '10:30 - 11:30',
  //     day: 'Monday',
  //     room: '--',
  //     session_ids: '3',
  //   },
  //   {
  //     course_id: '7895',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50939',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Anatomy-Iv (Neuro Anatomy) (Theory)',
  //     emp_id: '1004123',
  //     lecturer: 'Dr. Maria Mohiuddin',
  //     print: 'Print',
  //     time: '11:30 - 12:30',
  //     day: 'Monday',
  //     room: '--',
  //     session_ids: '4',
  //   },
  //   {
  //     course_id: '7898',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50942',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Biomechanics & Ergonomics-Ii (Lab)',
  //     emp_id: '1004540',
  //     lecturer: 'Mubarak Ali',
  //     print: 'Print',
  //     time: '13:30 - 14:30',
  //     day: 'Monday',
  //     room: '--',
  //     session_ids: '5',
  //   },
  //   {
  //     course_id: '7894',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50938',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Biochemistry-Ii (Theory)',
  //     emp_id: '1004833',
  //     lecturer: 'Sana Sadaf Siddiqui',
  //     print: 'Print',
  //     time: '09:30 - 10:30',
  //     day: 'Tuesday',
  //     room: '--',
  //     session_ids: '2',
  //   },
  //   {
  //     course_id: '7892',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50937',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Biomechanics & Ergonomics-Ii',
  //     emp_id: '1004540',
  //     lecturer: 'Mubarak Ali',
  //     print: 'Print',
  //     time: '11:30 - 12:30',
  //     day: 'Tuesday',
  //     room: '--',
  //     session_ids: '4',
  //   },
  //   {
  //     course_id: '7901',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50945',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Exercise Physiology (Lab)',
  //     emp_id: '1004945',
  //     lecturer: 'Saba Rizwan',
  //     print: 'Print',
  //     time: '13:30 - 14:30',
  //     day: 'Tuesday',
  //     room: '--',
  //     session_ids: '5',
  //   },
  //   {
  //     course_id: '7894',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50938',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Biochemistry-Ii (Theory)',
  //     emp_id: '1004833',
  //     lecturer: 'Sana Sadaf Siddiqui',
  //     print: 'Print',
  //     time: '08:30 - 09:30',
  //     day: 'Wednesday',
  //     room: '--',
  //     session_ids: '1',
  //   },
  //   {
  //     course_id: '7892',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50937',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Biomechanics & Ergonomics-Ii',
  //     emp_id: '1004540',
  //     lecturer: 'Mubarak Ali',
  //     print: 'Print',
  //     time: '10:30 - 11:30',
  //     day: 'Wednesday',
  //     room: '--',
  //     session_ids: '3',
  //   },
  //   {
  //     course_id: '7895',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50939',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Anatomy-Iv (Neuro Anatomy) (Theory)',
  //     emp_id: '1004123',
  //     lecturer: 'Dr. Maria Mohiuddin',
  //     print: 'Print',
  //     time: '11:30 - 12:30',
  //     day: 'Wednesday',
  //     room: '--',
  //     session_ids: '4',
  //   },
  //   {
  //     course_id: '7900',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50944',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Exercise Physiology (Theory)',
  //     emp_id: '1004945',
  //     lecturer: 'Saba Rizwan',
  //     print: 'Print',
  //     time: '13:30 - 14:30',
  //     day: 'Wednesday',
  //     room: '--',
  //     session_ids: '5',
  //   },
  //   {
  //     course_id: '7902',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50946',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Molecular Biology & Genetics',
  //     emp_id: '1004947',
  //     lecturer: 'Tariq Ahmed',
  //     print: 'Print',
  //     time: '09:30 - 11:30',
  //     day: 'Thursday',
  //     room: '--',
  //     session_ids: '23',
  //   },
  //   {
  //     course_id: '7897',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50941',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Health & Wellness',
  //     emp_id: '1005125',
  //     lecturer: 'Javeria Shamim',
  //     print: 'Print',
  //     time: '14:30 - 16:00',
  //     day: 'Thursday',
  //     room: '--',
  //     session_ids: '6',
  //   },
  //   {
  //     course_id: '7899',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50943',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Biochemistry-Ii (Lab)',
  //     emp_id: '1004833',
  //     lecturer: 'Sana Sadaf Siddiqui',
  //     print: 'Print',
  //     time: '08:30 - 09:30',
  //     day: 'Friday',
  //     room: '--',
  //     session_ids: '1',
  //   },
  //   {
  //     course_id: '7896',
  //     offer_id: '1826',
  //     base_offer_id: '1826',
  //     offer_no: '50940',
  //     offer_type: 'Fall-2023',
  //     course_title: 'Anatomy-Iv (Neuro Anatomy) (Lab)',
  //     emp_id: '1004123',
  //     lecturer: 'Dr. Maria Mohiuddin',
  //     print: 'Print',
  //     time: '10:30 - 11:30',
  //     day: 'Friday',
  //     room: '--',
  //     session_ids: '3',
  //   },
  // ];

  // console.log(Schedule, 'schedule123');
  return (
    <>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.mainheading}>Current Schedule</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // backgroundColor: 'red',
          paddingHorizontal: '3%',
        }}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.themeColor,
              }}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: COLORS.subheading,
                // columnGap: 5,
              }}>
              {columnheads.map((head, index) => (
                <View key={index} style={{flexDirection: 'column'}}>
                  <Text style={styles.columnheadstext}>{head}</Text>
                  {Schedule.filter(item => item.day === day).map(
                    (scheduleItem, scheduleIndex) => (
                      <View
                        key={scheduleIndex}
                        style={styles.scheduleItemContainer}>
                        <Text style={styles.scheduleItemText}>
                          {scheduleItem[head.toLowerCase()]}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default CurrentSchedule;

const styles = StyleSheet.create({
  mainheading: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
  },
  dayheadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.TextthemeColor,
  },
  dayheading: {
    color: COLORS.white,
  },
  dayContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.TextthemeColor,
    marginVertical: 10,
    paddingVertical: 8,
  },
  dayText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduleItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  scheduleItemText: {
    color: COLORS.themeColor,
    fontSize: 16,
  },
  columnheadstext: {
    color: COLORS.black,
  },
});
