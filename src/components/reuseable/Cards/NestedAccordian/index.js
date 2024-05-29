import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import Chevron from '../../Chevron';
import {COLORS, windowHeight} from '../../../../Constants/COLORS';

const NestedAccordion = ({value, parentHeighValue, unoffical_dmc}) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              'worklet';
              const measuredHeight = measure(listRef).height;
              heightValue.value = withTiming(measuredHeight);
              parentHeighValue.value = withTiming(
                parentHeighValue.value + measuredHeight,
              );
            })();
          } else {
            runOnUI(() => {
              'worklet';
              const measuredHeight = measure(listRef).height;
              heightValue.value = withTiming(0);
              parentHeighValue.value = withTiming(
                parentHeighValue.value - measuredHeight,
              );
            })();
          }
          open.value = !open.value;
        }}
        style={styles.titleContainer}>
        <Text style={styles.textTitle}>{value.course_title}</Text>
        <Chevron progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <View style={styles.content}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Course Id :{' '}
                </Text>
                <Text style={styles.textContent}>
                  {value.course_id === null ? 'N/A' : value.course_id}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Total Marks :
                </Text>
                <Text style={styles.textContent}>
                  {value.obtained_marks === null ? 'N/A' : value.obtained_marks}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Grade Point :
                </Text>
                <Text style={styles.textContent}>
                  {value.grade_point === null ? 'N/A' : value.grade_point}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Grade :
                </Text>
                <Text style={styles.textContent}>
                  {value.grade === null ? 'N/A' : value.grade}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                // alignItems: 'center'
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Course Code :{' '}
                </Text>
                <Text style={styles.textContent}>
                  {value.course_code === null ? 'N/A' : value.course_code}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Obtained Marks :
                </Text>
                <Text style={styles.textContent}>
                  {value.obtained_marks === null ? 'N/A' : value.obtained_marks}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Credit Hours :
                </Text>
                <Text style={styles.textContent}>
                  {value.credit_hrs === null ? 'N/A' : value.credit_hrs}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: '1.5%',
              // borderBottomColor: COLORS.black,
              // borderBottomWidth: 1,
            }}>
            <Text
              style={[
                styles.textContent,
                {color: COLORS.themeColor, fontSize: windowHeight / 40},
              ]}>
              GPA:
            </Text>
            <Text
              style={[
                styles.textContent,
                {fontSize: windowHeight / 40, fontWeight: 'bold'},
              ]}>
              {value.gpa === null ? 'N/A' : value.gpa}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default NestedAccordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3EDFB',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0F56B3',
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: 16,
    color: 'black',
  },
  titleContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '3.5%',
    paddingHorizontal: '5%',
    backgroundColor: COLORS.white,
    // '#D6E1F0',
  },
  textContent: {
    fontSize: 14,
    color: 'black',
  },
});
