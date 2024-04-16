import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import InputText from '../../../../../components/reuseable/InputText';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import DropdownComponent from '../../../../../components/reuseable/Dropdown';
import {Dropdown} from 'react-native-element-dropdown';

const EmergencyTransportRequest = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [datemode, setDateMode] = useState('date');
  const [timemode, setTimeMode] = useState('time');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [text, setText] = useState();

  const [value, setValue] = useState(null);
  const [valueIcon, setValueIcon] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [request_type_value, setRequest_Type_Value] = useState(null);
  const [request_type_valueicon, setRequest_Type_ValueIcon] = useState(null);
  const [request_type_isFocus, setRequest_type_IsFocus] = useState(false);

  const [sharingValue, setSharingValue] = useState(null);
  // const [request_type_valueicon, setRequest_Type_ValueIcon] = useState(null);
  const [sharing_isFocus, setsharing_IsFocus] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowTimePicker(false);
    setTime(currentTime);
  };
  const showMode = currentMode => {
    setShowDatePicker(true);
    // setDateMode(currentMode);
  };
  const data = [
    {label: 'Laptop', value: 'laptop', icon: 'laptop'},
    {label: 'Desktop', value: 'desktop', icon: 'desktop'},
    {label: 'Tablet', value: 'tablet', icon: 'tablet'},
    {label: 'Mobile', value: 'mobile', icon: 'mobile'},
  ];

  const Request_Type = [
    {label: 'Departure', value: 'Departure', icon: 'plane-departure'},
    {label: 'PickUp', value: 'PickUp', icon: 'plane-arrival'},
    {label: 'Both', value: 'Both', icon: 'laptop'},
  ];

  const Sharing_single = [
    {label: 'Single', value: 'Single'},
    {label: 'Sharing', value: 'Sharing'},
  ];
  const showDatepicker = () => {
    showMode('date');
  };
  const renderLabel = label => {
    return <Text style={[styles.label]}>{label}</Text>;
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={styles.headcontainer}>
      <View style={{flex: 1}}>
        <View style={styles.heading}>
          <Text style={styles.headtext}>Transport Request Form</Text>
        </View>
        {/* showDatePicker */}
        <View style={[styles.container, {justifyContent: 'center'}]}>
          {showDatePicker ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              style={{}}
              mode={datemode}
              is24Hour={true}
              onChange={onChange}
              onTouchCancel={() => setShowDatePicker(false)}
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
        </View>
        {/* showTimePicker */}
        <View style={[styles.container, {justifyContent: 'center'}]}>
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
        {/* Location DropDown */}
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
            value={text}
            disabled={true}
            outlineColor={COLORS.themeColor}
            onChangeText={text => setText(text)}
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
            value={text}
            onChangeText={text => setText(text)}
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
        {/* <View
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
            value={value}
            setValue={setValue}
            valueIcon={valueIcon}
            setValueIcon={setValueIcon}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            label={'Single/Sharing'}
            data={data}
          />
        </View> */}
      </View>
    </ScrollView>
  );
};

export default EmergencyTransportRequest;

const styles = StyleSheet.create({
  headcontainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: '3%',
    height: '11%',
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
