import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../Constants/COLORS';
import ProfileTopCard from '../../components/header/ProfileTopCard';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const DrawerHeader = ({navigation}) => {
  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        flexDirection: 'row',
        // height: WindowHeight / 8,
        // alignItems: 'center',
        height: WindowHeight / 10,
        width: '100%',
        elevation: 25,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        backgroundColor: COLORS.themeColor,
        // flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          // paddingLeft: 15,
          alignItems: 'flex-end',
          width: '20%',
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity
          style={{
            // backgroundColor: 'red',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <FontAwesome6
            name="bars-staggered"
            size={WindowWidth / 12}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'column',
          height: '92%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          // backgroundColor: 'blue',
          width: '80%',
        }}>
        <ProfileTopCard />
      </View>
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({});
