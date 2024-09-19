import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ToastAndroid,
  Dimensions,
  ImageBackground,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import InputText from '../../components/reuseable/InputText';
import apiInstance from '../../api/clientapi';
import axios from 'axios';
import clientapi from '../../api/clientapi';
import {showMessage, hideMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {LoginUserApi} from '../../Redux/Actions/AuthFunctions';
import {COLORS, windowWidth} from '../../Constants/COLORS';
import Loader from '../../components/reuseable/Modals/LoaderModal';

const Login = () => {
  const passwordInputRef = useRef(null);
  const [studentId, setStudentId] = useState();
  const [password, setPassword] = useState();
  const [isStuIdFocused, setIsStuIdFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const windowwidth = Dimensions.get('window').width;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const UID = useSelector(state => {
    return state?.AuthReducer.UniqueDeviceId;
  });
  const T = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const ipAddress = useSelector(state => {
    return state?.AuthReducer.ipAddress;
  });

  const DN = useSelector(state => {
    return state?.AuthReducer.UniqueName;
  });
  const handleStuIdChange = text => {
    const numericValue = text.replace(/[^0-9-]/g, '');
    const truncatedText = numericValue.substring(0, 20);
    setStudentId(truncatedText);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const onPressLogin = () => {
    try {
      setLoad(true);
      if (studentId && password) {
        let data = {
          student_id: studentId,
          password,
          device_id: UID,
          device_name: DN,
          ip: ipAddress,
        };
        LoginUserApi(data, dispatch, setLoad);
      } else {
        showMessage({
          message: 'Enter StudentId and Password',
          type: 'danger',
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
        setLoad(false);
      }
    } catch (error) {
      // console.log('second');
      // console.log(error.message);
      // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
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
  const onPressForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const handlePasswordSubmit = () => {
    onPressLogin();
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={styles.container}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: COLORS.themeColor,
              paddingTop: '18%',
              height: '40%',
              width: '100%',
              borderBottomEndRadius: 50,
              borderBottomStartRadius: 50,
              paddingBottom: '4%',
            }}>
            <Image
              source={require('../../assets/whitelogo.png')}
              resizeMode="contain"
              style={{}}
            />
            <Text
              style={[
                styles.title,
                {fontSize: windowwidth / 13, color: COLORS.white},
              ]}>
              Student Portal
            </Text>
            <Text
              style={[
                styles.title,
                {
                  fontSize: windowwidth / 18,
                  color: COLORS.white,
                  fontWeight: 400,
                },
              ]}>
              Welcome
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              // backgroundColor: 'blue',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: '30%',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                height: '30%',
                alignItems: 'center',
                borderBottomWidth: isStuIdFocused ? 3 : 1,
                borderBottomColor: COLORS.black,
              }}>
              <FontAwesome6
                name={'circle-user'}
                size={windowwidth / 16}
                color={COLORS.black}
                style={{}}
              />
              <InputText
                placeholder="Student ID (e.g 5000-2000)"
                placeholderTextColor={COLORS.black}
                value={studentId}
                maxLength={15}
                TextStyle={[
                  styles.inputText,
                  {
                    width: '100%',
                    fontSize: windowwidth / 25,
                    paddingLeft: 10,
                    color: 'black',
                  },
                ]}
                keyboardType="phone-pad"
                onSubmitEditing={() => {
                  passwordInputRef.current.focus();
                }}
                onFocus={() => {
                  setIsStuIdFocused(true);
                }}
                onBlur={() => {
                  setIsStuIdFocused(false);
                }}
                onChangeText={handleStuIdChange}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                height: '30%',
                borderBottomWidth: isPasswordFocused ? 3 : 1,
                borderBottomColor: COLORS.black,
              }}>
              <MaterialIcons
                name="lock"
                size={windowwidth / 16}
                color={COLORS.black}
              />
              <View
                style={{
                  flexDirection: 'column',
                  width: '85%',
                  flexWrap: 'wrap',
                }}>
                <InputText
                  ref={passwordInputRef}
                  placeholder="Enter Password"
                  placeholderTextColor={COLORS.black}
                  secureTextEntry={!showPassword}
                  value={password}
                  maxLength={30}
                  onChangeText={setPassword}
                  TextStyle={[
                    styles.inputText,
                    {
                      fontSize: windowwidth / 25,
                      width: '100%',
                      paddingLeft: 10,
                    },
                  ]}
                  onFocus={() => {
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                  }}
                  onSubmitEditing={handlePasswordSubmit}
                />
              </View>
              <View style={{flexDirection: 'column', width: '10%'}}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={windowwidth / 16}
                  color={COLORS.black}
                  style={{}}
                  onPress={toggleShowPassword}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPressLogin}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: windowwidth / 20,
                    fontStyle: 'normal',
                    color: COLORS.white,
                  },
                ]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '30%',
              width: '95%',
            }}>
            <Text
              selectable={true}
              style={{
                color: COLORS.black,
                fontWeight: '600',
              }}>
              Need help logging in or have questions about our App? We're here
              to help! Please don't hesitate to reach out to our support team
              at:{' '}
              <Text
                style={{
                  color: COLORS.themeColor,
                  fontWeight: 'bold',
                  fontSize: windowWidth / 25,
                }}
                onPress={() => Linking.openURL('mailto:ums@hamdard.edu.pk')}>
                ums@hamdard.edu.pk
              </Text>{' '}
              and we'll get back to you as soon as possible. If you encounter
              any issues or bugs within the app, please feel free to report them
              to the System department or via email.
            </Text>
          </View>
        </View>
      </ScrollView>
      <Loader load={load} setLoad={setLoad} timeout={false} />
    </>
  );
};
{
  /* <TouchableOpacity>
              <Text
                selectable={true}
                onPress={handleEmailPress}
                style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                ums@hamdard.edu.pk
              </Text>
            </TouchableOpacity> */
}
{
  /* <Text
              selectable={true}
              style={{color: COLORS.black, fontWeight: '600'}}>
              
            </Text> */
}
{
  /* <TouchableOpacity>
              <Text
                selectable={true}
                onPress={handleEmailPress}
                style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                syed.sami@hamdard.edu.pk
              </Text>
            </TouchableOpacity> */
}
export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    width: '100%',
    height: '100%',
    overflow: 'scroll',
    // backgroundColor: 'red',
  },
  title: {
    fontWeight: 'bold',
  },
  inputText: {
    // marginVertical: 20,
    // paddingVertical: '3%',
    // marginHorizontal: 20,
    // paddingHorizontal: 10,
    // borderRadius: 25,
    // borderRadius: 10,
    color: 'black',
  },
  loginBtn: {
    width: '30%',
    backgroundColor: '#B9D5FF',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  singupandforgotcont: {
    flexDirection: 'row',
  },
  signup: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '15%',
  },
  forgot: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '3%',
  },
  loginfb: {
    fontSize: 25,
  },
  fblog: {
    width: '30%',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: '25%',
    width: '70%',
    height: '20%',
    backgroundColor: COLORS.themeColor,
    borderRadius: 10,
  },
  text: {
    color: COLORS.themeColor,
    fontSize: 16,
  },
});
