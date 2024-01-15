import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {Children} from 'react';

const InputText = ({
  value,
  placeholder,
  placeholderTextColor,
  onChangeText,
  TextStyle,
  onFocus,
  onBlur,
  inputMode,
  secureTextEntry,
  maxLength,
}) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      maxLength={maxLength}
      style={TextStyle}
      onFocus={onFocus}
      onBlur={onBlur}
      inputMode={inputMode}
      secureTextEntry={secureTextEntry}
    />
  );
};
InputText.defaultProps = {
  placeholder: 'Your Placeholder',
  placeholderTextColor: '@000',
  style: {width: '100%', height: '100%', color: '#000'},
};
export default InputText;

const styles = StyleSheet.create({});
