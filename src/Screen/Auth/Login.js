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
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import InputText from '../../components/reuseable/InputText';
import apiInstance from '../../api/clientapi';
import axios from 'axios';
import clientapi from '../../api/clientapi';
import {showMessage, hideMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {LoginUserApi} from '../../Redux/Actions/AuthFunctions';

const Login = () => {
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

  useEffect(() => {}, []);
  const handleStuIdChange = text => {
    // console.log(text, 'text');
    const numericValue = text.replace(/[^0-9-]/g, '');
    // console.log(numericValue, 'after');
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
        };
        LoginUserApi(data, dispatch, setLoad);
      } else {
        showMessage({
          message: 'Enter StudentId and Password',
          type: 'danger',
          style: {justifyContent: 'center', alignItems: 'center'},
          // backgroundColor: '#2BA36F',
          // color: '#fff',
          icon: () => (
            <MaterialIcons
              name="error-outline"
              size={windowwidth / 16}
              color="#fff"
              style={{paddingRight: 20}}
            />
          ),
        });
        setLoad(false);
      }
      // console.log('first');
      // navigation.navigate('Root');
      // showMessage({
      //   message: 'Logged in Sucessfully',
      //   type: 'success',
      //   backgroundColor: '#2BA36F',
      //   color: '#fff',
      //   icon: () => (
      //     <FontAwesome6
      //       name="check-circle"
      //       size={windowwidth / 16}
      //       color="#fff"
      //       style={{paddingRight: 20}}
      //     />
      //   ),
      // });
      // let config = {
      //   method: 'get',
      //   maxBodyLength: Infinity,
      //   url: 'http://192.168.137.195:8085/api/v1/auth/emp',
      //   headers: {},
      // };

      // axios
      //   .request(config)
      //   .then(response => {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      // const header = {};
      // const res = await axios.post(
      //   'http://172.23.12.94:8085/api/v1/auth/login',
      //   {
      //     student_id: studentId,
      //     password: password,
      //   },
      //   // {
      //   //   headers: {
      //   //     Accept: 'application/json',
      //   //     'Content-Type': 'application/json',
      //   //   },
      //   // },
      // );

      // if (res && res.data.success == true) {
      //   ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      //   const response = res.data;
      //   console.log(response);
      //   // setAuth({
      //   //   ...auth,
      //   //   user,
      //   //   token,
      //   //   planId: plan,
      //   // });

      // const res = await clientapi.post('/api/v1/auth/login', {
      //   student_id: studentId,
      //   password,
      // });
      // if (res && res.data.success) {
      //   ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      //   // const {user, token} = res.data;
      //   // setAuth({
      //   //   ...auth,
      //   //   user,
      //   //   token,
      //   // });
      //   console.log(res.data);
      //   await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      //   navigation.navigate('Root');
      // } else {
      //   ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      //   console.log(res.data.message);
      // }

      // await AsyncStorage.setItem('auth', JSON.stringify(studentId));
      // navigation.navigate('Dashboard');
      // showMessage({
      //   message: 'Logged in Sucessfully',
      //   type: 'success',
      //   backgroundColor: '#2BA36F',
      //   color: '#fff',
      //   style: {justifyContent: 'center', alignItems: 'center'},
      //   icon: () => (
      //     <FontAwesome6
      //       name="check-circle"
      //       size={windowwidth / 16}
      //       color="#fff"
      //       style={{paddingRight: 20}}
      //     />
      //   ),
      // });
      // } else {
      //   const message = res.data.message.toString();
      //   ToastAndroid.show(message, ToastAndroid.SHORT);
      //   // console.log(res.data.message);
      //   showMessage({
      //     message: message,
      //     type: 'error',
      //     style: {alignItems: 'center'},
      //     //  backgroundColor: '#2BA36F',
      //     //  color: '#fff',
      //     icon: () => (
      //       <FontAwesome6
      //         name="circle-xmark"
      //         size={windowwidth / 16}
      //         color="#fff"
      //         style={{paddingRight: 20}}
      //       />
      //     ),
      //   });
      //   // console.log('third');
      // }
    } catch (error) {
      console.log('second');
      console.log(error.message);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      showMessage({
        message: 'error',
        type: 'danger',
        // backgroundColor: '#2BA36F',
        // color: '#fff',
        // textStyle: {fontSize: windowwidth / 7},
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <MaterialIcons
            name="error-outline"
            size={windowwidth / 16}
            color="#fff"
            style={{paddingRight: 20}}
          />
        ),
      });
    }
  };
  const onPressForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const onPressSignUp = () => {
    // navigation.navigate("Register");
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#2BA36F',
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
          style={[styles.title, {fontSize: windowwidth / 13, color: '#fff'}]}>
          Student Portal
        </Text>
        <Text
          style={[
            styles.title,
            {
              fontSize: windowwidth / 18,
              color: '#fff',
              fontWeight: 400,
              // paddingBottom: 10,
            },
          ]}>
          Welcome
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          // backgroundColor: 'red',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '50%',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
            borderBottomWidth: isStuIdFocused ? 3 : 1,
            borderBottomColor: '#000',
          }}>
          <FontAwesome6
            name={'circle-user'}
            size={windowwidth / 16}
            color="#000"
            style={{}}
            // onPress={toggleShowPassword}
          />
          <InputText
            placeholder="Student ID"
            placeholderTextColor="#000"
            value={studentId}
            maxLength={15}
            TextStyle={[
              styles.inputText,
              {
                width: '100%',
                fontSize: windowwidth / 25,
                paddingLeft: 10,
                // borderColor: isStuIdFocused ? '#0C8C45' : '#003f5c',
              },
            ]}
            inputMode="numeric"
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

            // marginHorizontal: 20,
            // paddingHorizontal: 10,
            borderBottomWidth: isPasswordFocused ? 3 : 1,
            borderBottomColor: '#000',
            // borderRadius: 10,
          }}>
          <MaterialIcons name="password" size={windowwidth / 16} color="#000" />
          <View
            style={{flexDirection: 'column', width: '85%', flexWrap: 'wrap'}}>
            <InputText
              placeholder="Enter Password"
              placeholderTextColor="#000"
              secureTextEntry={!showPassword}
              value={password}
              maxLength={30}
              onChangeText={setPassword}
              TextStyle={
                // [
                // styles.inputText,
                {
                  fontSize: windowwidth / 25,
                  width: '100%',
                  paddingLeft: 10,
                  // borderColor: isStuIdFocused ? '#0C8C45' : '#003f5c',
                  // borderBottomWidth: isStuIdFocused ? 3 : 1,
                  // borderBottomColor: isStuIdFocused ? '#0C8C45' : '#fff',
                }
                // ]
              }
              onFocus={() => {
                setIsPasswordFocused(true);
              }}
              onBlur={() => {
                setIsPasswordFocused(false);
              }}
            />
          </View>
          <View style={{flexDirection: 'column', width: '10%'}}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={windowwidth / 16}
              color="#000"
              style={{}}
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: '60%',
            // backgroundColor: 'red',

            width: '40%',
          }}
          onPress={() => onPressForgotPassword()}>
          <Text style={{color: '#2BA36F', fontSize: windowwidth / 28}}>
            ForgotPassword
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressLogin}>
          <Text
            style={[
              styles.text,
              {fontSize: windowwidth / 20, fontStyle: 'normal', color: '#fff'},
            ]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  title: {
    fontWeight: 'bold',
    // fontSize: 50,
    // marginBottom: 40,
  },
  // inputView: {
  //   // width: "30%",
  //   // backgroundColor: "#3AB4BA",
  //   // borderRadius: 25,
  //   // height: 50,
  //   marginVertical: 20,
  //   // justifyContent: "center",
  //   // padding: 20,
  //   marginHorizontal: 20,
  //   paddingHorizontal: 10,
  //   borderRadius: 25,
  //   borderRadius: 10,
  //   borderWidth: 1,
  // },
  inputText: {
    // marginVertical: 20,
    // paddingVertical: '3%',
    // marginHorizontal: 20,
    // paddingHorizontal: 10,
    // borderRadius: 25,
    // borderRadius: 10,
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
    // marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '25%',
    width: '70%',
    height: '12%',
    backgroundColor: '#2BA36F',
    borderRadius: 10,
  },
  text: {
    color: '#2BA36F',
    fontSize: 16,
  },
});

{
  /* <View
  style={{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginHorizontal: 20,
    // paddingHorizontal: 10,
    borderBottomWidth: isPasswordFocused ? 3 : 1,
    borderBottomColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'red',
  }}>
  <View style={{flexDirection: 'column', width: '90%'}}>
    <InputText
      placeholder="Enter Password"
      placeholderTextColor="#000"
      secureTextEntry={!showPassword}
      value={password}
      onChangeText={setPassword}
      TextStyle={
        // [
        // styles.inputText,
        {
          fontSize: windowwidth / 32,
          // borderColor: isStuIdFocused ? '#0C8C45' : '#003f5c',
          // borderBottomWidth: isStuIdFocused ? 3 : 1,
          // borderBottomColor: isStuIdFocused ? '#0C8C45' : '#fff',
        }
        // ]
      }
      onFocus={() => {
        setIsPasswordFocused(true);
      }}
      onBlur={() => {
        setIsPasswordFocused(false);
      }}
    />
  </View>
  <View style={{flexDirection: 'column', width: '10%'}}>
    <MaterialCommunityIcons
      name={showPassword ? 'eye-off' : 'eye'}
      size={windowwidth / 16}
      color="#aaa"
      style={{}}
      onPress={toggleShowPassword}
    />
  </View>
</View>; */
}
