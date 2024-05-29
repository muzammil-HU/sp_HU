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
import NestedAccordion from '../NestedAccordian';
import {COLORS, windowHeight} from '../../../../Constants/COLORS';

const Accordion = ({value, unoffical_dmc, parentHeighValue}) => {
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
    <>
      {value && (
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              if (heightValue.value === 0) {
                runOnUI(() => {
                  'worklet';
                  heightValue.value = withTiming(measure(listRef).height);
                  parentHeighValue.value = withTiming(
                    parentHeighValue.value + measure(listRef).height,
                  );
                })();
              } else {
                runOnUI(() => {
                  'worklet';
                  heightValue.value = withTiming(0);
                  parentHeighValue.value = withTiming(
                    parentHeighValue.value - measure(listRef).height,
                  );
                })();
              }
              open.value = !open.value;
            }}
            style={styles.titleContainer}>
            <Text style={styles.textTitle}>Semester {value.semester}</Text>
            <Chevron progress={progress} />
          </Pressable>
          <Animated.View style={heightAnimationStyle}>
            <Animated.View style={styles.contentContainer} ref={listRef}>
              <>
                {value?.sem_courses.map((val, ind) => {
                  return (
                    <NestedAccordion
                      value={val}
                      key={ind}
                      parentHeighValue={heightValue}
                    />
                  );
                })}
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      width: '100%',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text
                      style={{
                        color: COLORS.themeColor,
                        fontSize: windowHeight / 40,
                        // borderRightWidth: 1,
                      }}>
                      Total CrHrs
                    </Text>
                    <View
                      style={{
                        width: 1,
                        height: '100%',
                        backgroundColor: COLORS.black,
                      }}
                    />
                    <Text
                      style={{
                        color: COLORS.themeColor,
                        fontSize: windowHeight / 40,
                      }}>
                      Total Obt Marks
                    </Text>
                    <View
                      style={{
                        width: 1,
                        height: '100%',
                        backgroundColor: COLORS.black,
                      }}
                    />
                    <Text
                      style={{
                        color: COLORS.themeColor,
                        fontSize: windowHeight / 40,
                        // borderRightWidth: 1,
                      }}>
                      Total Marks
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      width: '100%',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: windowHeight / 40,
                        // borderRightWidth: 1,
                      }}>
                      {value?.total_cr == null ? 'N/A' : value?.total_cr}
                    </Text>
                    <View
                      style={{
                        width: 1,
                        height: '100%',
                        backgroundColor: COLORS.black,
                      }}
                    />
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: windowHeight / 40,
                        // borderRightWidth: 1,
                      }}>
                      {value?.total_obt_marks == null
                        ? 'N/A'
                        : value?.total_obt_marks}
                    </Text>
                    <View
                      style={{
                        width: 1,
                        height: '100%',
                        backgroundColor: COLORS.black,
                      }}
                    />
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: windowHeight / 40,
                        // borderRightWidth: 1,
                      }}>
                      {value?.total_marks_obt_from == null
                        ? 'N/A'
                        : value?.total_marks_obt_from}
                    </Text>
                  </View>
                </View>
              </>
            </Animated.View>
          </Animated.View>
        </View>
      )}
      {/* {unoffical_dmc && (
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              if (heightValue.value === 0) {
                runOnUI(() => {
                  'worklet';
                  heightValue.value = withTiming(measure(listRef).height);
                  parentHeighValue.value = withTiming(
                    parentHeighValue.value + measure(listRef).height,
                  );
                })();
              } else {
                runOnUI(() => {
                  'worklet';
                  heightValue.value = withTiming(0);
                  parentHeighValue.value = withTiming(
                    parentHeighValue.value - measure(listRef).height,
                  );
                })();
              }
              open.value = !open.value;
            }}
            style={styles.titleContainer}>
            <Text style={styles.textTitle}>Semester </Text>
            <Chevron progress={progress} />
          </Pressable>
        </View>
      )} */}
    </>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.themeColor,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.black,
    overflow: 'hidden',
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
    padding: 20,
    backgroundColor: COLORS.white,
  },
  textContent: {
    fontSize: 14,
    color: 'black',
  },
});
