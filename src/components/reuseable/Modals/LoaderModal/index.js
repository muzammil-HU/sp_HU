import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../../../../Constants/COLORS';

const Loader = ({load, setLoad}) => {
  // useEffect(() => {
  //   // if (load) {
  //   //   setTimeout(() => {
  //   //     setLoad(false);
  //   //   }, 5000);
  //   //   console.log(load, 'load');
  //   // }
  // }, [load]);

  return (
    <View style={{}} onTouchEnd={() => setLoad(false)}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={load}
        onRequestClose={() => {
          setLoad(!load);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <ActivityIndicator size="large" color={COLORS.themeColor} />
            <Text style={{color: COLORS.themeColor}}>Loading...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '12%',
    backgroundColor: 'white',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    columnGap: 20,
  },
});

export default Loader;
