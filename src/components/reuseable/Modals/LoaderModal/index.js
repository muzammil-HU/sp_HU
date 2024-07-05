import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {COLORS} from '../../../../Constants/COLORS';

const Loader = ({load, setLoad}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInOut = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => fadeInOut());
    };

    if (load) {
      fadeInOut();
      const timer = setTimeout(() => {
        setLoad(false);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      fadeAnim.setValue(0);
    }
  }, [load, fadeAnim, setLoad]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={load}
      onRequestClose={() => {
        setLoad(!load);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={COLORS.themeColor} />
          <Animated.Text style={[styles.loadingText, {opacity: fadeAnim}]}>
            Loading...
          </Animated.Text>
        </View>
      </View>
    </Modal>
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
  loadingText: {
    color: COLORS.themeColor,
  },
});

export default Loader;
