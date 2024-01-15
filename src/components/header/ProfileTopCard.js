import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LogOut} from '../../Redux/Reducers/AuthReducer/AuthReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {showMessage} from 'react-native-flash-message';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../Constants/COLORS';
import {LogOutUserApi} from '../../Redux/Actions/AuthFunctions';

const ProfileTopCard = () => {
  const AuthState = useSelector(state => {
    return state.AuthReducer.UserDetail;
  });
  const TokenState = useSelector(state => {
    return state.AuthReducer.TokenId;
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const handleLogout = () => {
    setLoad(true);
    let data = {
      token: TokenState,
    };
    LogOutUserApi(data, dispatch, setLoad);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        height: '85%',
        width: '95%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 40,
      }}>
      {/* <TouchableOpacity
        style={{
          flexDirection: 'column',
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center',
          // borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          height: '100%',
        }}
        onPress={() => handleLogout()}>
        <SimpleLineIcons
          name="logout"
          size={25}
          iconStyle={{fontWeight: '900', marginRight: 0}}
        />
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          // marginHorizontal: '4%',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'flex-start',
              // alignItems: 'flex-start',
              borderRadius: 150,
              borderWidth: 12,
              // marginHorizontal: 10,
              marginRight: 10,
              marginLeft: 0,
              overflow: 'hidden',
              borderColor: COLORS.themeColor,
            }}>
            <Image
              source={require('../../assets/test.png')}
              style={{
                width: undefined,
                height: windowwidth / 6.5,
                aspectRatio: 1,
              }}
            />
          </View>
          <View
            style={
              {
                // marginHorizontal: '5%',
              }
            }>
            <Text style={styles.text}>{AuthState?.student_id}</Text>
            <Text style={styles.text}>{AuthState?.student_name}</Text>
            <Text style={styles.text}>
              {AuthState?.status ? AuthState.status : 'InActive'}
            </Text>
          </View>
        </View>
      </View>
      {/* <TouchableOpacity
        style={{
          flexDirection: 'column',
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderLeftWidth: 0.5,
          backgroundColor: COLORS.white,
          height: '100%',
        }}
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <Image
          source={require('../../assets/settingicon.png')}
          resizeMode="contain"
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default ProfileTopCard;

const windowwidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: windowwidth / 32,
  },
});
