import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, windowHeight, windowWidth} from '../../../Constants/COLORS';
import {useSelector} from 'react-redux';

const Grading_Table = () => {
  const dataheads = {
    min_grade: 'Minimum Marks',
    max_grade: 'Maximum Marks',
    grade: 'grade',
    gpa: 'gpa',
  };
  const grading_criteria = useSelector(state => {
    return state.GlobalStatesReducer.grading_criteria;
  });

  return (
    <ScrollView style={styles.table}>
      <View style={[styles.tableRow, styles.headerRow]}>
        {Object.values(dataheads).map((heading, index) => (
          <Text key={index} style={styles.headerCell}>
            {heading.toUpperCase()}
          </Text>
        ))}
      </View>
      {grading_criteria.map((gc, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cell}>{gc.min_grade}</Text>
          <Text style={styles.cell}>{gc.max_grade}</Text>
          <Text style={styles.cell}>{gc.grade}</Text>
          <Text style={styles.cell}>{gc.gpa}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Grading_Table;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingtext: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
    textDecorationColor: COLORS.themeColor,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: windowHeight / 55,
  },
  headerRow: {
    backgroundColor: COLORS.headbg,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.black,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.black,
    fontWeight: 'normal',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: COLORS.black,
  },
});
