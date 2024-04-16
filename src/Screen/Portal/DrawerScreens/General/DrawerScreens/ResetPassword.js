import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ResetPassword = () => {
  const [text, setText] = useState();
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={styles.headcontainer}>
      <View style={{flex: 1}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingtext}>Change / Reset Password</Text>
          <Text style={styles.text}>
            Please change your password on regular basis to avoid unauthorized
            access of your login. Your password is case sensitive.
          </Text>
          <Text style={styles.text}>
            Change Password Instructions 1- Enter your old password in Old
            Password Box 2- Enter twice your new password i-e in New Password
            and Retype New Password Box 3- Press Change Password button to
            change your password 4- On next login you will use your new password
            credential
          </Text>
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
            label="Old Password"
            mode="outlined"
            value={text}
            // disabled={true}
            onChangeText={text => setText(text)}
            style={{width: '100%', backgroundColor: 'transparent'}}
            activeOutlineColor={COLORS.themeColor}
            // inputMode="numeric"
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
            label="New Password"
            mode="outlined"
            value={text}
            // disabled={true}
            onChangeText={text => setText(text)}
            style={{width: '100%', backgroundColor: 'transparent'}}
            activeOutlineColor={COLORS.themeColor}
            // inputMode="numeric"
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
            label="Retype New Password"
            mode="outlined"
            value={text}
            // disabled={true}
            onChangeText={text => setText(text)}
            style={{width: '100%', backgroundColor: 'transparent'}}
            activeOutlineColor={COLORS.themeColor}
            // inputMode="numeric"
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
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              backgroundColor: COLORS.themeColor,
              width: '100%',
              height: '70%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome5
              style={styles.icon}
              // color={isFocus ? COLORS.themeColor : COLORS.black}
              name={'key'}
              size={windowWidth / 20}
            />
            <Text style={{color: COLORS.white}}>Change Passeord</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;

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
