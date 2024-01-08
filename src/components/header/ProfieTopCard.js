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

const ProfieTopCard = () => {
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
    // try {
    //   setLoad(true);
    //   let data = {
    //     TokenState,
    //   };
    //   LogOutUserApi(data, dispatch, setLoad);
    // } catch (error) {
    //   console.log(error.message);
    //   showMessage({
    //     message: 'error',
    //     type: 'danger',
    //     style: {justifyContent: 'center', alignItems: 'center'},
    //     icon: () => (
    //       <MaterialIcons
    //         name="error-outline"
    //         size={windowwidth / 16}
    //         color={COLORS.white}
    //         style={{paddingRight: 20}}
    //       />
    //     ),
    //   });
    // }
    dispatch(LogOut([]));
    showMessage({
      message: 'Logged out Sucessfully',
      type: 'success',
      position: 'top',
      backgroundColor: COLORS.themeColor,
      color: COLORS.white,
      style: {justifyContent: 'center', alignItems: 'center'},
      icon: () => (
        <FontAwesome6
          name="check-circle"
          size={windowwidth / 16}
          color={COLORS.white}
          style={{paddingRight: 20}}
        />
      ),
    });
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        height: '70%',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
      }}>
      <TouchableOpacity
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
        onPress={() => {
          handleLogout();
        }}>
        <SimpleLineIcons
          name="logout"
          size={25}
          iconStyle={{fontWeight: '900', marginRight: 0}}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'column',
          width: '60%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginHorizontal: '2%',
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
              borderWidth: 10,
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
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};

export default ProfieTopCard;

const windowwidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: windowwidth / 32,
  },
});
