import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import index from '..';

const EnrollmentForm = () => {
  const Fields = [
    '01. Admission Date',
    '02. Name & Father Name',
    '03. Date of Birth',
    '04. Gender',
    '05. Religion',
    '06. Nationality',
    '07. Permanent Address',
    '08. Current Address',
    '09. Academic details (At least 2)',
    '10. Student Cell Number',
    '11. Student Email Address',
    '12. Student CNIC',
  ];
  return (
    <View style={styles.mainContainer}>
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // paddingHorizontal: '3%',
        }}> */}
      <View style={{width: '100%', height: '50%'}}>
        <View
          style={{
            alignItems: 'center',
            borderBottomWidth: 0.2,
            // paddingVertical: '3%',
            backgroundColor: COLORS.white,
          }}>
          <Text style={styles.mainheading}>Enrollment Form</Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.Notetext}>
            Student must visit the concerned department first to complete
            his/her UMS Information.
          </Text>
          <Text style={styles.Notetext}>
            Following Information must be complete in student profile to
            download Enrollment Form.
          </Text>
          {Fields.map((F, index) => {
            return (
              <Text key={index} style={styles.Notetext}>
                {F}
              </Text>
            );
          })}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: '20%',
            width: '80%',
            backgroundColor: COLORS.themeColor,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {}}>
          <Text style={{color: COLORS.white}}>Download Enrollment Form</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default EnrollmentForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: '3%',
    backgroundColor: COLORS.white,
  },
  mainheading: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
  },
  Notetext: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 28,
  },
});
