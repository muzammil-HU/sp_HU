import {showMessage} from 'react-native-flash-message';
import clientapi from '../../../api/clientapi';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dimensions, PermissionsAndroid} from 'react-native';
import {COLORS} from '../../../Constants/COLORS';
import WifiInfo from 'react-native-wifi-reborn';
import {
  WifiName,
  isConnected,
} from '../../Reducers/GlobalStatesReducer/GlobalStatesReducer';
import NetInfo from '@react-native-community/netinfo';
const windowwidth = Dimensions.get('window').width;

const getwifiname = async (dispatch, setLoad) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message: 'This app needs location permission as this is required  ',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // const unsubscribe = NetInfo.addEventListener(state => {
      //   dispatch(isConnected(state.isConnected));
      //   dispatch(WifiName(state?.details?.ssid));
      // });
      const state = await NetInfo.fetch();
      dispatch(isConnected(state.isConnected));
      dispatch(WifiName(state?.details?.ssid));
      setLoad(false);
    } else {
      console.log('denied');
      setLoad(false);
    }
  } catch (error) {
    console.log(error, 'error');
    showMessage({
      message: '500 Server Error',
      type: 'danger',
      // backgroundColor: ,
      color: COLORS.white,
      style: {justifyContent: 'center', alignItems: 'center'},
      icon: () => (
        <MaterialIcons
          name="error-outline"
          size={windowwidth / 16}
          color={COLORS.white}
          style={{paddingRight: 20}}
        />
      ),
    });
  }
};

export {getwifiname};
