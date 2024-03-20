import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../Constants/COLORS';

const DashboardCard = ({Dashcards}) => {
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
                {fontWeight: 400, fontSize: width / 28, color: dc.color},
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
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: '50%',
    // backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 24,
    width: '100%',
    height: '30%',
    backgroundColor: COLORS.themeColor,
    // marginBottom: '1%',
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
    fontSize: width / 20,
    fontWeight: '700',
    // textAlignVertical: 'center',
    // textAlign: 'center',
  },
});
export default DashboardCard;
