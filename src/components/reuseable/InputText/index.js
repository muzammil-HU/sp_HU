import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {Children} from 'react';

const InputText = React.forwardRef(
  (
    {
      value,
      placeholder,
      placeholderTextColor,
      onChangeText,
      TextStyle,
      onFocus,
      onBlur,
      inputMode,
      keyboardType,
      secureTextEntry,
      maxLength,
      onSubmitEditing,
      onEndEditing,
    },
    ref,
  ) => {
    return (
      <TextInput
        ref={ref}
        onSubmitEditing={onSubmitEditing}
        onEndEditing={onEndEditing}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        maxLength={maxLength}
        style={TextStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        inputMode={inputMode}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    );
  },
);
InputText.defaultProps = {
  placeholder: 'Your Placeholder',
  placeholderTextColor: '@000',
  style: {width: '100%', height: '100%', color: '#000'},
};
export default InputText;

const styles = StyleSheet.create({});
