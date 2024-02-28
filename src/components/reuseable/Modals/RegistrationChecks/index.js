import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';
import AntDesign from 'react-native-vector-icons/AntDesign';

const RegistrationChecksModal = ({visible, setVisible, data, timeline}) => {
  useEffect(() => {}, []);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={styles.modalheading}>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: windowWidth / 22,
                  fontWeight: 500,
                  color: COLORS.white,
                }}>
                {/* {selectedCourseName?.course_title} */}
                Pre Course Registration Checks
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(!visible)}>
                <AntDesign
                  name="close"
                  size={windowWidth / 14}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={[{fontSize: windowWidth / 20}, styles.textContent]}>
                Following conditions must meet before student course
                registration.
              </Text>
              {data.map((d, index) => (
                <Text
                  style={[
                    styles.textContent,
                    {
                      fontSize: windowWidth / 25,
                      fontWeight: 500,
                      color: COLORS.black,
                    },
                  ]}
                  key={d.SNo}>
                  {d.SNo}
                  {d.content}
                </Text>
              ))}
              <Text
                style={[
                  styles.textContent,
                  {
                    color: COLORS.red,
                    fontSize: windowWidth / 20,
                    fontWeight: '800',
                  },
                ]}>
                {timeline}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegistrationChecksModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    flexDirection: 'column',
    width: '95%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  modalheading: {
    flexDirection: 'row',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: COLORS.themeColor,
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '15%',
    paddingRight: '5%',
  },
  closeButton: {},
  modalContent: {
    flexDirection: 'column',
    paddingHorizontal: '5%',
  },
  textContent: {
    textAlign: 'justify',
    color: COLORS.black,
  },
});
