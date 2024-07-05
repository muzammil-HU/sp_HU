import {
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth, windowHeight} from '../../../../Constants/COLORS';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

const CommonCard = ({route}) => {
  const courses = route?.params?.courses;
  const sem = route?.name;
  const sem_total_crHrs = route?.params?.sem_total_crHrs;
  const sem_total_amount = route?.params?.sem_total_amount;
  const [total, setTotal] = useState([]);

  const All_courses = useSelector(state => {
    return state?.GlobalStatesReducer?.registered_courses;
  });

  useEffect(() => {
    if (route.name === 'Total') {
      const extractedData = Object.keys(All_courses)
        .filter(key => key !== 'total_all_c' && key !== 'total_all_amount')
        .map(key => {
          const {offer_type, total_cr, total_amount} = All_courses[key];
          return {offer_type, total_cr, total_amount};
        });
      setTotal(extractedData);
      // console.log(total, 'total');
    }
  }, []);
  const renderAttendanceCard = ({item, index}) => {
    return (
      <>
        {route.name === 'Total' ? (
          <View
            key={item.offer_type}
            style={[
              styles.card,
              {
                borderColor: COLORS.themeColor,
                borderWidth: 1,
                // backgroundColor:
                //   index % 2 === 0 ? COLORS.themeColor : COLORS.white,
              },
            ]}>
            {/* Heading */}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: '8%',
                // height: '50%',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: COLORS.white,
                  width: '64%',
                  paddingLeft: '2%',
                }}>
                <Text
                  style={{
                    color: COLORS.themeColor,
                    fontWeight: 'bold',
                    fontSize: windowHeight / 45,
                  }}>
                  {item.offer_type}
                </Text>
                <Text style={{color: COLORS.themeColor}}>
                  Total Credit Hours & Amount
                </Text>
                {/* <Text style={{color: COLORS.themeColor}}>{item.total_cr}</Text> */}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: COLORS.white,
                  width: '17.5%',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                  Cr Hrs
                </Text>
                {/* <Text
                  style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    // paddingVertical: '18%',
                    // backgroundColor: COLORS.blue,
                    // textAlignVertical: 'center',
                  }}>
                  {item.crhrs}
                </Text> */}
                <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                  {item.total_cr}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '1%',
                  backgroundColor: COLORS.themeColor,
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: COLORS.white,
                  width: '17.5%',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                  Amount
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    // paddingVertical: '18%',
                    // backgroundColor: COLORS.blue,
                    // textAlignVertical: 'center',
                  }}>
                  {item.total_amount}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            key={item.offer_type}
            style={[
              styles.card,
              {
                backgroundColor: COLORS.white,
                //   index % 2 === 0 ? COLORS.themeColor : COLORS.greenshade,
                borderWidth: 1,
                borderColor: COLORS.themeColor,
              },
            ]}>
            {/* Heading */}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: COLORS.themeColor,
                width: '100%',
                justifyContent: 'space-between',
                borderRadius: 5,
                paddingHorizontal: '2%',
                paddingVertical: '2%',
                // height: '5%',
              }}>
              {/* <Text style={{color: COLORS.white}}>
                Offer Type:{item.offer_type}
              </Text> */}
              <Text style={{color: COLORS.white}}>
                Offer ID:{item.offer_id}
              </Text>
              <Text style={{color: COLORS.white}}>
                Course ID:{item.course_id}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: COLORS.white,
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: '2%', //trying
                backgroundColor:
                  index % 2 === 0 ? COLORS.white : COLORS.greyshade,
                // borderRadius: 5,
                // paddingHorizontal: '2%',
                // paddingVertical: '2%',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  // backgroundColor: COLORS.white,
                  width: '64%',
                  paddingLeft: '2%',
                }}>
                <Text style={{color: COLORS.black}}>Course Title</Text>
                <Text style={{color: COLORS.themeColor}}>
                  {item.course_title}
                </Text>
                <Text style={{color: COLORS.themeColor}}>{item.lecturer}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  // backgroundColor: COLORS.white,
                  width: '17.5%',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                  Cr Hrs
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    // paddingVertical: '18%',
                    // backgroundColor: COLORS.blue,
                    // textAlignVertical: 'center',
                  }}>
                  {item.crhrs}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '1%',
                  backgroundColor: COLORS.themeColor,
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  // backgroundColor: COLORS.white,
                  width: '17.5%',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                  Amount
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    // paddingVertical: '18%',
                    // backgroundColor: COLORS.blue,
                    // textAlignVertical: 'center',
                  }}>
                  {item.amount}
                </Text>
              </View>
            </View>
          </View>
        )}
      </>
    );
  };
  const renderListFooter = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.themeColor,
          width: '96%',
          height: windowHeight / 10,
          borderRadius: 5,
          marginBottom: '2%',
          paddingHorizontal: '2%',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            width: '49%',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: windowWidth / 23, color: COLORS.white}}>
            {sem}
          </Text>
          <Text style={{color: COLORS.white}}>
            Total Credit Hours and Amount
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            width: '25%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: windowWidth / 30, color: COLORS.white}}>
            Total Cr Hrs
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 25,
              color: COLORS.white,
              textAlign: 'center',
            }}>
            {sem_total_crHrs}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '1%',
            marginVertical: '1%',
            backgroundColor: COLORS.white,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            width: '25%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: COLORS.white,
              textAlign: 'center',
            }}>
            Total Amount
          </Text>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'center',
              fontSize: windowWidth / 25,
            }}>
            {sem_total_amount}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <FlatList
        bounces={true}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        data={route.name === 'Total' ? total : courses}
        keyExtractor={(item, index) => index}
        fadingEdgeLength={50}
        renderItem={renderAttendanceCard}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={() => {
          <View style={{backgroundColor: COLORS.white}}>
            <Text style={{color: COLORS.TextthemeColor}}>
              No Courses registered
            </Text>
          </View>;
        }}
        ListFooterComponentStyle={{
          flexDirection: 'row',
        }}
        style={{backgroundColor: COLORS.white}}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    flexDirection: 'column',
    borderRadius: 10,
    elevation: 24,
    // backgroundColor: 'blue',
    width: '95%',
    overflow: 'hidden',
    marginVertical: windowWidth / 60,
  },
  cardcol1: {
    flexDirection: 'column',
    width: '45%',
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
    backgroundColor: COLORS.white,
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

{
  /* <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.themeColor,
            width: '100%',
            justifyContent: 'space-between',
            borderRadius: 5,
            paddingHorizontal: '2%',
            paddingVertical: '2%',
            // height: '5%',
          }}>
          <Text style={{color: COLORS.white}}>
            Offer Type:{item.offer_type}
          </Text>
          <Text style={{color: COLORS.white}}>Offer ID:{item.offer_id}</Text>
          <Text style={{color: COLORS.white}}>Course ID:{item.course_id}</Text>
        </View> */
}
{
  /* <View style={styles.cardcol1}>
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
        </View> */
}
