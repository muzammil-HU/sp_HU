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
    var day = inputDate.getDate();
    var formattedDay = (day < 10 ? '0' : '') + day;
    var formattedDate =
      formattedDay +
      '-' +
      months[inputDate.getMonth()] +
      '-' +
      inputDate.getFullYear();
    return formattedDate;
  };
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
        <Text style={styles.textTitle}>
          {convertDate(value.transaction_date)}
        </Text>
        <Text style={styles.textTitleHead}>
          {value?.class === null || !value.class ? ' - ' : value.class}
        </Text>
        {value?.offer_type && (
          <Text style={styles.textTitleHead}>
            {value?.offer_type === null ? ' - ' : value?.offer_type}
          </Text>
        )}
        <Chevron progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: '1.5%',
            }}>
            <Text
              style={[
                styles.textContent,
                {color: COLORS.themeColor, fontSize: windowHeight / 40},
              ]}>
              Account:
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: '1.5%',
              paddingHorizontal: '1.5%',
            }}>
            <Text
              style={[
                styles.textContent,
                {fontSize: windowHeight / 50, fontWeight: 'bold'},
              ]}>
              {value?.account === null ? 'N/A' : value?.account}
            </Text>
          </View>

          <View style={styles.content}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '40%',
                flexWrap: 'wrap',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  //   width: '100%',
                  flexWrap: 'wrap',
                }}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Transaction ID :{' '}
                </Text>
                <Text style={styles.textContent}>
                  {value.transaction_id === null ? 'N/A' : value.transaction_id}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Semester :
                </Text>
                <Text style={styles.textContent}>
                  {value?.class === null || !value.class ? ' - ' : value.class}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Dr :
                </Text>
                <Text style={styles.textContent}>
                  {value?.dr === null || !value?.dr ? '-' : value?.dr}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '40%',
                flexWrap: 'wrap',
              }}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  {value?.narration && 'Narration: '}
                  {value?.course_title && 'Course Title: '}
                </Text>
                <Text style={styles.textContent}>
                  {value?.narration && value?.narration}
                  {value?.course_title && value?.course_title}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textContent, {color: COLORS.themeColor}]}>
                  Cr :{' '}
                </Text>
                <Text style={styles.textContent}>
                  {value?.cr === null || !value?.cr ? '-' : value?.cr}
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
              paddingHorizontal: '1.5%',
            }}>
            <Text
              style={[
                styles.textContent,
                {
                  color: COLORS.themeColor,
                  fontSize: windowHeight / 50,
                  fontWeight: 'bold',
                },
              ]}>
              Balance:{' '}
            </Text>
            <Text
              style={[
                styles.textContent,
                {fontSize: windowHeight / 50, fontWeight: 'bold'},
              ]}>
              {value?.balance === null || !value?.balance
                ? '-'
                : value?.balance}
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
    backgroundColor: COLORS.themeColor,
    // marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0F56B3',
    overflow: 'hidden',
  },
  textTitleHead: {
    fontSize: 16,
    color: COLORS.white,
    width: '30%',
    textAlign: 'center',
  },
  textTitle: {
    fontSize: 16,
    color: COLORS.white,
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
    alignItems: 'center',
    paddingVertical: '3.5%',
    paddingHorizontal: '1.5%',
    backgroundColor: COLORS.white,
    // '#D6E1F0',
  },
  textContent: {
    fontSize: 14,
    color: 'black',
    flexWrap: 'wrap',
  },
});
