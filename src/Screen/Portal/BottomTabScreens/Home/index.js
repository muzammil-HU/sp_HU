import {
  Dimensions,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopCard from '../../../../components/reuseable/Cards/TopCards';
import DashboardCard from '../../../../components/reuseable/Cards/DashboardCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../../Constants/COLORS';
import {useDispatch, useSelector} from 'react-redux';
import WifiInfo from 'react-native-wifi-reborn';
import {getwifiname} from '../../../../Redux/Actions/GlobalStatesFunctions';

const BottomHome = () => {
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const AuthState = useSelector(state => {
    return state?.AuthReducer.UserDetail;
  });

  const Dashcards1 = [
    {
      cardhead: 'Required Credit Hrs',
      carddesc: 'No of credit hours required for degree completion',
      cardvalue: AuthState?.req_cr_hour[0]?.alert_action || 'NA',
      backgroundColor: COLORS.themeColor,
      color: COLORS.white,
      fontSize: width / 11,
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
      head: AuthState.cgpa_including[0]?.label || 'NA',
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
      head: AuthState.cgpa_including[1]?.label || 'NA',
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
    },
    {
      head: 'Examination Schedule',
      Icon: {
        type: 'image',
        source: require('../../../../assets/dashicon.png'),
        iconColor: COLORS.themeColor,
        iconSize: width / 15,
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
    },
  ];

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
        // paddingVertical: '4%',
        paddingHorizontal: '2%',
        backgroundColor: COLORS.white,
      }}>
      <TopCard cards={cards} DynaimcCards={DynaimcCards} />
      <DashboardCard Dashcards={Dashcards1} />
    </ScrollView>
  );
};

export default BottomHome;

const styles = StyleSheet.create({});
