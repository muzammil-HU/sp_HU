import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenHead from '../../../components/reuseable/ScreenHead';
import {COLORS} from '../../../Constants/COLORS';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScreenHead heading={'Privacy Policy'} NoteVisibility={false} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: '3%'}}>
        <Text style={styles.paragraph}>
          This privacy policy applies to the Student Portal - Hamdard University
          app (hereby referred to as "Application") for mobile devices that was
          created by Muzammil Dalia (hereby referred to as "Service Provider")
          as a Free service. This service is intended for use "AS IS".
        </Text>
        <Text style={styles.heading}>Information Collection and Use</Text>
        <Text style={styles.paragraph}>
          The Application collects information when you download and use it.
          This information may include:
        </Text>
        <Text style={styles.listItem}>
          - Your device's Internet Protocol address (e.g. IP address)
        </Text>
        <Text style={styles.listItem}>
          - The pages of the Application that you visit, the time and date of
          your visit, the time spent on those pages
        </Text>
        <Text style={styles.listItem}>- The time spent on the Application</Text>
        <Text style={styles.listItem}>
          - The operating system you use on your mobile device
        </Text>
        <Text style={styles.paragraph}>
          The Application does gather precise information about the location of
          your mobile device.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    color: COLORS.black,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  listItem: {
    color: COLORS.black,
    marginLeft: 10,
    marginBottom: 5,
  },
});
