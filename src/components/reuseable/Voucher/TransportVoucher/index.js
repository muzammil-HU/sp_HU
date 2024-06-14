import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../../Constants/COLORS';
import {useSelector} from 'react-redux';
import clientapi from '../../../../api/clientapi';

const TransportVoucher = () => {
  const [load, setLoad] = useState(false);
  const [transportVoucher, setTransportvoucher] = useState(null);
  const [offer_type, setOffer_type] = useState(null);
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.textsty}>
          Note! Student can not generate voucher if he/she has pending voucher
          in due date or not having any outstanding balance.
        </Text>
      </View>
    </View>
  );
};

export default TransportVoucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  subcontainer: {
    flexDirection: 'column',
    paddingLeft: '2%',
    paddingTop: '2%',
  },
  textsty: {
    color: COLORS.red,
  },
});
