import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import clientapi from '../../../../../../api/clientapi';
import {COLORS, windowWidth} from '../../../../../../Constants/COLORS';
import ScreenHead from '../../../../../../components/reuseable/ScreenHead';
import Loader from '../../../../../../components/reuseable/Modals/LoaderModal';
import formatDate from '../../../../../../Constants/formatDate';
import {showMessage} from 'react-native-flash-message';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const CourseEvaluation = () => {
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  const navigation = useNavigation();

  const [courseEvaluation, setCourseEvaluation] = useState(null);
  const [load, setLoad] = useState(false);
  const [note, setNote] = useState(null);
  const [note2, setNote2] = useState(null);
  const [offer_type, setOffer_type] = useState(null);

  useEffect(() => {
    setNote(
      'You can start course evaluation. You can not start evaluation before Evaluation Start From Date. All your comments are very valuable for high authority without disclosing your identity.',
    );
    setNote2(
      'Your proper evaluation and comments is very valuable because it will help the organization to improve and grow and keep the quality level high.',
    );
    const params = {
      token: TokenState,
      student_id: studentId,
    };
    const course_Evaluation = async () => {
      try {
        setLoad(true);
        const api = await clientapi.get(`/student/course/evaluation`, {params});
        // console.log(api?.data?.course_evaluation, 'llll');
        setCourseEvaluation(api?.data?.course_evaluation);
        setOffer_type(api?.data?.offer_type);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        showMessage({
          message: `500 Server Error444`,
          type: 'danger',
          position: 'top',
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <Entypo
              name="circle-with-cross"
              size={windowWidth / 16}
              color={COLORS.white}
              style={{paddingRight: 20}}
            />
          ),
        });
      }
    };
    course_Evaluation();
  }, []);
  // console.log(courseEvaluation, 'couuu');
  // const renderAttendanceCard = ({item, index}) => {
  //   return (
  //     <TouchableOpacity
  //       // disabled={item?.status === 'Completed' ? true : false}
  //       onPress={() => {
  //         if (item?.status === 'Incompleted') {
  //           // navigat
  //           console.log('Incompleted');
  //         } else {
  //           console.log('Completed');
  //           showMessage({
  //             message: 'Evaluation has already been submitted.!',
  //             type: 'warning',
  //             duration: 10000,
  //             position: 'top',
  //             // backgroundColor: COLORS.themeColor,
  //             color: COLORS.white,
  //             style: {justifyContent: 'center', alignItems: 'center'},
  //             icon: () => (
  //               <FontAwesome6
  //                 name="check-circle"
  //                 size={windowWidth / 16}
  //                 color={COLORS.white}
  //                 style={{paddingRight: 20}}
  //               />
  //             ),
  //           });
  //         }
  //       }}
  //       key={item.id}
  //       style={[
  //         styles.card,
  //         {
  //           backgroundColor: COLORS.white,
  //           borderWidth: 1,
  //           borderColor: COLORS.themeColor,
  //         },
  //       ]}>
  //       {/* Heading */}
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           backgroundColor: COLORS.themeColor,
  //           width: '100%',
  //           justifyContent: 'space-between',
  //           borderRadius: 5,
  //           paddingHorizontal: '2%',
  //           paddingVertical: '2%',
  //         }}>
  //         <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
  //           Start Date: {formatDate(item?.evaluation_from)}
  //         </Text>
  //         <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
  //           Offer No: {item?.offer_no}
  //         </Text>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           width: '100%',
  //           justifyContent: 'space-between',
  //           paddingVertical: '2%',
  //           backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.greyshade,
  //         }}>
  //         <View
  //           style={{
  //             flexDirection: 'column',
  //             width: '64%',
  //             paddingLeft: '2%',
  //           }}>
  //           <Text style={{color: COLORS.black}}>Course Title:</Text>
  //           <Text style={{color: COLORS.themeColor}}>{item?.course_title}</Text>
  //           <Text style={{color: COLORS.black}}>Teacher:</Text>
  //           <Text style={{color: COLORS.themeColor}}>{item?.lecturer}</Text>
  //         </View>
  //         <View
  //           style={{
  //             flexDirection: 'column',
  //             width: '35%',
  //             alignItems: 'center',
  //             justifyContent: 'space-evenly',
  //           }}>
  //           <Text
  //             style={{
  //               color: COLORS.themeColor,
  //               fontWeight: 'bold',
  //               textAlign: 'center',
  //             }}>
  //             Status
  //           </Text>
  //           <Text
  //             style={{
  //               color: COLORS.black,
  //               fontWeight: 'bold',
  //             }}>
  //             {item?.status}
  //           </Text>
  //         </View>
  //         {/* <View
  //           style={{
  //             flexDirection: 'column',
  //             width: '1%',
  //             backgroundColor: COLORS.themeColor,
  //           }}
  //         />
  //         <View
  //           style={{
  //             flexDirection: 'column',
  //             width: '17.5%',
  //             alignItems: 'center',
  //             justifyContent: 'space-evenly',
  //           }}>
  //           <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
  //             Amount
  //           </Text>
  //           <Text
  //             style={{
  //               color: COLORS.black,
  //               fontWeight: 'bold',
  //             }}>
  //             {item.amount}
  //           </Text>
  //         </View> */}
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  const groupByOfferType = data => {
    return data.reduce((acc, item) => {
      const {offer_type} = item;
      if (!acc[offer_type]) {
        acc[offer_type] = [];
      }
      acc[offer_type].push(item);
      return acc;
    }, {});
  };
  // const course_evaluation_form = async () => {
  //   setLoad(true);
  //   try {
  //     const params = {
  //       token: TokenState,
  //       student_id: studentId,
  //     };
  //     const api = await clientapi.get(
  //       '/student/course/evaluation/form',
  //       params,
  //     );
  //     // console.log(api);
  //     setLoad(false);
  //   } catch (error) {
  //     showMessage({
  //       message: `500 Server Error`,
  //       type: 'danger',
  //       position: 'top',
  //       style: {justifyContent: 'center', alignItems: 'center'},
  //       icon: () => (
  //         <Entypo
  //           name="circle-with-cross"
  //           size={windowWidth / 16}
  //           color={COLORS.white}
  //           style={{paddingRight: 20}}
  //         />
  //       ),
  //     });
  //   }
  // };
  const renderCourseCard = ({item, index}) => {
    return (
      <TouchableOpacity
        disabled={item?.status === 'Completed'}
        onPress={() => {
          if (item?.status === 'Incompleted') {
            // console.log('Incompleted');
            navigation.navigate('Course Eva', {item: item});
          } else {
            // console.log('Completed');
            showMessage({
              message: 'Voucher has been paid.!',
              type: 'warning',
              duration: 10000,
              position: 'top',
              // backgroundColor: COLORS.themeColor,
              color: COLORS.white,
              style: {justifyContent: 'center', alignItems: 'center'},
              icon: () => (
                <FontAwesome6
                  name="check-circle"
                  size={windowWidth / 16}
                  color={COLORS.white}
                  style={{paddingRight: 20}}
                />
              ),
            });
          }
        }}
        key={item.id}
        style={[
          styles.card,
          {
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderColor: COLORS.themeColor,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.themeColor,
            width: '100%',
            justifyContent: 'space-between',
            borderRadius: 5,
            paddingHorizontal: '2%',
            paddingVertical: '2%',
          }}>
          <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
            Start Date: {formatDate(item?.evaluation_from)}
          </Text>
          <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
            Offer No: {item?.offer_no}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingVertical: '2%',
            backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.greyshade,
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: '64%',
              paddingLeft: '2%',
            }}>
            <Text style={{color: COLORS.black}}>Course Title:</Text>
            <Text style={{color: COLORS.themeColor}}>{item?.course_title}</Text>
            <Text style={{color: COLORS.black}}>Teacher:</Text>
            <Text style={{color: COLORS.themeColor}}>{item?.lecturer}</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '35%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                color: COLORS.themeColor,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Status
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              {item?.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOfferType = ({item}) => {
    // console.log(item, 'isaosookaok');
    return (
      <>
        <View style={styles.offerTypeContainer}>
          <Text style={styles.offerTypeTitle}>{item.offer_type}</Text>
        </View>
        <FlatList
          data={item.courses}
          keyExtractor={(course, index) => index.toString()}
          renderItem={renderCourseCard}
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
          }}
          ListEmptyComponent={() => (
            <View style={{backgroundColor: COLORS.white}}>
              <Text style={{color: COLORS.TextthemeColor}}>No Data Found</Text>
            </View>
          )}
          ListFooterComponentStyle={{flexDirection: 'row'}}
        />
      </>
    );
  };

  const groupedData = groupByOfferType(courseEvaluation || []);
  const dataArray = Object.keys(groupedData).map(offerType => ({
    offer_type: offerType,
    courses: groupedData[offerType],
  }));
  // console.log(courseEvaluation, 'CourseEvaluation');
  return (
    <View style={styles.mainContainer}>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <>
          <ScreenHead
            heading={'Course Evaluation'}
            NoteVisibility={true}
            load={load}
            setLoad={setLoad}
            Note={note}
            Note2={note2}
            listHeader={false}
          />
          <View
            style={{
              width: '95%',
              height: '0.1%',
              backgroundColor: COLORS.black,
            }}
          />
          <FlatList
            bounces={true}
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            data={dataArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderOfferType}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={() => (
              <View style={{backgroundColor: COLORS.white}}>
                <Text style={{color: COLORS.TextthemeColor}}>
                  No Data Found
                </Text>
              </View>
            )}
            ListFooterComponentStyle={{
              flexDirection: 'row',
            }}
            style={{backgroundColor: COLORS.white}}
          />
        </>
      )}
    </View>
  );
};

export default CourseEvaluation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    flexDirection: 'column',
    borderRadius: 10,
    elevation: 24,
    width: '98%',
    overflow: 'hidden',
    marginVertical: windowWidth / 60,
    alignSelf: 'center',
  },
  offerTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerTypeTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
