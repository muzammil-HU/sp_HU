import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';
import DropdownComponent from '../../Dropdown';
import clientapi from '../../../../api/clientapi';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../Modals/LoaderModal';
import {Dropdown} from 'react-native-element-dropdown';
import index from '../../../../Screen/Portal/DrawerScreens/General';
import {useFocusEffect} from '@react-navigation/native';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../../../Redux/Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../../../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';
import {showMessage} from 'react-native-flash-message';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import axios from 'axios';
import md5 from 'md5';

const FeeVoucher = ({route}) => {
  const type = route?.params?.type;
  const [value, setValue] = useState();
  const [valueIcon, setValueIcon] = useState();
  const [isFocus, setIsFocus] = useState();
  const [load, setLoad] = useState(false);
  const [btn, setBtn] = useState(true);
  const [generated_fee_voucher, setGenerated_fee_voucher] = useState([]);
  const [sum_amount, setSum_amount] = useState();
  const dispatch = useDispatch();

  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });

  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });

  const std_email = useSelector(state => {
    return state?.AuthReducer?.UserDetail?.student_email;
  });

  const std_num = useSelector(state => {
    return state?.AuthReducer?.UserDetail?.student_cell_no;
  });

  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const params = {
        student_id: studentId,
        token: TokenState,
        voucher_type: type,
      };

      const bankList = async () => {
        setLoad(true);
        try {
          const api = await clientapi.get(
            '/student/voucher/generate/account/vouchers',
            {params},
          );
          if (
            api?.data?.success === false &&
            api?.data?.output?.response?.messages ===
              'Session expired Please Login Again'
          ) {
            dispatch(LoginUser(false));
            dispatch(TokenId(null));
            dispatch(UserDetail(null));
            dispatch(registered_courses(null));
            showMessage({
              message: 'Session expired Please Login Again',
              type: 'warning',
              position: 'top',
              // backgroundColor: COLORS.themeColor,
              color: COLORS.black,
              style: {justifyContent: 'center', alignItems: 'center'},
              icon: () => (
                <FontAwesome6
                  name="circle-exclamation"
                  size={windowWidth / 16}
                  color={COLORS.black}
                  style={{paddingRight: 20}}
                />
              ),
            });
            setLoad(false);
          } else {
            setSum_amount(api?.data?.sum_amount);
            setData(api?.data?.std_banks_list);
            setGenerated_fee_voucher(api?.data?.generate_voucher);
            if (
              api?.data?.generate_voucher?.length === 0 &&
              api?.data?.new_voucher_btn_show
            ) {
              setBtn(false);
            } else {
              setBtn(true);
            }
          }
        } catch (error) {
          setLoad(false);
          console.log(error, 'err');
          showMessage({
            message: '500 server Error',
            type: 'danger',
            position: 'top',
            color: COLORS.black,
            style: {justifyContent: 'center', alignItems: 'center'},
            icon: () => (
              <FontAwesome6
                name="circle-exclamation"
                size={windowWidth / 16}
                color={COLORS.black}
                style={{paddingRight: 20}}
              />
            ),
          });
        } finally {
          setLoad(false);
        }
      };

      bankList();

      return () => {};
    }, [studentId, TokenState, type]),
  );
  const generateVoucher = async () => {
    const params = {
      student_id: studentId,
      token: TokenState,
      fee_voucher_bank_id: value?.detail_account_id,
    };
    try {
      const api = await clientapi.post(
        '/student/voucher/generate/account/vouchers/generate/new/fee-voucher/now',
        params,
      );
      console.log(api?.data, 'apidata');
    } catch (error) {
      setLoad(false);
      console.log(error, 'err');
    }
  };
  const renderLabel = () => {
    return (
      <Text
        style={[styles.label, {color: btn ? COLORS.grey : COLORS.themeColor}]}>
        {'Bank'}
      </Text>
    );
  };
  const paybtn = async () => {
    setLoad(true);
    try {
      const api = await clientapi.post('student/payonline', {
        institutionID: '00140',
        kuickpaySecuredKey: 'o8epOhXEMIOMgS/EAa/dYgw0txVwmdexds82KUlYIMk=',
      });
      if (api?.data?.auth_token) {
        await payonline(api?.data?.auth_token);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.log(error, 'errrr');
    }
  };
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const payonline = async auth_token => {
    const InstitutionID = '00140';
    const Amount = sum_amount;
    const OrderID = generated_fee_voucher[0]?.voucher_no;
    const KuickpaySecuredKey = 'o8epOhXEMIOMgS/EAa/dYgw0txVwmdexds82KUlYIMk=';
    const data_to_hash = InstitutionID + OrderID + Amount + KuickpaySecuredKey;
    const hash_data = md5(data_to_hash);
    try {
      console.log(auth_token, 'auth_token');
      var url = 'https://checkout.kuickpay.com/api/Redirection';
      const api = await axios.post(url, {
        OrderID: OrderID,
        MerchantName: 'HU',
        InstitutionID: '00140',
        Amount: Amount,
        TransactionDescription: 'N/A',
        CustomerMobileNumber: std_num,
        CustomerEmail: std_email,
        SuccessUrl: 'success-url',
        FailureUrl: 'fail-url',
        OrderDate: new Date().toISOString().split('T')[0],
        CheckoutUrl: 'checkout-url',
        Token: auth_token,
        GrossAmount: sum_amount,
        TaxAmount: '0',
        Discount: '0',
        Signature: hash_data,
      });

      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: COLORS.themeColor,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        await sleep(80);
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message, 'errrrr');
    }
  };

  return (
    <View style={styles.container}>
      <Loader load={load} setLoad={setLoad} />
      <View
        style={{
          flexDirection: 'column',
          width: '95%',
          height: '28%',
          borderBottomWidth: 1,
          alignItems: 'center',
        }}>
        <View style={[styles.ddcontainer, {height: '45%', marginBottom: '5%'}]}>
          {renderLabel()}
          <Dropdown
            // key={value}
            disable={btn}
            style={[
              styles.dropdown,
              {
                height: '100%',
                borderColor: btn ? COLORS.grey : COLORS.themeColor,
              },
            ]}
            placeholderStyle={[
              styles.placeholderStyle,
              {color: btn ? COLORS.grey : COLORS.themeColor},
            ]}
            selectedTextStyle={{
              fontSize: windowWidth / 28,
              color: btn ? COLORS.white : COLORS.themeColor,
            }}
            itemTextStyle={{
              color: btn ? COLORS.white : COLORS.themeColor,
              fontSize: windowWidth / 28,
            }}
            iconColor={btn ? COLORS.white : COLORS.themeColor}
            data={data}
            labelField={
              data?.length > 0 && data[0]?.detail_account_title
                ? 'detail_account_title'
                : 'location_name'
            }
            valueField={
              data?.length > 0 && data[0]?.detail_account_title
                ? 'detail_account_title'
                : 'location_name'
            }
            // placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              if (
                (item?.detail_account_id || item?.detail_account_title) ===
                'Select Item'
              ) {
                setValue(null);
              } else {
                setValue(item);
              }
              if (setValueIcon) {
                setValueIcon(item.icon);
              }
              setIsFocus(false);
            }}
          />
        </View>
        <TouchableOpacity
          disabled={btn}
          style={{
            flexDirection: 'row',
            borderColor: btn ? COLORS.grey : COLORS.themeColor,
            backgroundColor: btn ? COLORS.grey : COLORS.white,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            width: '80%',
            height: '38%',
            borderRadius: 8,
          }}
          onPress={generateVoucher}>
          <Text
            style={{
              color: btn ? COLORS.white : COLORS.themeColor,
              fontWeight: 'bold',
              fontSize: windowWidth / 23,
            }}>
            Generate Voucher
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, width: '90%'}}>
        {generated_fee_voucher && generated_fee_voucher.length === 0 ? (
          <Text>No Data Found</Text>
        ) : (
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'column',
                marginTop: '5%',
                width: '100%',
                // height: '30%',
                paddingVertical: '3%',
                borderWidth: 1,
                backgroundColor: COLORS.themeColor,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.cardtextsty}>
                Voucher No:{' '}
                {generated_fee_voucher?.length > 0 &&
                  generated_fee_voucher[0]?.voucher_no}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={{color: COLORS.white}}>
                  Issue Date :{' '}
                  {generated_fee_voucher?.length > 0 &&
                    new Date(
                      generated_fee_voucher[0]?.issue_date,
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    // height: '2%',
                    width: '1%',
                  }}
                />
                <Text style={{color: COLORS.white}}>
                  Due Date :{' '}
                  {generated_fee_voucher?.length > 0 &&
                    new Date(
                      generated_fee_voucher[0]?.due_date,
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                </Text>
              </View>
              <Text style={{color: COLORS.white, paddingTop: '1%'}}>
                Status :{' '}
                {generated_fee_voucher?.length > 0 &&
                  generated_fee_voucher[0]?.status}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  // height: '30%',
                  // backgroundColor: 'red',
                  justifyContent: 'center',
                }}>
                <Text style={{color: COLORS.white, fontSize: windowWidth / 20}}>
                  Total Ammount :{' '}
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: windowWidth / 20,
                    backgroundColor: COLORS.red,
                    borderRadius: 10,
                  }}>
                  {'  '}
                  {sum_amount}
                  {'  '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  // height: '30%',
                  paddingTop: '5%',
                  // backgroundColor: 'red',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      // `https://sp.hamdard.edu.pk/api/student/transport/req/vouchers/${generated_fee_voucher[0]?.voucher_no}/Fee`,
                      `${clientapi.defaults.baseURL}/student/vouchers/${generated_fee_voucher[0]?.voucher_no}/Fee`,
                    );
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: windowWidth / 19,
                      borderWidth: 1,
                      borderColor: COLORS.white,
                      borderRadius: 8,
                    }}>
                    {' '}
                    Print/Download{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={paybtn}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: windowWidth / 19,
                      borderWidth: 1,
                      borderColor: COLORS.white,
                      borderRadius: 8,
                    }}>
                    {'  '}
                    Pay Online
                    {'  '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default FeeVoucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  cardtextsty: {
    fontSize: windowWidth / 20,
    color: COLORS.white,
  },
  ddcontainer: {
    width: '90%',
    // height: '100%',
    marginHorizontal: '1%',
  },
  dropdown: {
    // height: height,

    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: '2%',
  },
  icon: {
    marginRight: '2%',
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.white,

    left: 20,
    top: -1,
    zIndex: 999,
    paddingHorizontal: '3%',
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    // color: COLORS.themeColor,
  },
});

{
  /* {generated_fee_voucher?.map((v, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginTop: '5%',
                  width: '100%',
                  borderBottomWidth: 1,
                  // backgroundColor: COLORS.themeColor,
                  borderRadius: 10,
                  // justifyContent: 'space-evenly',
                }}>
                <Text style={[styles.cardtextsty, {color: COLORS.black}]}>
                  {' '}
                  {v?.sno}{' '}
                </Text>
                <Text
                  selectable
                  style={[styles.cardtextsty, {color: COLORS.black}]}>
                  {' '}
                  {new Date(v?.issue_date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                </Text>
                <Text style={[styles.cardtextsty, {color: COLORS.black}]}>
                  {' '}
                  {new Date(v?.due_date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                </Text>
              </View>
            ))} */
}
