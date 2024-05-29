import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import React, {useRef} from 'react';

import {COLORS, windowHeight, windowWidth} from '../../Constants/COLORS';
import ProfileTopCard from './ProfileTopCard';
import {useRoute} from '@react-navigation/native';
const CustomTabBar = ({state, descriptors, navigation}) => {
  const scrollViewRef = useRef(null);
  const handleTabPress = index => {
    navigation.navigate(state.routes[index].name);
    const scrollX = index * (windowWidth / 3.75);
    scrollViewRef.current.scrollTo({x: scrollX, animated: true});
  };

  const route = useRoute();

  return (
    <View
      style={{
        height: windowHeight / 10,
        width: '100%',
        elevation: 25,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
      }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: '3%',
          // height: '100%',
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
            textColor = options.activeTextColor || COLORS.white;
          } else {
            // Inactive tab color
            tabColor = options.inactiveBackgroundColor || 'transparent';
            textColor = options.inactiveTextColor || COLORS.themeColor;
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
                  width: windowWidth / 3,
                  height: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: COLORS.themeColor,
                  ...shadowStyle.ios,
                  elevation: isfocused ? 24 : 0,
                },
              ]}>
              <Text
                style={{
                  fontSize: windowWidth / 25,
                  fontWeight: '500',
                  color: textColor,
                  textAlign: 'center',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({});

//  {route.name !== 'Register New Course' || 'Classes Schedule' ? (
//  ) : (

//       )}
