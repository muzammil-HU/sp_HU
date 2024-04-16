import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, windowWidth} from '../../../Constants/COLORS';

const DropdownComponent = ({
  value,
  setValue,
  valueIcon,
  setValueIcon,
  isFocus,
  setIsFocus,
  data,
  label,
}) => {
  const renderLabel = () => {
    return <Text style={[styles.label]}>{label}</Text>;
  };

  return (
    <View style={styles.ddcontainer}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={{
          fontSize: windowWidth / 25,
          color: COLORS.themeColor,
        }}
        // iconStyle={styles.iconStyle}
        itemTextStyle={{color: COLORS.themeColor, fontSize: windowWidth / 28}}
        iconColor={COLORS.themeColor}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          if (setValueIcon) {
            setValueIcon(item.icon);
          }
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <FontAwesome5
            style={styles.icon}
            color={COLORS.themeColor}
            name={valueIcon === null ? 'search-location' : valueIcon}
            size={windowWidth / 20}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ddcontainer: {
    width: '100%',
    height: '100%',
    marginHorizontal: '1%',
  },
  dropdown: {
    height: '100%',
    borderColor: COLORS.themeColor,
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
    color: COLORS.themeColor,
    left: 20,
    top: -1,
    zIndex: 999,
    paddingHorizontal: '3%',
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.themeColor,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    // color: COLORS.themeColor,
  },
});

export default DropdownComponent;
