import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';

const ContactUsCards = ({cards}) => {
  const renderAttendanceCard = ({item, index}) => (
    <TouchableOpacity
      disabled={true}
      key={index}
      // onPress={() => {}}
      style={[
        styles.card,
        {
          backgroundColor: index % 2 === 0 ? COLORS.themeColor : COLORS.white,
          borderColor: index % 2 === 0 ? COLORS.white : COLORS.themeColor,
          borderWidth: 1,
          marginVertical: 10,
        },
      ]}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          // alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.themeColor,
            paddingHorizontal: '2%',
            borderRadius: 5,
          }}>
          <Text
            style={{
              backgroundColor:
                index % 2 === 0 ? COLORS.white : COLORS.themeColor,
              borderRadius: 5,
              paddingHorizontal: '1%',
              color: index % 2 === 0 ? COLORS.themeColor : COLORS.white,
              fontSize: windowWidth / 25,
            }}>
            {item.head}
            {' : '}
            {item.campus_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.themeColor,
            paddingHorizontal: '2%',
            borderRadius: 5,
          }}>
          <Text
            style={{color: index % 2 === 0 ? COLORS.white : COLORS.themeColor}}>
            {'Address'}
            {' : '}
            {item.Address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.themeColor,
            paddingHorizontal: '2%',
            borderRadius: 5,
          }}>
          <Text
            style={{color: index % 2 === 0 ? COLORS.white : COLORS.themeColor}}>
            {'Phone'}
            {' : '}
            {item.Phone}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '2%',
            borderRadius: 5,
          }}>
          <Text
            style={{color: index % 2 === 0 ? COLORS.white : COLORS.themeColor}}>
            {'Web'}
            {' : '}
            {item.Web}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '2%',
            borderRadius: 5,
          }}>
          <Text
            style={{color: index % 2 === 0 ? COLORS.white : COLORS.themeColor}}>
            {'Fax'}
            {' : '}
            {item.Fax}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '2%',
            borderRadius: 5,
          }}>
          <Text
            style={{color: index % 2 === 0 ? COLORS.white : COLORS.themeColor}}>
            {'Email'}
            {' : '}
            {item.Email}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{flexDirection: 'column'}}>
      <FlatList
        bounces={true}
        alwaysBounceVertical={true}
        data={cards}
        keyExtractor={(item, index) => index}
        renderItem={renderAttendanceCard}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <View
            style={{
              // flexDirection: 'column',
              height: '100%',
              width: '100%',
              // justifyContent: 'center',
              paddingTop: '10%',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            <Text
              style={{color: COLORS.themeColor, fontSize: windowWidth / 22}}>
              No Data Found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ContactUsCards;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
    elevation: 24,
    width: '100%',
    // height: '30%',
    overflow: 'hidden',
    paddingVertical: windowWidth / 15,
    // marginVertical: windowWidth / 60,
    // marginBottom: '1%',
    // paddingHorizontal: 25,
  },
  cardcol1: {
    flexDirection: 'column',
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    // paddingLeft: '8%',
  },
  cardcol2: {
    flexDirection: 'column',
    width: '45%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  textsty: {
    fontSize: windowWidth / 20,
    fontWeight: '700',
    flexWrap: 'wrap',
    // textAlignVertical: 'center',
    // textAlign: 'center',
  },
  ids: {
    flexDirection: 'row',
    // width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '12%',
    backgroundColor: 'white',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    columnGap: 20,
  },
});
