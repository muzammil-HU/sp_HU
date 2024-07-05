import {ScrollView, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSharedValue} from 'react-native-reanimated';
import Accordion from '../Accordian';

const MarksheetCards = ({route}) => {
  const parentHeightValue = useSharedValue(0);
  // const semester = route?.params?.data.semester;
  const unoffical_dmc = route?.params?.data?.unoffical_dmc;
  const semesters = Object?.values(unoffical_dmc);
  // console.log(unoffical_dmc, 'unoffical_dmc5454');

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {semesters
          // .filter(key => key !== 'all_total_cr')
          .filter(
            semester => typeof semester === 'object' && semester.sem_courses,
          )
          .map((semester, index) => {
            return (
              <Accordion
                value={semester}
                key={index}
                parentHeighValue={parentHeightValue}
                // unoffical_dmc={unoffical_dmc}
              />
            );
          })}
        <View style={{}}>
          <Accordion
            // value={semester}
            // key={index}
            parentHeighValue={parentHeightValue}
            unoffical_dmc={unoffical_dmc}
          />
        </View>
        {/* {unoffical_dmc.map((semester, index) => {
          return (
            <Accordion
              value={semester}
              key={index}
              parentHeighValue={parentHeightValue}
              unoffical_dmc={unoffical_dmc}
            />
          );
        })} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MarksheetCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
