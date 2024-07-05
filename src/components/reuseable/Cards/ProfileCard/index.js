import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../../Constants/COLORS';
import {useSelector} from 'react-redux';

const ProfileCard = ({cardProfileData}) => {
  const WindowWidth = Dimensions.get('window').width;
  const WindowHeight = Dimensions.get('window').height;
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const AuthState = useSelector(state => {
    return state?.AuthReducer.UserDetail;
  });
  const ImageUri = AuthState?.picture;
  // console.log(AuthState?.picture, 'AuthState?.picture');
  return (
    <View style={styles.container}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', height: '25%'}}>
        <View
          style={{
            flexDirection: 'column',
            width: '25%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity style={{}} onPress={toggleModal}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'flex-start',
                // alignItems: 'flex-start',
                width: WindowWidth / 5,
                height: WindowWidth / 5,
                borderRadius: 150,
                borderWidth: 5,
                // marginHorizontal: 10,
                marginRight: 10,
                marginLeft: 0,
                overflow: 'hidden',
                borderColor: COLORS.themeColor,
              }}>
              {AuthState?.picture ? (
                <Image
                  source={{
                    uri:
                      AuthState?.picture === '' ||
                      AuthState?.picture === null ||
                      AuthState?.picture
                        ? AuthState.picture
                        : require('../../../../assets/Chevron.png'),
                  }}
                  resizeMode="contain"
                  style={{
                    aspectRatio: 1,
                    width: AuthState?.picture ? undefined : '0%',
                    height: AuthState?.picture ? '100%' : '0%',
                  }}
                />
              ) : (
                <Image
                  source={require('../../../../assets/N_A_logo.png')}
                  resizeMode="contain"
                  style={{
                    aspectRatio: 1,
                    width: AuthState?.picture ? undefined : '0%',
                    height: AuthState?.picture ? '100%' : '0%',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          <Modal
            visible={isModalVisible}
            transparent={true}
            onRequestClose={toggleModal}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  source={{uri: AuthState?.picture}}
                  style={{
                    width: WindowWidth,
                    height: WindowHeight,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '75%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={[
              styles.Textsty,
              {
                fontWeight: '800',
                // color: COLORS.black,
                fontSize: WindowWidth / 22,
              },
            ]}>
            {cardProfileData.name}
          </Text>
          <Text
            style={[
              styles.Textsty,
              {
                fontSize: WindowWidth / 28,
              },
            ]}>
            {cardProfileData.desc}
          </Text>
          <Text style={[styles.Textsty]}>
            {cardProfileData.addmision_status}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: '75%',
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={[
              styles.Textsty,
              {
                fontWeight: '800',
              },
            ]}>
            Personal Information:
          </Text>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={[styles.Textsty, {fontSize: WindowWidth / 25}]}>
              Office Email:{' '}
            </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.email}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={[styles.Textsty]}>Admission Date: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.admissionDate}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={[styles.Textsty]}>Campus: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.campus}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={[styles.Textsty]}>Program: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.program}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={[styles.Textsty]}>Class: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.class}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={[styles.Textsty]}>Date of Birth: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.dob}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Text style={[styles.Textsty]}>Status: </Text>
            <View
              style={{
                backgroundColor: COLORS.TextthemeColor,
                padding: '1%',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  fontSize: WindowWidth / 25,
                  fontWeight: '700',
                  color: COLORS.white,
                }}>
                {cardProfileData.status}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={[styles.Textsty]}>CNIC: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.cnic}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={[styles.Textsty]}>Phone Number: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.phoneNum}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
              flexWrap: 'wrap',
            }}>
            <Text style={[styles.Textsty]}>Address: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: COLORS.TextthemeColor,
              }}>
              {cardProfileData.address}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '1%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  Textsty: {
    fontSize: WindowWidth / 25,
    color: COLORS.black,
  },
});
