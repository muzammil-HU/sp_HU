import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import clientapi from '../../api/clientapi';
import ScreenHead from '../reuseable/ScreenHead';
import Loader from '../reuseable/Modals/LoaderModal';
import {COLORS, windowWidth} from '../../Constants/COLORS';
import {showMessage} from 'react-native-flash-message';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import formatDate from '../../Constants/formatDate';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../Redux/Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';

const TransportRequestList = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(false);
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  useEffect(() => {
    const Transportlist = async () => {
      const params = {
        token: TokenState,
        student_id: studentId,
      };
      try {
        setLoad(true);
        const api = await clientapi.post(
          `/student/transport/request/history`,
          params,
        );
        if (
          api?.data?.success === false &&
          api?.data?.output?.response?.messages ===
            'Session expired Please Login Again'
        ) {
          dispatch(LoginUser(false));
          dispatch(TokenId(null));
          dispatch(UserDetail(null));
          dispatch(registered_courses(null));
          showMessage({
            message: 'Session expired Please Login Again',
            type: 'warning',
            position: 'top',
            // backgroundColor: COLORS.themeColor,
            color: COLORS.black,
            style: {justifyContent: 'center', alignItems: 'center'},
            icon: () => (
              <FontAwesome6
                name="circle-exclamation"
                size={windowWidth / 16}
                color={COLORS.black}
                style={{paddingRight: 20}}
              />
            ),
          });
          setLoad(false);
        } else {
          // console.log(api.data, 'api');
          setData(api?.data?.history_list);
          setLoad(false);
        }
        // setVal(api?.data?.due_payment[0]?.v_dues);
        // console.log(api?.data?.merged_array);
      } catch (error) {
        setLoad(false);
        showMessage({
          message: `500 Server Error`,
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
    Transportlist();
  }, []);
  const renderAttendanceCard = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item?.status === 'Pending') {
            Linking.openURL(
              `https://sp.hamdard.edu.pk/api/student/transport/req/vouchers/${item.voucher_no}/General`,
              // `${clientapi.defaults.baseURL}/transport/req/vouchers/${item.voucher_no}/General`,
            );
          } else {
            showMessage({
              message: 'Voucher has been paid.!',
              type: 'success',
              duration: 10000,
              position: 'top',
              backgroundColor: COLORS.themeColor,
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
          }}>
          <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
            Date: {formatDate(item.req_date)}
          </Text>
          <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
            Time: {item.req_time}
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
            <Text style={{color: COLORS.black}}>Location:</Text>
            <Text style={{color: COLORS.themeColor}}>
              {item?.location_name}
            </Text>
            <Text style={{color: COLORS.black}}>Request Type:</Text>
            <Text style={{color: COLORS.themeColor}}>{item?.req_type}</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '17.5%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                color: COLORS.themeColor,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Voucher Status
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              {item?.status}
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
              }}>
              {item.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
    <View style={styles.mainContainer}>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <FlatList
          bounces={true}
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index}
          fadingEdgeLength={50}
          renderItem={renderAttendanceCard}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={() => {
            <View style={{backgroundColor: COLORS.white}}>
              <Text style={{color: COLORS.TextthemeColor}}>No Data Found</Text>
            </View>;
          }}
          ListFooterComponentStyle={{
            flexDirection: 'row',
          }}
          style={{backgroundColor: COLORS.white}}
        />
      )}
    </View>
  );
};

export default TransportRequestList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    width: '95%',
    overflow: 'hidden',
    marginVertical: windowWidth / 60,
  },
});
