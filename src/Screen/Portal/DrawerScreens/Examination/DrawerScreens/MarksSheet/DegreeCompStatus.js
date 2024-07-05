import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {COLORS, windowWidth} from '../../../../../../Constants/COLORS';
import DashboardCard from '../../../../../../components/reuseable/Cards/DashboardCard';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DegreeCompStatus = () => {
  const AuthState = useSelector(state => {
    return state?.AuthReducer.UserDetail;
  });
  const Dashcards = [
    {
      cardhead: 'Required Credit Hrs',
      carddesc: 'No of credit hours required for degree completion',
      cardvalue: AuthState?.req_cr_hour[0]?.alert_action || 'NA',
      backgroundColor: COLORS.themeColor,
      color: COLORS.white,
      fontSize: windowWidth / 11,
      // onPress: () => {
      //   // console.log('onpress');
      //   setLoad(true);
      //   // return <Loader load={load} setLoad={setLoad} />;
      // },
    },
    {
      cardhead: 'Passed Credit Hrs',
      carddesc: 'No of credit hours required for degree completion',
      cardvalue: AuthState?.req_cr_hour[1]?.alert_action || 'NA',
      backgroundColor: COLORS.white,
      color: COLORS.themeColor,
      fontSize: windowWidth / 11,
    },
    {
      cardhead: 'Degree Status',
      carddesc: 'Either student elgible for degree or not',
      cardvalue: AuthState?.req_cr_hour[2]?.alert_action || 'NA',
      backgroundColor: COLORS.themeColor,
      color: COLORS.white,
      fontSize: windowWidth / 23,
    },
  ];
  return (
    <View style={styles.container}>
      {Dashcards.map(dc => (
        <TouchableOpacity
          disabled={true}
          key={dc.cardhead}
          onPress={dc.onPress}
          style={[styles.card, {backgroundColor: dc.backgroundColor}]}>
          <View style={styles.cardcol1}>
            <Text style={[styles.textsty, {color: dc.color}]}>
              {dc.cardhead}
            </Text>
            <Text
              style={[
                styles.textsty,
                {fontWeight: 400, fontSize: windowWidth / 28, color: dc.color},
              ]}>
              {dc.carddesc}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '1%',
              height: '80%',
              backgroundColor: dc.color,
            }}
          />
          <View style={styles.cardcol2}>
            <Text
              style={[
                styles.textsty,
                {fontSize: dc.fontSize, color: dc.color},
              ]}>
              {dc.cardvalue}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DegreeCompStatus;

const styles = StyleSheet.create({
  container: {
    // height: '50%',
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 24,
    width: '95%',
    paddingVertical: '16%',
    backgroundColor: COLORS.themeColor,
  },
  cardcol1: {
    flexDirection: 'column',
    width: '65%',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: '8%',
  },
  cardcol2: {
    flexDirection: 'column',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textsty: {
    color: COLORS.white,
    fontSize: windowWidth / 20,
    fontWeight: '700',
    // textAlignVertical: 'center',
    // textAlign: 'center',
  },
});
