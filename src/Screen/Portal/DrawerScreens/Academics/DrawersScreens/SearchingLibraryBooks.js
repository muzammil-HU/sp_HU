import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../Constants/COLORS';

const SearchingLibraryBooks = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.themeColor}}>Searching Library Books</Text>
    </View>
  );
};

export default SearchingLibraryBooks;

const styles = StyleSheet.create({});
