import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import InputText from '../../../../../components/reuseable/InputText';
import DropdownComponent from '../../../../../components/reuseable/Dropdown';

const data = [
  {label: 'Laptop', value: '1', icon: 'laptop'},
  {label: 'Desktop PC', value: '2', icon: 'desktop'},
  {label: 'Tablet PC', value: '3', icon: 'tablet'},
  {label: 'Smart Phone', value: '4', icon: 'mobile'},
];

const macData = [
  {mac: '44545454554', device_name: 'aknmaksn', brand_name: 'anxkaksm'},
  {mac: '72685214769', device_name: 'qwwwaazd', brand_name: 'smasalss'},
];

// const DropdownComponent = ({
//   value,
//   setValue,
//   valueIcon,
//   setValueIcon,
//   isFocus,
//   setIsFocus,
// }) => {
//   const renderLabel = () => {
//     if (value || isFocus) {
//       return <Text style={[styles.label]}>Device</Text>;
//     }
//     return null;
//   };

//   return (
//     <View style={styles.ddcontainer}>
//       {renderLabel()}
//       <Dropdown
//         style={[styles.dropdown, isFocus && {borderColor: COLORS.themeColor}]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         iconStyle={styles.iconStyle}
//         iconColor={COLORS.themeColor}
//         data={data}
//         labelField="label"
//         valueField="value"
//         placeholder={!isFocus ? 'Select item' : '...'}
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={item => {
//           setValue(item.value);
//           setValueIcon(item.icon);
//           setIsFocus(false);
//         }}
//         renderLeftIcon={() => (
//           <AntDesign
//             style={styles.icon}
//             color={isFocus ? COLORS.themeColor : COLORS.black}
//             name={valueIcon === null ? 'Safety' : valueIcon}
//             size={windowWidth / 20}
//           />
//         )}
//       />
//     </View>
//   );
// };

const WifiForm = () => {
  const [macAddress, setMacAddress] = useState('');
  const [isMacFocused, setIsMacFocused] = useState(false);
  const [value, setValue] = useState(null);
  const [valueIcon, setValueIcon] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          height: '30%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            height: '30%',
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
            data={data}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
            height: '25%',
            // backgroundColor: 'red',
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
      </View>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          width: '96%',
          height: '70%',
          // alignItems: 'center',

          justifyContent: 'space-evenly',
        }}>
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
      </View>
    </ScrollView>
  );
};
const WifiRegistration = () => {
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
        {/* <Divider
          style={{
            backgroundColor: COLORS.TextthemeColor,
            height: '2%',
            width: '95%',
          }}
        /> */}
      </View>
      <WifiForm />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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
});

{
  /* <View style={{flexDirection: 'row', width: '100%'}}>
          {macData.map((m, index) => {
            // console.log('first');
            return (
              <View style={{backgroundColor: 'red', width: '100%', height: 20}}>
                <Text style={{color: COLORS.black}}>{m.device_name}hello</Text>
              </View>
            );
          })}
        </View> */
}
