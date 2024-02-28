import {
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, windowWidth, windowHeight} from '../../../../Constants/COLORS';
import {Divider} from 'react-native-paper';

const CommonCard = ({route}) => {
  const courses = route.params.courses;
  const renderAttendanceCard = ({item, index}) => {
    return (
      <View
        key={item.course_id}
        style={[
          styles.card,
          {
            backgroundColor: index % 2 === 0 ? COLORS.themeColor : COLORS.white,
          },
        ]}>
        <View style={styles.cardcol1}>
          <View
            style={[
              styles.ids,
              {
                borderRadius: 5,
                backgroundColor:
                  index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            <Text
              style={[
                styles.textsty,
                {
                  fontSize: windowWidth / 26,
                  textAlign: 'center',
                  color: index % 2 === 0 ? COLORS.TextthemeColor : COLORS.white,
                },
              ]}>
              Offer No: {}
            </Text>
            <Text
              style={[
                styles.textsty,
                {
                  fontSize: windowWidth / 26,
                  textAlign: 'center',
                  color: index % 2 === 0 ? COLORS.TextthemeColor : COLORS.white,
                },
              ]}>
              {item.offer_no}
            </Text>
          </View>
          <View
            style={[
              styles.ids,
              {
                borderRadius: 5,
              },
            ]}>
            <Text
              style={[
                styles.textsty,
                {
                  fontSize: windowWidth / 26,
                  textAlign: 'center',
                  color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
                },
              ]}>
              Course ID: {}
            </Text>
            <Text
              style={[
                styles.textsty,
                {
                  fontSize: windowWidth / 26,
                  textAlign: 'center',
                  color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
                },
              ]}>
              {item.course_id}
            </Text>
          </View>

          <Text
            style={[
              styles.textsty,
              {
                //   textAlign: 'center',
                color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            {item.course_title}
          </Text>
          <Text
            style={[
              styles.textsty,
              {
                fontWeight: 400,
                fontSize: windowWidth / 28,
                color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            {item.lecturer}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '55%',
            height: '100%',
            // backgroundColor: 'red',
            justifyContent: 'space-between',
          }}>
          <View style={[styles.cardcol2, {alignItems: 'center'}]}>
            <Text
              style={[
                styles.textsty,
                {
                  fontWeight: '400',
                  fontSize: windowWidth / 28,
                  color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
                },
              ]}>
              Credit Hours
            </Text>
            <Text
              style={[
                styles.textsty,
                {
                  paddingTop: windowWidth / 23,
                  fontSize: windowWidth / 11,
                  color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
                },
              ]}>
              {item.crhrs}
            </Text>
            <Text></Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '2%',
              height: '90%',
              borderColor: 'white',
              backgroundColor:
                index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
            }}
          />
          <View style={[styles.cardcol2, {}]}>
            <Text
              style={[
                styles.textsty,
                {
                  fontWeight: '400',
                  fontSize: windowWidth / 28,
                  color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
                },
              ]}>
              Amount
            </Text>
            <Text
              style={[
                styles.textsty,
                {
                  paddingTop: windowWidth / 20,
                  fontSize: windowWidth / 15,
                  color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
                },
              ]}>
              {item.amount}
            </Text>
            <Text></Text>
          </View>
        </View>
      </View>
    );
  };
  const renderListFooter = () => (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.greyish,
        // justifyContent: 'center',
        width: '100%',
        // height: '2%',
      }}>
      <Text style={{color: COLORS.white}}>Hello</Text>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <FlatList
        bounces={true}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        data={courses}
        keyExtractor={(item, index) => index}
        fadingEdgeLength={50}
        renderItem={renderAttendanceCard}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={() => {
          <View style={{}}>
            <Text style={{color: COLORS.TextthemeColor}}>
              No Courses registered
            </Text>
          </View>;
        }}
        ListFooterComponentStyle={{
          flexDirection: 'row',
        }}
      />
    </View>
  );
};

export default CommonCard;

const styles = StyleSheet.create({
  offerContainer: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  offerType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseContainer: {
    marginVertical: 5,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 24,
    width: '95%',
    // height: '30%',
    overflow: 'hidden',
    paddingVertical: windowWidth / 25,
    marginVertical: windowWidth / 60,
    // marginBottom: '1%',
    // paddingHorizontal: 25,
  },
  cardcol1: {
    flexDirection: 'column',
    width: '45%',
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
    width: '65%',
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
