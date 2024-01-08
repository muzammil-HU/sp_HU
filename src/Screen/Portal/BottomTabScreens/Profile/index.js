import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileCard from '../../../../components/reuseable/Cards/ProfileCard';

const Profile = () => {
  const cardProfileData = {
    email: 'hameedfaiza354@gmail.com',
    admissionDate: '14 Dec 2016',
    campus: 'Main Campus',
    program: 'B.S. (SE) - 04 Years',
    class: 'SPM-17-BSSE-MC (VIII)',
    dob: '10-Apr-1997',
    status: 'Alumni',
    cnic: '1237614 - 12312312 - 0',
    phoneNum: '023123123412',
    address: 'North Karachi 123, Lorem',
  };
  return (
    <View style={styles.container}>
      <ProfileCard cardProfileData={cardProfileData} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
