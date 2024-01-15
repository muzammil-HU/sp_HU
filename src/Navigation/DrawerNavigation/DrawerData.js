import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {LogOutUserApi} from '../../Redux/Actions/AuthFunctions';
import {COLORS} from '../../Constants/COLORS';
import Icon, {Icons} from '../../components/Icons';
import {Row} from '../../components/Row';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DrawerData = props => {
  const navigation = props.navigation;
  const options = props.options;
  const drawerMenu = props.drawerMenu;
  const [load, setLoad] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMenuItemClick = item => {
    if (item.subMenu) {
      setOpenDropdown(openDropdown === item.title ? null : item.title);
    } else {
      navigation.navigate(item.route);
    }
  };

  const handleSubMenuClick = route => {
    setOpenDropdown(null);
    navigation.navigate(route);
  };
  const handleLogout = () => {
    setLoad(true);
    let data = {
      token: TokenState,
    };
    LogOutUserApi(data, dispatch, setLoad);
  };

  return (
    <DrawerContentScrollView {...props}>
      {drawerMenu.map(item => (
        <View key={item.title}>
          <DrawerItem
            label={item.title}
            onPress={() => handleMenuItemClick(item)}
            icon={({size, color}) => (
              <item.type name={item.icon} size={24} color={color} />
            )}
            options={options} // Use options prop
          />
          {item.subMenu &&
            openDropdown === item.title &&
            item.subMenu.map(subItem => (
              <DrawerItem
                key={subItem.title}
                label={subItem.title}
                onPress={() => handleSubMenuClick(subItem.route)}
                icon={({size, color}) => (
                  <item.type name={item.icon} size={24} color={color} />
                )}
                options={subItem.drawerItemOptions}
                style={{marginLeft: 16}}
              />
            ))}
        </View>
      ))}
      <DrawerItem
        label="LogOut"
        onPress={() => handleLogout()}
        icon={({color, size}) => (
          <SimpleLineIcons name="logout" size={24} color="black" />
        )}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerData;

// <View style={{flex: 1}}>
//   {/* <DrawerItemList {...props} /> */}
//   <View style={styles.spacer} />
//   {/* Menu */}
//   {drawerMenu.map((item, index) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.8}
//         key={index}
//         style={[styles.menu, {backgroundColor: item.bg + '99'}]}
//         onPress={() => {
//           // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
//           LayoutAnimation.configureNext(
//             LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
//           );
//           setMenuIndex(menuIndex === index ? -1 : index);
//         }}>
//         <Row style={styles.item}>
//           <Icon type={item.type} name={item.icon} size={22} />
//           <Text
//             style={[
//               styles.text,
//               {
//                 color: menuIndex === index ? COLORS.black : COLORS.grey,
//               },
//             ]}>
//             {item.title}
//           </Text>
//         </Row>
//         {menuIndex === index && (
//           <View
//             style={{
//               borderRadius: 20,
//               backgroundColor: item.bg,
//             }}>
//             {item.menuList.map((subMenu, index) => (
//               <TouchableNativeFeedback key={index}>
//                 <View style={styles.subMenu}>
//                   <Text>{subMenu.title}</Text>
//                 </View>
//               </TouchableNativeFeedback>
//             ))}
//           </View>
//         )}
//       </TouchableOpacity>
//     );
//   })}
// </View>

const styles = StyleSheet.create({});
