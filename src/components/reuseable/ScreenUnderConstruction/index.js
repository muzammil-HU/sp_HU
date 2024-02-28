import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Loader from '../../reuseable/Modals/LoaderModal';
import {COLORS, windowWidth} from '../../../Constants/COLORS';
import {useNavigation, useRoute} from '@react-navigation/native';

const UnderConstruction = ({load, setLoad}) => {
  return (
    <>
      {load ? (
        <>
          <Loader load={load} setLoad={setLoad} />
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: COLORS.black,
              fontSize: windowWidth / 22,
            }}>
            Sorry for Inconvience
          </Text>
          <Text
            style={{
              fontWeight: '400',
              color: COLORS.black,
              fontSize: windowWidth / 25,
            }}>
            This Screen is Under Development
          </Text>
        </View>
      )}
    </>
  );
};

export default UnderConstruction;

const styles = StyleSheet.create({});
