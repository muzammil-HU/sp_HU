import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfieTopCard from './ProfieTopCard';
import {useSelector} from 'react-redux';

const CHeader = () => {
  const WindowWidth = Dimensions.get('window').width;
  const WindowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  const AuthState = useSelector(state => {
    return state?.AuthReducer.UserDetail;
  });
  console.log(AuthState, 'UserDetail');
  return (
    <View
      style={{
        height: WindowHeight / 4,
        width: '100%',
        elevation: 10,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: '#2BA36F',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
        }}>
        <ProfieTopCard />
      </View>
    </View>
  );
};

export default CHeader;

const styles = StyleSheet.create({});

{
  /* <TouchableOpacity
          style={{paddingLeft: 10, paddingTop: 5}}
          onPress={() => navigation.openDrawer()}>
          <AntDesign name="arrowleft" size={30} color={'#fff'} />
        </TouchableOpacity> */
}

//{' '}
{
  /* <Image
    //   source={require('../../assets/Headerimg.png')}
    //   resizeMode="cover"
    //   style={{height: '50%', opacity: 0.2}}
    // /> */
}
// {/* </ImageBackground> */}
{
  /* <Image
        source={require('../../assets/Headerimg.png')}
        resizeMode="contain"
        style={{
          height: WindowHeight / 12,
          width: '100%',
          backgroundColor: '#007E40',
          opacity: 0.4,
        }}
      /> */
}
