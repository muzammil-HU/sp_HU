import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import TopCard from '../../../../components/reuseable/Cards/TopCards';
import DashboardCard from '../../../../components/reuseable/Cards/DashboardCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../../Constants/COLORS';

const BottomHome = () => {
  const width = Dimensions.get('window').width;
  const Dashcards = [
    {
      cardhead: 'Required Credit Hrs',
      carddesc: 'No of credit hours required for degree completion',
      cardvalue: '135',
      backgroundColor: COLORS.themeColor,
      color: COLORS.white,
      fontSize: width / 11,
    },
    {
      cardhead: 'Passed Credit Hrs',
      carddesc: 'No of credit hours required for degree completion',
      cardvalue: '8',
      backgroundColor: COLORS.white,
      color: COLORS.themeColor,
      fontSize: width / 11,
    },
    {
      cardhead: 'Degree Status',
      carddesc: 'Either student elgible for degree or not',
      cardvalue: 'Not Eligible For Degree (Incomplete)',
      backgroundColor: COLORS.themeColor,
      color: COLORS.white,
      fontSize: width / 23,
    },
  ];
  const cards = [
    {
      id: 1,
      head: 'Examination Schedule',
      // content: '3.50',
      Icon: {
        type: 'image',
        // IconComp: Ionicons,
        source: require('../../../../assets/dashicon.png'),
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
    },
    {
      id: 2,
      head: 'Classes Schedule',
      // content: '3.50',
      Icon: {
        type: 'icon',
        IconComp: Ionicons,
        iconName: 'stats-chart-outline',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
    },

    {
      id: 3,
      head: 'Register New Courses',
      // content: '3.50',
      Icon: {
        type: 'icon',
        IconComp: MaterialIcons,
        iconName: 'class',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
    },
    {
      id: 4,
      head: 'CGPA Excluding Fail Courses',
      content: '3.50',
      Icon: {
        type: 'icon',
        IconComp: Ionicons,
        iconName: 'stats-chart-outline',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
      // Icon: Entypo,
      // iconName: 'home',
      // iconColor: 'black',
      // iconSize: 26,
    },
    {
      id: 5,
      head: 'CGPA Including Fail Courses',
      content: '3.50',
      Icon: {
        type: 'icon',
        IconComp: Ionicons,
        iconName: 'stats-chart-outline',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
    },
    {
      id: 6,
      head: 'CGPA Including Fail Courses',
      content: '3.50',
      Icon: {
        type: 'icon',
        IconComp: Ionicons,
        iconName: 'stats-chart-outline',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
    },
    // {
    //   id: 6,
    //   head: 'CGPA Including Fail Courses',
    //   content: '3.50',
    //   Icon: {
    //     IconComp: Ionicons,
    //     iconName: 'stats-chart-outline',
    //     iconColor: 'black',
    //     iconSize: 26,
    //   },
    // },
  ];
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: '4%',
        paddingHorizontal: '2%',
        backgroundColor: COLORS.white,
      }}>
      <TopCard cards={cards} />
      <DashboardCard Dashcards={Dashcards} />
    </View>
  );
};

export default BottomHome;

const styles = StyleSheet.create({});
