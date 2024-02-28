import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../Constants/COLORS';
const TopCard = ({cards, DynaimcCards}) => {
  return (
    <View style={styles.container}>
      {DynaimcCards?.map(c => (
        <TouchableOpacity
          key={c.head}
          style={{
            flexDirection: 'column',
            marginBottom: 10,
            marginHorizontal: '1%',
            // paddingVertical: '5%',
            borderRadius: 10,
            width: '31%',
            height: '45%',
            backgroundColor: '#ffffff',
            elevation: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.headView}>
            {c.Icon ? (
              c.Icon.type === 'image' ? (
                <Image
                  source={c.Icon.source}
                  resizeMode="cover"
                  style={{height: c.Icon.iconSize, width: c.Icon.iconSize}}
                />
              ) : (
                <c.Icon.IconComp
                  name={c.Icon.iconName}
                  size={c.Icon.iconSize}
                  color={c.Icon.iconColor}
                />
              )
            ) : null}
            <Text style={styles.head}>{c.head}</Text>
            {c?.content ? <Text style={styles.head}>{c?.content}</Text> : null}
          </View>
        </TouchableOpacity>
      ))}
      {cards.map(c => (
        <TouchableOpacity
          key={c.head}
          onPress={
            c.onPress && typeof c.onPress === 'function' ? c.onPress : undefined
          }
          style={{
            flexDirection: 'column',
            marginBottom: 10,
            marginHorizontal: '1%',
            // paddingVertical: '5%',
            borderRadius: 10,
            width: '31%',
            height: '45%',
            backgroundColor: '#ffffff',
            elevation: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.headView}>
            {c.Icon ? (
              c.Icon.type === 'image' ? (
                <Image
                  source={c.Icon.source}
                  resizeMode="cover"
                  style={{height: c.Icon.iconSize, width: c.Icon.iconSize}}
                />
              ) : (
                <c.Icon.IconComp
                  name={c.Icon.iconName}
                  size={c.Icon.iconSize}
                  color={c.Icon.iconColor}
                />
              )
            ) : null}
            <Text style={styles.head}>{c.head}</Text>
            {c?.content ? <Text style={styles.head}>{c?.content}</Text> : null}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  headView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    fontSize: width / 30,
    textAlign: 'center',
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  content: {
    fontWeight: '800',
    color: COLORS.TextthemeColor,
    textAlign: 'center',
    fontSize: Dimensions.get('window').width / 12,
  },
});

export default TopCard;
