import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, windowHeight, windowWidth} from '../../Constants/COLORS';

const TabBar = ({state, descriptors, navigation}) => {
  const handlePress = index => {
    navigation.navigate(state.routes[index].name);
  };
  return (
    <View
      style={{
        height: windowHeight / 9,
        width: '100%',
        elevation: 25,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View
        scrollEnabled={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: '3%',
          // height: '100%',
          columnGap: 10,
          // justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          justifyContent: 'space-between',
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
              onPress={() => handlePress(index)}
              style={[
                styles.tabsty,
                {
                  backgroundColor: tabColor,
                  // width: '30%',
                  paddingHorizontal: '1%',
                  height: '60%',
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
                  fontSize: windowWidth / 27,
                  fontWeight: '500',
                  color: textColor,
                  textAlign: 'center',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
