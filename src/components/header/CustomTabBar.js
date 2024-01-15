import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import React, {useRef} from 'react';

import {COLORS} from '../../Constants/COLORS';
import ProfileTopCard from './ProfileTopCard';
const CustomTabBar = ({state, descriptors, navigation}) => {
  //   const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;
  const handleTabPress = index => {
    navigation.navigate(state.routes[index].name);
    const scrollX = index * (WindowWidth / 3.75);
    scrollViewRef.current.scrollTo({x: scrollX, animated: true});
  };

  return (
    <View
      style={{
        // flexDirection: 'row',
        // height: WindowHeight / 8,
        // alignItems: 'center',
        height: WindowHeight / 4.5,
        width: '100%',
        elevation: 25,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        backgroundColor: COLORS.themeColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // overflow: 'scroll',
      }}>
      <View
        style={{
          flexDirection: 'column',
          height: '50%',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}>
        <ProfileTopCard />
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{
          // flexDirection: 'column',
          height: '50%',
          // backgroundColor: 'blue',
          width: '100%',
        }}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: '3%',
          height: '100%',
          columnGap: 10,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel || route.name;

          let tabColor;
          let isfocused = index === state.index;
          if (isfocused) {
            // Active tab color
            tabColor = options.activeBackgroundColor || COLORS.white;
          } else {
            // Inactive tab color
            tabColor = options.inactiveBackgroundColor || 'transparent';
          }
          const shadowStyle =
            index === state.index
              ? {
                  ios: {
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: -2},
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                  },
                }
              : {};

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleTabPress(index)}
              style={[
                styles.tabsty,
                {
                  backgroundColor: tabColor,
                  width: WindowWidth / 3.75,
                  height: '35%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  // paddingHorizontal: '2%',
                  borderWidth: 2,
                  borderColor: COLORS.white,
                  ...shadowStyle.ios,
                },
              ]}>
              <Text
                style={{
                  fontSize: WindowWidth / 25,
                  fontWeight: '500',
                  color: isfocused ? COLORS.themeColor : COLORS.white,
                  textAlign: 'center',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* <ScrollView
        horizontal
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: 'row', backgroundColor: 'blue', height: '100%'}}
        contentContainerStyle={{
          flexDirection: 'row',
          height: '100%',
          backgroundColor: 'blue',
          // alignItems: 'flex-end',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel || route.name;

          let tabColor;
          if (index === state.index) {
            // Active tab color
            tabColor = options.activeBackgroundColor || 'blue';
          } else {
            // Inactive tab color
            tabColor = options.inactiveBackgroundColor || 'red';
          }
          const shadowStyle =
            index === state.index
              ? {
                  ios: {
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: -2},
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                  },
                }
              : {};

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.tabsty,
                {
                  backgroundColor: tabColor,
                  width: WindowWidth / 8,
                  height: '90%',
                  ...shadowStyle.ios,
                },
              ]}>
              <Text
                style={{
                  fontSize: WindowWidth / 100,
                  fontWeight: '500',
                  color: 'white',
                  textAlign: 'center',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({});
