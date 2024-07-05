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
  height = '100%',
}) => {
  const renderLabel = () => {
    return <Text style={[styles.label]}>{label}</Text>;
  };
  // console.log(data, 'data');
  return (
    <View style={[styles.ddcontainer, {height: height}]}>
      {label ? renderLabel() : null}
      <Dropdown
        style={[styles.dropdown, {height: height}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={{
          fontSize: windowWidth / 28,
          color: COLORS.themeColor,
        }}
        // iconStyle={styles.iconStyle}
        itemTextStyle={{color: COLORS.themeColor, fontSize: windowWidth / 28}}
        iconColor={COLORS.themeColor}
        data={data}
        labelField={data[0].label ? 'label' : 'location_name'}
        valueField={data[0].label ? 'label' : 'location_name'}
        placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          if ((item?.label || item.location_name) === 'Select Item') {
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
  );
};

const styles = StyleSheet.create({
  ddcontainer: {
    width: '100%',
    // height: height,
    marginHorizontal: '1%',
  },
  dropdown: {
    // height: height,
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
