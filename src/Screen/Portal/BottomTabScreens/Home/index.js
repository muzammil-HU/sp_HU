import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopCard from '../../../../components/reuseable/Cards/TopCards';
import DashboardCard from '../../../../components/reuseable/Cards/DashboardCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../../Constants/COLORS';
import {useDispatch, useSelector} from 'react-redux';
import WifiInfo from 'react-native-wifi-reborn';
import {
  getregisteredCourses,
  getwifiname,
} from '../../../../Redux/Actions/GlobalStatesFunctions';
import Loader from '../../../../components/reuseable/Modals/LoaderModal';
import {useNavigation} from '@react-navigation/native';

const BottomHome = () => {
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const AuthState = useSelector(state => {
    return state?.AuthReducer.UserDetail;
  });
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  // console.log(TokenId, 'TokenId');
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  useEffect(() => {
    const params = {
      token: TokenState,
      student_id: studentId,
    };
    setLoad(true);
    getregisteredCourses(setLoad, dispatch, params);
  }, []);
  const Dashcards1 = [
    {
      cardhead: 'Required Credit Hrs',
      carddesc: 'No of credit hours required for degree completion',
      cardvalue: AuthState?.req_cr_hour[0]?.alert_action || 'NA',
      backgroundColor: COLORS.themeColor,
      color: COLORS.white,
      fontSize: width / 11,
      onPress: () => {
        // console.log('onpress');
        setLoad(true);
        // return <Loader load={load} setLoad={setLoad} />;
      },
    },
    {
      cardhead: 'Passed Credit Hrs',
      carddesc: 'No of credit hours required for degree completion',
      cardvalue: AuthState?.req_cr_hour[1]?.alert_action || 'NA',
      backgroundColor: COLORS.white,
      color: COLORS.themeColor,
      fontSize: width / 11,
    },
    {
      cardhead: 'Degree Status',
      carddesc: 'Either student elgible for degree or not',
      cardvalue: AuthState?.req_cr_hour[2]?.alert_action || 'NA',
      backgroundColor: COLORS.themeColor,
      color: COLORS.white,
      fontSize: width / 23,
    },
  ];
  const DynaimcCards = [
    {
      head: 'CGPA Including Fail Courses',
      content: AuthState.cgpa_including[0]?.value || 'NA',
      Icon: {
        type: 'icon',
        IconComp: Ionicons,
        iconName: 'stats-chart-outline',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
    },
    {
      head: 'CGPA excluding Fail Courses',
      content: AuthState.cgpa_including[1]?.value || 'NA',
      Icon: {
        type: 'icon',
        IconComp: Ionicons,
        iconName: 'stats-chart-outline',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
    },
  ];

  const cards = [
    {
      head: 'Attendence Mark',
      Icon: {
        type: 'image',
        source: require('../../../../assets/dashicon.png'),
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
      onPress: {},
    },
    {
      head: 'Examination Schedule',
      Icon: {
        type: 'image',
        source: require('../../../../assets/dashicon.png'),
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
      onPress: () => {
        navigation.navigate('Examination-Schedule');
      },
    },
    {
      head: 'Classes Schedule',
      Icon: {
        type: 'icon',
        IconComp: Ionicons,
        iconName: 'stats-chart-outline',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
      onPress: () => {
        navigation.navigate('Classes Schedule');
      },
    },
    {
      head: 'Register New Courses',
      Icon: {
        type: 'icon',
        IconComp: MaterialIcons,
        iconName: 'class',
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
      },
      onPress: () => {
        navigation.navigate('Register New Course');
      },
    },
  ];

  useEffect(() => {
    getwifiname(dispatch, setLoad);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        overflow: 'scroll',
      }}
      style={{
        flex: 1,
        paddingHorizontal: '2%',
        backgroundColor: COLORS.white,
      }}>
      <TopCard cards={cards} DynaimcCards={DynaimcCards} />
      <DashboardCard Dashcards={Dashcards1} />
      <Loader load={load} setLoad={setLoad} />
    </ScrollView>
  );
};

export default BottomHome;

const styles = StyleSheet.create({
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.6)',
  // },
  // modalView: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   height: '32%',
  //   backgroundColor: 'white',
  //   borderBottomLeftRadius: 10,
  //   borderBottomRightRadius: 10,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  //   columnGap: 20,
  // },
});

{
  /* <Button title="click" onPress={() => setLoad(true)} />
      <View style={{}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={load}
          onRequestClose={() => {
            setLoad(!load);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <ActivityIndicator size="large" color={COLORS.themeColor} />
              <Text style={{color: COLORS.themeColor}}>Loading...</Text>
              <Button title="click" onPress={() => setLoad(false)} />
            </View>
          </View>
        </Modal>
      </View> */
}

// const getwifiname = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location permission is required for WiFi connections',
//         message:
//           'This app needs location permission as this is required  ' +
//           'to scan for wifi networks.',
//         buttonNegative: 'DENY',
//         buttonPositive: 'ALLOW',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       // You can now use react-native-wifi-reborn
//       console.log('granted');
//       const wifi = await WifiInfo.getCurrentWifiSSID();
//       setWifiName(wifi);
//       console.log(wifi, 'wifi');
//     } else {
//       // Permission denied
//       console.log('denied');
//     }
//   } catch (error) {
//     console.log(error, 'error');
//     showMessage({
//       message: '500 Server Error',
//       type: 'danger',
//       // backgroundColor: ,
//       color: COLORS.white,
//       style: {justifyContent: 'center', alignItems: 'center'},
//       icon: () => (
//         <MaterialIcons
//           name="error-outline"
//           size={windowwidth / 16}
//           color={COLORS.white}
//           style={{paddingRight: 20}}
//         />
//       ),
//     });
//   }
// };
