import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import InputText from '../../../../../components/reuseable/InputText';
import DropdownComponent from '../../../../../components/reuseable/Dropdown';
import {TextInput} from 'react-native-gesture-handler';
import clientapi from '../../../../../api/clientapi';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
// import {
//   student_id,
//   TokenId,
// } from '../../../../../Redux/Reducers/AuthReducer/AuthReducer';
import ScreenHead from '../../../../../components/reuseable/ScreenHead';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../../../../Redux/Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../../../../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';

const macData = [
  {mac: '44545454554', device_name: 'aknmaksn', brand_name: 'anxkaksm'},
  {mac: '72685214769', device_name: 'qwwwaazd', brand_name: 'smasalss'},
];
const WifiForm = ({regDevices, height = '32%', setRefresh, refresh}) => {
  const [macAddress, setMacAddress] = useState('');
  const [isMacFocused, setIsMacFocused] = useState(false);
  const [value, setValue] = useState(null);
  const [valueIcon, setValueIcon] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });

  const initialData = [
    {label: 'Laptop', value: '1', icon: 'laptop'},
    {label: 'Tablet PC', value: '2', icon: 'tablet'},
    {label: 'Smart Phone', value: '3', icon: 'mobile'},
    {label: 'Desktop PC', value: '4', icon: 'desktop'},
  ];

  // Filter out already registered devices
  const filteredData = initialData.filter(item => {
    if (item?.label === 'Tablet PC' || item?.label === 'Smart Phone') {
      return !regDevices?.some(
        device =>
          device.device_name === 'Tablet PC' ||
          device.device_name === 'Smart Phone',
      );
    }
    if (item?.label === 'Desktop PC' || item?.label === 'Laptop') {
      return !regDevices?.some(
        device =>
          device.device_name === 'Desktop PC' ||
          device.device_name === 'Laptop',
      );
    }
    return true;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  const wifiReg = async () => {
    const params = {
      token: TokenState,
      student_id: studentId,
      device_id: value,
      mac: macAddress,
    };
    // console.log(params, 'params');
    try {
      const api = await clientapi.post('student/general/wifi/reg', params);
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
      } else {
        if (api?.data?.success === false) {
          showMessage({
            message: 'Required fields are not filled',
            type: 'warning',
            duration: 10000,
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
        } else {
          setRefresh(!refresh);
          showMessage({
            message: api?.data?.output?.response?.messages,
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
      }
    } catch (error) {
      console.log(error);
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
  return (
    <View style={{height: height}}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            height: '35%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DropdownComponent
            value={value}
            setValue={setValue}
            valueIcon={valueIcon}
            setValueIcon={setValueIcon}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            label={'Device'}
            data={filteredData}
            nav={'wifi_device'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
            height: '35%',
            borderBottomWidth: isMacFocused ? 3 : 1,
            borderBottomColor: isMacFocused ? COLORS.themeColor : COLORS.black,
          }}>
          <FontAwesome6
            name={'wifi'}
            size={windowWidth / 20}
            color={isMacFocused ? COLORS.themeColor : COLORS.black}
            style={{}}
          />
          <InputText
            placeholder="00:E0:29:45:XX:XX"
            placeholderTextColor={
              isMacFocused ? COLORS.themeColor : COLORS.black
            }
            value={macAddress}
            TextStyle={[
              {
                width: '100%',
                fontSize: windowWidth / 25,
                paddingLeft: 10,
                color: isMacFocused ? COLORS.themeColor : COLORS.black,
              },
            ]}
            maxLength={17}
            onChangeText={text => {
              // Insert colon every 2 characters if text length is less than 17
              if (text.length <= 17) {
                text = text.replace(/[^0-9A-Za-z]/g, '');
                text = text.replace(/(.{2})/g, '$1:');
                text = text.slice(0, 17);
              }
              setMacAddress(text);
            }}
            keyboardType="ascii-capable"
            // inputMode="numeric"
            onSubmitEditing={() => {}}
            onFocus={() => {
              setIsMacFocused(true);
            }}
            onBlur={() => {
              setIsMacFocused(false);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20%',
          }}>
          <TouchableOpacity
            style={{
              // flex: 1,
              height: '80%',
              // width: '20%',
              paddingHorizontal: '10%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.themeColor,
            }}
            onPress={wifiReg}>
            <Text style={{color: COLORS.white}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const WifiRegistration = () => {
  const [regDevices, setRegDevices] = useState([]);
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });

  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  // const wifiReg = async () => {
  //   const params = {
  //     token: TokenState,
  //     student_id: studentId,
  //     device_id: value,
  //     mac: macAddress,
  //   };
  //   console.log(params, 'params');
  //   try {
  //     const api = await clientapi.post('student/general/wifi/reg', params);
  //     if (api?.data?.success === false) {
  //       showMessage({
  //         message: 'Required fields are not filled',
  //         type: 'warning',
  //         duration: 10000,
  //         position: 'top',
  //         // backgroundColor: COLORS.themeColor,
  //         color: COLORS.black,
  //         style: {justifyContent: 'center', alignItems: 'center'},
  //         icon: () => (
  //           <FontAwesome6
  //             name="circle-exclamation"
  //             size={windowWidth / 16}
  //             color={COLORS.black}
  //             style={{paddingRight: 20}}
  //           />
  //         ),
  //       });
  //     } else {
  //       showMessage({
  //         message: api?.data?.output?.response?.messages,
  //         type: 'success',
  //         duration: 10000,
  //         position: 'top',
  //         backgroundColor: COLORS.themeColor,
  //         color: COLORS.white,
  //         style: {justifyContent: 'center', alignItems: 'center'},
  //         icon: () => (
  //           <FontAwesome6
  //             name="check-circle"
  //             size={windowWidth / 16}
  //             color={COLORS.white}
  //             style={{paddingRight: 20}}
  //           />
  //         ),
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
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

  useEffect(() => {
    const params = {
      student_id: studentId,
      token: TokenState,
    };
    const DevicesList = async () => {
      setLoad(true);
      try {
        const api = await clientapi.get('/student/general/wifi/list', {params});
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
          setRegDevices(api?.data?.devices);
          // console.log(api?.data?.devices, 'api');
          setLoad(false);
        }
      } catch (error) {
        console.log(error);
        setLoad(false);
      }
    };
    DevicesList();
  }, [refresh]);

  const Delete_Device = async id => {
    let data = {
      student_id: studentId,
      token: TokenState,
      id: id,
    };
    // console.log(data, 'pa');
    setLoad(true);
    try {
      const api = await clientapi.post('/student/general/wifi/delete', data);
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
        showMessage({
          message: api?.data?.output?.response?.messages,
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
        setRefresh(!refresh);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingtext}>Wifi Registration</Text>
        <Text style={styles.text}>
          This page is used to register two devices for wifi access. Delete the
          previous device and register new one if you have changed one of your
          device.
        </Text>
      </View>
      <WifiForm regDevices={regDevices} />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: COLORS.themeColor,
        }}>
        <Text
          style={{
            color: COLORS.themeColor,
            fontWeight: 'bold',
            fontSize: windowWidth / 20,
          }}>
          Registered Devices
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          borderWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            borderRightWidth: 1,
          }}>
          <Text style={styles.listHeader}>Mac</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
            borderRightWidth: 1,
          }}>
          <Text style={styles.listHeader}>Device Name</Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
          }}>
          <Text style={styles.listHeader}>Delete</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{
          flexDirection: 'row',
        }}>
        {regDevices?.map((d, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                width: '100%',
                height: '20%',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '40%',
                  borderRightWidth: 1,
                }}>
                <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                  {d?.mac}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                  borderRightWidth: 1,
                }}>
                <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                  {d?.device_name}
                  {/* {d?.id} */}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                }}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    console.log(d, 'd');
                    Delete_Device(d?.rd_id);
                  }}>
                  <AntDesign
                    name="delete"
                    size={windowWidth / 12}
                    color={COLORS.themeColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WifiRegistration;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headingContainer: {
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    // backgroundColor: COLORS.blue,
    alignItems: 'center',
    // height: '14%',
  },
  headingtext: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
    textDecorationColor: COLORS.themeColor,
    textAlign: 'center',
  },
  text: {
    color: COLORS.TextthemeColor,
    textAlign: 'center',
    fontSize: windowWidth / 28,
    paddingHorizontal: 10,
  },
  ScrollContainer: {
    flexGrow: 1,
    overflow: 'scroll',
  },
  contentContainer: {
    flex: 1,
    // justifyContent: ,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  ddcontainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    // marginVertical: '2%',
    // padding: 16,
    marginHorizontal: '1%',
  },
  dropdown: {
    height: '100%',
    borderColor: COLORS.themeColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: '2%',
  },
  icon: {
    marginRight: '2%',
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    color: COLORS.themeColor,
    left: 20,
    top: -1,
    zIndex: 999,
    paddingHorizontal: '3%',
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.themeColor,
  },
  iconStyle: {
    color: COLORS.themeColor,
  },
  listHeader: {
    color: COLORS.black,
    fontSize: windowWidth / 25,
  },
});
