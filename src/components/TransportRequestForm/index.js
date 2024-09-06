import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import InputText from '../reuseable/InputText';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import DropdownComponent from '../reuseable/Dropdown';
import {Dropdown} from 'react-native-element-dropdown';

import {showMessage} from 'react-native-flash-message';
import {COLORS, windowWidth} from '../../Constants/COLORS';
import clientapi from '../../api/clientapi';
import Loader from '../reuseable/Modals/LoaderModal';
import ScreenHead from '../reuseable/ScreenHead';
import {useSelector} from 'react-redux';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../Redux/Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';

const TransportRequestForm = () => {
  const [load, setLoad] = useState(true);
  const [date, setDate] = useState(new Date());
  const [selected_date, setSelected_Date] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [data, setData] = useState([
    {location_name: 'Select Item', status: ''},
  ]);
  const [time, setTime] = useState(new Date());
  const [selected_time, setSelected_time] = useState(
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  );
  const [datemode, setDateMode] = useState('date');
  const [timemode, setTimeMode] = useState('time');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [text, setText] = useState();
  const [sharing_student_id, setSharing_student_id] = useState();
  // const [sharing_student_id, setSharing_student_id] = useState();

  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  const [value, setValue] = useState(null);
  const [valueIcon, setValueIcon] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [request_type_value, setRequest_Type_Value] = useState(null);
  const [request_type_valueicon, setRequest_Type_ValueIcon] = useState(null);
  const [request_type_isFocus, setRequest_type_IsFocus] = useState(false);

  const [sharingValue, setSharingValue] = useState(null);
  // const [request_type_valueicon, setRequest_Type_ValueIcon] = useState(null);
  const [sharing_isFocus, setsharing_IsFocus] = useState(false);

  useEffect(() => {
    const loc_list = async () => {
      const params = {
        token: TokenState,
        student_id: studentId,
      };
      try {
        setLoad(true);
        const api = await clientapi.post(
          `/student/transport/locationlist`,
          params,
        );
        // console.log(api.data.location_list, 'api');
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
          setData([
            {location_name: 'Select Item', status: ''},
            ...api.data.location_list,
          ]);
          setLoad(false);
        }
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
    loc_list();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedDate = currentDate.toISOString().split('T')[0];
    setShowDatePicker(false);
    setSelected_Date(formattedDate);
    setDate(currentDate);
  };
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setShowTimePicker(false);
    setSelected_time(formattedTime);
    setTime(currentTime);
  };
  const showMode = currentMode => {
    setShowDatePicker(true);
    // setDateMode(currentMode);
  };
  // const data = [
  //   {label: 'Laptop', value: 'laptop', icon: 'laptop'},
  //   {label: 'Desktop', value: 'desktop', icon: 'desktop'},
  //   {label: 'Tablet', value: 'tablet', icon: 'tablet'},
  //   {label: 'Mobile', value: 'mobile', icon: 'mobile'},
  // ];

  const Request_Type = [
    {label: 'Select Item', value: null, icon: 'plane-departure'},
    {label: 'Departure', value: 'Departure', icon: 'plane-departure'},
    {label: 'PickUp', value: 'PickUp', icon: 'plane-arrival'},
    {label: 'Both', value: 'Both', icon: 'laptop'},
  ];

  const Sharing_single = [
    {label: 'Select Item', value: ''},
    {label: 'Single', value: 'Single'},
    {label: 'Sharing', value: 'Sharing'},
  ];
  const showDatepicker = () => {
    showMode('date');
  };
  const renderLabel = label => {
    return <Text style={[styles.label]}>{label}</Text>;
  };
  const getMessageString = messages => {
    let messageType = 'danger';
    if (messages === 'Transport Request successfully') {
      messageType = 'success';
      return {message: messages, type: messageType};
    } else if (
      messages.req_type &&
      messages.req_status &&
      messages.req_location
    ) {
      return {message: 'Select all required fields', type: 'danger'};
    } else if (messages.req_type) {
      return {message: 'Request Type is required', type: 'danger'};
    } else if (messages.req_location) {
      return {message: 'Location is required', type: 'danger'};
    } else if (messages.req_status) {
      return {message: 'Select Single or Sharing', type: 'danger'};
    } else {
      return {message: 'An error occurred', type: 'danger'};
    }
  };
  const submit = async () => {
    const params = {
      token: TokenState,
      student_id: studentId,
      req_time: selected_time,
      req_date: selected_date,
      req_type: request_type_value?.value,
      req_location: value?.id,
      req_status: sharingValue?.value,
      req_sharing_std_id: sharing_student_id,
    };
    try {
      setLoad(true);
      if (
        (request_type_value?.value || value?.id || sharingValue?.value) ===
        undefined
      ) {
        showMessage({
          message: 'Select all required fields',
          type: 'danger',
          duration: 10000,
          position: 'top',
          backgroundColor: COLORS.red,
          color: COLORS.white,
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
      } else if (
        request_type_value?.value &&
        value?.id &&
        sharingValue?.value === 'Sharing' &&
        (sharing_student_id === undefined ||
          sharing_student_id === null ||
          sharing_student_id === '')
      ) {
        showMessage({
          message: 'Add Sharing Student Id',
          type: 'danger',
          duration: 10000,
          position: 'top',
          backgroundColor: COLORS.red,
          color: COLORS.white,
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
      } else {
        const api = await clientapi.post(`/student/transport/request`, params);
        const {message, type} = getMessageString(
          api?.data?.output?.response?.messages,
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
          showMessage({
            message: message,
            type: type,
            duration: 10000,
            position: 'top',
            backgroundColor:
              type === 'success' ? COLORS.themeColor : COLORS.red,
            color: COLORS.white,
            style: {justifyContent: 'center', alignItems: 'center'},
            icon: () => (
              <>
                {type === 'success' ? (
                  <FontAwesome6
                    name="check-circle"
                    size={windowWidth / 16}
                    color={COLORS.white}
                    style={{paddingRight: 20}}
                  />
                ) : (
                  <Entypo
                    name="circle-with-cross"
                    size={windowWidth / 16}
                    color={COLORS.white}
                    style={{paddingRight: 20}}
                  />
                )}
              </>
            ),
          });
        }
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      const {message, type} = getMessageString(
        error?.response?.data?.output?.response?.messages,
      );
      showMessage({
        message: message,
        type: type,
        position: 'top',
        duration: 10000,
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
    <View style={styles.mainContainer}>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <>
          {/* <ScreenHead
            heading={'Transport Request Form'}
            NoteVisibility={false}
            // data={data}
            load={load}
            setLoad={setLoad}
          /> */}
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: '3%',
            }}>
            {/* showDatePicker */}
            {/* <View style={[styles.container, {justifyContent: 'center'}]}>
              {showDatePicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  style={{}}
                  mode={datemode}
                  is24Hour={true}
                  onChange={onChange}
                  onTouchCancel={() => setShowDatePicker(false)}
                  minimumDate={new Date()}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    height: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  {renderLabel('Date')}
                  <FontAwesome
                    name="calendar-o"
                    size={windowWidth / 16}
                    color={COLORS.themeColor}
                    style={{paddingRight: 20}}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: COLORS.themeColor,
                      fontSize: windowWidth / 25,
                    }}>
                    {date ? date.toLocaleDateString() : 'mm/dd/yyyy'}
                  </Text>
                  <Text></Text>
                </TouchableOpacity>
              )}
            </View>*/}

            {/* {[...Array(15)].map((_, index) => (             
            ))} */}

            <View style={[styles.container, {justifyContent: 'center'}]}>
              {showDatePicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={datemode}
                  is24Hour={true}
                  onChange={onChange}
                  onTouchCancel={() => setShowDatePicker(false)}
                  minimumDate={new Date()}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    // height: '100%',
                    paddingVertical: '3%',
                    borderWidth: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  {renderLabel('Date')}
                  <FontAwesome
                    name="calendar-o"
                    size={windowWidth / 16}
                    color={COLORS.themeColor}
                    style={styles.icon}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: COLORS.themeColor,
                      fontSize: windowWidth / 25,
                    }}>
                    {date ? date.toLocaleDateString() : 'mm/dd/yyyy'}
                  </Text>
                  <Text></Text>
                </TouchableOpacity>
              )}
            </View>

            {/* showTimePicker */}
            {/* <View style={[styles.container, {justifyContent: 'center'}]}>
              {showTimePicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={time}
                  style={{}}
                  mode={timemode}
                  is24Hour={false}
                  onChange={onTimeChange}
                  onTouchCancel={() => setShowTimePicker(false)}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    height: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  {renderLabel('Time')}
                  <FontAwesome6
                    name="clock"
                    size={windowWidth / 16}
                    color={COLORS.themeColor}
                    style={{paddingRight: 20}}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: COLORS.themeColor,
                      fontSize: windowWidth / 25,
                      paddingHorizontal: '3%',
                    }}>
                    {time
                      ? time.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '__:__'}
                  </Text>
                  <Text></Text>
                </TouchableOpacity>
              )}
            </View> */}

            <View style={[styles.container, {justifyContent: 'center'}]}>
              {showTimePicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneName="karachi/asia"
                  value={time}
                  style={{}}
                  mode={timemode}
                  is24Hour={false}
                  onChange={onTimeChange}
                  onTouchCancel={() => setShowTimePicker(false)}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    // height: '100%',
                    paddingVertical: '3%',
                    borderWidth: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  {renderLabel('Time')}
                  <FontAwesome6
                    name="clock"
                    size={windowWidth / 16}
                    color={COLORS.themeColor}
                    style={{paddingRight: 20}}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: COLORS.themeColor,
                      fontSize: windowWidth / 25,
                      paddingHorizontal: '3%',
                    }}>
                    {time
                      ? time.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '__:__'}
                  </Text>
                  <Text></Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Location DropDown */}
            <View
              style={{
                flexDirection: 'row',
                // width: '90%',
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: '5%',
              }}>
              <DropdownComponent
                value={value}
                setValue={setValue}
                valueIcon={valueIcon}
                setValueIcon={setValueIcon}
                isFocus={isFocus}
                setIsFocus={setIsFocus}
                label={'Location'}
                data={data}
              />
            </View>
            {/*Request_Type DropDown */}
            <View
              style={{
                flexDirection: 'row',
                // width: '90%',
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: '5%',
                marginTop: '5%',
              }}>
              <DropdownComponent
                value={request_type_value}
                setValue={setRequest_Type_Value}
                valueIcon={request_type_valueicon}
                setValueIcon={setRequest_Type_ValueIcon}
                isFocus={request_type_isFocus}
                setIsFocus={setRequest_type_IsFocus}
                label={'Request Type'}
                data={Request_Type}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: '5%',
                marginTop: '5%',
              }}>
              <TextInput
                label="Ammount"
                mode="outlined"
                value={value?.amount ? value.amount : '0'}
                disabled={true}
                outlineColor={COLORS.themeColor}
                // onChangeText={text => setText(text)}
                style={{width: '100%', backgroundColor: COLORS.white}}
                activeOutlineColor={COLORS.themeColor}
                inputMode="numeric"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: '5%',
                marginTop: '5%',
                marginBottom: '5%',
              }}>
              <TextInput
                disabled={true}
                label="Total Ammount"
                mode="outlined"
                outlineColor={COLORS.themeColor}
                value={
                  value?.amount
                    ? request_type_value?.value === 'Both'
                      ? (value.amount * 2).toString()
                      : value.amount
                    : '0'
                }
                // value={value?.amount ? (value.amount * 2).toString() : '0'}
                // onChangeText={text => setText(text)}
                style={{
                  width: '100%',
                  backgroundColor: COLORS.white,
                }}
                activeOutlineColor={COLORS.themeColor}
                inputMode="numeric"
              />
            </View>

            {/*Sharing DropDown */}
            <View
              style={{
                flexDirection: 'row',
                // width: '90%',
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: '5%',
              }}>
              <DropdownComponent
                value={sharingValue}
                setValue={setSharingValue}
                isFocus={sharing_isFocus}
                setIsFocus={setsharing_IsFocus}
                label={'Single/Sharing'}
                data={Sharing_single}
              />
            </View>
            {sharingValue?.value === 'Sharing' ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  height: '8%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  marginBottom: '5%',
                }}>
                <TextInput
                  label="Sharing Student Id"
                  mode="outlined"
                  outlineColor={COLORS.themeColor}
                  value={sharing_student_id}
                  onChangeText={text => setSharing_student_id(text)}
                  maxLength={9}
                  style={{
                    width: '100%',
                    backgroundColor: COLORS.white,
                  }}
                  activeOutlineColor={COLORS.themeColor}
                  inputMode="numeric"
                />
              </View>
            ) : null}
            <View
              style={[
                styles.container,
                {
                  justifyContent: 'center',
                  marginBottom: '5%',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  submit();
                }}
                style={{
                  flexDirection: 'row',
                  width: '92%',
                  // height: '100%',
                  paddingVertical: '3%',
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Feather
                  name="upload-cloud"
                  size={windowWidth / 16}
                  color={COLORS.themeColor}
                  style={styles.icon}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: COLORS.themeColor,
                    fontSize: windowWidth / 25,
                  }}>
                  Submit
                </Text>
                <Text></Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default TransportRequestForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headcontainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: '5%',
    // height: '8%',
    justifyContent: 'space-between',
  },
  heading: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8%',
    borderColor: COLORS.themeColor,

    borderBottomWidth: 1,
  },
  headtext: {
    color: COLORS.themeColor,
    fontWeight: 'bold',
    fontSize: windowWidth / 21,
  },
  ddcontainer: {
    width: '100%',
    height: '100%',
  },
  dropdown: {
    paddingVertical: '4%',
    borderColor: COLORS.themeColor,
    borderWidth: 1,
    borderRadius: 8,
    // paddingHorizontal: 8,
    marginHorizontal: '5%',
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
    top: -9,
    zIndex: 999,
    paddingHorizontal: '3%',
    fontSize: windowWidth / 29,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.themeColor,
  },
  iconStyle: {
    color: COLORS.red,
    height: '50%',
  },
});

{
  /* <InputText
          placeholder="Enter Password"
          placeholderTextColor={COLORS.black}
          secureTextEntry={!showPassword}
          value={date}
          maxLength={30}
          onChangeText={setDate}
          TextStyle={[
            styles.inputText,
            {
              fontSize: windowWidth / 25,
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
        /> */
}
