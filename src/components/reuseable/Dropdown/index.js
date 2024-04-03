import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
    if (value || isFocus) {
      return <Text style={[styles.label]}>{label}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.ddcontainer}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: COLORS.themeColor}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
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
          setValueIcon(item.icon);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? COLORS.themeColor : COLORS.black}
            name={valueIcon === null ? 'Safety' : valueIcon}
            size={windowWidth / 20}
          />
        )}
      />
    </View>
  );
};
export default DropdownComponent;

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
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.themeColor,
  },
  iconStyle: {
    color: COLORS.themeColor,
  },
});
