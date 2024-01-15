import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileCard from '../../../../components/reuseable/Cards/ProfileCard';
import {useSelector} from 'react-redux';

const Profile = () => {
  const AuthState = useSelector(state => {
    return state?.AuthReducer.UserDetail;
  });
  // console.log(AuthState, 'UserDetail');
  const formatDOB = dob => {
    const options = {day: '2-digit', month: 'long', year: 'numeric'};
    const formattedDate = new Date(dob).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const cardProfileData = {
    name: AuthState.student_name === null || '' ? 'NA' : AuthState.student_name,
    desc: AuthState.name_display === null || '' ? 'NA' : AuthState.name_display,
    addmision_status:
      AuthState.admission_status === null || ''
        ? 'NA'
        : `Admission Status:${AuthState.admission_status}`,
    email:
      AuthState.student_email === null || '' ? 'NA' : AuthState.student_email,
    admissionDate:
      AuthState.admission_date === null || ''
        ? 'NA'
        : formatDOB(AuthState.admission_date),
    campus: AuthState.project === null || '' ? 'NA' : AuthState.project,
    program:
      AuthState.program_short_name === null || ''
        ? 'NA'
        : AuthState.program_short_name,
    class: AuthState.class === null || '' ? 'NA' : AuthState.class,
    dob: AuthState.dob === null || '' ? 'NA' : formatDOB(AuthState.dob),
    status: AuthState.status === null || '' ? 'NA' : AuthState.status,
    cnic: AuthState.student_nic === null || '' ? 'NA' : AuthState.student_nic,
    phoneNum:
      AuthState.student_cell_no === null || ''
        ? 'NA'
        : AuthState.student_cell_no,
    address:
      AuthState.current_address === null || ''
        ? 'NA'
        : AuthState.current_address,
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
