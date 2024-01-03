import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileCard = ({cardProfileData}) => {
  const WindowWidth = Dimensions.get('window').width;
  const WindowHeight = Dimensions.get('window').height;

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
          <Image
            source={require('../../../../assets/test.png')}
            resizeMode="stretch"
            style={{height: '45%', width: '70%', borderRadius: 50}}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '75%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            // backgroundColor: 'blue',
          }}>
          <Text
            style={{
              fontWeight: '800',
              color: '#000',
              fontSize: WindowWidth / 22,
            }}>
            Faiza Hameed(277-2017)
          </Text>
          <Text
            style={{
              fontSize: WindowWidth / 28,
            }}>
            Faiza Hameed D/O Hameed-Ul-Haq
          </Text>
          <Text>Admission Status Confirmed</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: '75%',
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              fontWeight: '800',
              color: '#000',
              fontSize: WindowWidth / 25,
            }}>
            Personal Information:
          </Text>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>Office Email: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
              }}>
              {cardProfileData.email}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>Admission Date: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
              }}>
              {cardProfileData.admissionDate}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>Campus: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
              }}>
              {cardProfileData.campus}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>Program: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
              }}>
              {cardProfileData.program}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>Class: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
              }}>
              {cardProfileData.class}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>Date of Birth: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
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
            <Text style={{fontSize: WindowWidth / 25}}>Status: </Text>
            <View
              style={{
                backgroundColor: '#007E40',
                padding: '1%',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  fontSize: WindowWidth / 25,
                  fontWeight: '700',
                  color: '#fff',
                }}>
                {cardProfileData.status}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>CNIC: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
              }}>
              {cardProfileData.cnic}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>Phone Number: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
              }}>
              {cardProfileData.phoneNum}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap'}}>
            <Text style={{fontSize: WindowWidth / 25}}>Address: </Text>
            <Text
              style={{
                fontSize: WindowWidth / 25,
                fontWeight: '700',
                color: '#007E40',
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
{
  /* <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text>Office Email:</Text>
            <Text>hameedfaiza354@gmail.com</Text>
          </View>
        </View> */
}
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
});
