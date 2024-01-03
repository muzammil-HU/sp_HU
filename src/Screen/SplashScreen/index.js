import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import LottieView from 'lottie-react-native';

const Splash = ({splash, setSplash}) => {
  const animationRef = useRef();
  return (
    // <View style={{flex: 1, alignItems: 'center', margin: 0}}>
    <LottieView
      ref={animationRef}
      source={require('../../assets/Flow 1.json')}
      loop={false}
      autoPlay={true}
      style={{flex: 1}}
      onAnimationFinish={() => {
        setSplash(false);
      }}
    />
    // </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
